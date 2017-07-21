'use strict';
import React from 'react';

import { Table, Tooltip } from 'antd';
import { Link } from 'react-router';

const AppConfig = React.createClass({
	render() {
		let url = '/config/app?appId=' + this.props.id;
		return <Tooltip title="应用配置">
			<Link to={url} ><i className="i_config"></i></Link>
		</Tooltip>;
	}
});


const App = React.createClass({
	getInitialState() {
		return {
			columns: [{
				title: '应用名称',
				key: '0',
				dataIndex: 'appName',
				className: 'td_appname ',
				render(text, record) {
					return <div><img src={record.appIconUrl} width="24" height="24" />{text}</div>;
				}
			}, {
				title: '应用包名',
				key: '1',
				className: 'td_appname',
				dataIndex: 'packageName'
			}, {
				title: 'AppID',
				key: '2',
				className: 'ta_c',
				dataIndex: 'pushAppId'
			}, {
				title: '通道权限',
				key: '3',
				className: 'ta_c',
				dataIndex: 'channelAccessDesc'
			}, {
				title: '用户群权限',
				key: '4',
				className: 'ta_c',
				dataIndex: 'flymeAuthDesc'
			}, {
				title: '推送频率（条/秒）',
				key: '5',
				className: 'ta_c',
				dataIndex: 'limitRate'
			}, {
				title: '离线消息数',
				key: '6',
				className: 'ta_c',
				dataIndex: 'collapse'
			}, {
				title: '每天推送限制',
				key: '7',
				className: 'ta_c',
				dataIndex: 'limitTimes'
			}, {
				title: '操作',
				className: 'ta_c',
				key: '8',
				render(text, record) {


					return (
						<div className="btn_wrap">
							<AppConfig id={record.appId} />
						</div>
					);
				},
				dataIndex: ''
			}],
			refresh: false
		};
	},

	render() {
		return (
			<Table columns={this.state.columns} loading={this.props.tableData.loading} dataSource={this.props.tableData.data} pagination={this.props.tableData.pagination} />
		);
	}
});

module.exports = App;