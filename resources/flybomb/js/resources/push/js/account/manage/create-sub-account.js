'use strict';
import React from 'react';
import { Row, Col, Select, Modal, Checkbox, message, Radio, Form, Input } from 'antd';


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const FormItem = Form.Item;
const Option = Select.Option;
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';

import ProductTypeApp from '../../producttype-app';//产品类型和应用的下拉列表
const formItemLayout = {
	labelCol: {
		span: 5
	},
	wrapperCol: {
		span: 19
	}
};

let App = React.createClass({
	//{this.props.params.id}
	getInitialState() {
		return {
			liClass: '',//应用图标和文字的样式
			loading: false,
			appName: '',
			currentData: [],
			// fisrtChecked: false,//选中之后变为true， 用来判断第一次选中权限复选框
			jsonData: [],
			authData: [],//权限的列表
			authChecked: [],//选中的权限，用来控制app的选择状态，是否勾上，数组为空不勾，数组有值勾上
			createSubAccount: this.props.createSubAccount
		};
	},
	componentWillMount() {

		const appList = this.props.authData.appList;
		this.setState({
			appDefaultValue: appList[0].appId + ',' + appList[0].appName
		});
	},
	componentDidMount() {
		const appList = this.props.authData.appList;
		const appModuleVoList = this.props.authData.appModuleVoList || [];
		const defaultModule = this.props.authData.defaultModuleTemplate;


		let jsonData = [];
		let editJsonData = null;
		if (appModuleVoList.length > 0) {//编辑的时候
			editJsonData = [];
			for (let i = 0; i < appModuleVoList.length; i++) {
				this.setState({
					['checked' + appModuleVoList[i].appId]: true
				});
				editJsonData.push(appModuleVoList[i]);
				const moduleInfo = appModuleVoList[i].moduleInfo;
				for (let o in moduleInfo) {
					for (let p = 0; p < moduleInfo[o].length; p++) {
						this.setState({
							['checkedauth' + String(appModuleVoList[i].appId) + moduleInfo[o][p].id]: true
						});

					}
				}

			}
		}
		for (let i = 0; i < appList.length; i++) {
			let source = {
				appId: appList[i].appId,
				appName: appList[i].appName,
				moduleInfo: {}
			};
			for (let o in defaultModule) {
				for (let p = 0; p < defaultModule[o].length; p++) {
					if (defaultModule[o][p].disable) {
						if (source.moduleInfo[o]) {
							source.moduleInfo[o].push(defaultModule[o][p]);
						}
						source.moduleInfo[o] = [defaultModule[o][p]];

					}
				}

			}
			if (editJsonData) {
				for (let o = 0; o < editJsonData.length; o++) {
					if (source.appId === editJsonData[o].appId) {
						source.moduleInfo = editJsonData[o].moduleInfo;
					}
				}
			}
			jsonData.push(source);
		}
		// if(sources){

		// 	for(let o=0;o<sources.length;o++){
		// 		if(jsonData[i].appId===sources[o].appId){
		// 			jsonData[i].moduleInfo=sources[o].moduleInfo;
		// 		}
		// 	}
		// }
		for (let o in defaultModule) {//可以先不管，disable现在没用到
			for (let p = 0; p < defaultModule[o].length; p++) {
				if (defaultModule[o][p].disable) {
					//					if(source.moduleInfo[o]){
					//						source.moduleInfo[o].push(defaultModule[o][p])
					//					}
					//					source.moduleInfo[o]=[defaultModule[o][p]];
					for (let i = 0; i < appList.length; i++) {
						this.setState({
							['checked' + appList[i].appId]: true
						});
					}
				}
			}

		}
		this.setState({
			jsonData: jsonData
		});
		const evt = {
			target: {
				value: appList[0].appId + ',' + appList[0].appName
			}
		};
		this.selectApp(evt, jsonData);

		this.getAppInfo();

		//					json['checked'+appId]=true;
	},
	getAppInfo(id) {
		let appId = id || this.state.appId;
		if (!appId) return;
		let self = this;
		ajax.get(restapi.getAppInfo + '?appId=' + appId, function (result) {

			self.setState({
				insightAuth: result.value.insightAuth
			});
		});
	},
	validate(type) {
		const { getFieldProps } = this.props.form;
		return getFieldProps(type, {

			validate: [{
				rules: [{
					required: true,
					message: '请输入Flyme账号 '
				}, {
					min: 4,
					message: 'Flyme账号不能少于4个字符'
				}, {
					max: 32,
					message: 'Flyme账号不能超过32个字符'
				}, {
					validator(rule, value, callback) {

						if (value && value.length >= 4 && value.length <= 32 && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						} else {
							callback();
						}

					}
				}],
				trigger: ['onBlur', 'onChange']
			}]
		});
	},
	createAccount() {
		const self = this;
		this.props.form.validateFields((errors, values) => {

			const jsonData = self.state.jsonData;
			//			const defaultModule=this.props.authData.defaultModuleTemplate;
			//			console.log(jsonData);
			//			console.log(defaultModule);
			//			for(let i=0;i<jsonData.length;i++){
			//				const moduleInfo=jsonData[i].moduleInfo;
			//				for(let o in moduleInfo){
			//					moduleInfo[o].push()
			//				}
			//			}
			if (errors) {

				console.log('Errors in form!!!');
				return;
			}
			const newJsonData = [];
			for (let i = 0; i < jsonData.length; i++) {
				const moduleInfo = jsonData[i].moduleInfo;
				if (Object.keys(moduleInfo).length > 0) {
					for (let o in moduleInfo) {
						if (moduleInfo[o].length === 0) {
							delete moduleInfo[o];
						}
					}

				}
				if (Object.keys(moduleInfo).length > 0) {

					newJsonData.push(jsonData[i]);
				}
			}
			const data = {
				flymeAccount: values.flymeAccount,
				json: JSON.stringify(newJsonData)
			};
			const editData = self.props.editData;
			let text = '新建成功';
			if (editData.managerName) {
				data.flymeAccount = editData.managerName;
				data.flymeAccountId = editData.managerId;
				text = '编辑成功';
			}
			if (editData.appId) {
				data.appId = editData.appId;
			}
			ajax.post(restapi.addSubAccount, data, function () {
				message.success(text);
				self.props.toggleModal('createSubAccount', editData);
			});
		});
	},
	selectApp(e, sources) {
		const value = e.target.value;
		const arr = value.split(',');
		const appId = Math.ceil(arr[0]);
		const appName = arr[1];
		const jsonData = sources || this.state.jsonData;
		let source = null;
		let existAppId = false;
		for (let i = 0; i < jsonData.length; i++) {

			if (jsonData[i].appId === appId) {
				existAppId = true;
				source = jsonData[i];
			}
		}
		const appList = this.props.authData.appList;
		const editData = this.props.editData;
		for (let i = 0; i < appList.length; i++) {
			if (appList[i].appId === editData.appId) {//如果是添加指定应用的子账号
				source = {
					appId: editData.appId,
					appName: editData.appName,
					moduleInfo: {}
				};
			}
		}
		if (!existAppId) {
			jsonData.push(source);
		}
		let json = {};
		json.jsonData = jsonData;
		json.currentData = source;
		json.appDefaultValue = appId + ',' + appName;

		this.setState(json);
		let id;
		for (let i = 0; i < jsonData.length; i++) {

			if (jsonData[i].appId === source.appId) {
				this.setState({
					appId: source.appId
				});
				id = source.appId;
			}
		}
		this.getAppInfo(id);
	},
	changeManage(e, data) {
		const jsonData = this.state.jsonData;
		let checked = !this.state['checkedauth' + String(this.state.appId) + data.id];
		const currentData = this.state.currentData;
		const appId = currentData.appId;
		const authChecked = this.state['authChecked' + appId] || [];
		// if (!this.state.fisrtChecked) {
		// 	checked = true;
		// }
		if (checked) {
			authChecked.push(1);
			//			currentData.moduleInfo[data.type]=arr;
		} else {
			authChecked.pop();
		}
		let existItem = false;
		for (let i = 0; i < jsonData.length; i++) {

			if (jsonData[i].appId === appId) {
				let dataType = jsonData[i].moduleInfo[data.type];
				if (dataType) {//如果已经有了就Push或者删除
					for (let o = 0; o < dataType.length; o++) {
						if (dataType[o].id === data.id) {//如果已存在
							existItem = true;
							if (!checked) {//取消选择的时候删除数组里的项
								dataType.splice(o, 1);
							}
						}
					}
					if (!existItem) {//不存在才push
						dataType.push(data);
					}

				} else {//没有的话直接赋值
					dataType = [data];
				}
				jsonData[i].moduleInfo[data.type] = dataType;
			}
		}
		let json = {};
		if (authChecked.length === 0) {
			json['checked' + appId] = false;
		} else {
			json['checked' + appId] = true;
		}
		this.setState({
			['authChecked' + appId]: authChecked,
			['checkedauth' + String(this.state.appId) + data.id]: (!this.state['checkedauth' + String(this.state.appId) + data.id])
		});
		// json.fisrtChecked = true;
		this.setState(json);
	},
	handleChange(value, name) {
		name = name[0];
		const self = this;
		this.props.form.setFieldsValue({
			appId: value
		});
		this.setState({
			appId: value,
			appName: name
		});

		const appList = this.props.authData.appList;
		for (let i = 0; i < appList.length; i++) {
			const data = appList[i];
			if (data.appId == value) {
				self.setState({
					appList: [data],
					appDefaultValue: data.appId + ',' + data.appName
				});
				const evt = {
					target: {
						value: data.appId + ',' + data.appName
					}
				};
				self.selectApp(evt);
				break;

			} else {

				self.setState({
					appList: null
				});
			}
		}


	},
	getAppName(appId) {
		const allApp = ProductTypeApp.allApp;
		for (let i = 0; i < allApp.length; i++) {
			if (allApp[i].appId === appId) {
				return allApp[i].name;
			}
		}
	},
	render() {
		var self = this;
		const editData = this.props.editData;
		let title = '';
		if (editData.managerName) {
			title = '编辑子账号';
		} else {

			title = '添加子账号';
		}
		const appList = this.state.appList || this.props.authData.appList;
		const li = appList.map(function (data, key) {

			return <RadioButton value={data.appId + ',' + data.appName} key={key}>
				<img src={data.appIconUrl || '/resources/push/images/default_icon.png'} width="60" height="60" />
				<div title={data.appName}>
					<label><Checkbox disabled={true} checked={self.state['checked' + data.appId]} />
						{utils.getTextOverFlow(data.appName, 8, true)}
					</label>
				</div>
			</RadioButton>;
		});

		const defaultModule = this.props.authData.defaultModuleTemplate;

		let personalPush = defaultModule && defaultModule['个性化推送'];
		if (personalPush) {
			delete defaultModule['个性化推送'];
			defaultModule['个性化推送'] = personalPush;
		}


		//		for(let o in defaultModule){
		//			for(let p=0;p<defaultModule[o].length;p++){
		//				defaultModule[o][p].checked=false;
		//			}
		//		}
		const defaultModuleTemplate = defaultModule;
		let arr = [];
		for (let i in defaultModuleTemplate) {

			const col = defaultModuleTemplate[i].map(function (data, key) {
				return <Col span="4" key={key}>

					<label>
						<Checkbox disabled={data.disable ? true : false} checked={data.disable ? true : self.state['checkedauth' + String(self.state.appId) + data.id]} onChange={self.changeManage.bind(self, window.event, data)} />
						<span>{data.name}</span>
					</label>
				</Col>;
			});
			if (i !== '数据分析' || i === '数据分析' && this.state.insightAuth) {
				arr.push(<Row key={i}>
					<Col className="color999" span="4">{i}</Col>
					{col}
				</Row>);
			}

		}
		let children = [];
		for (let i = 0; i < appList.length; i++) {
			children.push(<Option key={appList[i].appName}>{appList[i].appName}</Option>);
		}
		const appId = this.props.editData && self.props.editData.appId;
		const androidInitData = {
			api: restapi.listMainApp,
			width: '300',
			all: '全部应用',
			title: '搜索',
			name: 'appId'
		};
		return (

			<Modal zIndex='1008' width={900} title={title} visible={this.props.createSubAccount}
				onOk={this.createAccount} onCancel={this.props.toggleModal.bind(this.props.self, 'createSubAccount', { appId: appId })}>
				<Form style={{ paddingTop: 20 }} horizontal >
					<Row>
						<Col span="24">
							<FormItem
								{...formItemLayout}
								label="Flyme账号&nbsp;&nbsp;&nbsp;&nbsp;" >
								{!editData.managerName ? <Input style={{ width: 300 }} placeholder="4-32个字符" {...this.validate('flymeAccount') } />
									:
									<span>
										{editData.managerName}
									</span>}

							</FormItem>


							<FormItem  {...formItemLayout} label="应用权限&nbsp;&nbsp;&nbsp;&nbsp;">
								{appId ?
									<span>{self.getAppName(appId)}</span>
									: <div>
										<FormItem><ProductTypeApp.render
											notFoundContent="无数据"
											showSearch
											searchPlaceholder='搜索应用名称'
											selectType={this.handleChange}
											initData={androidInitData} /></FormItem>


										<div className="auth_applist">
											<RadioGroup value={this.state.appDefaultValue} onChange={this.selectApp} size="large">{li}</RadioGroup>
										</div>
									</div>}
							</FormItem>
							<FormItem  {...formItemLayout} label="管理权限&nbsp;&nbsp;&nbsp;&nbsp;">

								{arr}
							</FormItem>




						</Col>
					</Row>
				</Form>
			</Modal>

		);
	}
});
App = Form.create()(App);


module.exports = App;
