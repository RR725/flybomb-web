'use strict';
import React from 'react';
import {
	Button, Row, Col, message, Form, Input
}
	from 'antd';


const FormItem = Form.Item;

let _userGroupName = null;
let _userGroupDesc = null;

import ProductTypeApp from '../producttype-app'; //产品类型和应用的下拉列表

import restapi from '../../lib/url-model';
import ajax from '../../components/ajax';
import utils from '../../lib/utils';

import ValidateTime from './component/valid-time';
import PushTimeType from './component/push-time-type';  //推送时间
import UserType from './component/user-type';  //指定用户
import AdvanceSetting from './component/advance-setting';  //高级选项
import PushModal from './component/modal';  //弹出层
import Distinct from './component/distinct';  //消息去重
import PreviewPush from './component/preview-push';//预推测试



import Reflux from 'reflux';

var actions = Reflux.createActions([
	'message'
]);


var store = Reflux.createStore({
	listenables: [actions],
	jsonData: null
});



const formItemLayout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 20
	}
};



let AddAppTask = React.createClass({
	getInitialState() {
		return {
			offLine: 1,
			cronWeek: [1],//定时任务，默认周一
			distinctId: [],
			displayDistinct: 'none',
			displayBlackList: 'none',
			noticeBarType: 0, //通知栏样式
			noticeExpandType: 0, //展开方式
			clickType: 0, //点击动作
			userType: 2, //指定用户
			scope: 0,//并集or交集
			visible: false,
			pushReviewNumber: '...',
			distinct: 0,//消息去重
			// black: 1,//是否使用黑名单
			blackList: [],
			fixSpeed: 0,//是否定速推送
			netType: 0,//联网方式
			fixDisplay: 0,//是否定时展示
			pushTimeType: 0, //推送时间
			distinctTitle: []
		};
	},
	delParams(params, current) {//重新定义上传参数格式后，删除初始的参数
		for (let i in current) {
			delete params[i];

		}
	},
	clearUserGroup(currentId, id) {
		if (currentId == id) {
			let data = {};
			data.userGroupName = null;
			data.userGroupDesc = null;
			_userGroupName = null;
			_userGroupDesc = null;
			this.setState(data);
			this.props.form.setFieldsValue({
				userGroupId: null
			});
		}
	},
	changeRadio(e, type) {
		const data = {};
		if (type === 'userGroupAuth') {
			data.permission = e.target.permission;
		}

		if (type === 'black') {
			data.displayBlackList = '';
		}
		var name = e.target.name;
		var value = e.target.value;
		data[name] = value;


		if (name === 'userGroupId') {
			data.userGroupName = e.target.label;
			data.userGroupDesc = e.target.expression;
			_userGroupName = e.target.label;
			_userGroupDesc = e.target.expression;
		}
		if (name == 'distinct' && value == 0) {
			data.distinctTitle = [];
		}
		this.setState(data);
		this.props.form.setFieldsValue(data);

	},

	getAppName(appId) {
		let appName = '全部应用';
		const allApp = ProductTypeApp.allApp;//拿到所有应用
		if (allApp) {
			for (let i = 0; i < allApp.length; i++) {
				if (allApp[i].appId == appId) {
					appName = allApp[i].name;
				}
			}
		}
		this.setState({
			appName: appName
		});
	},
	componentWillReceiveProps() {//切换了应用之后要重新拉取数据

		const appId = utils.queryString('appId', window.location.href);


		if (this.state.appId && appId !== this.state.appId) {//切换了应用之后要重新拉取数据
			this.getAppName(appId);
			this.setState({
				pushReviewNumber: '...',
				appId: appId
			});
			this.getAppInfo();

			this.getBlackList();
		}
	},
	changeCheckbox(distinctId, distinctTitle) {
		this.setState({
			distinctId: distinctId,
			distinctTitle: distinctTitle
		});
	},

	changeBlack(blackList) {
		let json = {
			blackList: blackList
		};
		let select = blackList.filter(function (data) {
			return data.choose;
		});
		if (!select.length) {
			json.displayBlackList = '';
		} else {
			json.displayBlackList = 'none';
		}
		this.setState(json);
	},
	handleOk() {
		const self = this;

		const href = window.location.href;
		let search = href.split('#');
		const pushType = utils.queryString('pushType', search[1]);
		const appId = utils.queryString('appId', window.location.href);
		const data = {
			appId: appId,
			json: JSON.stringify(this.state.requestData)
		};
		const pushReviewNumber = this.state.pushReviewNumber;
		if (pushReviewNumber === '0') {
			message.error('预计推送人数为0，不可以创建推送任务');
			return;
		}
		// if(pushReviewNumber==='...'){
		// 	message.error('预计推送人数查询中...');
		// 	return;
		// }
		if (this.state.submiting) return;
		this.setState({
			submiting: true
		});
		let url = restapi.addNews;
		let hash = '/data/push/record?appId=' + appId;
		if (pushType === 'timing') {
			url = restapi.cronTaskAddNews;
			hash = '/data/push/timing?appId=' + appId;
		}
		ajax.post(url, data, function () {
			message.success('提交成功');
			window.location.hash = hash;
		}, function () {
			self.setState({
				submiting: false
			});
		});
	},
	selectCronWeek(weeks) {
		this.setState({
			cronWeek: weeks
		});
	},
	handleSubmit(e, saveData, callback) {
		let self = this;
		if (saveData === 'deal') {//如果是跳转到用户群页面，设置一个状态
			this.setState({
				jumpUserGroup: true
			});
		}
		const href = window.location.href;
		let search = href.split('#');
		const urlPushType = utils.queryString('pushType', search[1]);
		if (this.state.permission === false && saveData !== 'deal' && this.props.form.getFieldValue('userType') === 1 && this.props.form.getFieldValue('userGroupId')) {
			message.error('用户群标签没权限');
			return;
		}
		this.props.form.validateFields((errors, values) => {

			const userType = values.userType;

			if (saveData === 'deal') {

				values.showAdvanceStatus = self.state.showAdvanceStatus;
				store.jsonData = values;
				exports.jsonData = values;

				return;
			}
			const distinctId = self.state.distinctId;

			if (values.distinct && distinctId.length === 0) {

				self.setState({
					displayDistinct: ''
				});
				return;
			}

			for (let i in values) {
				if (i.indexOf('distinctId') > -1) {
					delete values[i];
				}
			}
			if (distinctId) {
				values.distinctId = distinctId.join(',');

			}
			if (values.distinct && !distinctId) {//选了去重，但是没有去重列表
				return;
			}
			let blackId = [];
			for (let i in values) {
				if (i.indexOf('blackId') > -1 && values[i]) {
					let id = i.split('blackId')[1];
					blackId.push(id);
					delete values[i];
				}
			}
			values.blackId = blackId.join(',');
			if (values.userType === 5 && !values.tagIds) {//选了标签，但是该应用无标签
				return;
			}
			if (userType === 1 && (!values.userGroupId || values.userGroupId === 'null')) {//选了用户群，但是没有勾选列表
				return;
			}


			values.target = values['target' + userType];
			// delete values['target' + userType];
			values.userFilePath = values['userFilePath' + userType];
			delete values['userFilePath' + userType];
			if (values.target === '') {
				delete values.target;
			}
			if (values.userFilePath) {
				delete values.target;
			}



			if (errors) {
				console.log('Errors in form!!!');
				return;
			}
			values.content = values.content;
			values.pushTimeInfo = {
				pushTimeType: values.pushTimeType,
				startTime: values.startTime && utils.dateFormat('yyyy-MM-dd hh:mm:ss', values.startTime),
				offLine: values.offLine,
				validTime: values.validTime
			};

			self.delParams(values, values.pushTimeInfo);

			// delete values.tagIdsName;
			values.groupPushScope = values.scope;
			values.userGroupName = self.state.userGroupName;
			values.userTypeInfo = {
				userType: values.userType,
				userGroupId: values.userGroupId,
				target: values.target,
				tagIds: values.tagIds,
				scope: values.scope,
				userFilePath: values.userFilePath
			};

			self.delParams(values, values.userTypeInfo);

			if (urlPushType === 'timing') {

				
				let cronTime = values.cronTime;
				if (typeof cronTime === 'object') {
					cronTime = utils.dateFormat('hh:mm:ss', cronTime);
				}
				let cronWeek = this.state.cronWeek;
				values.cronTimeInfo = {
					time: cronTime,
					week: cronWeek.join(','),
				};
				delete values.cronTime;
				self.delParams(values, values.cronTimeInfo);
			}

			values.advanceInfo = {
				distinct: values.distinct,
				distinctId: values.distinctId,
				fixSpeed: values.fixSpeed,
				blackId: values.blackId,
				black: values.black,
				fixSpeedRate: values.fixSpeedRate
			};
			self.delParams(values, values.advanceInfo);

			if (values.advanceInfo.black && values.advanceInfo.blackId === '') {
				self.setState({
					showAdvanceStatus: true
				});
				return;
			}
			const pushType = self.props.pushType === 'notice' ? 0 : 1;
			const appId = utils.queryString('appId', window.location.href);
			values.appId = appId;
			self.setState({
				requestData: values,
				visible: saveData === 'group' ? false : true//如果是分组推送不需要再弹出详情框
			});
			let pushData = {
				appId: appId,
				userTypeInfo: values.userTypeInfo
			};
			let url = restapi.getPushCount;
			url = utils.makeUrl(url, {
				appId: appId,
				pushType: pushType,
				json: JSON.stringify(pushData)
			});
			self.setState({
				pushReviewNumber: '...'
			});
			if (saveData !== 'group') {//非分组推送  或者  分组推送且是不同用户群的推送
				ajax.get(url, function (result) {
					self.setState({
						pushReviewNumber: result.value
					});
				}, null, { timeout: 300000 });
			}
			if (callback && typeof callback === 'function') { callback(values); }//分组推送的时候用到



		});
	},
	handleCancel() {
		this.setState({
			visible: false,
			submiting: false
		});
	},
	componentWillMount() {
		let self = this;
		let appId = utils.queryString('appId', window.location.href);
		const deal = utils.queryString('deal', window.location.href);
		const id = utils.queryString('id', window.location.href);
		const groupId = utils.queryString('groupId', window.location.href);
		if (deal || groupId) {//从用户群页面跳转回来带上deal参数
			this.setState({
				userType: 1,
				userGroupId: id
			});
		}
		if (!appId) return;
		self.props.form.setFieldsValue({
			appId: appId
		});
	},
	cantNull(type) {
		const { getFieldProps } = this.props.form;

		return getFieldProps(type, {
			rules: [{
				required: true,
				message: '不能为空'
			}]
		});
	},
	validateTitle(type) {

		const { getFieldProps } = this.props.form;

		return getFieldProps(type, {
			rules: [{
				required: true,
				message: '请输入标题'
			}, {
				max: 32,
				message: '标题内容不能超过32个字'
			}, {
				validator: function (rule, value, callback) {

					if (value && value.match(/^\s/)) {
						callback(new Error('行首不能输入空格'));
					}
					callback();
				}
			}]
		});
	},
	validateContent(type) {
		const { getFieldProps } = this.props.form;
		const maxNum = 2000;
		return getFieldProps(type, {
			validate: [{

				rules: [{
					required: true,
					message: '请输入消息内容'
				}, {
					max: maxNum,
					message: '消息内容不能超过' + maxNum + '个字'
				}, {
					validator: function (rule, value, callback) {
						if (value && value.length <= maxNum) {
							try {
								JSON.parse(value);
							} catch (e) {
								callback(new Error('请输入JSON格式'));
							}
							if (Number(value) == value && typeof Number(value) === 'number') {
								callback(new Error('请输入JSON格式'));
							}
						}
						if (value && value.length <= maxNum && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						}
						callback();
					}
				}],
				trigger: ['onBlur', 'onChange']
			}]
		});
	},
	selectType(value, name) {
		this.setState({
			appName: name,
			appId: value
		});
		this.props.form.setFieldsValue({
			appId: String(value)
		});
		const hash = window.location.hash;
		let obj = utils.getQueryObj(hash);
		obj.appId = value;
		const path = hash.split('?')[0];
		const newHash = utils.makeUrl(path, obj);
		window.location.href = window.location.pathname + newHash;
	},
	getAppInfo() {
		let self = this;
		const appId = utils.queryString('appId', window.location.href);
		ajax.get(restapi.getAppInfo + '?appId=' + appId, function (result) {

			self.props.form.setFieldsValue({
				noticeImgUrl: result.value.appIconUrl,
				appName: result.value.appName
			});
			self.setState({
				flymeAuth: result.value.flymeAuth,
				appName: result.value.appName,
				limitRate: result.value.limitRate
			});
		});
	},
	componentWillUnmount: function () {
		if (document.querySelector('#createPush')) document.querySelector('#createPush').className = '';
	},

	setUserTypeGroup(result) {
		result = result.items;
		const len = result.length;
		// _userGroupName = null;
		const id = utils.queryString('id', window.location.href);
		for (let i = 0; i < len; i++) {
			if (id == result[i].id) {
				this.setState({
					userGroupName: result[i].name
				});
				_userGroupName = result[i].name;
				_userGroupDesc = result[i].userGroupDesc;
			}
		}
	},
	getBlackList() {


		const self = this;
		const appId = utils.queryString('appId', window.location.href);
		const taskId = utils.queryString('taskId', window.location.href);

		let url = restapi.pushTaskListBlack;
		let data = {
			appId: appId
		};
		if (taskId) {
			data.copyTaskId = taskId;
		}
		ajax.post(url, data, function (result) {
			let value = result.value;
			let json = {
				blackList: value
			};
			if (!value.length) {
				json.black = 0;
			} else {
				json.black = 1;
			}
			self.setState(json);

		});
	},
	componentDidMount() {
		let self = this;
		if (document.querySelector('#createPush')) document.querySelector('#createPush').className = 'active';

		const appId = utils.queryString('appId', window.location.href);
		this.setState({
			appId: appId
		});
		this.getBlackList();
		const deal = utils.queryString('deal', window.location.href);
		const id = utils.queryString('id', window.location.href);
		const groupId = utils.queryString('groupId', window.location.href);
		if (deal && store.jsonData && !this.props.addPush) {//从用户群页面跳转回来带上deal参数
			this.setState({
				userType: 1,
				userGroupId: id
			});

			store.jsonData.userType = 1;
			store.jsonData.userGroupId = id;

			self.setState(store.jsonData);
			self.props.form.setFieldsValue(store.jsonData);
		} else {
			self.props.form.setFieldsValue(this.state);
		}

		if (groupId) {
			let json = {

				userType: 1,
				userGroupId: groupId
			};
			this.setState(json);

			self.props.form.setFieldsValue(json);
		}
		this.getAppInfo();


		const taskId = utils.queryString('taskId', window.location.href);

		if (taskId) {
			let url = restapi.pushTaskCopy;
			url = utils.makeUrl(url, {
				taskId: taskId,
				appId: appId
			});
			ajax.get(url, function (result) {
				self.fillFormData(result);
			});
		}
		//分组推送里的修改推送
		let tableDataIndex = this.props.tableDataIndex;
		if (tableDataIndex) {
			this.fillFormData({
				value: tableDataIndex
			});
		}

	},
	fillFormData(result) {
		const copyTaskId = utils.queryString('copyTaskId', window.location.href);
		const value = result.value;
		let json = {
			title: value.title,
			content: value.content,
			// fixDisplay: value.advanceInfo.fixDisplay?1:0,
			fixSpeed: value.advanceInfo.fixSpeed ? 1 : 0,
			fixSpeedRate: value.advanceInfo.fixSpeedRate,
			black: value.advanceInfo.black ? 1 : 0,
			validTime: value.pushTimeInfo && value.pushTimeInfo.validTime,
			offLine: value.pushTimeInfo && value.pushTimeInfo.offLine ? 1 : 0,
			distinct: copyTaskId ? 1 : value.advanceInfo.distinct ? 1 : 0,
			// userType:value.userTypeInfo.userType
		};
		let tableDataIndex = this.props.tableDataIndex;
		if (tableDataIndex && value.userTypeInfo) {
			let userType = value.userTypeInfo.userType;
			json.userType = userType;
			json.userGroupId = value.userTypeInfo.userGroupId;
			json['target' + userType] = value.userTypeInfo.target || value.userFileName;
			// json.userGroupName=_userGroupName || this.state.userGroupName;
			json.tagIds = value.userTypeInfo.tagIds;
			json.scope = value.userTypeInfo.scope;
			json['userFilePath' + userType] = value.userTypeInfo.userFilePath;

		}
		this.props.form.setFieldsValue(json);
		this.setState({
			offLine: value.pushTimeInfo && value.pushTimeInfo.offLine ? 1 : 0
		});
		this.showAdvance();
	},
	showAdvance() {
		this.setState({
			showAdvanceStatus: !this.state.showAdvanceStatus
		});


	},
	onChangePushTime(value) {
		const fixEndDisplayTime = this.props.form.getFieldValue('fixEndDisplayTime');
		const fixStartDisplayTime = this.props.form.getFieldValue('fixStartDisplayTime');
		const startTime = value > fixStartDisplayTime ? value : fixStartDisplayTime;
		const endTime = value > fixEndDisplayTime ? value : fixEndDisplayTime;

		this.props.form.setFieldsValue({
			startTime: value,
			fixEndDisplayTime: endTime || value,
			fixStartDisplayTime: startTime || value,
		});
	},
	render() {

		const { getFieldProps } = this.props.form;

		const copyTaskId = utils.queryString('copyTaskId', window.location.href);
		return (
			<Form horizontal id='detailTable'>
				<Row>
					<Col span={!this.props.groupPush ? 15 : 24} className="col_left">




						<FormItem   {...formItemLayout} label="标题&nbsp;&nbsp;&nbsp;&nbsp;">
							<Input style={{ width: 400 }} placeholder="用于后续查找识别" {...this.validateTitle('title') } />
						</FormItem>
						<FormItem   {...formItemLayout} label="消息内容&nbsp;&nbsp;&nbsp;&nbsp;">
							<Input rows="9" style={{ width: 400 }} placeholder="请输入透传消息的JSON格式命令代码" type="textarea" {...this.validateContent('content') } />
						</FormItem>
						{!this.props.groupPush ?//分组推送不需要这几项
							<div>
								<PushTimeType
									formItemLayout={formItemLayout}
									getFieldProps={getFieldProps}
									jumpUserGroup={this.state.jumpUserGroup}
									selectCronWeek={this.selectCronWeek}
									form={this.props.form}
									onChangePushTime={this.onChangePushTime}
									pushTimeType={this.props.form.getFieldValue('pushTimeType')}
									changeRadio={this.changeRadio}>
								</PushTimeType>

								<ValidateTime form={this.props.form} offLine={this.state.offLine} formItemLayout={formItemLayout} getFieldProps={getFieldProps} ></ValidateTime>
							</div>
							: null}
						{this.props.groupType || !this.props.groupPush ?//分组推送的时候根据是否相同用户群判断是否显示。非分组推送情况下一直显示
							<UserType
								form={this.props.form}
								formItemLayout={formItemLayout}
								getFieldProps={getFieldProps}
								scope={this.state.scope}
								tableDataIndex={this.props.tableDataIndex}
								groupPush={this.props.groupType ? true : false}
								clearUserGroup={this.clearUserGroup}
								setUserTypeGroup={this.setUserTypeGroup}
								handleSubmit={this.handleSubmit}
								flymeAuth={this.state.flymeAuth}
								appId={utils.queryString('appId', window.location.href)}
								userType={this.props.form.getFieldValue('userType')}
								userGroupId={this.state.userGroupId}
								type={this.props.pushType}
								changeRadio={this.changeRadio}>
							</UserType> : null}

						{!this.props.groupPush ?//分组推送不需要这几项
							<Distinct
								form={this.props.form}
								formItemLayout={formItemLayout}
								appId={utils.queryString('appId', window.location.href)}
								getFieldProps={getFieldProps}
								copyTaskId={copyTaskId}
								displayDistinct={this.state.displayDistinct}
								changeCheckbox={this.changeCheckbox}
								distinct={this.props.form.getFieldValue('distinct')}
								pushType={this.props.pushType}
								changeRadio={this.changeRadio} >

							</Distinct>
							: null}

						<AdvanceSetting
							form={this.props.form}
							formItemLayout={formItemLayout}
							showAdvanceStatus={this.state.showAdvanceStatus}
							showAdvance={this.showAdvance}
							getFieldProps={getFieldProps}
							limitRate={this.state.limitRate}
							blackList={this.state.blackList}
							black={this.state.black}
							tableDataIndex={this.props.tableDataIndex}
							changeBlack={this.changeBlack}
							displayBlackList={this.state.displayBlackList}
							userType={this.state.userType}
							fixSpeed={this.state.fixSpeed}
							fixDisplay={this.state.fixDisplay}
							netType={this.state.netType}
							noticeImgUrl={this.state.noticeImgUrl}
							changeRadio={this.changeRadio}
							type={this.props.pushType}>
						</AdvanceSetting>
					</Col>
				</Row>

				<Row className="push_btn">
					<Col span="14">
						{!this.props.groupPush ?//分组推送不需要这几项
							<FormItem label="">
								<Button type="primary" onClick={this.handleSubmit} size="large">推送</Button>
							</FormItem>
							: null}
					</Col>

				</Row>
				{this.props.groupPush ?
					<Row>
						<Col>
							<PreviewPush
								submiting={this.props.submiting}
								handleOk={this.props.handleOk}
								type={this.props.pushType}
								groupPush={this.props.groupPush}
								form={this.props.form}
								setTableData={this.props.setTableData}
								handleSubmit={this.handleSubmit}
								addPushData={this.props.addPushData}
								requestData={this.state.requestData}
								handleCancel={this.props.handleCancel}
								visible={this.props.visible}
								pushReviewNumber={this.state.pushReviewNumber}
								popoverVisible={this.state.popoverVisible} />
						</Col>
					</Row>
					: null}
				<PushModal
					form={this.props.form}
					requestData={this.state.requestData}
					visible={this.state.visible}

					cronWeek={this.state.cronWeek}
					appName={this.state.appName}
					userGroupName={_userGroupName || this.state.userGroupName}
					userGroupDesc={_userGroupDesc || this.state.userGroupDesc}
					handleOk={this.handleOk}
					type={this.props.pushType}
					blackList={this.state.blackList}
					submiting={this.state.submiting}
					distinctTitle={this.state.distinctTitle}
					handleCancel={this.handleCancel}
					pushReviewNumber={this.state.pushReviewNumber} />
			</Form>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;