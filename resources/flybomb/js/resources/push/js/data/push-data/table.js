'use strict';
import React from 'react';

import { Table, Tooltip } from 'antd';

import Info from '../../info';




const App = React.createClass({

	getInitialState() {

		return {
			columns: [{
				title: '推送时间',
				key: '0',
				width: 100,
				className: 'ta_c',
				dataIndex: 'pushTime'
			}, {
				title: '推送标题',
				key: '1',
				dataIndex: 'title',
				className: 'td_appname '
			},
			{},
			{
				title: '任务ID',
				key: '3',
				className: 'ta_c',
				dataIndex: 'taskId'
			}, {
				title: '状态',
				key: '4',
				className: 'ta_c',
				dataIndex: 'status'
			}, {
				title: <Info text="目标数" />,
				key: '5',
				className: 'ta_r',
				dataIndex: 'targetNo'
			}, {
				title: <Info text="有效数" />,
				key: '6',
				className: 'ta_r',
				dataIndex: 'validNo'
			}, {
				title: <Info text="推送数" />,
				key: '7',
				className: 'ta_r',
				dataIndex: 'pushedNo'
			}, {}, {
				title: <Info text="接收数" />,
				key: '9',
				className: 'ta_r',
				dataIndex: 'acceptNo'
			}, {}, {
				title: <Info text="展示数" />,
				key: '11',
				className: 'ta_r',
				dataIndex: 'displayNo'
			}, {
				title: <Info text="点击数" />,
				key: '12',
				className: 'ta_r',
				dataIndex: 'clickNo'
			}, {}, {}, {
				title: '操作',
				className: 'ta_l',
				key: '15',
				render(text, record) {

					const appId = record.appId;
					const url = '#/data/push/detail?appId=' + appId + '&taskId=' + record.taskId;


					return (
						<div className="btn_wrap">
							{record.scheduled &&
								<Tooltip title="推送详情">
									<a target='_blank' href={window.location.pathname + url}><i className="i_detail"></i></a>
								</Tooltip>
							}

						</div>
					);
				},
				dataIndex: ''
			}],
			refresh: false
		};
	},

	render() {

		let data = this.props.tableData.data;

		const appName = this.props.appName;

		let columns = this.state.columns;

		columns[2] = appName;
		let type = this.props.type;//平台管理里的推送详情共用这个不表格
		if (type === 'platform') {
			columns[0] = {};
			columns[1] = {};
			columns[8] = {
				title: <Info text="联网数" />,
				key: '8',
				className: 'ta_r',
				dataIndex: 'onlineNo'
			};
			columns[10] = {
				title: <Info text="到达应用数" />,
				key: '10',
				className: 'ta_r',
				dataIndex: 'recvNo'
			};
			columns[13] = {
				title: <Info text="划掉数" />,
				key: '13',
				className: 'ta_r',
				dataIndex: 'slipNo'
			};
			columns[14] = {
				title: <Info text="已卸载数" />,
				key: '14',
				className: 'ta_r',
				dataIndex: 'unregNo'
			};
		}
		return (
			<div className="push_data">
				<div id="detailTable" className='detail_table'>
					<Table columns={columns} loading={this.props.tableData.loading} dataSource={data} pagination={this.props.tableData.pagination} />
				</div>
			</div>
		);
	}
});

module.exports = App;