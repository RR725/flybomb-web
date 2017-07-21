'use strict';
import React from 'react';

import { Table, message, Tooltip } from 'antd';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';





const App = React.createClass({
	getInitialState() {
		let self = this;
		return {
			columns: [{
				title: '应用名称',
				key: '1',
				dataIndex: 'appName',
				className: 'td_appname',
				render(text, record) {
					return <div><img src={record.appIconUrl || utils.cdn + '/resources/push/images/default_icon.png'} width="24" height="24" />{text}</div>;
				}
			}, {
				title: '定时任务ID',
				key: '2',
				className: 'ta_c',
				dataIndex: 'cronTaskId'
			}, {
				title: '推送规则',
				key: '3',
				className: 'ta_l',
				dataIndex: 'pushType',
				render(text, record) {
					let weeks = ['一', '二', '三', '四', '五', '六', '日'];
					let week = record.cronTime.week;
					let cronWeek = [];
					week = week.split(',');
					weeks.map(function (data, key) {
						for (let i = 0; i < week.length; i++) {
							if (parseInt(week[i]) === key + 1) {
								cronWeek.push(data);
							}
						}
					});
					cronWeek = cronWeek.join('');
					return <div>{record.cronTime.time}&nbsp;&nbsp;{cronWeek}</div>;
				}
			}, {
				title: '标题/备注',
				key: '4',
				className: 'td_appname w_240',
				dataIndex: 'title'
			}, {
				title: '类型',
				key: '5',
				className: 'ta_c',
				dataIndex: 'pushType'
			}, {
				title: '状态',
				key: '6',
				className: 'ta_c',
				dataIndex: 'isValid',
				render(text) {
					return text ? '生效' : '失效';
				}
			}, {
				title: '操作',
				className: 'ta_l',
				key: '7',
				render(text, record) {

					let appId = record.appId;
					const url = '#/data/push/detail?appId=' + appId + '&cronTaskId=' + record.cronTaskId;
					if (appId === '0') {
						appId = window.ListApp[0].appId;
					}
					let html = record.isValid ? '失效' : '生效';
					return (
						<div className="btn_wrap">

							<Tooltip title="推送详情">
								<a target='_blank' href={window.location.pathname + url}><i className="i_detail"></i></a>
							</Tooltip>
							<Tooltip title={html}>
								<a target='_blank' onClick={() => self.valid(record)} href='javascript:;'>{html}</a>
							</Tooltip>





						</div>
					);
				},
				dataIndex: ''
			}],
			refresh: false
		};
	},
	valid(record) {
		let url = restapi.cronTaskUpdateStatus;
		let data = {
			appId: record.appId,
			cronTaskId: record.cronTaskId,
			isValid: record.isValid ? false : true
		};
		url = utils.makeUrl(url, data);
		ajax.get(url,  () =>{
			message.success('更新成功');
			this.props.onSearch(this.props.searchData);
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