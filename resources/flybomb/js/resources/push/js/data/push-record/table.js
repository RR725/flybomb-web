'use strict';
import React from 'react';

import { Table, Button, Popover, message, Tooltip } from 'antd';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';





const App = React.createClass({
	getInitialState() {
		let self = this;
		return {
			columns: [{
				title: '推送时间',
				key: '0',
				className: 'ta_c',
				dataIndex: 'pushTime'
			}, {
				title: '应用名称',
				key: '1',
				dataIndex: 'appName',
				className: 'td_appname',
				render(text, record) {
					return <div><img src={record.appIconUrl || '/resources/push/images/default_icon.png'} width="24" height="24" />{text}</div>;
				}
			}, {
				title: '任务ID',
				key: '2',
				className: 'ta_c',
				dataIndex: 'taskId'
			}, {
				title: '类型',
				key: '3',
				className: 'ta_c',
				dataIndex: 'pushType'
			}, {
				title: '任务来源',
				key: '4',
				className: 'ta_c',
				dataIndex: 'sourceType'
			}, {
				title: '标题/备注',
				key: '5',
				className: 'td_appname w_240',
				dataIndex: 'title'
			}, {
				title: '推送人群',
				key: '6',
				className: 'ta_c',
				dataIndex: 'userType'
			}, {
				title: '状态',
				key: '7',
				className: 'ta_c',
				dataIndex: 'status'
			}, {
				title: '操作',
				className: 'ta_l',
				key: '8',
				render(text, record, index) {
					let appId = utils.queryString('appId', window.location.href);
					const url = '#/data/push/detail?appId=' + record.appId + '&taskId=' + record.taskId;
					if (appId === '0') {
						appId = window.ListApp[0].appId;
					}
					let createUrl = '#/create/push?appId=' + record.appId + '&pushType=' + (record.pushType === '通知' ? 'notice' : 'message') + '&taskId=' + record.taskId;

					return (
						<div className="btn_wrap">

							<Tooltip title="推送详情">
								<a target='_blank' href={window.location.pathname + url}><i className="i_detail"></i></a>
							</Tooltip>
							{record.sourceType === '个性化推送' ? null :
								<Tooltip title="任务复制">
									<a href={window.location.pathname + createUrl}><i className="i_copy"></i></a>
								</Tooltip>}


							<Popover
								placement="bottom"
								visible={self.state['visible' + index]}
								content={self.getContent('visible' + index, record, index)}
								title={'确定取消推送?'}
								onVisibleChange={self.togglePopover.bind(self, 'visible' + index)}
								trigger="click"   >
								<span>
									{record.status === '待推送' ||record.status === '待确认'||record.status === '就绪' || record.status === '推送中' ?

										<Tooltip title="取消推送">
											<a href="javascript:;"><i className="i_cancel_push"></i></a>
										</Tooltip>
										: null}
								</span>

							</Popover>
						</div>
					);
				},
				dataIndex: ''
			}],
			refresh: false
		};
	},
	getContent(type, record, index) {
		return <div>
			<Button type="primary" className="color_bg mr10" onClick={this.togglePopover.bind(this, type)}>取消</Button>
			<Button onClick={this.cancelPushTask.bind(this, type, record, index)}>确定</Button>
		</div>;
	},

	togglePopover(type) {
		this.setState({
			[type]: !this.state[type]
		});
	},
	cancelPushTask(type, record) {
		let self = this;
		let url = restapi.cancelPushTask;
		url = utils.makeUrl(url, {
			taskId: record.taskId,
			appId: record.appId
		});
		ajax.get(url, function () {
			message.success('推送任务已取消');
			let searchData = self.props.searchData;
			if (!searchData) {
				const dt = new Date();
				searchData = {
					startTime: utils.dateFormat('yyyy-MM-dd', dt) + ' 00:00:00',
					endTime: utils.dateFormat('yyyy-MM-dd hh:mm:ss', dt),
					index: self.props.current
				};
			}
			for (let i in searchData) {
				if (searchData[i] === '') {
					delete searchData[i];
				}
			}
			self.props.onSearch(searchData);
			self.setState({
				[type]: !self.state[type]
			});
		});

	},

	render() {
		let data = this.props.tableData.data;

		return (
			<Table columns={this.state.columns} loading={this.props.tableData.loading} dataSource={data} pagination={this.props.tableData.pagination} />
		);
	}
});

module.exports = App;