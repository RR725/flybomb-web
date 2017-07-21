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
				dataIndex: 'startTime'
			}, {
				title: '应用名称',
				key: '1',
				dataIndex: 'appName',
				className: 'td_appname',
				render(text, record) {
					return <div><img src={record.appIconUrl || utils.cdn + '/resources/push/images/default_icon.png'} width="24" height="24" />{text}</div>;
				}
			}, {
				title: '分组ID',
				key: '2',
				className: 'ta_c',
				dataIndex: 'groupId'
			}, {
				title: '类型',
				key: '3',
				className: 'ta_c',
				dataIndex: 'pushType'
			}, {
				title: '分组标题',
				key: '4',
				className: 'td_appname w_240',
				dataIndex: 'groupName'
			}, {
				title: '目标类型',
				key: '5',
				className: 'ta_c',
				dataIndex: 'groupType'
			}, {
				title: '状态',
				key: '6',
				className: 'ta_c',
				dataIndex: 'pushStatus'
			}, {
				title: '操作',
				className: 'ta_l',
				key: '7',
				render(text, record, index) {

					let appId = record.appId;
					const url = '#/data/push/detail/group?appId=' + appId + '&groupId=' + record.groupId;
					if (appId === '0') {
						appId = window.ListApp[0].appId;
					}

					return (
						<div className="btn_wrap">

							<Tooltip title="推送详情">
								<a target='_blank' href={window.location.pathname + url}><i className="i_detail"></i></a>
							</Tooltip>


							<Popover
								placement="bottom"
								visible={self.state['visible' + index]}
								content={self.getContent('visible' + index, record, index)}
								title={'确定取消推送?'}
								onVisibleChange={self.togglePopover.bind(self, 'visible' + index)}
								trigger="click"   >
								<span>
									{record.pushStatus === '待推送' || record.pushStatus === '推送中' ?

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
		let url = restapi.CancelTaskGroup;
		url = utils.makeUrl(url, {
			groupId: record.groupId,
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