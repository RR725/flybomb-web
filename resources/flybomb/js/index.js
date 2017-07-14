'use strict';
import React from 'react';
import {
	Button, Row, Col, Checkbox, Select, message, Form, Input
} from 'antd';


const Option = Select.Option;
const FormItem = Form.Item;

// 保存之前输入的展开方式文本
window._userGroupDesc = null;
window._userGroupName = null;
window.vedioFilePathJson = {};
window.smallImageFilePathJson = {};
window.bigImageFilePathJson = {};



import ProductTypeApp from '../producttype-app'; //产品类型和应用的下拉列表

import restapi from '../../lib/url-model';
import ajax from '../../components/ajax';
import utils from '../../lib/utils';


import ValidateTime from '../create-push/component/valid-time';  //有效时长
import PushTimeType from '../create-push/component/push-time-type';  //推送时间
import UserType from '../create-push/component/user-type';  //指定用户
import PushModal from '../create-push/component/modal';  //弹出层
import Distinct from '../create-push/component/distinct';  //消息去重
import PreviewPush from '../create-push/component/preview-push';//预推测试
import AdvanceSetting from '../create-push/component/advance-setting';//高级选项

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
			listMaterial: [],
			listSceneTag: [],
			scheneTagsName: '无',
			percentNum: 0,
			offLine: 1,
			displayBlackList: 'none',
			blackList: [],
			onlyWifi: 1,
			materialIds: [],
			distinctId: [],
			displayDistinct: 'none',
			scope: 0,//并集or交集
			userType: 1, //指定用户
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

	handleOk() {
		const self = this;
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
		ajax.post(restapi.addPersonalizeNotice, data, function () {

			message.success('提交成功');
			window.location.hash = '/data/push/record?appId=' + appId;

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
	// userExists(rule, value, callback) {
	// 	callback();
	// },
	validatePushPercent(type) {
		const {
			getFieldProps, validateFields
		} = this.props.form;
		const self = this;
		return getFieldProps(type, {
			validate: [{
				rules: [{
					// 	required: true,
					// 	message: '请输入百分比值'
					// }, {
					validator: function (rule, value, callback) {
						if (String(value).indexOf('.') > -1) {
							value = Math.ceil(value);
							self.props.form.setFieldsValue({
								[type]: value
							});
						}
						let pushReviewNumber = self.state.pushReviewNumber;
						pushReviewNumber = pushReviewNumber.split(',');
						pushReviewNumber = pushReviewNumber.join('');
						if (!(pushReviewNumber === '...')) {
							let percentNum = Math.ceil(pushReviewNumber * value / 100);
							percentNum = String(percentNum);
							percentNum = percentNum.split('');
							let len = percentNum.length;
							for (let i = len - 1; i >= 0; i--) {
								if (len - 1 - i)
									if ((len - 1 - i) % 3 === 0 && len - 1 !== i) {
										percentNum[i] += ',';
									}
							}
							if (value) {
								self.setState({
									percentNum: percentNum
								});
							}

						}
						if (value && value > 100) {
							// callback(new Error('百分比不能大于100%'));
							self.props.form.setFieldsValue({
								[type]: 100
							});
							validateFields([type], { force: true });
						}
						if (value && value < 1) {
							// callback(new Error('百分比不能小于1%'));
							self.props.form.setFieldsValue({
								[type]: 1
							});
							validateFields([type], { force: true });
						}
						callback();
					}
				}],
				trigger: ['onBlur', 'onChange']
			}]

		});
	},
	validateTitle(type) {
		const {
			getFieldProps
		} = this.props.form;

		return getFieldProps(type, {
			validate: [{
				rules: [{
					required: true,
					message: '请输入标题'
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

	componentWillMount() {
		let self = this;
		let id = utils.queryString('appId', window.location.href);
		if (!id) return;
		self.props.form.setFieldsValue({
			appId: id
		});
	},
	changeCheckbox(distinctId, distinctTitle) {
		this.setState({
			distinctId: distinctId,
			distinctTitle: distinctTitle
		});
	},
	clearUserGroup() {
		let data = {};
		data.userGroupName = null;
		data.userGroupDesc = null;
		data.showSearch = false;
		data.percentNum = 0;
		window._userGroupName = null;
		window._userGroupDesc = null;
		this.setState(data);
		this.props.form.setFieldsValue({
			userGroupId: null
		});
	},
	changeRadio(e) {
		const data = {};
		var name = e.target.name;
		var value = e.target.value;
		data[name] = value;

		if (name === 'userType' && this.props.form.getFieldValue('userType') !== value) {
			data.showSearch = false;
			data.percentNum = 0;
			data.pushReviewNumber = '...';
		}

		if (name === 'userGroupId') {
			data.userGroupName = e.target.label;
			data.userGroupDesc = e.target.expression;
			window._userGroupName = e.target.label;
			window._userGroupDesc = e.target.expression;
			if (this.state.userGroupId !== value) {
				data.showSearch = false;
				data.percentNum = 0;

				data.pushReviewNumber = '...';
			}
		}
		if (name == 'distinct' && value == 0) {
			data.distinctTitle = [];
		}
		this.setState(data);
		this.props.form.setFieldsValue(data);
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
				showSearch: false,
				pushReviewNumber: '...',
				percentNum: 0,
				appId: appId
			});
			this.getAppInfo();
			this.getBlackList();
			this.getMaterial();
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
		if (document.querySelector('#personalPush')) document.querySelector('#personalPush').className = '';
		if(!this.state.jumpUserGroup){
			store.jsonData=null;
		}

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
				window._userGroupName = result[i].name;
				window._userGroupDesc = result[i].userGroupDesc;
			}
		}
	},
	componentDidMount() {
		let self = this;
		if (document.querySelector('#personalPush')) document.querySelector('#personalPush').className = 'active';
		const appId = utils.queryString('appId', window.location.href);
		this.setState({
			appId: appId
		});
		this.getBlackList();
		const deal = utils.queryString('deal', window.location.href);
		const id = utils.queryString('id', window.location.href);

		if (deal && store.jsonData) {//从用户群页面跳转回来带上deal参数
			this.setState({
				userType: 1,
				userGroupId: id
			});
			store.jsonData.userType = 1;
			store.jsonData.userGroupId = id;
			let materialIds = [];
			for (let i in store.jsonData) {
				if (i.indexOf('materialId') > -1 && store.jsonData[i]) {
					let num = i.split('materialId')[1];
					materialIds.push(parseInt(num));
				}
			}
			store.jsonData.materialIds = materialIds;
			self.setState(store.jsonData);
			self.props.form.setFieldsValue(store.jsonData);

		} else {
			window.vedioFilePathJson = {};
			window.smallImageFilePathJson = {};
			window.bigImageFilePathJson = {};
			self.props.form.setFieldsValue(this.state);
		}
		this.getAppInfo(function (appIconUrl) {
			self.props.form.setFieldsValue({
				noticeImgUrl: appIconUrl
			});
		});
		this.getMaterial();
		this.getListSceneTag();

	},
	changeSceneTag(value, options) {
		let json = {
			scheneTagsName: options.props.children
		};
		if (value !== 'null') {
			json.scheneTagsId = Number(value);
		} else {
			json.scheneTagsId = null;
		}
		this.setState(json);
	},
	getListSceneTag() {

		let self = this;
		const appId = utils.queryString('appId', window.location.href);
		ajax.post(restapi.listSceneTag, { appId: appId }, function (result) {
			self.setState({
				listSceneTag: result.value
			});
		});
	},
	getMaterial() {

		let self = this;
		const appId = utils.queryString('appId', window.location.href);
		ajax.post(restapi.listMaterial, { appId: appId }, function (result) {
			self.setState({
				listMaterial: result.value
			});
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
	validateData(saveData, type, callback) {
		let percentRequire = false;

		if (type === 'push') {
			percentRequire = true;

		}
		this.setState({
			percentRequire: percentRequire
		});
		const appId = utils.queryString('appId', window.location.href);
		const self = this;
		this.props.form.validateFields((errors, values) => {
			const userType = values.userType;
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

			if (type === 'getUserNumber') {
				if (callback) {
					callback(appId, values);
				}

				return;
			}
			if ((+new Date(values.fixStartDisplayTime)) > (+new Date(values.fixEndDisplayTime))) {
				return;
			}
			const materialIds = self.state.materialIds;
			if (!materialIds.length) {
				self.setState({
					materialDisplay: true
				});
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
				if (i.indexOf('distinctId') > -1 || i.indexOf('materialId') > -1) {
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
			if (type === 'push' && !self.props.form.getFieldValue('pushPercent')) {

				return;
			}
			// if (errors && Object.keys(errors).length === 0) {
			// 	errors = null;
			// }
			if (errors) {
				console.log(errors);
				console.log('Errors in form!!!');
				return;
			}
			values.noticeBarInfo = {
				title: values.title.trim()
			};
			self.delParams(values, values.noticeBarInfo);

			values.pushRuleInfo = {
				pushMaterialId: materialIds.join(',')
			};
			let scheneTagsId = this.state.scheneTagsId;
			if (scheneTagsId && scheneTagsId !== 'null') {
				values.pushRuleInfo.scheneTagId = scheneTagsId;
				values.pushRuleInfo.scheneTagName = this.state.scheneTagsName;
			}
			self.delParams(values, values.pushRuleInfo);


			values.pushTimeInfo = {
				pushTimeType: values.pushTimeType,
				startTime: values.startTime && utils.dateFormat('yyyy-MM-dd hh:mm:ss', values.startTime),
				offLine: values.offLine,
				validTime: values.validTime
			};

			self.delParams(values, values.pushTimeInfo);
			delete values.tagIdsName;

			values.userTypeInfo = {
				userType: userType === 2 ? 6 : userType,
				userGroupId: values.userGroupId,
				target: values.target,
				pushPercent: values.pushPercent,
				userFilePath: values.userFilePath
			};

			self.delParams(values, values.userTypeInfo);

			values.advanceInfo = {
				blackId: values.blackId,
				black: values.black,
				distinct: values.distinct,
				distinctId: values.distinctId
			};
			self.delParams(values, values.advanceInfo);
			values.appId = appId;
			if (values.advanceInfo.black && values.advanceInfo.blackId === '') {
				self.setState({
					showAdvanceStatus: true
				});
				return;
			}
			self.setState({
				requestData: values
			});
			if (callback) {
				callback(appId, values);
			}
		});
	},
	getUserNumber(saveData) {
		if (this.state.searching) return;
		let self = this;
		const { validateFields } = self.props.form;
		this.validateData(saveData, 'getUserNumber', function (appId, values) {

			const userType = values.userType;
			values.userTypeInfo = {
				userType: userType === 2 ? 6 : userType,
				userGroupId: values.userGroupId,
				target: values.target,
				pushPercent: values.pushPercent,
				userFilePath: values.userFilePath
			};

			self.delParams(values, values.userTypeInfo);
			let url = restapi.getPushCount;
			let pushData = {
				appId: appId,
				userTypeInfo: values.userTypeInfo
			};
			url = utils.makeUrl(url, {
				appId: appId,
				pushType: 0,
				json: JSON.stringify(pushData)
			});
			self.setState({
				pushReviewNumber: '...',
				searching: true,
				percentNum: 0,
				showSearch: true
			});

			ajax.get(url, function (result) {
				self.setState({
					pushReviewNumber: result.value,
					searching: false
				});

				validateFields(['pushPercent'], { force: true });
			}, function () {
				self.setState({
					showSearch: false,
					searching: false
				});
			}, { timeout: 300000 });
		});

	},
	handleSubmit(e, saveData) {
		if (saveData === 'deal') {//如果是跳转到用户群页面，设置一个状态
			this.setState({
				jumpUserGroup: true
			});
		}

		let self = this;
		if (this.state.pushReviewNumber === '0') {
			message.error('预计推送人数为0，不可以创建推送任务');
			return;
		}
		this.validateData(saveData, 'push', function (appId, values) {
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
			self.setState({
				visible: true//如果是分组推送不需要再弹出详情框
			});


		});
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
	changeMaterial(e) {
		let materialId = e.target.data.materialId;
		let checked = e.target.checked;
		let materialIds = this.state.materialIds;
		if (checked) {
			materialIds.push(materialId);
		} else {
			materialIds = materialIds.filter(function (data) {
				return data !== materialId;
			});
		}
		let json = {
			materialIds: materialIds
		};
		json.materialDisplay = materialIds.length ? false : true;
		this.setState(json);
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
	render() {
		let pushType = 'notice';
		let self = this;
		const { getFieldProps } = this.props.form;
		let listMaterial = this.state.listMaterial;
		let jsonData = store.jsonData;
		let materialHtml = listMaterial.map(function (data, key) {
			let checked = jsonData ? jsonData['materialId' + data.materialId] : false;
			return <FormItem className="mg0" key={key}>
				<label>
					<Checkbox defaultChecked={checked} data={data} title={data.title}  {...getFieldProps('materialId' + data.materialId, {
						onChange(e) {
							self.changeMaterial(e, key);
						}
					}) } />
					{data.title}<span className="pl10">数量：{data.total}</span>
				</label>
			</FormItem>;
		});
		if (!listMaterial.length) {
			materialHtml = <span className="color_error" >无数据　</span>;
		}
		let materialIds = this.state.materialIds;
		let selectListMaterial = listMaterial.filter(function (data) {
			for (let i = 0; i < materialIds.length; i++) {
				if (data.materialId === materialIds[i]) {
					return true;
				}
			}
			return false;
		});
		let listSceneTag = this.state.listSceneTag;
		let selectOptions = [<Option key="null" value="null">无</Option>];
		listSceneTag.map(function (data, key) {
			selectOptions.push(<Option key={key} value={String(data.fid)}>{data.fname}</Option>);
		});
		return (
			<Form horizontal id='detailTable'>

				<Row>
					<Col span="15" className="">


						<div>
							<FormItem {...formItemLayout} label="标题&nbsp;&nbsp;&nbsp;&nbsp;">
								<Input placeholder='请输入标题' style={{ width: 420 }} {...this.validateTitle('title') } />
							</FormItem>
							<FormItem className="push_rule" {...formItemLayout} label="内容选择&nbsp;&nbsp;&nbsp;&nbsp;">

								<div className="user_type " >
									{materialHtml}
									{this.state.materialDisplay && <span className="color_error" >请选择</span>}
								</div>
							</FormItem>
						</div>





						<div>
							<PushTimeType
								formItemLayout={formItemLayout}
								getFieldProps={getFieldProps}
								onChangePushTime={this.onChangePushTime}
								pushTimeStatus={this.state.endTimeStatus}
								pushTimeType={this.props.form.getFieldValue('pushTimeType')}
								changeRadio={this.changeRadio}>
							</PushTimeType>

							<ValidateTime form={this.props.form} offLine={this.state.offLine} formItemLayout={formItemLayout} getFieldProps={getFieldProps} ></ValidateTime>
						</div>


						<UserType
							form={this.props.form}
							formItemLayout={formItemLayout}
							getFieldProps={getFieldProps}
							scope={this.state.scope}
							userType={this.props.form.getFieldValue('userType')}
							handleSubmit={this.handleSubmit}
							personalPush={true}
							clearUserGroup={this.clearUserGroup}
							userGroupId={this.state.userGroupId}
							type={pushType}
							setUserTypeGroup={this.setUserTypeGroup}
							flymeAuth={this.state.flymeAuth}
							appId={utils.queryString('appId', window.location.href)}
							changeRadio={this.changeRadio}>
						</UserType>

						<FormItem {...formItemLayout} label="推送场景&nbsp;&nbsp;&nbsp;&nbsp;">
							<Select style={{ width: 582 }} defaultValue="null" onSelect={this.changeSceneTag}>
								{selectOptions}
							</Select>
						</FormItem>

						<Distinct
							form={this.props.form}
							formItemLayout={formItemLayout}
							appId={utils.queryString('appId', window.location.href)}
							getFieldProps={getFieldProps}
							displayDistinct={this.state.displayDistinct}
							changeCheckbox={this.changeCheckbox}
							distinct={this.props.form.getFieldValue('distinct')}
							pushType={pushType}
							changeRadio={this.changeRadio} >

						</Distinct>
						<FormItem  {...formItemLayout} label=" ">
							<Button type="primary" style={{ width: 130 }} onClick={this.getUserNumber} size="large">获取用户量</Button>
							<span style={{ paddingLeft: 10, display: this.state.showSearch ? '' : 'none' }}> {this.state.pushReviewNumber === '...' ? <span>查询中</span> : <span>用户量</span>} {this.state.pushReviewNumber}</span>
						</FormItem>
						<FormItem {...formItemLayout} label="数量筛选&nbsp;&nbsp;&nbsp;&nbsp;">
							<Input type='number' min={1} max={100} placeholder='请输入百分比值' className={!this.state.percentRequire ? '' : this.props.form.getFieldValue('pushPercent') ? '' : 'push_percent_input'} style={{ width: 130 }} {...this.validatePushPercent('pushPercent') } /> %
							<span style={{ paddingLeft: 10, display: !this.props.form.getFieldValue('pushPercent') ? 'none' : this.state.percentNum && this.state.percentNum != '0' ? '' : 'none' }}>用户量 {this.state.percentNum}</span>
							<span style={{ color: '#f50', display: !this.state.percentRequire ? 'none' : this.props.form.getFieldValue('pushPercent') ? 'none' : '' }}>请输入百分比值</span>
						</FormItem>

						<AdvanceSetting
							personalPush={true}
							form={this.props.form}
							formItemLayout={formItemLayout}
							getFieldProps={getFieldProps}
							appId={utils.queryString('appId', window.location.href)}
							blackList={this.state.blackList}
							black={this.state.black}
							changeBlack={this.changeBlack}
							displayBlackList={this.state.displayBlackList}
							tableDataIndex={this.props.tableDataIndex}
							changeIcon={this.changeIcon}
							showAdvanceStatus={true}
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
								type={pushType}
								groupPush={this.props.groupPush}
								form={this.props.form}
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
					personalPush={true}
					listMaterial={selectListMaterial}
					materialIds={this.state.materialIds}
					noticeImgUrl={this.state.noticeImgUrl || this.props.form.getFieldValue('noticeImgUrl')}
					visible={this.state.visible}
					userGroupName={window._userGroupName || this.state.userGroupName}
					userGroupDesc={window._userGroupDesc || this.state.userGroupDesc}
					handleOk={this.handleOk}
					appName={this.state.appName}
					listSceneTag={this.state.scheneTagsName}
					blackList={this.state.blackList}
					submiting={this.state.submiting}
					msgCache={this.state.msgCache}
					pushPercent={this.props.form.getFieldValue('pushPercent')}
					msgCacheStatus={this.state.msgCacheStatus}
					type={pushType}
					handleCancel={this.handleCancel}
					distinctTitle={this.state.distinctTitle}
					pushReviewNumber={this.state.pushReviewNumber} />
			</Form>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;
