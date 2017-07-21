'use strict';
import React from 'react';

import { Table } from 'antd';

import Info from '../../info';

 


const App = React.createClass({
	getInitialState() {
		return {
			columns: [{
				title: '推送时间',
				key: '0',
				className: 'ta_c',
				dataIndex: 'date'
			}, {
				title: <Info text="目标数" />,
				key: '1',
				className: 'ta_c',
				dataIndex: 'targetNo'
			}, {
				title: <Info text="有效数" />,
				key: '2',
				className: 'ta_c',
				dataIndex: 'validNo'
			}, {
				title: <Info text="推送数" />,
				key: '3',
				className: 'ta_c',
				dataIndex: 'pushedNo'
			}, {
				title: <Info text="接收数" />,
				key: '4',
				className: 'ta_c',
				dataIndex: 'acceptNo'
			}, {
				title: <Info text="展示数" />,
				key: '5',
				className: 'ta_c',
				dataIndex: 'displayNo'
			}, {
				title: <Info text="点击数" />,
				key: '6',
				className: 'ta_c',
				dataIndex: 'clickNo'
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
				<Table columns={this.state.columns} loading={this.props.tableData.loading} dataSource={data} pagination={false} />
			</div>
		);
	}
});

module.exports = App;