'use strict';
import React from 'react';
import { Row, Table, Tooltip, Form, Col } from 'antd';


import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';
import PushDetail from '../../push-detail';
import Chart from '../chart';
import Info from '../../info';
const formItemLayout = {
	labelCol: {
		span: 3
	},
	wrapperCol: {
		span: 21
	}
};
let App = React.createClass({
	getInitialState() {
		return {
			refresh: true,
			groupId: '',
			data: null
		};
	},
	componentWillUnmount: function () {

		if (document.querySelector('#pushRecord')) document.querySelector('#pushRecord').className = '';
		if (document.querySelector('#dataStat')) document.querySelector('#dataStat').className = '';
	},
	componentDidMount() {

		if (document.querySelector('#dataStat')) document.querySelector('#dataStat').className = 'active';
		if (document.querySelector('#pushRecord')) document.querySelector('#pushRecord').className = 'active';
		const groupId = utils.queryString('groupId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		const searchParam = {

			groupId: groupId,
			appId: appId
		};
		this.tableData(searchParam);
	},
	tableData(searchParam) {
		//getPushTask


		const self = this;
		let url = restapi.getTaskGroup;
		url = utils.makeUrl(url, searchParam);
		ajax.get(url, function (result) {
			self.setState({
				data: result.value,
				loading: false,
				pagination: false

			});



		});


	},
	getUserInfo(record) {
		let userTypeInfo = record.userTypeInfo;
		let userInfo = userTypeInfo.userFileName || (userTypeInfo.tagNames ? userTypeInfo.scopeDesc + ':' + userTypeInfo.tagNames : null);
		userInfo = userInfo ? '(' + userInfo + ')' : '';
		userInfo = userTypeInfo.userTypeDesc + userInfo;
		return userInfo;
	},
	render() {
		let self = this;
		const groupId = utils.queryString('groupId', window.location.href);
		
		let data = this.state.data;
		if (!data) return null;
		const offLine = this.state.data.pushTimeInfo && this.state.data.pushTimeInfo.offLine;
		const title = this.state.data.groupName;
		const content = this.state.data.pushType === 0 ? this.state.data.noticeBarInfo && this.state.data.noticeBarInfo.content : this.state.data.content;

		let appLogVos = data.appLogVos;
		let creatTime = '　';
		let account = '　';
		if (appLogVos && appLogVos.length) {
			creatTime = appLogVos[0].time;
			account = appLogVos[0].account;
		}
		let userTypeText = data.userTypeInfo && data.userTypeInfo.userTypeDesc || '　';
		const pushDetailData = {
			pushTypeDesc: data.pushTypeDesc,
			formItemLayout: formItemLayout,
			appName: data.appName || '　',
			groupType: data.groupType,
			title: title,
			appLogVos: data.appLogVos,
			detailType: 'data',
			content: content,
			startTime: data.pushTimeInfo && data.pushTimeInfo.startTime || '　',
			offLine: offLine,
			validTime: data.pushTimeInfo && data.pushTimeInfo.validTime,
			userTypeText: userTypeText,
			pushType: data.pushType,
			userName: account,
			creatTime: creatTime,
			scopeDesc: data.userTypeInfo && data.userTypeInfo.scopeDesc,
			tagIdsName: data.userTypeInfo && data.userTypeInfo.tagNames,
			userGroupDesc: data.userTypeInfo && data.userTypeInfo.userGroupDesc,
			userFileName: data.userTypeInfo && data.userTypeInfo.userFileName,
		};
		
		let columns = [{
			title: '分组任务ID',
			key: '0',
			className: 'ta_c',
			dataIndex: 'taskId'
		}, {
			title: '标题/备注',
			key: '1',
			className: 'ta_c',
			render(text) {
				if (text.length > 9) {
					return <Tooltip title={text}>
						<span className='ellipsis display_ib' style={{ width: 100 }}>{text}</span>
					</Tooltip>;
				} else {
					return text;
				}
			},
			dataIndex: 'title'
		}, {
			title: '内容',
			key: '2',
			className: 'ta_c',
			render(text) {
				if (text.length > 9) {
					return <Tooltip title={text}>
						<span className='ellipsis display_ib' style={{ width: 100 }}>{text}</span>
					</Tooltip>;
				} else {
					return text;
				}
			},
			dataIndex: 'content'
		}, {}, {
			title: '推送状态',
			key: '4',
			className: 'ta_c',
			dataIndex: 'status'
		}, {
			title: '推送用户数',
			key: '5',
			className: 'ta_c',
			render(text, record) {

				return record.taskStatics.pushedNo;
			},
			dataIndex: 'title'
		}, {
			title: <Info text="展示数" />,
			key: '6',
			className: 'ta_c',
			render(text, record) {

				return record.taskStatics.displayNo;
			},
			dataIndex: 'title'
		}, {
			title: <Info text="点击数" />,
			key: '7',
			className: 'ta_c',
			render(text, record) {

				return record.taskStatics.clickNo;
			},
			dataIndex: 'title'
		}, {
			title: '点击率',
			key: '8',
			className: 'ta_c',
			render(text, record) {

				return record.taskStatics.clickRate;
			},
			dataIndex: 'title'
		}, {
			title: '操作',
			key: '9',
			className: 'ta_c',
			render(text, record) {

				let appId = utils.queryString('appId', window.location.href);
				const url = '#/data/push/detail?appId=' + appId + '&taskId=' + record.taskId;
				if (appId === '0') {
					appId = window.ListApp[0].appId;
				}
				let createUrl = '#/create/push?copyTaskId=' + record.taskId + '&appId=' + record.appId + '&pushType=' + (record.pushType === '通知' ? 'notice' : 'message') + '&taskId=' + record.taskId;

				return (
					<div className="btn_wrap">

						<Tooltip title="推送详情">
							<a target='_blank' href={window.location.pathname + url}><i className="i_detail"></i></a>
						</Tooltip>
						<Tooltip title="选择推送">
							<a href={window.location.pathname + createUrl}><i className="i_copy"></i></a>
						</Tooltip>


					</div>
				);
			},
			dataIndex: 'title'
		}];
		if (data.groupType === '不同用户群') {
			columns[3] = {
				title: '目标用户',
				key: '3',
				className: 'ta_c',
				render(text, record) {
					let userInfo = self.getUserInfo(record);
					if (userInfo.length > 9) {
						return <Tooltip title={userInfo}>
							<span className='ellipsis display_ib' style={{ width: 100 }}>{userInfo}</span>
						</Tooltip>;
					} else {
						return userInfo;
					}

				},
				dataIndex: 'title'
			};
		}
		
		const pushTasks = data.pushTasks;
		let optionsData = [];
		let optionsX = [];
		if (pushTasks) {

			for (let i = 0; i < pushTasks.length; i++) {
				optionsData.push(pushTasks[i].taskStatics.clickRate);
				optionsX.push('分组' + (i + 1));
				// optionsX.push(pushTasks[i].taskId);
			}
		}

		const options = {
			data: optionsData,
			x: optionsX,
			pushTasks: pushTasks,
			rate: optionsData,
			bgcolor: '#18A9FF',
			height: 300
		};
		return (
			<div>
				<Row className="content_toolbar">
					<Col span="24">
						<div className="title">
							<span className="border"></span>
							分组ID：{groupId}
							<span className="data_tit">{title}</span>
						</div>
					</Col>
				</Row>
				<PushDetail type='groupPush' pushDetailData={pushDetailData} />

				<div id="detailTable" className="chart_table" style={{ marginTop: 10, paddingBottom: 50 }}>
					<Table refresh={this.state.refresh}
						columns={columns}
						loading={this.state.loading}
						dataSource={data.pushTasks}
						pagination={this.state.pagination} />

					{pushTasks && data.pushType === '通知' ? <Chart type="groupPush" getUserInfo={this.getUserInfo} options={options} chartData={this.props.chartData} pushType={this.props.pushType} /> : null}
				</div>
			</div>
		);
	}
});

App = Form.create()(App);


module.exports = App;
// <ChartTable tableData={this.state.tableData} chartData={this.state.chartData} pushType={data.pushType} />
