'use strict';
import React from 'react';
import { Modal, Tag, Checkbox } from 'antd';



// import EchartsReact from 'echarts-for-react';

import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';








let PushAttr = React.createClass({
	getInitialState() {
		return {
			listCategory: [],
			tags: [],
			listTagByCategoryId: []
		};
	},
	handleCancel() {
		this.props.showModal();
	},
	handleOk() {
		let tags = this.state.tags;
		this.props.selectTags(tags);
		this.props.showModal();
	},
	componentDidMount() {

		let tags = this.props.tags;
		let json = {
		};
		tags.map(function (data) {
			json['checkbox' + data.fid] = true;
		});
		this.setState(json);
		const self = this;
		let url = restapi.userProfileListCategory;
		const appId = utils.queryString('appId', window.location.href);
		url = utils.makeUrl(url, {
			appId: appId
		});
		function* setData() {
			let data = yield ajax.get(url, function (result) {
				let value = result.value;

				sd.next(value);
			});
			self.setState({
				listCategory: data,
				tags: tags
			});
		}
		let sd = setData();
		sd.next();

	},

	listTagByCategoryId(cid) {
		const self = this;
		const appId = utils.queryString('appId', window.location.href);
		let url = restapi.listTopTagByCategoryId;
		url = utils.makeUrl(url, {
			cid: cid,
			appId: appId
		});
		ajax.get(url, function (result) {
			self.setState({
				listTagByCategoryId: result.value,
				fid: cid
			});

		});
	},
	changeCheckbox(e) {
		let checked = e.target.checked;
		let tags = this.state.tags;
		let data = e.target.data;
		let result;
		if (checked) {
			// tags.push({
			// 	fid: data.fid,
			// 	fname: data.fname
			// });
			result = tags.concat({//不能用push方法，tags的值变了，this.props.tags的值也会变，坑货
				fid: data.fid,
				fname: data.fname
			});
		} else {
			result = tags.filter(tag => tag.fid !== data.fid);
		}
		this.setState({
			tags: result,
			['checkbox' + data.fid]: checked
		});
	},
	handleClose(removedTag) {
		const tags = this.state.tags.filter(tag => tag.fid !== removedTag);
		this.setState({
			tags: tags,
			['checkbox' + removedTag]: false
		});


	},
	render() {
		const self = this;
		let tags = this.state.tags;
		const sidebar = this.state.listCategory.map(function (data) {
			let arr = [];
			if (data.alink) {
				arr.push(<dt className={self.state.fid === 'myTag' ? 'cursor_p current' : 'cursor_p'}>公共属性标签</dt>);
			} else {
				arr.push(<dt>{data.fname}</dt>);
				const list = data.fchildren.map(function (source) {
					return <dd className={self.state.fid === source.fid ? 'current' : ''} onClick={self.listTagByCategoryId.bind(self, source.fid)}>{source.fname}</dd>;
				});
				arr = arr.concat(list);
			}
			return arr;
		});
		let listTagByCategoryId = this.state.listTagByCategoryId;
		let list = listTagByCategoryId.map(function (data) {
			return <div className="list_box" key={data.fid}>
				<Checkbox onChange={self.changeCheckbox}
					data={data}
					checked={self.state['checkbox' + data.fid]}>
					{data.fname}
				</Checkbox>
			</div>;
		});

		if (!listTagByCategoryId.length) {
			list = '请选择标签';
		}
		list = <div className='ug_form'>
			<div className="analyze_attr">
				{list}
			</div>

		</div>;
		return (
			<div>
				<Modal
					width={1000}
					onCancel={this.handleCancel}
					onOk={this.handleOk}
					okText='提交'
					cancelText='返回'
					title='添加属性'

					visible={true} >
					<div className="usergroup analyze_usergroup">
						<div className="ug_sidebar">
							<dl>
								{sidebar}
							</dl>
						</div>
						<div className="ug_content">
							<div className="ug_list">
								{list}
							</div>

							<div className="analyze_tags">
								<h3>已选择标签</h3>
								{tags.map((tag) => {
									const tagElem = (
										<Tag key={tag.fid} closable={true} afterClose={() => this.handleClose(tag.fid)}>
											{tag.fname}
										</Tag>
									);
									return tagElem;
								})}
							</div>
						</div>
					</div>

				</Modal>

			</div>
		);
	}
});



module.exports = PushAttr;

