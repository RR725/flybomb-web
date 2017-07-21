'use strict';
import React from 'react';
import {
	Button, Row, Col, Tooltip, Table, Modal, message, Popover, Upload, Icon, Radio, Form, Input
}
	from 'antd';


const RadioGroup = Radio.Group;
const FormItem = Form.Item;

// 保存之前输入的展开方式文本
let _userGroupName = null;

import ProductTypeApp from '../producttype-app'; //产品类型和应用的下拉列表

import restapi from '../../lib/url-model';
import ajax from '../../components/ajax';
import utils from '../../lib/utils';


import ValidateTime from './component/valid-time';  //有效时长
import PushTimeType from './component/push-time-type';  //推送时间
import UserType from './component/user-type';  //指定用户
import AddPushModal from './component/add-push-modal';//分组推送-添加推送

window.vedioFilePathJson = {};
let tableDataJson = {};
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
		span: 3
	},
	wrapperCol: {
		span: 21
	}
};



let AddAppTask = React.createClass({
	getInitialState() {
		return {
			tableData: [],//分组推送列表
			dataSource: [],//表格用
			pushType: 0,
			groupType: 0,
			offLine: 1,
			onlyWifi: 1,
			distinctId: [],
			clickTypeParamsApp: [1],
			clickTypeParamsAppPage: [1],
			displayDistinct: 'none',
			smallImageDisplay: 'none',//未上传小图时，提示语的显示状态
			vedioDisplay: 'none',//未上传视频时，提示语的显示状态
			bigImageDisplay: 'none',//未上传大图时，提示语的显示状态
			noticeBarType: 0, //通知栏样式
			noticeExpandType: 0, //展开方式
			clickType: 0, //点击动作
			scope: 0,//并集or交集
			userType: 2, //指定用户
			distinct: 0,//任务去重
			fixSpeed: 0,//是否定速推送
			msgCache: 0,//是否开启消息缓存
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
			userTypeStatus: true,
			clearTableVisible: false,//分组推送-是否清空分组条件
			addPushVisible: false,//分组推送-添加推送弹层显示隐藏状态
			pushReviewNumber: '...',//预计推送人数
			toggleStatus: false,//展开、收起的状态
			showAdvanceStatus: false,
			pushTimeType: 0, //推送时间
			distinctTitle: []
		};
	},
	setTableData(values) {
		let tableDataIndex = this.state.tableDataIndex;
		let tableDataNum = this.state.tableDataNum;
		let data = {
			// groupPushAmount: this.state.groupPushAmount
		};
		let userType = this.props.form.getFieldValue('userType');
		let source = {
			userTypeInfo: userType
		};
		let form = this.props.form;
		let pushType = form.getFieldValue('pushType');
		let groupType = form.getFieldValue('groupType');
		if (pushType === 0) {//通知栏推送
			data.noticeBarInfo = values.noticeBarInfo;
			data.noticeExpandInfo = values.noticeExpandInfo;
			data.advanceInfo = values.advanceInfo;
			data.clickTypeInfo = values.clickTypeInfo;
			source.title = values.noticeBarInfo.title;
			source.content = values.noticeBarInfo.content;

		} else {//消息推送

			data.title = values.title;
			data.advanceInfo = values.advanceInfo;
			data.clickTypeInfo = values.clickTypeInfo;
			data.content = values.content;
			source.title = values.title;
			source.content = values.content;
		}
		if (groupType === 1) {//不同用户群
			data.userTypeInfo = values.userTypeInfo;
			data.userFileName = values['target' + values.userTypeInfo.userType];
			source.userTypeInfo = values.userTypeInfo.userType;
			source.userFileName = values['target' + values.userTypeInfo.userType];
			source.userGroupName = values.userGroupName;
			source.tagIdsName = values.tagIdsName;
			source.groupPushScope = values.groupPushScope;
		}

		let json = {
			addPushVisible: false,
			userTypeInfo: userType
		};
		let getUserNumberStatus = true;//获取用户数时的遮罩层
		let tableData = this.state.tableData;
		let dataSource = this.state.dataSource;
		if (tableDataIndex) {
			getUserNumberStatus = false;
			let userTypeInfoOld = tableDataIndex.userTypeInfo;
			let userTypeInfoNew = data.userTypeInfo;
			for (let i in userTypeInfoOld) {
				if (userTypeInfoOld[i] !== userTypeInfoNew[i]) {
					getUserNumberStatus = true;
				}
			}

			tableData[tableDataNum] = data;
			dataSource[tableDataNum] = source;
			if (groupType && getUserNumberStatus) {

				json.pushReviewNumber = '...';
			}
			data.groupPushAmount = tableDataIndex.groupPushAmount;
		} else {
			data.groupPushAmount = '...';
			source.groupPushAmount = '...';
			tableData.push(data);
			dataSource.push(source);
			json.pushReviewNumber = '...';
		}

		json.tableData = tableData;
		json.dataSource = dataSource;
		this.setState(json);
		tableDataJson.tableData = tableData;
		tableDataJson.dataSource = dataSource;
		if (groupType && getUserNumberStatus) {
			this.getUserNumber(groupType, tableDataIndex ? tableDataNum : (tableDataNum || tableData.length - 1));
		}
	},
	delParams(params, current) {//重新定义上传参数格式后，删除初始的参数
		for (let i in current) {
			if (current.hasOwnProperty(i)) {
				delete params[i];
			}
		}
	},


	showAdvance() {
		this.setState({
			showAdvanceStatus: !this.state.showAdvanceStatus
		});
	},
	setUserNumber(value, modifyValue, index) {

		const self = this;
		let groupType = this.state.groupType;
		let dataSource = self.state.dataSource;
		let tableData = self.state.tableData;
		let data = {
			searching: false,
			totalReviewNumber: value
		};
		if (groupType) {

			// tableData[index].groupPushAmount = modifyValue;
			// dataSource[index].groupPushAmount = modifyValue;
			// data['pushReviewNumber' + index] = modifyValue;

		} else {

			let len = tableData.length;
			let pushReviewNumber = value;
			pushReviewNumber = pushReviewNumber.split(',');
			let prn = pushReviewNumber.join('');
			if (modifyValue) {
				if (len === 1) {
					return;
				}
				prn = prn - modifyValue;
				pushReviewNumber = prn / (len - 1);
			} else {
				pushReviewNumber = prn / len;
			}
			let arr = [];
			let num = 0;
			for (let i = 0; i < len; i++) {
				if (i === index) break;
				let nb = Math.floor(pushReviewNumber);
				arr.push(nb);
				if (i < len - 1) {
					num += nb;
				}
			}
			for (let i = 0; i < len; i++) {
				if (i === index) break;
				let perNum = i === len - 1 ? prn - num : arr.length ? arr[i] : 0;
				perNum = String(perNum);
				tableData[i].groupPushAmount = perNum;
				dataSource[i].groupPushAmount = perNum;
				data['pushReviewNumber' + i] = perNum;
			}
		}

		data.tableData = tableData;
		data.dataSource = dataSource;

		tableDataJson.tableData = tableData;
		tableDataJson.dataSource = dataSource;
		self.setState(data);
	},
	getUserNumberByGroupType(index) {
		let self = this;
		let dataSource = this.state.dataSource;
		let tableData = this.state.tableData;
		let options = {
			callback: function () {
				const clickGetUserNumberStatus = self.state.clickGetUserNumberStatus;
				if (clickGetUserNumberStatus) return;

				self.setState({
					clickGetUserNumberStatus: true
				});

				self.setState({
					// ['pushReviewNumber' + (len - 1)]: '...',
					searching: true,
					// userNumberText: '查询中...'
				});
			},
			userNuberCallback(result) {
				let value = result.value;
				value = value.split(',');
				value = value.join('');
				tableData[index].groupPushAmount = value;
				dataSource[index].groupPushAmount = result.value;

				self.setState({
					searching: false,
					['pushReviewNumber' + index]: value,
					['initPushReviewNumber' + index]: value,
					tableData: tableData,
					dataSource: dataSource,
				});

				tableDataJson.tableData = tableData;
				tableDataJson.dataSource = dataSource;
				self.remodify();
			},
			key: index
		};
		self.handleSubmit(null, 'getUserNumber', options);

	},
	remodify() {

		const status = this.checkNotSave();
		if (!status) return;
		this.setState({
			clickGetUserNumberStatus: false
		});
	},
	getUserNumber(type, index) {
		const self = this;
		let status = this.checkNotSave('getPush');
		if (!status) return;

		if (this.state.searching) return;
		if (this.props.form.getFieldValue('groupType')) {
			this.getUserNumberByGroupType(index);
			return;
		}
		// if (this.state.totalReviewNumber) {
		// 	this.handleSubmit(null, 'getUserNumber', function (values) {
		// 		self.setState({
		// 			searching: true,
		// 			// userNumberText: '查询中...'
		// 		});
		// 		self.setUserNumber(self.state.totalReviewNumber);
		// 	})
		// 	return;
		// }
		let options = {
			callback: function () {
				const clickGetUserNumberStatus = self.state.clickGetUserNumberStatus;
				if (clickGetUserNumberStatus) return;
				if (!self.state.groupType) {

					self.setState({
						clickGetUserNumberStatus: true
					});
				}
				self.setState({
					searching: true,
					// userNumberText: '查询中...'
				});
			},
			userNuberCallback(result) {
				self.setUserNumber(result.value);
			}
		};
		this.handleSubmit(null, 'getUserNumber', options);
	},
	addPush() {
		const self = this;
		if (this.state.permission===false && this.props.form.getFieldValue('userType')===1 && this.props.form.getFieldValue('userGroupId')) {
			message.error('用户群标签没权限');
			return;
		}
		let tableData = this.state.tableData;
		if (tableData.length === 20) {
			message.error('最大分组数量为20条');
			return;
		}
		this.handleSubmit(null, 'deal', function (values) {
			self.setState({
				addPush: true,//不同用户群时，从编辑用户群页面返回的时候做区分
				tableDataIndex: null,
				addPushData: values,
				tableDataNum: 0,
				addPushVisible: true
			});
		});
	},
	getContent(type, record, index) {
		let fn = this.delPush.bind(this, type, record, index);
		if (type === 'visiblePush') {
			fn = this.createGroupPush.bind(this, type);
		}
		return <div>
			<Button type="primary" className="color_bg mr10" onClick={this.togglePopover.bind(this, type)}>取消</Button>
			<Button onClick={fn}>确定</Button>
		</div>;
	},

	clearUserGroup(currentId, id) {
		if (currentId == id) {
			let data = {};
			data.userGroupName = null;
			data.userGroupDesc = null;
			data.pushReviewNumber = '...';
			_userGroupName = null;
			this.setState(data);
			this.props.form.setFieldsValue({
				userGroupId: null
			});
		}
	},
	togglePopover(type) {
		this.setState({
			[type]: !this.state[type]
		});
	},
	createGroupPush(type) {
		const self = this;
		if (this.state.pushStatus) return;
		let status = this.checkNotSave('getPush');
		if (!status) return;

		this.setState({
			pushStatus: true
		});

		const appId = utils.queryString('appId', window.location.href);
		let url = restapi.addTaskGroup;
		let tableData = this.state.tableData;
		let totalReviewNumber = this.state.totalReviewNumber;
		let num = 0;
		for (let i = 0; i < tableData.length; i++) {
			num += Number(tableData[i].groupPushAmount);
		}
		if (!this.state.groupType && totalReviewNumber) {
			let trn = totalReviewNumber.split(',');
			trn = trn.join('');
			trn = Number(trn);
			if (num > trn) {

				message.error('目标用户量相加不能超过' + totalReviewNumber);

				this.setState({
					pushStatus: false,
					[type]: false
				});
				return;
			}
		}
		// if (!tableData.length) {
		// 	message.error('请添加推送任务');
		// 	this.setState({
		// 		pushStatus: false,
		// 		[type]: false
		// 	});
		// 	return;
		// }


		this.handleSubmit(null, 'createPush', function (values) {
			if (self.props.form.getFieldValue('pushType')) {
				values.newsTasks = tableData;
			} else {
				values.noticeTasks = tableData;
			}
			let data = {
				appId: values.appId,
				groupJson: JSON.stringify(values)
			};
			ajax.post(url, data, function () {

				message.success('提交成功');
				window.location.hash = '/data/push/group/push?appId=' + appId;
			}, function () {
				self.setState({
					pushStatus: false,
					[type]: false
				});
			});
		});

	},
	handleSubmit(e, saveData, options) {
		let self = this;
		var callback;


		if (options && typeof options === 'function') {
			callback = options;
		}
		if (options && typeof options === 'object') {
			callback = options.callback;
			var userNuberCallback = options.userNuberCallback;
			var key = options.key;
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

				// return;
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
			if (userType === 5 && !values.tagIds) {//选了标签，但是该应用无标签
				return;
			}
			if (userType === 1 && (!values.userGroupId || values.userGroupId === 'null')) {//选了用户群，但是没有勾选列表
				return;
			}

			values.target = values['target' + userType];
			delete values['target' + userType];
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


			values.pushTimeInfo = {
				pushTimeType: values.pushTimeType,
				startTime: values.startTime && utils.dateFormat('yyyy-MM-dd hh:mm:ss', values.startTime),
				offLine: values.offLine,
				validTime: values.validTime
			};

			self.delParams(values, values.pushTimeInfo);
			delete values.tagIdsName;
			if (values.groupType === 0) {
				values.userTypeInfo = {
					userType: userType,
					userGroupId: values.userGroupId,
					target: values.target,
					tagIds: values.tagIds,
					scope: values.scope,
					userFilePath: values.userFilePath
				};

				self.delParams(values, values.userTypeInfo);
			}




			const pushType = self.props.form.getFieldValue('pushType');
			const appId = utils.queryString('appId', window.location.href);
			values.appId = appId;
			self.setState({
				visible: true
			});
			let tableData = self.state.tableData;
			if (tableData[key] && tableData[key].userTypeInfo) {
				values.userTypeInfo = tableData[key].userTypeInfo;
			}
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
			// self.setState({
			// 	pushReviewNumber: '...'
			// });
			// $.get(url,function(result){
			// 	console.log(url);
			// 	self.setState({
			// 		pushReviewNumber: result.value
			// 	});
			// });
			if (callback && typeof callback === 'function') { callback(values); }//分组推送的时候用到
			if (saveData === 'getUserNumber') {
				ajax.get(url, function (result) {
					self.setState({
						pushReviewNumber: result.value
					});
					if (userNuberCallback) { userNuberCallback(result, values); }
				}, null, { timeout: 300000 });
			}

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
					message: '请输入分组标题'
				}, {
					max: 32,
					message: '标题不能超过32个字'
				}, {
					validator: function (rule, value, callback) {

						if (value && value.length <= 32 && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						}
						callback();
					}
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
		let deal = utils.queryString('deal', window.location.href);
		if (!id) return;
		self.props.form.setFieldsValue({
			appId: id
		});

		if (!(deal && store.jsonData)) {//从用户群页面跳转回来带上deal参数
			tableDataJson = {};
		}

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
	changeRadio(e, type) {
		const self = this;
		const data = {};

		if (type === 'userGroupAuth') {
			data.permission = e.target.permission;
		}
		this.setState(data);
		var name = e.target.name;
		if (name === 'upload' || name === 'remove' || name === 'changeTarget' || name === 'tags') {//分组推送，(上传文件后触发、移除文件触发)，隐藏推送按钮
			this.setState({
				pushReviewNumber: '...'
			});
			return;
		}
		var value = e.target.value;
		data[name] = value;
		data.userGroupId = this.props.form.getFieldValue('userGroupId') || this.state.userGroupId;
		if ((name === 'noticeBarType' && this.props.form.getFieldValue('noticeBarType') === value) || (name === 'noticeExpandType' && this.props.form.getFieldValue('noticeExpandType') === value)) {
			return;//点击当前已经选中的项，不做处理
		}
		if (name === 'userGroupId') {
			data.userGroupName = e.target.label;
			data.userGroupDesc = e.target.expression;
			_userGroupName = e.target.label;
		} else {
			// if (name !== 'pushTimeType') {
			// 	data.userGroupName = null;
			// 	data.userGroupDesc = null;
			// 	_userGroupName = null;
			// 	_userGroupDesc = null;
			// }
		}
		if (name == 'distinct' && value == 0) {
			data.distinctTitle = [];
		}
		if ((name === 'userType' || name === 'userGroupId') && this.props.form.getFieldValue(name) !== value) {
			data.totalReviewNumber = false;
			data.pushReviewNumber = '...';
			data.clickRefresh = !this.state.clickRefresh;
		}
		if (name === 'groupType' && this.props.form.getFieldValue(name) !== value) {
			if (this.state.tableData.length) {
				data.clearTableVisible = true;
				data.userTypeStatus = this.state.userTypeStatus;
			} else {
				data.userTypeStatus = !this.state.userTypeStatus;
				data.clearUserFile = true;//用来判断是否需要默认显示uploadFileList
			}
			let initValue = value ? 0 : 1;

			// data.tableData = [];
			data.clearTableName = name;
			data.clearTableValue = initValue;
			data.currentClickRadio = name;

			self.setState(data);
			return;

		}
		if (name === 'pushType' && this.props.form.getFieldValue(name) !== value) {
			if (this.state.tableData.length) {
				data.clearTableVisible = true;
			}
			let initValue = value ? 0 : 1;

			// data.tableData = [];
			data.clearTableName = name;
			data.clearTableValue = initValue;
			data.currentClickRadio = name;

			self.setState(data);
			return;

		}
		if (name === 'scope' && this.props.form.getFieldValue(name) !== value) {
			data.pushReviewNumber = '...';
		}
		this.setState(data);
		this.props.form.setFieldsValue(data);
		this.restoreStatus(name, value);
		this.showButton(name, value);
	},
	clearTabelOk() {
		let data = {
			clearTableVisible: false
		};
		if (this.state.currentClickRadio === 'groupType') {
			data.totalReviewNumber = false;
			data.pushReviewNumber = '...';

			data.clearUserFile = true;
			data.userTypeStatus = !this.state.userTypeStatus;//用于控制指定用户的显示隐藏
		}
		this.setState(data);
		let dataSource = this.state.dataSource;
		let json = {
			dataSource: [],
			tableData: []
		};
		for (let i = 0; i < dataSource.length; i++) {
			json['pushReviewNumber' + i] = '...';
		}
		this.setState(json);
		tableDataJson.dataSource = [];
		tableDataJson.tableData = [];
	},
	clearTabelCancel() {
		let data = {
			clearTableVisible: false
		};
		this.props.form.setFieldsValue({
			[this.state.clearTableName]: this.state.clearTableValue
		});
		if (this.state.currentClickRadio === 'groupType') {
			data.groupType = this.state.groupType ? 0 : 1;
		}

		this.setState(data);
	},
	showButton(name, value) {

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
	uploadBigImg(type, url, value) {//上传图片的dom结构
		let data = {
			size: 'small',
			height: 70,
			uploadDom: <div className="upload_area">
				<Upload {...this.uploadParam(url) }>
					<Button type="primary" size="large">添加图片{this.state[url + 'loading'] ? <Icon type="loading" /> : <span></span>}</Button>


				</Upload>

				<p className="tips">
					推荐尺寸525*100，100KB以内
					<span style={{ display: this.state.smallImageDisplay }} className="pl10 color_error">请上传图片</span>
				</p>
			</div>
		};
		if (value === 2) {
			data.size = 'big';
			data.height = 182;
			data.uploadDom = <div className="upload_area upload_area_big">
				<Upload {...this.uploadParam(url) }>
					<Button type="primary" size="large">添加图片{this.state[url + 'loading'] ? <Icon type="loading" /> : <span></span>}</Button>
					<p style={{ display: this.state.bigImageDisplay }} className="pl10 color_error">请上传图片</p>

				</Upload>
				<p>推荐尺寸700*400，200KB以内</p>
			</div>;
		}
		return (this.props.form.getFieldValue(type) === value) ?

			<div>
				<div className="upload_img">
					<div className="">
						{this.props.form.getFieldValue(url) ?
							<div className={data.size + '_img'}>
								<img onMouseOver={this.imgOver.bind(this, data.size)} width="300" height={data.height} src={this.props.form.getFieldValue(url)} />

								<div onMouseOver={this.eventPre} onMouseOut={this.imgOut.bind(this, data.size)} style={{ display: this.state[data.size + 'layerDisplay'] }} className="close_img">
									<Upload className={data.size + '_img_btn'} {...this.uploadParam(url) }>
										<Button onMouseOut={this.eventPre} onMouseOver={this.imgOver.bind(this, data.size)} type="primary" size="large">更换图片{this.state[url + 'loading'] ? <Icon type="loading" /> : <span></span>}</Button>


									</Upload>
									<div className="close_icon" onMouseOut={this.eventPre} onMouseOver={this.imgOver.bind(this, data.size)}><Icon onClick={this.closeImg.bind(this, url, data.size)} type="cross-circle" /></div>
								</div>
							</div>
							:
							data.uploadDom

						}
					</div>


				</div>
			</div> : null;
	},
	handleCancel() {
		this.setState({
			visible: false,
			addPushVisible: false,
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
			let data = {
				appId: appId
			};
			if (!this.state.groupType) {
				data.pushReviewNumber = '...';
			}
			this.setState(data);
			this.getAppInfo();
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
				limitRate: result.value.limitRatem,
				msgCacheStatus: result.value.msgCache
			});
		});
	},
	componentWillUnmount: function () {
		if (document.querySelector('#createPush')) document.querySelector('#createPush').className = '';

	},
	setUserTypeGroup(result) {
		result = result.items;
		const len = result.length;
		_userGroupName = null;
		const id = utils.queryString('id', window.location.href);
		for (let i = 0; i < len; i++) {
			if (id == result[i].id) {
				this.setState({
					userGroupName: result[i].name
				});
			}
		}
	},
	componentDidMount() {
		let self = this;
		if (document.querySelector('#createPush')) document.querySelector('#createPush').className = 'active';
		// _noticeExpandContent = '';
		const appId = utils.queryString('appId', window.location.href);
		let dataJson = {
			appId: appId
		};
		if (tableDataJson.tableData) {
			dataJson.tableData = tableDataJson.tableData;
			dataJson.dataSource = tableDataJson.dataSource;
		}
		this.setState(dataJson);
		const deal = utils.queryString('deal', window.location.href);
		const id = utils.queryString('id', window.location.href);
		if (deal && store.jsonData) {//从用户群页面跳转回来带上deal参数
			let stateData = {
				groupType: store.jsonData.groupType,
				userType: 1,
				userGroupId: id
			};
			let tableData = tableDataJson && tableDataJson.tableData;
			if (tableData && tableData.length) {
				// stateData.pushReviewNumber = true;
				for (let i = 0; i < tableData.length; i++) {
					if (tableData[i].groupPushAmount === '...') {//如果table列表里有未查询用户数量的就不显示推送按钮
						stateData.pushReviewNumber = '...';
					}
					stateData['pushReviewNumber' + i] = tableData[i].groupPushAmount;
				}
			}
			let pushTimeInfo = store.jsonData.pushTimeInfo;
			if (store.jsonData.groupType === 1) {
				stateData.userTypeStatus = false;//隐藏指定用户选项
				stateData.addPushVisible = true;//自动显示弹出层
				if (pushTimeInfo) {

					stateData.startTime = pushTimeInfo.startTime;
				}
			}
			this.setState(stateData);
			store.jsonData.userType = 1;
			store.jsonData.userGroupId = id;
			if (pushTimeInfo && pushTimeInfo.pushTimeType === 1) {

				store.jsonData.startTime = new Date(pushTimeInfo.startTime);
			}
			if (pushTimeInfo) {

				store.jsonData.offLine = pushTimeInfo.offLine;
				store.jsonData.pushTimeType = pushTimeInfo.pushTimeType;
				store.jsonData.validTime = pushTimeInfo.validTime;
			}
			self.setState(store.jsonData);
			self.props.form.setFieldsValue(store.jsonData);
		} else {
			tableDataJson = {};
			window.vedioFilePathJson = {};
			self.props.form.setFieldsValue(this.state);
		}
		this.getAppInfo(function (appIconUrl) {
			self.props.form.setFieldsValue({
				noticeImgUrl: appIconUrl
			});
			//放接口回调后面
			const taskId = utils.queryString('taskId', window.location.href);

			if (taskId) {
				let url = restapi.pushTaskCopy;
				url = utils.makeUrl(url, {
					taskId: taskId,
					appId: appId
				});
				ajax.get(url, function (result) {
					const value = result.value;
					const parameters = value.clickTypeInfo.parameters;
					const clickType = value.clickTypeInfo.clickType;
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
						['parameters' + type]: value.clickTypeInfo.parameters,
						clickType: value.clickTypeInfo.clickType,
						url: value.clickTypeInfo.url,
						customAttribute: value.clickTypeInfo.customAttribute,
						// fixDisplay: value.advanceInfo.fixDisplay?1:0,
						msgCache: value.advanceInfo.msgCache ? 1 : 0,
						suspend: value.advanceInfo.suspend ? 1 : 0,
						clearNoticeBar: value.advanceInfo.clearNoticeBar ? 1 : 0,
						fixSpeed: value.advanceInfo.fixSpeed ? 1 : 0,
						fixSpeedRate: value.advanceInfo.fixSpeedRate,
						distinct: value.advanceInfo.distinct ? 1 : 0,
						noticeImgUrl: value.advanceInfo.noticeImgUrl,
						vibrate: value.advanceInfo.notificationType.vibrate ? 1 : 0,
						lights: value.advanceInfo.notificationType.lights ? 1 : 0,
						sound: value.advanceInfo.notificationType.sound ? 1 : 0,
						offLine: value.pushTimeInfo.offLine ? 1 : 0,
						validTime: value.pushTimeInfo.validTime
						// userType:value.userTypeInfo.userType
					};
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
						noticeBarType: value.noticeBarInfo.noticeBarType,
						msgCacheStatus: value.advanceInfo.msgCacheStatus,
						offLine: value.pushTimeInfo.offLine ? 1 : 0
					});
					self.showAdvance();
				});
			}

		});






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
			fixEndDisplayTime: endTime || value,
			fixStartDisplayTime: startTime || value,
		});
	},
	checkNotSave() {
		let status = true;
		let tableData = this.state.tableData;
		let len = tableData.length;
		let arr = [];
		for (let i = 0; i < len; i++) {
			arr.push('pushReviewNumber' + i + 'Status');
		}
		for (let i = 0; i < arr.length; i++) {
			if (this.state[arr[i]]) {
				// let data = {
				// 	[arr[i]]: !this.state[arr[i]]
				// }
				message.error('你有未保存的选项');
				// if(type==='blur'){
				// 	data['pushReviewNumber'+i]=this.state.totalReviewNumber;
				// }

				status = false;
			}
		}
		return status;
	},

	modify(e) {
		let json = {};

		const status = this.checkNotSave();
		if (!status) return;
		json[e.target.className] = true;
		json.clickGetUserNumberStatus = true;
		this.setState(json);
	},
	save(name, evt) {
		let totalReviewNumber = this.state.totalReviewNumber;
		totalReviewNumber = String(totalReviewNumber).split(',');
		totalReviewNumber = totalReviewNumber.join('');
		let tableData = this.state.tableData;
		name = String(name[0]);
		let num = name.split('pushReviewNumber');
		num = Number(num[1]);
		evt.stopPropagation();
		const self = this;
		let json = {};
		let value = self.state[name];
		tableData[num].groupPushAmount = value;
		json[name] = value;
		json[name + 'Status'] = false;
		if (this.state.groupType) {
			let initNum = this.state['initPushReviewNumber' + num];
			if (Number(value) > Number(initNum)) {
				message.error('目标用户数量最大为：' + initNum);
				return;

			}
			// this.setUserNumber(initNum, value, num);
		} else {
			if (Number(value) > Number(totalReviewNumber)) {
				message.error('目标用户数量最大为：' + totalReviewNumber);
				return;

			}
			// this.setUserNumber(totalReviewNumber, value, num);
		}
		json.clickGetUserNumberStatus = false;
		self.setState(json);

	},
	keyup(e) {
		let json = {};
		let value = e.target.value;
		value = !value ? '0' : value;
		json[e.target.name] = value;
		this.setState(json);
	},
	delPush(type, record, index) {
		let tableData = this.state.tableData;
		let dataSource = this.state.dataSource;
		tableData.splice(index, 1);
		dataSource.splice(index, 1);
		let json = {};
		for (let i = 0; i < tableData.length; i++) {
			json['pushReviewNumber' + i] = tableData[i].groupPushAmount;
			json['initPushReviewNumber' + i] = tableData[i].groupPushAmount;
		}
		json[type] = !this.state[type];
		json.tableData = tableData;
		json.dataSource = dataSource;
		if (!this.state.groupType) {
			// json['pushReviewNumber' + index] = false;
			json.pushReviewNumber = '...';
		}
		this.setState(json);
		tableDataJson.tableData = tableData;
		tableDataJson.dataSource = dataSource;
		// this.setUserNumber(this.state.totalReviewNumber);
	},
	modifyPush(record, index) {
		const self = this;
		let tableData = this.state.tableData;
		this.handleSubmit(null, null, function (values) {
			self.setState({
				tableDataIndex: tableData[index],
				tableDataNum: index,
				addPushData: values,
				addPushVisible: true
			});
		});
	},
	getTooltipContainer() {
		return document.getElementById('groupTable');
	},
	getInfo() {
		return <span>
			<Tooltip getTooltipContainer={this.getTooltipContainer} title='目标用户量获取后可点击修改'><i className="fs14 color999 fw_n cursor_p anticon anticon-info-circle-o"></i></Tooltip>
			目标用户量
		</span>;
	},
	render() {
		let self = this;
		const { getFieldProps } = this.props.form;
		let opacityLayer = <div
			style={{
				display: self.state.clickGetUserNumberStatus ? '' : 'none',
				position: 'absolute',
				left: 0,
				top: 0,
				width: '100%',
				height: '100%',
				background: '#ccc',
				opacity: 0.5,
				zIndex: 999
			}}>
		</div>;
		let columns = [{
			title: '标题/备注',
			key: '1',
			dataIndex: 'title',
			render(text) {
				if (text.length > 9) {
					return <Tooltip title={text}>
						<span className='ellipsis display_ib' style={{ width: 200 }}>{text}</span>
					</Tooltip>;
				} else {
					return text;
				}
			},
			width: 200
		}, {
			title: '内容',
			key: '2',
			dataIndex: 'content',
			render(text) {
				if (text.length > 9) {
					return <Tooltip title={text}>
						<span className='ellipsis display_ib' style={{ width: 200 }}>{text}</span>
					</Tooltip>;
				} else {
					return text;
				}
			},
			width: 200
		}, {
			title: '目标用户',
			key: '3',
			dataIndex: 'userTypeInfo',
			render(text, record) {
				let filename = '';
				let name = '';
				let tags = '';
				if (self.state.groupType) {//不同用户群
					filename = record.userFileName;
					filename = filename && (filename.indexOf('.') > -1 ? filename : null);
					name = record.userGroupName;
					tags = (!record.groupPushScope ? '并集：' : '交集：') + record.tagIdsName;
				} else {
					text = self.props.form.getFieldValue('userType') || self.state.userType;
					filename = self.props.form.getFieldValue('target' + text);
					filename = filename && (filename.indexOf('.') > -1 ? filename : null);
					name = _userGroupName || self.state.userGroupName;
					tags = (!self.state.scope ? '并集：' : '交集：') + (self.props.form.getFieldValue('tagIdsName') || '');
				}
				switch (text) {
					case 1:

						text = '用户群' + (name ? '(' + name + ')' : '');
						break;
					case 2:
						text = 'PushId' + (filename ? '(' + filename + ')' : '');
						break;
					case 6:
						text = 'IMEI' + (filename ? '(' + filename + ')' : '');
						break;
					case 3:
						text = 'Flyme账户' + (filename ? '(' + filename + ')' : '');
						break;
					case 4:
						text = '别名' + (filename ? '(' + filename + ')' : '');
						break;
					case 5:
						text = '标签' + '(' + tags + ')';
						break;

					default:
						break;
				}
				if (text.length > 9) {
					return <Tooltip title={text}>
						<span className='ellipsis display_ib' style={{ width: 180 }}>{text}</span>
					</Tooltip>;
				} else {
					return text;
				}
			},
			width: 180
		}, {
			title: this.getInfo(),
			key: '4',
			dataIndex: 'groupPushAmount',
			render(text, record, index) {
				let pn = ['pushReviewNumber' + index];
				let pnStatus = ['pushReviewNumber' + index + 'Status'];
				let pushReviewNumber = self.state['pushReviewNumber' + index];
				if (pushReviewNumber && pushReviewNumber !== '...' && pushReviewNumber.indexOf(',') < 0) {
					pushReviewNumber = String(pushReviewNumber);

					pushReviewNumber = pushReviewNumber.split('');
					let len = pushReviewNumber.length;
					for (let i = len - 1; i >= 0; i--) {
						if (len - 1 - i)
							if ((len - 1 - i) % 3 === 0 && len - 1 !== i) {
								pushReviewNumber[i] += ',';
							}
					}
				}
				if (record.groupPushAmount === '...') {
					pushReviewNumber = false;
				}
				// if (record.groupPushAmount) {
				// 	pushReviewNumber = record.groupPushAmount;
				// }
				let html =
					<FormItem style={{ marginBottom: 0 }} label="">
						{self.state[pnStatus] ?
							<span>
								<Input min='1' type="number" className="Modify" defaultValue={self.state[pn]} name={pn} onChange={self.keyup} style={{ width: 100 }} />
								<Button onClick={self.save.bind(self, pn)} size="large" className="btn_normal_show ml10 w_60 " type="ghost">
									<span className="Modify">保存</span>
								</Button>
							</span>
							:
							<span>{pushReviewNumber ? <span className={pnStatus} onClick={self.modify}>{pushReviewNumber}</span> : '...'}</span>
						}
					</FormItem>;


				return html;
			},
			width: 150
		}, {
			title: '操作',
			key: '5',
			render(text, record, index) {
				let visibleDel = 'visibleDel' + index;
				return <div style={{ position: 'relative' }}>
					{opacityLayer}
					<i onClick={self.modifyPush.bind(self, record, index)} className="i_edit"></i>
					<Popover
						placement="bottom"
						visible={self.state[visibleDel]}
						content={self.getContent(visibleDel, record, index)}
						title={'确定删除?'}
						onVisibleChange={self.togglePopover.bind(self, visibleDel)}
						trigger="click"   >
						<i className="i_del"></i>

					</Popover>

				</div>;
			},
			width: 90
		}];
		let dataSource = tableDataJson.dataSource || this.state.dataSource;
		return (
			<Form horizontal>

				<Row>
					<Col span="24" className="col_left">

						<FormItem {...formItemLayout} label="标题&nbsp;&nbsp;&nbsp;&nbsp;">
							<Input placeholder='请输入分组标题' style={{ width: 400 }} {...this.validateTitle('groupName') } />
						</FormItem>
						<div style={{ position: 'relative' }}>
							{opacityLayer}
							<FormItem {...formItemLayout} label="推送消息类型&nbsp;&nbsp;&nbsp;&nbsp;">
								<RadioGroup {...getFieldProps('pushType', {
									initialValue: this.props.form.getFieldValue('pushType'),
									onChange: this.changeRadio
								}) }>
									<Radio name="pushType" value={0}>通知</Radio>
									<Radio name="pushType" value={1}>透传消息</Radio>

								</RadioGroup>
							</FormItem>

							<FormItem {...formItemLayout} label="目标用户类型&nbsp;&nbsp;&nbsp;&nbsp;">
								<RadioGroup {...getFieldProps('groupType', {
									initialValue: this.props.form.getFieldValue('groupType'),
									onChange: this.changeRadio
								}) }>
									<Radio name="groupType" value={0}>相同用户群</Radio>
									<Radio name="groupType" value={1}>不同用户群</Radio>

								</RadioGroup>
							</FormItem>


							{this.state.userTypeStatus ?


								<UserType
									form={this.props.form}
									formItemLayout={formItemLayout}
									getFieldProps={getFieldProps}
									scope={this.state.scope}
									clearUserGroup={this.clearUserGroup}
									userType={this.props.form.getFieldValue('userType') || 2}
									handleSubmit={this.handleSubmit}
									groupPush={true}
									clearUserFile={this.state.clearUserFile}
									userGroupId={this.state.userGroupId}
									type={this.props.pushType}
									setUserTypeGroup={this.setUserTypeGroup}
									flymeAuth={this.state.flymeAuth}
									appId={utils.queryString('appId', window.location.href)}
									changeRadio={this.changeRadio}>
								</UserType>
								: null}


							<PushTimeType
								formItemLayout={formItemLayout}
								getFieldProps={getFieldProps}
								onChangePushTime={this.onChangePushTime}
								pushTimeStatus={this.state.endTimeStatus}
								pushTimeType={this.props.form.getFieldValue('pushTimeType')}
								changeRadio={this.changeRadio}>
							</PushTimeType>

							<ValidateTime form={this.props.form} offLine={this.state.offLine} formItemLayout={formItemLayout} getFieldProps={getFieldProps} ></ValidateTime>
							<FormItem  {...formItemLayout} label="&nbsp;">
								<Button style={{ marginBottom: 10 }} onClick={this.addPush} type="primary" size="large">添加推送内容</Button>
							</FormItem>
						</div>
						{dataSource && dataSource.length ?
							<div id='groupTable'>
								<Table style={{ marginBottom: 20 }} pagination={false} columns={columns} dataSource={dataSource} />
							</div>
							: null}
						{dataSource && dataSource.length && !this.state.groupType ? <FormItem  {...formItemLayout} label="&nbsp;">
							<Button disabled={this.state.clickGetUserNumberStatus ? true : false} type="primary" onClick={this.getUserNumber} size="large">获取目标用户</Button>
							{this.state.clickGetUserNumberStatus ?
								<Button type="primary" style={{ marginLeft: 20 }} onClick={this.remodify} size="large">重新编辑</Button>
								: null}
							{this.state.searching ? <span style={{ paddingLeft: 20 }}>正在查询用户数，请等待...</span> : <span></span>}
						</FormItem> : null}
						{dataSource && dataSource.length ? <FormItem  {...formItemLayout} label="&nbsp;">
							<Popover
								placement="top"
								visible={self.state.visiblePush}
								content={self.getContent('visiblePush')}
								title={'确定推送?'}
								onVisibleChange={this.togglePopover.bind(this, 'visiblePush')}
								trigger="click"   >
								{this.state.pushReviewNumber !== '...' ?
									<span style={{ position: 'relative' }}>
										<Button type="primary" size="large">推送</Button>
										{this.state.pushStatus ? <div style={{ position: 'absolute', left: 130, top: -5, width: 120 }}>推送中...</div> : <span></span>}
									</span>
									:
									this.state.groupType ? <span>正在查询用户数，请等待...</span> : <span></span>
								}

							</Popover>

						</FormItem> : null}

					</Col>

				</Row>
				<AddPushModal
					handleCancel={this.handleCancel}
					form={this.props.form}
					totalReviewNumber={this.state.totalReviewNumber}
					addPushData={this.state.addPushData}
					tableDataIndex={this.state.tableDataIndex}
					addPush={this.state.addPush}
					setTableData={this.setTableData}
					smallImageDisplay={this.state.smallImageDisplay}
					flymeAuth={this.state.flymeAuth}
					pushType={this.props.form.getFieldValue('pushType') ? 'message' : 'notice'}
					groupType={this.props.form.getFieldValue('groupType')}
					visible={this.state.addPushVisible} />
				<Modal
					width={700}
					onCancel={this.clearTabelCancel}
					onOk={this.clearTabelOk}
					title='系统提示'
					visible={this.state.clearTableVisible} >
					<div style={{ margin: '20px 0 20px 30px' }}>切换{this.state.clearTableName === 'pushType' ? '推送消息类型' : '目标用户类型'}将会清除本任务所有已编辑内容，请确定是否切换？</div>



				</Modal>
			</Form>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;
