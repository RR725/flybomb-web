'use strict';
import React from 'react';

import { Table, Modal, Row, Col } from 'antd';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';


const ResourceLibTable = React.createClass({

	getInitialState() {
		return {
			uploadTime: '',
			title: '',
			total: ''
		};
	},
	componentDidMount() {



	},
	getTable(record) {

		const appId = utils.queryString('appId', window.location.href);
		let data = {
			index: record.index || 1,
			materialId: record.id,
			appId: appId
		};
		let self = this;
		ajax.post(restapi.materialListDetail, data, function (result) {
			self.setState({
				detailData: result.value.result,
				pagination: {
					// showQuickJumper:true,
					total: result.value.amount,
					current: data.index,
					pageSize: 10,
					showSizeChanger: false,
					// onShowSizeChange(current, pageSize) {
					// 	console.log('Current: ', current, '; PageSize: ', pageSize);
					// },
					onChange(current) {
						let searchParam = {
							id: record.id,
							index: current
						};
						self.setState({
							current: current
						});
						self.getTable(searchParam);

					}
				}
			});
		});
	},
	getDetail(record) {
		this.setState({
			visible: true,
			detailData: [],
			uploadTime: record.uploadTime,
			title: record.title,
			total: record.total
		});
		this.getTable(record);
	},
	handleCancel() {
		this.setState({
			visible: false
		});
	},
	detailColumns() {
		return [{
			title: '序号',
			key: '0',
			dataIndex: 'id',
			className: 'ta_l'
		}, {
			title: '上传时间',
			className: 'ta_l',
			key: '1',
			dataIndex: 'uploadTime'
		}, {
			title: '内容ID',
			className: 'ta_l',
			key: '2',
			dataIndex: 'contentId'
		}, {
			title: '通知栏标题',
			className: 'ta_l td_appname',
			key: '3',
			dataIndex: 'title'
		}, {
			title: '通知栏内容',
			className: 'ta_l td_appname',
			key: '4',
			dataIndex: 'content'
		}];
	},
	render() {
		const self = this;
		const columns = [{
			title: '序号',
			key: '0',
			dataIndex: 'id',
			className: 'ta_l'
		}, {
			title: '上传时间',
			className: 'ta_l',
			key: '1',
			dataIndex: 'uploadTime'
		}, {
			title: '备注',
			className: 'ta_l td_appname',
			key: '2',
			dataIndex: 'title'
		}, {
			title: '内容数',
			className: 'ta_r',
			key: '3',
			dataIndex: 'total'
		}, {
			title: '状态',
			className: 'ta_r',
			key: '4',
			dataIndex: 'statusDesc'
		}, {
			title: '操作',
			className: 'ta_c',
			key: '5',
			render(text, record) {
				return (
					<div>
						<a href='javascript:;' onClick={() => { self.getDetail(record); }} >查看</a>


					</div>
				);
			},
			dataIndex: ''
		}];
		return (<div>
			<Table className="home_table" columns={columns} loading={this.props.tableData.loading} dataSource={this.props.tableData.data} pagination={this.props.tableData.pagination} />

			<Modal
				width={1000}
				onCancel={this.handleCancel}
				onOk={this.handleCancel}
				okText='确定'
				cancelText='取消'
				title='资源详情'
				visible={this.state.visible}>
				<div className="fs14">
					<div className="lh25">
						<Row>
							<Col className="ta_r pr10" span="3">备注</Col>
							<Col span="21">{this.state.title}</Col>
						</Row>
						<Row>
							<Col className="ta_r pr10" span="3">上传时间</Col>
							<Col span="21">{this.state.uploadTime}</Col>
						</Row>
						<Row>
							<Col className="ta_r pr10" span="3">内容数</Col>
							<Col span="21">{this.state.total}</Col>
						</Row>
					</div>
					<Table pagination={this.state.pagination} columns={this.detailColumns()} dataSource={this.state.detailData} />
				</div>

			</Modal>
		</div>
		);
	}
});

module.exports = ResourceLibTable;