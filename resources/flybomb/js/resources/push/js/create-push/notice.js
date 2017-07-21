'use strict';
import React from 'react';
import {
	Button, Row, Col, message, Radio, Form, Input
}
	from 'antd';


const RadioGroup = Radio.Group;
const FormItem = Form.Item;

// 保存之前输入的展开方式文本
let _userGroupDesc = null;
let _userGroupName = null;
window.vedioFilePathJson = {};
window.smallImageFilePathJson = {};
window.bigImageFilePathJson = {};



import ProductTypeApp from '../producttype-app'; //产品类型和应用的下拉列表

import restapi from '../../lib/url-model';
import ajax from '../../components/ajax';
import utils from '../../lib/utils';


import ValidateTime from './component/valid-time';  //有效时长
import PushTimeType from './component/push-time-type';  //推送时间
import ClickType from './component/click-type';  //点击动作
import UserType from './component/user-type';  //指定用户
import AdvanceSetting from './component/advance-setting';  //高级选项
import BigimgArea from './component/bigimg-area';  //大图区域
import DefaultimgArea from './component/defaultimg-area';  //小图区域
import PushModal from './component/modal';  //弹出层
import Distinct from './component/distinct';  //消息去重
import NoticeExpandType from './component/notice-expand-type';  //展开方式
import UploadBigImg from './component/upload-img';//上传图片
import PreviewPush from './component/preview-push';//预推测试

import Reflux from 'reflux';

