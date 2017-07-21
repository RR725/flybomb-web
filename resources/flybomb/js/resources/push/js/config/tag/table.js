'use strict';
import React from 'react';

import { Table, Popover } from 'antd';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';


const App = React.createClass({

	getInitialState() {
		return {
			refresh: false,
			status: 0
		};
	},
	createFile(tagId) {
		let self = this;
		const appId = utils.queryString('appId', window.location.href);
		const data = {
			appId: appId,
			tagId: tagId
		};
		ajax.post(restapi.createTagUserFile, data, function () {
			// console.log(result)
			// const status=result.value.result;
			// let dataSource=self.props.tableData.data;
			// for(let i=0;i<dataSource.length;i++){
			// 	if(i===index){
			// 		dataSource[i].status=status;
			// 	}
			// }
			// self.setState({
			// 	dataSource:dataSource
			// });
			self.setState({
				['status' + tagId]: 1,
				refresh: false
			});
		});

	},
	componentDidMount() {
		const appId = utils.queryString('appId', window.location.href);
		let searchParam = {
			appId: appId,
			index: this.props.current
		};
		this.props.getTableData(searchParam);


	},
	handleVisibleChange(tagId) {
		this.setState({
			['visible' + tagId]: !this.state['visible' + tagId]
		});
	},
	refresh(tagId) {
		const appId = utils.queryString('appId', window.location.href);
		let searchParam = {
			appId: appId,
			index: this.props.current
		};
		const tagName = this.props.tagName;
		if (tagName) {
			searchParam.tagName = tagName;
		}
		this.setState({
			['status' + tagId]: null,
			refresh: true
		});
		this.props.getTableData(searchParam);
	},
	render() {
		const self = this;
		const appId = utils.queryString('appId', window.location.href);

		const columns = [{
			title: '标签名称',
			key: '0',
			dataIndex: 'tagName',
			className: 'ta_c'
		}, {
			title: '用户数',
			className: 'ta_c',
			key: '1',
			dataIndex: 'userCount'
		}, {
			title: '操作',
			className: 'ta_c',
			key: '2',
			render(text, record, index) {
				return (
					<div>
						{self.state.refresh ?
							<div className="btn_wrap" style={{ width: '140px', display: 'inline-block' }}>
								{record.status === 0 ? <a onClick={self.createFile.bind(self, record.tagId, index)} href="javascript:;">生成文件</a> : null}
								{record.status === 1 ?
									<div>
										<Popover
											onVisibleChange={self.handleVisibleChange.bind(self, record.tagId)}
											content="点击刷新查看是否生成完成"
											trigger="hover"
											title={null}
											visible={!self.state['visible' + record.tagId]}>
											<span>文件生成中...</span>
										</Popover>
										<a className="pl10" onClick={self.refresh.bind(self, record.tagId)} href="javascript:;">刷新</a>
									</div> : null}
								{record.status === 2 ? <a href={restapi.downloadAppTag + '?appId=' + appId + '&tagId=' + record.tagId}>下载文件</a> : null}

							</div> :
							<div className="btn_wrap" style={{ width: '140px', display: 'inline-block' }}>
								{!self.state['status' + record.tagId] && record.status === 0 ? <a onClick={self.createFile.bind(self, record.tagId, index)} href="javascript:;">生成文件</a> : null}
								{record.status === 1 || self.state['status' + record.tagId] === 1 ?
									<div>
										<Popover
											onVisibleChange={self.handleVisibleChange.bind(self, record.tagId)}
											content="点击刷新查看是否生成完成"
											trigger="hover"
											title={null}
											visible={!self.state['visible' + record.tagId]}>
											<span>文件生成中...</span>
										</Popover>
										<a className="pl10" onClick={self.refresh.bind(self, record.tagId)} href="javascript:;">刷新</a>
									</div> : null}
								{!self.state['status' + record.tagId] && record.status === 2 ? <a href={restapi.downloadAppTag + '?appId=' + appId + '&tagId=' + record.tagId}>下载文件</a> : null}

							</div>
						}
					</div>
				);
			},
			dataIndex: ''
		}];
		return (
			<Table className="home_table" columns={columns} loading={this.props.tableData.loading} dataSource={this.props.tableData.data} pagination={this.props.tableData.pagination} />
		);
	}
});

module.exports = App;