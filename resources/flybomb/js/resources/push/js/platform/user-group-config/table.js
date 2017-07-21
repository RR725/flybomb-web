'use strict';
import React from 'react';

import { Table, Button, message, Modal, Popover, Radio } from 'antd';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';

const RadioGroup = Radio.Group;




const App = React.createClass({
	getInitialState() {
		let self = this;
		return {
			columns: [{
				title: '一级标签',
				key: '0',
				dataIndex: 'categoryName',
				className: 'td_appname '
			}, {
				title: '二级标签',
				key: '1',
				className: 'td_appname',
				dataIndex: 'tagName'
			}, {
				title: '展示类型',
				key: '2',
				className: 'ta_c',
				dataIndex: 'displayType',
				render(text, record) {
					const id = record.id;
					return <div>
						<RadioGroup onChange={self.changeRadio} data-id={id} value={self.state['value' + id] === undefined ? text : self.state['value' + id]} >
							<Radio data-id={id} name="list" value={0}>
								<Popover
									placement="bottom"
									visible={self.state['changeType-0-' + id]}
									content={self.getContent('changeType-0-' + id)}
									title={'确定更改展示类型属性?'}
									onVisibleChange={self.toggle.bind(self, 'changeType-0-' + id)}
									trigger="click"   >
									<span>排列展示</span>

								</Popover>
							</Radio>
							<Radio data-id={id} name="dropdown" value={1}>
								<Popover
									placement="bottom"
									visible={self.state['changeType-1-' + id]}
									content={self.getContent('changeType-1-' + id)}
									title={'确定更改展示类型属性?'}
									onVisibleChange={self.toggle.bind(self, 'changeType-1-' + id)}
									trigger="click"   >
									<span>下拉框展示</span>
								</Popover>
							</Radio>

						</RadioGroup>

					</div>;
				}
			}, {
				title: '操作',
				className: 'ta_c',
				key: '3',
				render(text, record) {

					const id = record.id;
					// <a title="标签详情" onClick={self.showModal.bind(self, record, 'show') } to='javascript:;' >标签详情</a>
					return (
						<div className="btn_wrap">

							<Popover
								placement="bottom"
								visible={self.state['delTag-' + id]}
								content={self.getContent('delTag-' + id)}
								title={'删除后不能恢复，继续删除?'}
								onVisibleChange={self.toggle.bind(self, 'delTag-' + id)}
								trigger="click"   >
								<a title="删除" className="ml10" to='javascript:;' >删除</a>
							</Popover>


						</div>
					);
				},
				dataIndex: ''
			}],
			refresh: false
		};
	},
	changeRadio(e) {
		const value = e.target.value;
		const id = e.target['data-id'];
		const type = 'changeType-' + value + '-' + id;
		this.toggle(type);
	},
	showModal(record, type) {
		let json = {
			detailVisible: false
		};
		if (type === 'show') {
			json.detailVisible = true;
			json.modal = record.value;
			json.currentTag = record.tagName;
		}
		this.setState(json);
	},
	modalContent() {//Modal的内容部分
		let modal = this.state.modal;
		if (!modal) return null;
		modal = JSON.parse(modal);
		const list = modal.map(function (data, key) {
			return <li key={key}>{data.name}</li>;
		});
		return <div className='usergroup_taglist'>
			<h3>{this.state.currentTag}</h3>
			<ul>
				{list}
			</ul>
		</div>;
	},
	delTag(arr) {
		const self = this;
		const id = arr[1];
		const total = this.props.tableData.pagination.total;
		let current = this.props.current;

		let url = restapi.delOpenTag;
		url = utils.makeUrl(url, {
			id: id
		});
		ajax.get(url, function () {
			message.success('删除成功');
			if (total % 10 === 1 && total !== 1) {
				current = current - 1;
			}

			self.props.onSearch({ index: current });
		});
	},
	changeType(arr) {// 修改类型  排列展示  or  下拉框展示

		const id = arr[2];
		const type = arr[0] + '-' + arr[1] + '-' + id;
		let url = restapi.updateDisplayType;
		url = utils.makeUrl(url, {
			id: id,
			displayType: arr[1]
		});
		ajax.get(url, function () {
			message.success('修改成功');
		});

		this.setState({
			['value' + id]: arr[1] === '1' ? 1 : 0
		});
		this.toggle(type);
	},
	getContent(value) {//Popover 的内容部分
		const arr = value.split('-');
		const fnName = arr[0];
		return <div>
			<Button type="primary" className="color_bg mr10" onClick={this.toggle.bind(this, value)}>取消</Button>
			<Button onClick={this[fnName].bind(this, arr)}>确定</Button>
		</div>;
	},

	toggle(type) {//控制Modal和Popover的显示隐藏
		this.setState({
			[type]: !this.state[type]
		});
	},
	render() {
		return (
			<div>
				<Table columns={this.state.columns} loading={this.props.tableData.loading} dataSource={this.props.tableData.data} pagination={this.props.tableData.pagination} />
				<Modal
					width={500}
					footer={[
						<Button key="submit" type="primary" size="large" onClick={this.showModal}>
							确 定
						</Button>,
					]}
					onCancel={this.showModal}
					onOk={this.showModal}
					title='标签详情'
					visible={this.state.detailVisible} >
					{this.modalContent()}


				</Modal>
			</div>
		);
	}
});

module.exports = App;