var actions = Reflux.createActions([
	'notice'
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
			onlyWifi: 1,
			vibrate: 1,
			lights: 1,
			sound: 1,
			distinctId: [],
			displayDistinct: 'none',
			displayBlackList: 'none',
			smallImageDisplay: 'none',//未上传小图时，提示语的显示状态
			vedioDisplay: 'none',//未上传视频时，提示语的显示状态
			bigImageDisplay: 'none',//未上传大图时，提示语的显示状态
			noticeBarType: 2, //通知栏样式
			noticeExpandType: 0, //展开方式
			clickType: 0, //点击动作
			scope: 0,//并集or交集
			userType: 2, //指定用户
			distinct: 0,//任务去重
			fixSpeed: 0,//是否定速推送
			msgCache: 0,//是否开启消息缓存
			// black: 1,//是否使用黑名单
			blackList: [],
			netType: 0,//联网方式
			fixDisplay: 0,//是否定时展示
			suspend: 1,//通知栏悬浮窗
			startTimeStatus: 'success',
			endTimeStatus: 'success',
			pushTimeStatus: 'success',
			popoverVisible: false,
			clearNoticeBar: 1,//清除通知栏
			smalllayerDisplay: 'none',//是否显示图片上的透明遮罩
			biglayerDisplay: 'none',//是否显示图片上的透明遮罩
			visible: false,//Modal显示隐藏
			pushReviewNumber: '...',//预计推送人数
			toggleStatus: false,//展开、收起的状态
			showAdvanceStatus: false,
			pushTimeType: 0, //推送时间
			distinctTitle: []
		};
	},
	delParams(params, current) {//重新定义上传参数格式后，删除初始的参数
		for (let i in current) {
			delete params[i];
		}
	},

	clickTypeParams(params, type) {
		this.setState({
			['clickTypeParams' + type]: params
		});
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
		// if (pushReviewNumber === '...') {
		// 	message.error('预计推送人数查询中...');
		// 	return;
		// }
		if (this.state.submiting) return;
		this.setState({
			submiting: true
		});
		let url = restapi.addNotice;
		let hash = '/data/push/record?appId=' + appId;
		if (pushType === 'timing') {
			url = restapi.cronTaskAddNotice;
			hash = '/data/push/timing?appId=' + appId;
		}
		ajax.post(url, data, function () {

			message.success('提交成功');
			window.location.hash = hash;
		}, function () {
			self.setState({
				submiting: false
			});
			//test git
		});
	},
	showAdvance() {
		this.setState({
			showAdvanceStatus: !this.state.showAdvanceStatus
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
			if ((+new Date(values.fixStartDisplayTime)) > (+new Date(values.fixEndDisplayTime))) {
				return;
			}


			if (saveData === 'deal') {

				if (!values.noticeBarImgUrl) {
					values.noticeBarImgUrl = self.state.noticeBarImgUrl;
				}
				if (!values.noticeExpandImgUrl) {
					values.noticeExpandImgUrl = self.state.noticeExpandImgUrl;
				}
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
			let blackId = [];
			for (let i in values) {
				if (i.indexOf('blackId') > -1 && values[i]) {
					let id = i.split('blackId')[1];
					blackId.push(id);
					delete values[i];
				}
			}
			values.blackId = blackId.join(',');
			if (userType === 5 && !values.tagIds) {//选了标签，但是该应用无标签
				return;
			}
			if (userType === 1 && (!values.userGroupId || values.userGroupId === 'null')) {//选了用户群，但是没有勾选列表
				return;
			}
			if (values.noticeBarType === 1 && !(window.smallImageFilePathJson.noticeBarImgUrl || values.noticeBarImgUrl || self.state.noticeBarImgUrl || self.props.form.getFieldValue('noticeBarImgUrl'))) {
				this.setState({
					smallImageDisplay: ''
				});
				errors = {};
			}
			if (values.noticeExpandType === 2 && !(window.bigImageFilePathJson.noticeExpandImgUrl || values.noticeExpandImgUrl || self.state.noticeExpandImgUrl || self.props.form.getFieldValue('noticeExpandImgUrl'))) {
				this.setState({
					bigImageDisplay: ''
				});
				errors = {};
			}

			if (values.noticeExpandType === 3 && !(window.vedioFilePathJson.vedioUrl || self.props.form.getFieldValue('vedioUrl'))) {
				this.setState({
					vedioDisplay: ''
				});
				errors = {};
			}
			//					if(values.userFilePath && errors && errors.target){
			//						delete errors.target;
			//					}
			//					console.log(errors);
			//
			//					if(errors && Object.keys(errors).length===0){
			//						errors=null;
			//					}
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
			// if(Object.keys(errors).length===0){
			// 	errors=null;
			// }
			if (errors) {
				console.log(errors);
				console.log('Errors in form!!!');
				return;
			}
			values.noticeBarInfo = {
				noticeBarType: values.noticeBarType,
				title: values.title.trim(),
				content: values.content.trim(),
				noticeBarImgUrl: values.noticeBarType === 1 ? (window.smallImageFilePathJson.noticeBarImgUrl || values.noticeBarImgUrl || self.state.noticeBarImgUrl || self.props.form.getFieldValue('noticeBarImgUrl')) : undefined
			};
			self.delParams(values, values.noticeBarInfo);
			values.noticeExpandInfo = {
				noticeExpandType: values.noticeExpandType,
				noticeExpandContent: values.noticeExpandType === 1 ? values.noticeExpandContent : undefined,
				noticeExpandImgUrl: values.noticeExpandType === 2 ? (window.bigImageFilePathJson.noticeExpandImgUrl || values.noticeExpandImgUrl || self.state.noticeExpandImgUrl || self.props.form.getFieldValue('noticeExpandImgUrl')) : undefined,
				actSetting: {
					noticeExpandVedioUrl: window.vedioFilePathJson.vedioUrl || self.props.form.getFieldValue('vedioUrl'),
					onlyWifi: self.props.form.getFieldValue('onlyWifi')
				},
				vedioUrl: undefined,
				onlyWifi: undefined
			};

			self.delParams(values, values.noticeExpandInfo);

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


			let clicktype = 'App';
			if (values.clickType === 1) {
				clicktype = 'AppPage';
			}
			let clickTypeArr = [];
			// let clickTypeNum = 0;
			// console.log(values)
			for (let i in values) {
				if (i.indexOf('key' + clicktype) > -1) {
					let num = i.split('key' + clicktype)[1];
					clickTypeArr.push(num);
				}
			}
			// console.log(clickTypeArr)
			// return;
			const clickTypeParams = clickTypeArr.length > 0 ? clickTypeArr : self.state['clickTypeParams' + clicktype];
			var parameters = {};
			for (let i = 0; i < clickTypeParams.length; i++) {
				let key = 'key' + clicktype + clickTypeParams[i];
				let value = 'value' + clicktype + clickTypeParams[i];
				if (values[key]) {//有值的时候才有trim()
					parameters[values[key].trim()] = values[value].trim();
					delete values[key];
					delete values[value];
				}

			}
			values.clickTypeInfo = {
				clickType: values.clickType,
				url: values.url,
				parameters: parameters,
				clickPackage: values.clickPackage,
				activity: values.activity,
				customAttribute: values.customAttribute
			};

			self.delParams(values, values.clickTypeInfo);

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
				userType: userType,
				userGroupId: values.userGroupId,
				target: values.target,
				tagIds: values.tagIds,
				scope: values.scope,
				userFilePath: values.userFilePath
			};

			self.delParams(values, values.userTypeInfo);

			let notificationType = {
				vibrate: values.vibrate || (values.vibrate !== 0 && !values.vibrate) ? 1 : 0,
				lights: values.lights || (values.lights !== 0 && !values.lights) ? 1 : 0,
				sound: values.sound || (values.sound !== 0 && !values.sound) ? 1 : 0
			};
			values.advanceInfo = {
				distinct: values.distinct,
				msgCache: values.msgCache,
				distinctId: values.distinctId,
				fixSpeed: values.fixSpeed,
				blackId: values.blackId,
				black: values.black,
				fixSpeedRate: values.fixSpeedRate,
				fixDisplay: values.fixDisplay,
				fixDisplayTime: values.fixDisplayTime && utils.dateFormat('yyyy-MM-dd hh:mm:ss', values.fixDisplayTime),
				netType: values.netType,
				suspend: values.suspend,
				clearNoticeBar: values.clearNoticeBar || (values.clearNoticeBar !== 0 && !values.clearNoticeBar) ? 1 : 0,
				fixStartDisplayTime: values.fixStartDisplayTime && utils.dateFormat('yyyy-MM-dd hh:mm:ss', values.fixStartDisplayTime),
				fixEndDisplayTime: values.fixEndDisplayTime && utils.dateFormat('yyyy-MM-dd hh:mm:ss', values.fixEndDisplayTime),
				notificationType: notificationType,
				noticeImgUrl: undefined// this.state.noticeImgUrl || values.noticeImgUrl || undefined //暂时不要这个功能了，有需要再开放出来
			};
			self.delParams(values, values.advanceInfo.notificationType);
			self.delParams(values, values.advanceInfo);


			const pushType = self.props.pushType === 'notice' ? 0 : 1;
			const appId = utils.queryString('appId', window.location.href);
			values.appId = appId;

			if (values.advanceInfo.black && values.advanceInfo.blackId === '') {
				self.setState({
					showAdvanceStatus: true
				});
				return;
			}
			console.log(values);
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
			// $.get(url,function(result){
			// 	console.log(url);
			// 	self.setState({
			// 		pushReviewNumber: result.value
			// 	});
			// });
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
	// userExists(rule, value, callback) {
	// 	callback();
	// },
	validateTitle(type) {
		const {
			getFieldProps
		} = this.props.form;

		return getFieldProps(type, {
			validate: [{
				rules: [{
					required: true,
					whitespace: true,
					message: '请输入标题'
				}, {
					max: 32,
					message: '标题不能超过32个字'
				}],
				trigger: ['onBlur', 'onChange']
			}]

		});
	},
	validateContent(type) {
		const {
			getFieldProps
		} = this.props.form;

		return getFieldProps(type, {
			validate: [{
				rules: [{
					required: true,
					message: '请输入内容'
				}, {
					max: 100,
					message: '内容不能超过100个字'
				}, {
					validator: function (rule, value, callback) {

						if (value && value.length <= 100 && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						}
						callback();
					}
				}],
				trigger: ['onBlur', 'onChange']
			}]
		});
	},
	queryMobileValidImei() {

		let checkImeiPath = this.props.form.getFieldValue('checkImeiPath');
		let versionNum = this.props.form.getFieldValue('versionNum');
		let query = '?checkImeiPath=' + checkImeiPath + '&versionNum=' + versionNum;
		ajax.get(restapi.queryMobileValidImei + query, function (result) {
			let value = result.value;
			message.success('有效IMEI数' + value);

		});
	},

	componentWillMount() {
		let self = this;
		let id = utils.queryString('appId', window.location.href);
		if (!id) return;
		self.props.form.setFieldsValue({
			appId: id
		});
	},
	cantNull(type) {
		const {
			getFieldProps
		} = this.props.form;

		return getFieldProps(type, {
			rules: [{
				required: true,
				message: '不能为空'
			}]
		});
	},
	restoreStatus(name, value) {//还原状态

		// if(name==='noticeBarType' && value===0 ){//点击通知栏样式-标准 还原状态
		// 	let json={
		// 		noticeExpandType:0,
		// 		smalllayerDisplay:'none'
		// 	};
		// 	this.setState(json);
		// 	this.props.form.setFieldsValue(json);
		// }
		if (name === 'noticeBarType' && value === 1 && (this.props.form.getFieldValue('noticeExpandType') === 1 || this.props.form.getFieldValue('noticeExpandType') === 3)) {//点击通知栏样式-图片 还原状态
			let json = {
				noticeExpandType: 0,
				smalllayerDisplay: 'none'
			};
			this.setState(json);
			this.props.form.setFieldsValue(json);
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
		if ((name === 'noticeBarType' && this.props.form.getFieldValue('noticeBarType') === value) || (name === 'noticeExpandType' && this.props.form.getFieldValue('noticeExpandType') === value)) {
			return;//点击当前已经选中的项，不做处理
		}
		if (name === 'userGroupId') {
			data.userGroupName = e.target.label;
			data.userGroupDesc = e.target.expression;
			_userGroupName = e.target.label;
			_userGroupDesc = e.target.expression;
		}
		if (name == 'distinct' && value == 0) {
			data.distinctTitle = [];
		}
		if (value === 'vibrate' || value === 'sound' || value === 'lights') {
			let checked = e.target.checked;
			data[value] = !checked ? 0 : 1;
		}
		this.setState(data);
		this.props.form.setFieldsValue(data);
		this.restoreStatus(name, value);
		this.showButton(name, value);
	},
	showButton(name, value) {

		if (name === 'noticeExpandType' && value !== 1) {
			this.setState({
				noticeExpandContent: false
			});
		}
		if (name === 'noticeExpandType' && value === 2) {//点击展开方式-图片
			this.setState({
				toggleStatus: true,
				showBigImg: true,
				biglayerDisplay: 'none'
			});
		}
		if (name === 'noticeExpandType' && value === 1) {//点击展开方式-文本
			this.setState({
				toggleStatus: false,
				biglayerDisplay: 'none'
			});
		}
	},
	handleCancel() {
		this.setState({
			visible: false,
			submiting: false
		});
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
		let appId = utils.queryString('appId', window.location.href);
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
	getAppInfo(callback) {
		let self = this;
		const appId = utils.queryString('appId', window.location.href);
		ajax.get(restapi.getAppInfo + '?appId=' + appId, function (result) {
			const appIconUrl = result.value.appIconUrl;
			if (callback) { callback(appIconUrl); }
			if (!callback) {
				self.setState({
					noticeImgUrl: appIconUrl === '' ? null : appIconUrl
				});
				self.props.form.setFieldsValue({
					noticeImgUrl: appIconUrl === '' ? null : appIconUrl
				});
			}
			self.setState({
				flymeAuth: result.value.flymeAuth,
				appName: result.value.appName,
				limitRate: result.value.limitRate,
				msgCacheStatus: result.value.msgCache,
				pushOtherPackage: result.value.pushOtherPackage
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
	fillFormData(result) {//任务复制和修改分组推送的时候回填表单
		let self = this;
		const copyTaskId = utils.queryString('copyTaskId', window.location.href);
		const value = result.value;
		const clickType = value.clickTypeInfo.clickType;
		const parameters = clickType < 2 ? value.clickTypeInfo.parameters : undefined;
		let type = 'App';
		if (clickType === 1) {
			type = 'AppPage';
		}
		let arr = [];
		let json = {
			noticeBarType: value.noticeBarInfo.noticeBarType,
			noticeBarImgUrl: value.noticeBarInfo.noticeBarImgUrl,
			title: value.noticeBarInfo.title,
			content: value.noticeBarInfo.content,
			noticeExpandContent: value.noticeExpandInfo.noticeExpandContent,
			noticeExpandImgUrl: value.noticeExpandInfo.noticeExpandImgUrl,
			noticeExpandType: value.noticeExpandInfo.noticeExpandType,
			vedioUrl: value.noticeExpandInfo.actSetting && value.noticeExpandInfo.actSetting.noticeExpandVedioUrl,
			onlyWifi: value.noticeExpandInfo.actSetting && (value.noticeExpandInfo.actSetting.onlyWifi ? 1 : 0),
			activity: value.clickTypeInfo.activity,
			['parameters' + type]: parameters,
			clickType: value.clickTypeInfo.clickType,
			url: value.clickTypeInfo.url,
			clickPackage: value.clickTypeInfo.clickPackage,
			customAttribute: value.clickTypeInfo.customAttribute,
			// fixDisplay: value.advanceInfo.fixDisplay?1:0,
			msgCache: value.advanceInfo.msgCache ? 1 : 0,
			suspend: value.advanceInfo.suspend ? 1 : 0,
			clearNoticeBar: value.advanceInfo.clearNoticeBar ? 1 : 0,
			fixSpeed: value.advanceInfo.fixSpeed ? 1 : 0,
			fixSpeedRate: value.advanceInfo.fixSpeedRate,
			distinct: copyTaskId ? 1 : value.advanceInfo.distinct ? 1 : 0,
			noticeImgUrl: value.advanceInfo.noticeImgUrl,
			vibrate: value.advanceInfo.notificationType.vibrate ? 1 : 0,
			lights: value.advanceInfo.notificationType.lights ? 1 : 0,
			sound: value.advanceInfo.notificationType.sound ? 1 : 0,
			black: value.advanceInfo.black ? 1 : 0,
			offLine: value.pushTimeInfo && value.pushTimeInfo.offLine ? 1 : 0,
			validTime: value.pushTimeInfo && value.pushTimeInfo.validTime
			// userType:value.userTypeInfo.userType
		};
		let tableDataIndex = this.props.tableDataIndex;

		if (tableDataIndex) {
			if (value.userTypeInfo) {

				let userType = value.userTypeInfo.userType;
				json.userType = userType;
				json.userGroupId = value.userTypeInfo.userGroupId;
				json['target' + userType] = value.userTypeInfo.target || value.userFileName;
				// json.userGroupName=_userGroupName || this.state.userGroupName;
				json.tagIds = value.userTypeInfo.tagIds;
				json.scope = value.userTypeInfo.scope;
				json['userFilePath' + userType] = value.userTypeInfo.userFilePath;
			}
			json.fixDisplay = value.advanceInfo.fixDisplay;

		}
		window.vedioFilePathJson.vedioUrl = value.noticeExpandInfo.actSetting && value.noticeExpandInfo.actSetting.noticeExpandVedioUrl;
		for (let i in parameters) {
			arr.push({
				key: i,
				value: parameters[i]
			});
		}
		for (let i = 0; i < arr.length; i++) {
			json['key' + type + (i + 1)] = arr[i].key;
			json['value' + type + (i + 1)] = arr[i].value;
			window.parametersJson['key' + type + (i + 1)] = arr[i].key;
			window.parametersJson['value' + type + (i + 1)] = arr[i].value;
		}
		self.props.form.setFieldsValue(json);
		self.setState({
			fixDisplay: value.advanceInfo.fixDisplay,
			noticeBarType: value.noticeBarInfo.noticeBarType,
			msgCacheStatus: value.advanceInfo.msgCacheStatus,
			offLine: value.pushTimeInfo && value.pushTimeInfo.offLine ? 1 : 0
		});
		self.showAdvance();
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
		const deal = utils.queryString('deal', window.location.href);
		const groupId = utils.queryString('groupId', window.location.href);
		const id = utils.queryString('id', window.location.href);
		this.getBlackList();//获取黑名单
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
			_userGroupDesc = null;
			_userGroupName = null;
			window.vedioFilePathJson = {};
			window.smallImageFilePathJson = {};
			window.bigImageFilePathJson = {};
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
		this.getAppInfo(function (appIconUrl) {
			self.props.form.setFieldsValue({
				noticeImgUrl: appIconUrl
			});
			//放接口回调后面，任务复制
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


		});

		//分组推送里的修改推送
		let tableDataIndex = this.props.tableDataIndex;
		if (tableDataIndex) {
			this.fillFormData({
				value: tableDataIndex
			});
		}




	},
	clickHide(type) {
		if (type === 1) {


			this.setState({
				noticeExpandContent: false,
				toggleStatus: false
			});
		}
		if (type === 2) {
			this.setState({
				noticeExpandImgUrl: false,
				showBigImg: false,
				toggleStatus: false
			});
		}
	},
	clickShow(type) {
		if (type === 1) {
			const noticeExpandContent = this.props.form.getFieldValue('noticeExpandContent');
			if (!noticeExpandContent) {
				message.error('请输入展开文本');
				return;
			}
			this.setState({
				noticeExpandContent: true,
				toggleStatus: true
			});
		}
		if (type === 2) {
			const noticeExpandImgUrl = this.props.form.getFieldValue('noticeExpandImgUrl');
			this.setState({
				noticeExpandImgUrl: noticeExpandImgUrl,
				showBigImg: true,
				toggleStatus: true
			});
		}
		//
	},
	changeIcon(noticeImgUrl) {//修改高级设置里自定义图标的回调 

		this.setState({
			noticeImgUrl: null
		});
		this.props.form.setFieldsValue({
			noticeImgUrl: noticeImgUrl
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
		// <Radio name="noticeBarType" value={0}>标准</Radio>
		return (
			<Form horizontal id='detailTable'>

				<Row>
					<Col span="15" className="col_left">
						<FormItem {...formItemLayout} label="通知栏样式&nbsp;&nbsp;&nbsp;&nbsp;">
							<RadioGroup {...getFieldProps('noticeBarType', {
								initialValue: this.props.form.getFieldValue('noticeBarType'),
								onChange: this.changeRadio
							}) }>
								<Radio name="noticeBarType" value={2}>安卓原生</Radio>
								<Radio name="noticeBarType" value={1}>图片</Radio>

							</RadioGroup>
							<UploadBigImg
								type='noticeBarType'
								form={this.props.form}
								smallImageDisplay={this.state.smallImageDisplay}
								url='noticeBarImgUrl'
								value={1} />

						</FormItem>
						<div>
							<FormItem {...formItemLayout} label="标题&nbsp;&nbsp;&nbsp;&nbsp;">
								<Input placeholder='请输入标题' style={{ width: 400 }} {...this.validateTitle('title') } />
							</FormItem>
							<FormItem {...formItemLayout} label="内容&nbsp;&nbsp;&nbsp;&nbsp;">
								<Input rows="9" placeholder='请输入内容' style={{ width: 400 }} type="textarea" {...this.validateContent('content') } />
							</FormItem>
						</div>

						<NoticeExpandType
							changeRadio={this.changeRadio}
							noticeBarType={this.state.noticeBarType}
							flymeAuth={this.state.flymeAuth}
							bigImageDisplay={this.state.bigImageDisplay}
							vedioDisplay={this.state.vedioDisplay}
							form={this.props.form}
							addPush={this.props.addPush}
							formItemLayout={formItemLayout} />


						<ClickType.render
							form={this.props.form}
							formItemLayout={formItemLayout}
							pushOtherPackage={this.state.pushOtherPackage}
							getFieldProps={getFieldProps}
							addPush={this.props.addPush}
							clickTypeParams={this.clickTypeParams}
							clickType={this.props.form.getFieldValue('clickType')}
							changeRadio={this.changeRadio}>
						</ClickType.render>
						{!this.props.groupPush ?//分组推送不需要这几项
							<div>
								<PushTimeType
									formItemLayout={formItemLayout}
									getFieldProps={getFieldProps}
									jumpUserGroup={this.state.jumpUserGroup}
									selectCronWeek={this.selectCronWeek}
									form={this.props.form}
									onChangePushTime={this.onChangePushTime}
									pushTimeStatus={this.state.endTimeStatus}
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
								clearUserGroup={this.clearUserGroup}
								scope={this.state.scope}
								tableDataIndex={this.props.tableDataIndex}
								groupPush={this.props.groupType ? true : false}
								userType={this.props.form.getFieldValue('userType')}
								handleSubmit={this.handleSubmit}
								userGroupId={this.state.userGroupId}
								type={this.props.pushType}
								setUserTypeGroup={this.setUserTypeGroup}
								flymeAuth={this.state.flymeAuth}
								appId={utils.queryString('appId', window.location.href)}
								changeRadio={this.changeRadio}>
							</UserType> : null}
						{!this.props.groupPush ?//分组推送不需要这几项
							<Distinct
								form={this.props.form}
								formItemLayout={formItemLayout}
								copyTaskId={copyTaskId}
								appId={utils.queryString('appId', window.location.href)}
								getFieldProps={getFieldProps}
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
							getFieldProps={getFieldProps}
							appId={utils.queryString('appId', window.location.href)}
							fixSpeed={this.state.fixSpeed}
							blackList={this.state.blackList}
							black={this.state.black}
							msgCache={this.state.msgCache}
							changeBlack={this.changeBlack}
							displayBlackList={this.state.displayBlackList}
							msgCacheStatus={this.state.msgCacheStatus}
							startTimeStatus={this.state.startTimeStatus}
							tableDataIndex={this.props.tableDataIndex}
							endTimeStatus={this.state.endTimeStatus}
							limitRate={this.state.limitRate}
							fixDisplay={this.state.fixDisplay}
							netType={this.state.netType}
							suspend={this.state.suspend}
							showAdvanceStatus={this.state.showAdvanceStatus}
							showAdvance={this.showAdvance}
							clearNoticeBar={this.state.clearNoticeBar}
							vibrate={this.props.form.getFieldValue('vibrate')}
							lights={this.props.form.getFieldValue('lights')}
							changeIcon={this.changeIcon}
							sound={this.props.form.getFieldValue('sound')}
							noticeImgUrl={this.state.noticeImgUrl || this.props.form.getFieldValue('noticeImgUrl')}
							changeRadio={this.changeRadio}
							type={this.props.pushType}>
						</AdvanceSetting>

					</Col>
					<Col span="9" style={{ position: 'relative' }}>
						<div className="example_push">
							{this.state.noticeBarType === 0 || this.state.noticeBarType === 2 ?//通知栏样式-标准

								<div className="con bdr_bottom">
									<div className="pt10 bdr_top ">
										<Row style={{ zIndex: 2 }}>
											<Col className="ta_r" span="4"><img width="26" height="26" src={this.state.noticeImgUrl || this.props.form.getFieldValue('noticeImgUrl') || utils.cdn + '/resources/push/images/default_icon.png'} /></Col>
											<Col span="20" className="notice_text pl10">
												<div className="notice_title">{this.props.form.getFieldValue('title') || '此处显示标题文字'}</div>
												{!this.state.noticeExpandContent ?
													<div className="notice_content">{this.props.form.getFieldValue('content') || '此处为内容说明文字显示一行文字说明'}</div>
													:
													<div className="notice_content notice_expand_content">{this.props.form.getFieldValue('noticeExpandContent') || window._noticeExpandContent || '此处为内容说明文字显示一行文字说明'}</div>
												}

											</Col>
										</Row>

										{this.state.noticeExpandType === 2 ?
											<div style={{ position: 'relative', top: -43, zIndex: 1 }}>
												{this.state.showBigImg ? <div style={{ background: '#000', opacity: .5, position: 'absolute', top: 0, height: 40, zIndex: 11, width: '100%' }}></div> : null}

												<BigimgArea
													noticeExpandImgUrl={this.state.noticeExpandImgUrl}
													showBigImg={this.state.showBigImg}
													form={this.props.form}>
												</BigimgArea>
											</div>


											: null}
									</div>
								</div>

								: null}
							{this.state.noticeBarType === 1 ?//通知栏样式-图片
								<div className="con bdr_bottom">
									<div className="pt10 bdr_top ">
										{this.state.noticeExpandType === 2 ?
											<div>

												{this.state.toggleStatus ?
													<BigimgArea
														noticeExpandImgUrl={this.state.noticeExpandImgUrl}
														showBigImg={this.state.showBigImg}
														form={this.props.form}>
													</BigimgArea>
													:
													<DefaultimgArea form={this.props.form} />

												}
											</div>
											:
											<Row>
												<Col span="24">
													<DefaultimgArea form={this.props.form} />

												</Col>

											</Row>

										}
									</div>
								</div>
								: null}
						</div>
						{(this.state.noticeExpandType === 1 || this.state.noticeExpandType === 2) && !this.state.toggleStatus ?
							<div onClick={this.clickShow.bind(this, this.state.noticeExpandType)} className="click_show">点击展开</div>
							: null}
						{(this.state.noticeExpandType === 1 || this.state.noticeExpandType === 2) && this.state.toggleStatus ?
							<div onClick={this.clickHide.bind(this, this.state.noticeExpandType)} className="click_show">点击收起</div>
							: null}
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
								groupType={this.props.groupType}
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
					: null
				}
				<PushModal
					form={this.props.form}
					requestData={this.state.requestData}
					noticeImgUrl={this.state.noticeImgUrl || this.props.form.getFieldValue('noticeImgUrl')}
					visible={this.state.visible}
					userGroupName={_userGroupName || this.state.userGroupName}
					userGroupDesc={_userGroupDesc || this.state.userGroupDesc}
					handleOk={this.handleOk}
					cronWeek={this.state.cronWeek}
					blackList={this.state.blackList}
					noticeExpandContent={window._noticeExpandContent}
					appName={this.state.appName}
					submiting={this.state.submiting}
					msgCache={this.state.msgCache}
					msgCacheStatus={this.state.msgCacheStatus}
					type={this.props.pushType}
					handleCancel={this.handleCancel}
					distinctTitle={this.state.distinctTitle}
					pushReviewNumber={this.state.pushReviewNumber} />
			</Form >
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;
