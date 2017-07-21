'use strict';
import React from 'react';

import { Table } from 'antd';

import Info from '../../info';




const App = React.createClass({
	getInitialState() {
		return {
			columns: [{
				title: '日期',
				key: '0',
				className: 'ta_c',
				dataIndex: 'date'
			}, {
				title: <Info text="推送数" />,
				key: '1',
				className: 'ta_c',
				dataIndex: 'appsNo'
			}, {
				title: <Info text="接收数" />,
				key: '2',
				className: 'ta_r',
				dataIndex: 'totalUserNo'
			}, {
				title: <Info text="展示数" />,
				key: '3',
				className: 'ta_r',
				dataIndex: 'totalPushNo'
			}, {
				title: <Info text="点击数" />,
				key: '4',
				className: 'ta_r',
				dataIndex: 'totalPushNo'
			}, {
				title: <Info text="划掉数" />,
				key: '5',
				className: 'ta_r',
				dataIndex: 'totalPushNo'
			}],
			refresh: false
		};
	},

	togglePopover(type) {
		this.setState({
			[type]: !this.state[type]
		});
	},

	render() {
		let data = this.props.tableData.data;
		return (
			<div id='detailTable'>
				<Table columns={this.state.columns} loading={this.props.tableData.loading} dataSource={data} pagination={this.props.tableData.pagination} />
			</div>
		);
	}
});

module.exports = App;