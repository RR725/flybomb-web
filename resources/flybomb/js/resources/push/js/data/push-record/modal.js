'use strict';
import React from 'react';
import { Row, Col, Modal, Form, Table, Select, Button, message } from 'antd';

import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';
let FormItem = Form.Item;
import EchartsReact from 'echarts-for-react';
let DetailModal = React.createClass({
	getInitialState() {
		return {
		};
	},
	getOptions() {
		let displayDetail = this.props.displayDetail;
		let xData = [];
		let yData = [];
		displayDetail.map(function(opt) {
			xData.push(opt.createTime);
			yData.push(opt.displayNum);

		});
		let option = {
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['展示数']
			},
			title: {
				text: '展示数'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},

			xAxis: {
				type: 'category',
				data: xData
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: '展示数',
					type: 'line', 
					itemStyle: {
						normal: {
							color: '#387aff',
						}
					},
					data: yData
				}
			]
		};
		return option;
	},
	getColumnsContent() {
		return [{
			title: '序号',
			key: '0',
			className: 'ta_c',
			dataIndex: 'id'
		}, {
			title: '内容ID',
			key: '1',
			className: 'ta_c',
			dataIndex: 'contentId'
		}, {
			title: '通知栏标题 ',
			key: '2',
			className: 'ta_c td_appname',
			dataIndex: 'pushTitle'
		}, {
			title: '通知栏内容',
			key: '3',
			className: 'ta_c td_appname',
			dataIndex: 'pushContent'
		}, {
			title: '目标用户数',
			key: '4',
			className: 'ta_r',
			dataIndex: 'targetNum'
		}, {
			title: '匹配场景目标数',
			key: '5',
			className: 'ta_r',
			dataIndex: 'scenePushNum'
		}, {
			title: ' 常规推送目标数',
			key: '6',
			className: 'ta_r',
			dataIndex: 'regularTargetNum'
		}];
	},
	handleOk() {
		// ajax.post();
		const self = this;
		const taskId = utils.queryString('taskId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		let data = {
			appId: appId,
			taskId: taskId
		};
		if (this.state.confirmPush && this.props.type === 1) {
			ajax.post(restapi.confirmThePush, data, function(result) {
				if (result.value) {
					message.success('推送成功');
					self.handleCancel();
				} else {

					message.success('推送失败');
				}

			});
		} else {
			this.handleCancel();
		}
	},
	onSelect(value) {
		this.props.setStatisticsType(value);
	},
	onSearch() {

		this.props.getStatisticsDetail();
	},
	getColumnsOverview() {
		let data= [{
			title: '',
			key: '0',
			className: 'ta_c',
			dataIndex: 'statisticsTypeDesc'
		}, {
			title: '目标数',
			key: '1',
			className: 'ta_r',
			dataIndex: 'targetNum'
		}, {
			title: '推送文章数',
			key: '2',
			className: 'ta_r',
			dataIndex: 'pushArticleNum'
		}];
		let data2=[{
			title: '推送数',
			key: '3',
			className: 'ta_r',
			dataIndex: 'pushNum'
		}, {
			title: '展示数',
			key: '4',
			className: 'ta_r',
			dataIndex: 'displayNum'
		}, {
			title: '点击数',
			key: '5',
			className: 'ta_r',
			dataIndex: 'clickNum'
		}, {
			title: '点击率',
			key: '6',
			className: 'ta_r',
			dataIndex: 'clickRate'
		}];
		if(this.props.type===2){
			data=data.concat(data2);
		}
		return data;

	},
	componentDidMount() {

		const self = this;
		const taskId = utils.queryString('taskId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		let data = {
			appId: appId,
			taskId: taskId
		};
		if (this.props.type === 1) {
			ajax.post(restapi.confirmPush, data, function(result) {
				self.setState({
					confirmPush: result.value
				});
			});
		}

	},

	getColumnsData() {
		return [{
			title: '内容ID',
			key: '0',
			className: 'ta_c',
			dataIndex: 'contentId'
		}, {
			title: '通知栏标题',
			key: '1',
			className: 'ta_c td_appname',
			dataIndex: 'pushTitle'
		}, {
			title: '通知栏内容',
			key: '2',
			className: 'ta_c td_appname',
			dataIndex: 'pushContent'
		}, {
			title: '目标用户数',
			key: '3',
			className: 'ta_r',
			dataIndex: 'targetNum'
		}, {
			title: '推送数',
			key: '4',
			className: 'ta_r',
			dataIndex: 'pushNum'
		}, {
			title: '展示数',
			key: '5',
			className: 'ta_r',
			dataIndex: 'displayNum'
		}, {
			title: '点击数',
			key: '6',
			className: 'ta_r',
			dataIndex: 'clickNum'
		}, {
			title: '点击率',
			key: '7',
			className: 'ta_r',
			dataIndex: 'clickRate'
		}];
	},
	handleCancel() {
		this.props.setVisible();
	},
	render() {
		let type = this.props.type;
		let title = type === 1 ? '内容分配详情' : '推送数据详情';
		let columns = type === 1 ? this.getColumnsContent() : this.getColumnsData();
		let okText = (this.state.confirmPush && type === 1) ? '确认推送' : '确认';
		let dataSource = type === 1 ? this.props.listTaskMaterialDetail : this.props.listTaskMaterialStatisticsDetail;
		let pagination = type === 1 ? this.props.paginationDetail : this.props.paginationStatistics;
		return (
			<Modal
				width={1200}
				onCancel={this.handleCancel}
				onOk={this.handleOk}
				okText={okText}
				cancelText='取消'
				title={title}
				visible={this.props.visible}>
				<div className="pl10 pr10 detail_modal">
					<Row className="content_toolbar">
						<Col span="14">
							<div className="title">
								<span className="border"></span>
								任务ID：{this.props.taskId}
								<span className="data_tit">{this.props.title}</span>
							</div>
						</Col>
					</Row>
					<Row className="content_toolbar detail_title mt20">
						<Col span="14">
							<div className="title">
								总体概览
						</div>
						</Col>
					</Row>
					<Table pagination={false} columns={this.getColumnsOverview()} dataSource={this.props.taskOverview || []}></Table>

					<Row className="content_toolbar detail_title mt20">
						<Col span="14">
							<div className="title">
								{title}
							</div>
						</Col>
					</Row>
					{type === 2 &&
						<div>
							<FormItem>
								<Select defaultValue="1" style={{ width: 200 }} onChange={this.onSelect}>
									<Select.Option value="1">全部</Select.Option>
									<Select.Option value="2">场景推送</Select.Option>
									<Select.Option value="3">常规推送</Select.Option>
								</Select>

								<Button className="ml10" type="primary" onClick={this.onSearch} size="large">查询</Button>
							</FormItem>
							<EchartsReact option={this.getOptions()} />
						</div>
					}


					<Table pagination={pagination} columns={columns} dataSource={dataSource || []}></Table>
				</div>


			</Modal>
		);
	}
});



module.exports = DetailModal;
