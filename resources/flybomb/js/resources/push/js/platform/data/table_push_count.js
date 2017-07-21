'use strict';
import React from 'react';

import { Table } from 'antd';

const App = React.createClass({
	getInitialState() {
		return {
			columns: [{
				title: '日期',
				key: '0',
				className: 'ta_c',
				dataIndex: 'date'
			}, {
				title: '推送应用数',
				key: '1',
				className: 'ta_c',
				dataIndex: 'appsNo'
			}, {
				title: '推送用户数',
				key: '2',
				className: 'ta_r',
				dataIndex: 'totalUserNo'
			}, {
				title: '推送量',
				key: '3',
				className: 'ta_r',
				dataIndex: 'totalPushNo'
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