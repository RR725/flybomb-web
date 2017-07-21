'use strict';
import React from 'react';

import { Table} from 'antd';
import KpiInfo from './kpi_info';



const App = React.createClass({
	getInitialState() {
		return {
			columns: [{
				title: '日期',
				key: '0',
				className: 'ta_c',
				dataIndex: 'date'
			}, {
				title: <KpiInfo text='推送率' />,
				key: '1',
				className: 'ta_c',
				dataIndex: 'pushRate'
			}, {
				title: <KpiInfo text='送达率' />,
				key: '2',
				className: 'ta_c',
				dataIndex: 'deliverRate'
			}, {
				title: <KpiInfo text='到达率' />,
				key: '3',
				className: 'ta_c',
				dataIndex: 'arriveRate'
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