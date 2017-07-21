'use strict';
import React from 'react';

import { Table } from 'antd';
import Chart from './chart';


import Info from '../info';



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
	render() {
		let pushType = this.props.pushType;
		let dataSource = this.props.tableData.data;
		if (pushType) {//透传消息
			dataSource.map(function (obj) {
				obj.displayNo = 0;
				obj.clickNo = 0;
			});
		}
		const data = this.props.chartData;
		if (data) {

			var options = {
				data: [data.targetNo, data.validNo, data.pushedNo, data.acceptNo, data.displayNo, data.clickNo],
				x: ['目标数', '有效数', '推送数', '接收数', '展示数', '点击数'],
				rate: [0, data.validRate, data.pushedRate, data.acceptRate, data.displayRate, data.clickRate],
				bgcolor: '#18A9FF',
				height: 300
			};
		}
		if (this.props.pushType) {
			options.data = [data.targetNo, data.validNo, data.pushedNo, data.acceptNo, 0, 0];
			options.rate = [0, data.validRate, data.pushedRate, data.acceptRate, '0.0%', '0.0%'];
		}
		return (
			<div style={{ marginLeft: 80 }} className={this.props.chartData ? '' : 'push_data'}>
				{data ? <Chart options={options} chartData={this.props.chartData} pushType={this.props.pushType} /> : null}
				<div id="detailTable" className='detail_table'>
					<Table refresh={this.state.refresh}
						columns={this.state.columns}
						loading={this.props.tableData.loading}
						dataSource={dataSource}
						pagination={this.props.tableData.pagination} />
				</div>

			</div>
		);
	}
});

module.exports = App;