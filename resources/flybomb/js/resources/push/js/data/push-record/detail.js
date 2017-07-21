'use strict';
import React from 'react';
import { Row, Form, Col, Button } from 'antd';

import { Link } from 'react-router';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';
import ChartTable from '../chart-table';
import PushDetail from '../../push-detail';
import DetailModal from './modal';
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
			taskId: '',
			displayDetail: [],
			statisticsType: 1,
			data: {}
		};
	},
	componentWillUnmount: function () {

		if (document.querySelector('#pushRecord')) document.querySelector('#pushRecord').className = '';
		if (document.querySelector('#dataStat')) document.querySelector('#dataStat').className = '';
	},
	componentDidMount() {

		if (document.querySelector('#dataStat')) document.querySelector('#dataStat').className = 'active';
		if (document.querySelector('#pushRecord')) document.querySelector('#pushRecord').className = 'active';
		const taskId = utils.queryString('taskId', window.location.href);
		const cronTaskId = utils.queryString('cronTaskId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		const searchParam = {

			appId: appId
		};
		if (taskId) {
			searchParam.taskId = taskId;
		}
		if (cronTaskId) {
			searchParam.cronTaskId = cronTaskId;
		}
		this.tableData(searchParam);

		let self = this;
		ajax.get(restapi.getAppInfo + '?appId=' + appId, function (result) {

			self.setState({
				insightAuth: result.value.insightAuth
			});
		});

	},
	refresh() {
		this.setState({
			refresh: !this.state.refresh
		});
	},
	tableData(searchParam) {
		//getPushTask


		const self = this;
		let url = restapi.getPushTask;
		if (searchParam.cronTaskId) {
			url = restapi.cronTaskGet;
		}
		url = utils.makeUrl(url, searchParam);
		ajax.get(url, function (result) {
			console.log(result);
			self.setState({
				data: result.value
			});

			if (searchParam.cronTaskId) {
				return;
			}
			let getTaskStaticsUrl = restapi.getTaskStatics;
			getTaskStaticsUrl = utils.makeUrl(getTaskStaticsUrl, searchParam);
			ajax.get(getTaskStaticsUrl, function (result) {
				result.value.key = 1;
				self.setState({
					chartData: result.value,
					tableData: {
						data: [result.value],
						loading: false,
						pagination: false
					}
				});

			});
		});


	},
	taskOverview() {

		if (this.state.taskOverview) {
			return;
		}
		const taskId = utils.queryString('taskId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		const self = this;
		let data = {
			taskId: taskId,
			appId: appId
		};
		ajax.post(restapi.taskOverview, data, function (result) {
			self.setState({
				taskOverview: result.value
			});
		});
	},
	setStatisticsType(type) {
		this.setState({
			statisticsType: type
		});
	},
	listTaskMaterialStatisticsDetail(searchParam) {
		this.setState({
			type: 2,
			visible: true
		});
		this.taskOverview();
		this.displayDetail();
		const taskId = utils.queryString('taskId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		const self = this;
		let data = {
			taskId: taskId,
			appId: appId,
			index: (searchParam && searchParam.index) || 1,
			statisticsType: this.state.statisticsType
		};
		ajax.post(restapi.listTaskMaterialStatisticsDetail, data, function (result) {
			self.setState({
				listTaskMaterialStatisticsDetail: result.value.result,
				paginationStatistics: {
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
							index: current
						};
						self.listTaskMaterialStatisticsDetail(searchParam);

					}
				}
			});
		});
	},
	displayDetail() {
		const self = this;
		const taskId = utils.queryString('taskId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		let data = {
			taskId: taskId,
			appId: appId,
			index: 1,
			statisticsType: this.state.statisticsType
		};
		ajax.post(restapi.displayDetail, data, function (result) {
			self.setState({
				displayDetail: result.value
			});
		});
	},
	listTaskMaterialDetail(searchParam) {

		this.setState({
			type: 1,
			visible: true
		});

		this.taskOverview();
		const taskId = utils.queryString('taskId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		const self = this;
		let data = {
			taskId: taskId,
			appId: appId,
			index: (searchParam && searchParam.index) || 1
		};
		ajax.post(restapi.listTaskMaterialDetail, data, function (result) {
			self.setState({
				listTaskMaterialDetail: result.value.result,
				paginationDetail: {
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
							index: current
						};

						self.listTaskMaterialDetail(searchParam);

					}
				}
			});
		});
	},
	setVisible() {
		this.setState({
			visible: !this.state.visible
		});
	},
	render() {

		const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值
		const taskId = utils.queryString('taskId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);

		let perssion = document.querySelector('#userPerssion').innerHTML;//来自main.js里的设置

		if (!perssion) {//dom里的数据没拉取到的时候重新来一次
			this.refresh();
			return null;
		}
		perssion = JSON.parse(perssion);
		if (!perssion) {//dom里的数据没拉取到的时候重新来一次
			this.refresh();
			return null;
		}


		if (taskId && !this.state.tableData) return null;
		let notificationText = '';
		if (this.state.data.advanceInfo) {
			const notificationType = this.state.data.advanceInfo.notificationType;

			const arr = [];
			for (let i in notificationType) {
				if (notificationType[i]) {
					if (i === 'vibrate') {
						arr.push('震动');
					}
					if (i === 'lights') {

						arr.push('闪灯');
					}
					if (i === 'sound') {

						arr.push('声音');
					}
				}
			}
			notificationText = arr.join('+');

			if (arr.length === 0) {
				notificationText = '无';
			}

		}
		let fixDisplayTime = this.state.data.advanceInfo && this.state.data.advanceInfo.fixStartDisplayTime + ' 至 ' + this.state.data.advanceInfo.fixEndDisplayTime;
		if (this.state.data.advanceInfo && !this.state.data.advanceInfo.fixDisplay) {
			fixDisplayTime = '关闭';
		}
		const offLine = this.state.data.pushTimeInfo && this.state.data.pushTimeInfo.offLine;
		const title = this.state.data.pushType === 0 ? this.state.data.noticeBarInfo && this.state.data.noticeBarInfo.title : this.state.data.title;
		const content = this.state.data.pushType === 0 ? this.state.data.noticeBarInfo && this.state.data.noticeBarInfo.content : this.state.data.content;
		const noticeExpandType = this.state.data.noticeExpandInfo && this.state.data.noticeExpandInfo.noticeExpandType;
		let noticeExpandTypeText = '　';
		if (noticeExpandType === 0) {
			noticeExpandTypeText = '标准';
		}
		if (noticeExpandType === 1) {
			noticeExpandTypeText = <div>文本<div className="break_word lh15 mt5 mb5 pr40">{this.state.data.noticeExpandInfo.noticeExpandContent}</div></div>;
		}
		if (noticeExpandType === 2) {
			noticeExpandTypeText = <div>大图<div className="break_word lh15 mt5 mb5 pr40">
				<img width="225" height="144" src={this.state.data.noticeExpandInfo.noticeExpandImgUrl} />
			</div></div>;
		}
		if (noticeExpandType === 3) {
			noticeExpandTypeText = 'ACT文件';
		}
		let data = this.state.data;

		const clickTypeInfo = data.clickTypeInfo;
		const clickTypeInfoText = [];
		if (clickTypeInfo) {
			const params = clickTypeInfo.parameters;
			const clickType = clickTypeInfo.clickType;
			//点击动作的文本
			if (clickType == 1 || clickType == 2 || clickType == 3) {
				let text = clickTypeInfo.activity || clickTypeInfo.url || clickTypeInfo.customAttribute || '';
				if (clickType === 1) {
					text = '页面地址：' + text;
				}
				clickTypeInfoText.push(<div className="break_word" key={text}>{text}</div>);
			}
			if (clickType != 2 && clickType != 3) {
				for (let j in params) {
					if (j != 'undefined') {
						clickTypeInfoText.push(<div key={j}><p>参数：{j.trim()}</p><p className="break_word" >值：{String(params[j]).trim()}</p></div>);
					}

				}
			}
		}

		const advanceInfo = data.advanceInfo;
		let distinctTitle = [];
		if (advanceInfo && advanceInfo.distinctTaskList) {
			distinctTitle = advanceInfo.distinctTaskList.map(function (k, key) {

				return <div key={key}>{k.taskId}  {k.title}</div>;
			});
		}

		let appLogVos = data.appLogVos;
		let creatTime = '　';
		let account = '　';
		if (appLogVos && appLogVos.length) {
			creatTime = appLogVos[0].time;
			account = appLogVos[0].account;
		}
		let userTypeText = data.userTypeInfo && data.userTypeInfo.userTypeDesc || '　';
		let cronTime=data.cronTimeInfo && data.cronTimeInfo.time;
		let cronWeek=data.cronTimeInfo && data.cronTimeInfo.week;
		cronWeek= cronWeek && cronWeek.split(',');
		const pushDetailData = {
			pushTypeDesc: data.pushTypeDesc,
			formItemLayout: formItemLayout,
			appName: data.appName || '　',
			noticeBarType: data.noticeBarInfo && data.noticeBarInfo.noticeBarType,
			noticeBarImgUrl: data.noticeBarInfo && data.noticeBarInfo.noticeBarImgUrl,
			title: title,
			appLogVos: data.appLogVos,
			personalPush: data.sourceType === 3 ? true : false,//个性化推送
			sourceTypeDesc: data.sourceTypeDesc,
			detailType: 'data',
			content: content,
			noticeExpandTypeText: noticeExpandTypeText,
			clickTypeText: data.clickTypeInfo && data.clickTypeInfo.clickTypeDesc || '　',

			clickPackage: data.clickTypeInfo && data.clickTypeInfo.clickPackage,
			startTime: data.pushTimeInfo && data.pushTimeInfo.startTime || '　',
			offLine: offLine,
			validTime: data.pushTimeInfo && data.pushTimeInfo.validTime,
			userTypeText: userTypeText,
			distinct: data.advanceInfo && (data.advanceInfo.distinct),
			fixSpeed: data.advanceInfo && data.advanceInfo.fixSpeed,
			fixSpeedRate: data.advanceInfo && data.advanceInfo.fixSpeedRate,
			fixDisplay: data.advanceInfo && data.advanceInfo.fixDisplay,
			fixDisplayTime: fixDisplayTime,
			msgCache: data.advanceInfo && data.advanceInfo.msgCache,
			msgCacheStatus: data.advanceInfo && data.advanceInfo.msgCacheStatus,
			suspend: data.advanceInfo && data.advanceInfo.suspend,
			clearNoticeBar: data.advanceInfo && data.advanceInfo.clearNoticeBar,
			notificationTypeText: notificationText,
			noticeImgUrl: data.advanceInfo && data.advanceInfo.noticeImgUrl,
			black: data.advanceInfo && data.advanceInfo.black,
			blackList: data.advanceInfo && data.advanceInfo.pushBlackList,
			pushType: data.pushType,
			userName: account,
			creatTime: creatTime,
			clickTypeInfoText: clickTypeInfoText,
			scopeDesc: data.userTypeInfo && data.userTypeInfo.scopeDesc,
			tagIdsName: data.userTypeInfo && data.userTypeInfo.tagNames,
			userGroupDesc: data.userTypeInfo && data.userTypeInfo.userGroupDesc,
			userFileName: data.userTypeInfo && data.userTypeInfo.userFileName,
			pushPercent: data.userTypeInfo && data.userTypeInfo.pushPercent,
			distinctTitle: distinctTitle,
			cronTime:cronTime,
			cronWeek:cronWeek,
			articleLength: data.pushRuleInfo && data.pushRuleInfo.articleLength,
			freshnessNew: data.pushRuleInfo && data.pushRuleInfo.freshnessNew,
			listMaterial: data.pushRuleInfo && data.pushRuleInfo.pushMaterialInfos,
			listSceneTag: (data.pushRuleInfo && data.pushRuleInfo.scheneTagName) || '无',
		};
		return (
			<div>
				<Row className="content_toolbar">
					<Col span="14">
						<div className="title">
							<span className="border"></span>
							任务ID：{taskId}
							<span className="data_tit">{title}</span>
						</div>
					</Col>
					<Col span="10" className="ta_r">
						{data.sourceType === 3 &&
							<Button type="primary" onClick={this.listTaskMaterialDetail} size="large">内容分配详情</Button>
						}
						{data.sourceType === 3 &&
							<Button className="ml10" type="primary" onClick={this.listTaskMaterialStatisticsDetail} size="large">推送数据详情</Button>
						}
						{data.pushType === 0 && (this.state.insightAuth || userAuth > 1) && !cronTime &&

							<Link to={'/analyze/push/attr?appId=' + appId + '&taskId=' + taskId}>
								<Button className="ml10" type="primary" onClick={this.handleSubmit} size="large">推送属性分析</Button>
							</Link>

						}
					</Col>
				</Row>
				<PushDetail pushDetailData={pushDetailData} />
				{taskId &&
					<div className="chart_table">



						<ChartTable tableData={this.state.tableData} chartData={this.state.chartData} pushType={data.pushType} />

					</div>
				}
				{this.state.visible &&
					<DetailModal
						setStatisticsType={this.setStatisticsType}
						displayDetail={this.state.displayDetail}
						taskId={taskId}
						title={title}
						paginationStatistics={this.state.paginationStatistics}
						paginationDetail={this.state.paginationDetail}
						setVisible={this.setVisible}
						listTaskMaterialDetail={this.state.listTaskMaterialDetail}
						taskOverview={this.state.taskOverview}
						listTaskMaterialStatisticsDetail={this.state.listTaskMaterialStatisticsDetail}
						getStatisticsDetail={this.listTaskMaterialStatisticsDetail}
						type={this.state.type}
						visible={this.state.visible}></DetailModal>
				}
			</div>
		);
	}
});

App = Form.create()(App);


module.exports = App;