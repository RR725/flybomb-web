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
				title: '日增用户数',
				key: '1',
				className: 'ta_r',
				dataIndex: 'dailyNew'
			}, {
				title: '在线峰值用户数',
				key: '2',
				className: 'ta_r',
				dataIndex: 'dailyPeak'
			}, {
				title: '日联网用户数',
				key: '3',
				className: 'ta_r',
				dataIndex: 'dailyUsers'
			}, {
				title: '累计注册用户数',
				className: 'ta_r',
				key: '4',
				dataIndex: 'totalUsers'
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