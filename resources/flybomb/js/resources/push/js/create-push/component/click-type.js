'use strict';
import React from 'react';

import { Form, Input, Radio, Row, Tooltip, Table, Modal, Col, Button, message } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

import utils from '../../../lib/utils';
import restapi from '../../../lib/url-model';

import ajax from '../../../components/ajax';
import Info from '../../info';
import Reflux from 'reflux';
var actions = Reflux.createActions([
	'clickType'
]);

const formItemLayout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 20
	}
};
var store = Reflux.createStore({
	listenables: [actions],
	clickTypeParamsApp: [1],
	clickTypeParamsAppPage: [1]
});

//用来保存输入过的值
window.parametersJson = {};
let _activity = '';
let _url = '';
let _customAttribute = '';

const ClickType = React.createClass({
	getInitialState() {
		return {
			keyTplValue: [],
			paramsApp: false,
			paramsAppPage: false
		};
	},
	mixins: [Reflux.listenTo(store, 'showAppPage')],

	addParams(index, type) { //增加一条参数
		this.addremove = true;
		if (this.state['clickTypeParams' + type] && this.state['clickTypeParams' + type].length === 10) {
			message.error('最多允许设置10个参数和值');
			return;
		}

		// let num = 1;
		// let newparams = {
		// 	[type]: []
		// };

		// for (let i in window.parametersJson) {
		// 	if (i.indexOf('AppPage') > -1) {
		// 		if (i.indexOf('key') > -1 && type === 'AppPage') {
		// 			newparams.AppPage.push(num++);
		// 		}

		// 	} else {
		// 		if (i.indexOf('key') > -1 && type === 'App') {
		// 			newparams.App.push(num++);
		// 		}
		// 	}

		// }
		// let clickTypeParams = newparams[type].length ? newparams[type] : (this.state['clickTypeParams' + type] || [1]);


		let clickTypeParams = this.state['clickTypeParams' + type] || [1];
		let n = clickTypeParams[clickTypeParams.length - 1] + 1;
		clickTypeParams.push(n);

		this.setState({

			['clickTypeParams' + type]: clickTypeParams,
			['params' + type]: true
		});

		// window.parametersJson['key' + type + num] = '';
		// window.parametersJson['value' + type + num] = '';
		this.props.clickTypeParams(clickTypeParams, type);

	},
	removeParam(index, type) { //删除一条参数
		this.addremove = true;
		if (!this.state['clickTypeParams' + type] || (this.state['clickTypeParams' + type] && this.state['clickTypeParams' + type].length === 1)) {
			message.error('最后一条不能删除');
			return;
		}
		if (this.state['clickTypeParams' + type] && this.state['clickTypeParams' + type].length === 2) {
			this.setState({
				['params' + type]: false
			});

		}
		let clickTypeParams = this.state['clickTypeParams' + type] || [1];
		//删掉后清空输入框信息
		delete window.parametersJson['key' + type + clickTypeParams[index - 1]];
		delete window.parametersJson['value' + type + clickTypeParams[index - 1]];
		this.props.form.setFieldsValue({
			['key' + type + clickTypeParams[index - 1]]: '',
			['value' + type + clickTypeParams[index - 1]]: ''
		});
		clickTypeParams.splice(index - 1, 1);
		// for(let i=0;i<clickTypeParams.length;i++){
		// 	if(i>index-2){
		// 		clickTypeParams[i]=clickTypeParams[i]-1;
		// 	}
		// }
		this.setState({
			['clickTypeParams' + type]: clickTypeParams
		});

		this.props.clickTypeParams(clickTypeParams, type);

	},
	validateTemplateName(type) {
		const { getFieldProps } = this.props.form;
		return getFieldProps(type, {
			validate: [{
				rules: [{
					required: true,
					message: '请输入模板名称'
				}, {
					max: 20,
					message: '模板名称不能超过20个字符'
				}, {
					validator: function (rule, value, callback) {

						if (value && value.length <= 20 && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						}
						callback();
					}
				}],
				trigger: ['onBlur', 'onChange']
			}],
			onBlur: (e) => {
				this.setState({
					templateName: e.target.value
				});
			}
		});
	},
	validateActivity(type) {
		const { getFieldProps } = this.props.form;

		return getFieldProps(type, {
			initialValue: _activity,
			validate: [{
				rules: [{
					required: true,
					message: '请输入地址'
				}, {
					max: 1000,
					message: '应用页面不能超过1000个字符'
				}, {
					validator: function (rule, value, callback) {

						if (value && value.length <= 1000 && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						}
						callback();
					}
				}],
				trigger: ['onBlur', 'onChange']
			}],
			onBlur: (e) => {
				_activity = e.target.value;
			}
		});
	},
	showAppPage() {//点击打开应用页面的dom
		const self = this;
		let clickType = this.props.clickType;
		const {
			getFieldProps
		} = this.props.form;
		let type = 'App';
		if (clickType === 1) {
			type = 'AppPage';
		}
		let arr = [];
		let num = 1;
		let newparams = {
			[type]: []
		};
		if (!this.addremove) {
			for (let i in window.parametersJson) {
				if (i.indexOf('AppPage') > -1) {
					if (i.indexOf('key') > -1 && type === 'AppPage') {
						newparams.AppPage.push(num++);
					}

				} else {
					if (i.indexOf('key') > -1 && type === 'App') {
						newparams.App.push(num++);
					}
				}

			}
		}
		let clickTypeParams = newparams[type].length ? newparams[type] : (this.state['clickTypeParams' + type] || [1]);
		const paramLen = clickTypeParams.length;
		const params = this.state['params' + type];
		const disbleCls = params ? '' : 'disable';
		for (let i = 0; i < paramLen; i++) {
			arr.push(
				<Row className="mt25" className="click_type_keyvalue" key={clickTypeParams[i]}>
					<Col span="5"><FormItem><Input placeholder="输入参数" {...getFieldProps('key' + type + clickTypeParams[i], {
						initialValue: window.parametersJson['key' + type + clickTypeParams[i]] || this.props.form.getFieldValue('key' + type + clickTypeParams[i]),
						validate: [{

							rules: [{
								validator: function (rule, value, callback) {
									const { validateFields } = self.props.form;
									if (!value && self.props.form.getFieldValue('value' + type + clickTypeParams[i])) {


										callback('请输入参数');
									}

									if (value && !self.props.form.getFieldValue('value' + type + clickTypeParams[i])) {

										validateFields(['value' + type + clickTypeParams[i]], { force: true });
										return;

									}
									if (value) {
										for (let o = 0; o < paramLen; o++) {
											if (value === self.props.form.getFieldValue('key' + type + clickTypeParams[o]) && i !== o) {
												callback('参数不能同名');
												return;

											}
										}
									}


									callback();
								}
							}],
							trigger: ['onBlur', 'onChange']
						}],
						onBlur(e) {
							const { validateFields } = self.props.form;
							let value = e.target.value;
							window.parametersJson['key' + type + clickTypeParams[i]] = value.trim();
							validateFields(['value' + type + clickTypeParams[i]], { force: true });
							self.props.form.setFieldsValue({
								['key' + type + clickTypeParams[i]]: value.trim()
							});

						}
					}) }></Input></FormItem></Col>
					<Col className="ml20 col" span="5"><FormItem><Input placeholder="输入值" {...getFieldProps('value' + type + clickTypeParams[i], {
						initialValue: window.parametersJson['value' + type + clickTypeParams[i]] || this.props.form.getFieldValue('value' + type + clickTypeParams[i]),
						validate: [{
							rules: [{
								validator: function (rule, value, callback) {
									const { validateFields } = self.props.form;
									if (value !== 0 && !value && self.props.form.getFieldValue('key' + type + clickTypeParams[i])) {

										callback('请输入值');



									}
									if (value) {

										for (let o = 0; o < paramLen; o++) {
											if (self.props.form.getFieldValue('key' + type + clickTypeParams[i]) === self.props.form.getFieldValue('key' + type + clickTypeParams[o]) && i !== o) {
												validateFields(['key' + type + clickTypeParams[i]], { force: true });
											} else {
												callback();
											}
										}
									}
									if (value && !self.props.form.getFieldValue('key' + type + clickTypeParams[i])) {

										validateFields(['key' + type + clickTypeParams[i]], { force: true });


									}
									callback();
								}
							}],
							trigger: ['onBlur', 'onChange']
						}],
						onBlur(e) {
							const { validateFields } = self.props.form;
							let value = e.target.value;
							window.parametersJson['value' + type + clickTypeParams[i]] = value.trim();
							validateFields(['key' + type + clickTypeParams[i]], { force: true });

							self.props.form.setFieldsValue({
								['value' + type + clickTypeParams[i]]: value.trim()
							});

						}
					}) }></Input></FormItem>
					</Col>
					<Col className="ml20" span="5">
						<Button
							id={'minus' + (i + 1) + type}
							onClick={this.removeParam.bind(this, (i + 1), type)}
							className={'minus_btn ' + disbleCls}>—</Button>
					</Col>
				</Row>);
		}
		let keyTplId = this.state['keyTplId' + clickType];
		let status = keyTplId || keyTplId === 0;
		let text = status ? '编辑参数模板' : '存为参数模板';
		// parametersJson['value' + type + clickTypeParams[i]] = e.target.value;
		return (clickType === 1 || clickType === 0) ? //打开应用页面
			<div className="mt10">
				{clickType === 1 ?
					<FormItem>
						<Input type="textarea" style={{ width: 400 }} placeholder="输入完整的应用页面地址，如com.meizu.pushdemo.TestActivity" {...this.validateActivity('activity') } />
					</FormItem>
					: null}
				{arr}
				<Row>
					<Col span="5">
						<Button
							size="large"
							className="color_bdc"
							style={{ width: '100%' }}
							type="ghost"
							onClick={this.addParams.bind(this, (paramLen), type)}>添加参数</Button>
					</Col>
					<Col className='ml20' span="5">
						<Button
							size="large"
							className="color_bdc"
							style={{ width: '100%' }}
							type="ghost"
							onClick={this.saveTpl.bind(this, status)}>{text}</Button>
						{this.state.visible ?
							<Modal
								width={700}
								onCancel={this.handleCancel}
								onOk={this.handleOk}
								title='保存模板'

								visible={this.state.visible} >
								<FormItem className="key_template_modal" {...formItemLayout} label='模板名称'>
									<Input style={{ width: 400 }} placeholder="输入模板名称" {...this.validateTemplateName('templateName') } />
									{this.getTemplateInfo()}
								</FormItem>


							</Modal>
							: null}
					</Col>
				</Row>
				<Row className="pt10 ">
					<Col span="6"><a onClick={this.getKeyTpl} href='javascript:;'>使用参数模板</a></Col>
					<Col span="18">
						{this.state['currentTemplateName' + clickType] &&
							<span>
								{this.state['currentTemplateName' + clickType]}
								<a className="pl10" href="javascript:;" onClick={this.clearTemplate}>清空 </a>
							</span>
						}
					</Col>
				</Row>
				{this.state.keyTplStatus ? <Row>
					<Col>
						{this.createTpl(this.state.keyTplValue)}
					</Col>
				</Row> : null
				}
			</div > : null;

	},
	clearTemplate() {
		let clickType = this.props.clickType;
		let type = 'App';
		if (clickType === 1) {
			type = 'AppPage';
		}
		let json = {
			['keyTplId' + clickType]: null,
			['currentTemplateName' + clickType]: null,
			['clickTypeParams' + type]: [1],
			['parameters' + type]: {},
			['key' + type + 1]: '',
			['value' + type + 1]: '',
			['currentChecked' + clickType]: null
		};

		let regApp = /App\d/;
		let regAppPage = /AppPage\d/;
		for (let i in window.parametersJson) {
			if ((type === 'App' && i.match(regApp)) || (type === 'AppPage' && i.match(regAppPage))) {
				delete window.parametersJson[i];
			}
		}
		this.setState(json);
		this.props.form.setFieldsValue(json);
	},
	getTemplateInfo() {
		let clickType = this.props.clickType;
		let params = this.getParameters();
		let clickTypeInfoText = [];
		if (clickType == 1) {
			let text = this.props.form.getFieldValue('activity');
			clickTypeInfoText.push(<div className="break_word" key={'app_page_url_' + text}>应用页面地址：{text}</div>);
		}
		for (let j in params) {
			if (j != 'undefined' && j != '') {

				clickTypeInfoText.push(<div key={j}><p>参数：{j.trim()}</p><p className="break_word" >值：{String(params[j]).trim()}</p></div>);
			}

		}
		return <FormItem {...formItemLayout} label="模板参数&nbsp;&nbsp;&nbsp;&nbsp;">
			<div style={{ marginTop: 7 }}>{clickTypeInfoText}</div>

		</FormItem>;
	},
	getParameters() {

		let clickType = this.props.clickType;
		let json = {};
		for (let i in window.parametersJson) {
			if (i.indexOf('key') > -1 && (clickType && i.length > 10 || !clickType && i.length < 10)) {
				let value = i.replace('key', 'value');
				json[window.parametersJson[i]] = window.parametersJson[value];
			}

		}
		return json;
	},
	handleOk() {

		const appId = utils.queryString('appId', window.location.href);
		let url = restapi.cptSaveOrUpdate;
		let clickType = this.props.clickType;
		let json = this.getParameters();
		let self = this;

		let parameters = {
			clickType: clickType,
			parameters: json
		};
		if (clickType === 1) {
			parameters.activity = this.props.form.getFieldValue('activity');
		}
		let text = '模板新增成功';
		let keyTplId = this.state['keyTplId' + clickType];
		let templateName = this.state.templateName;
		let data = {
			appId: appId,
			templateName: templateName,
			clickTypeInfoParam: JSON.stringify(parameters)
		};
		if (keyTplId || keyTplId === 0) {
			data.id = keyTplId;
			text = '模板修改成功';
		}
		ajax.post(url, data, function (result) {
			message.success(text);
			self.getKeyTpl('refresh');
			let json = {
				visible: false
			};
			let id = result.value.id;
			json['currentChecked' + clickType] = id;
			json['currentTemplateName' + clickType] = templateName;
			json['keyTplId' + clickType] = id;

			self.setState(json);
			self.props.from.setFieldsValue(json);
			self.addremove = false;

		});
	},
	handleCancel() {
		this.setState({
			visible: false
		});
	},
	saveTpl(status) {
		let clickType = this.props.clickType;
		this.props.form.validateFields((errors) => {
			for (let i in errors) {
				if (i === 'activity' || i.indexOf('keyApp') > -1) {
					return;
				}
			}

			this.props.form.setFieldsValue({
				templateName: this.state['currentTemplateName' + clickType]
			});
			this.setState({
				tplStatus: status,//新增还是编辑
				visible: true
			});
		});
	},
	createTpl(keyTpl) {
		let self = this;

		let clickType = this.props.clickType;
		let columns = [{

			title: '推送时间',
			key: '0',
			className: 'ta_l',
			dataIndex: 'templateName',
			render(text, record) {
				return <Radio checked={record.id === self.state['currentChecked' + clickType] ? !self.state.templateChecked : self.state.templateChecked} onChange={() => {
					self.setState({
						templateChecked: self.state.templateChecked,
						['currentChecked' + clickType]: record.id
					});
					let options = {

						target: {
							value: record.id,
							query: record.clickTypeInfoParam,
							templateName: record.templateName
						}
					};
					self.setKeyTpl(options);
				}} name="template">{record.templateName}</Radio>;
			}
		}, {

			title: '推送时间',
			key: '1',
			className: 'ta_c',
			dataIndex: '',
			render(text, record) {
				return <Tooltip title="删除参数模板">
					<i onClick={() => self.delKeyTpl(record)} className="i_del"></i>
				</Tooltip>;
			}
		}];

		let keyTplCurrent = [];
		keyTpl.map(function (data) {
			if (clickType === data.clickTypeInfoParam.clickType) {
				keyTplCurrent.push(data);
			}
		});
		let html =
			<div className='user_type'>
				{
					keyTplCurrent.length > 0 ?
						<FormItem>
							<div className="key_tpl_table"><Table pagination={false} columns={columns} dataSource={keyTplCurrent}></Table></div>

						</FormItem>
						: !this.state.loadTpl ? <div className="color_error">无参数模板</div> : <div>数据拉取中...</div>
				}
			</div>;


		return html;
	},
	setKeyTpl(e) {
		let status = e.status;
		if (status) {
			return;
		}
		let query = e.target.query;

		let type = 'App';
		let parameters = query.parameters;
		let clickType = query.clickType;
		let value = e.target.value;
		let json = {
			['keyTplId' + clickType]: value,
			['currentChecked' + clickType]: value,
			clickType: clickType,
			templateName: e.target.templateName,
			['currentTemplateName' + clickType]: e.target.templateName
		};

		if (clickType) {
			type = 'AppPage';
			json.activity = query.activity;
			_activity = query.activity;
		}
		let regApp = /App\d/;
		let regAppPage = /AppPage\d/;
		for (let i in window.parametersJson) {
			if ((type === 'App' && i.match(regApp)) || (type === 'AppPage' && i.match(regAppPage))) {
				delete window.parametersJson[i];
			}
		}
		// window.parametersJson={};
		let data = [];
		let num = 0;
		for (let i in parameters) {
			num++;
			json['key' + type + num] = i;
			json['value' + type + num] = parameters[i];
			window.parametersJson['key' + type + num] = i;
			window.parametersJson['value' + type + num] = parameters[i];

			data.push(num);
		}
		json['parameters' + type] = parameters;
		json['clickTypeParams' + type] = data;
		json['params' + type] = true;//控制减号的置灰
		if (num < 2) {
			json['params' + type] = false;
		}
		if (Object.keys(parameters).length === 0) {
			// window.parametersJson = {};
			json['clickTypeParams' + type] = [1];
			json['key' + type + 1] = '';
			json['value' + type + 1] = '';
		}
		this.props.form.setFieldsValue(json);

		this.setState(json);
	},
	delOk() {
		let data = this.state.delData;
		let url = restapi.cptDel;
		url = utils.makeUrl(url, {
			appId: data.appId,
			id: data.id
		});
		let clickType = this.props.clickType;
		ajax.get(url, () => {
			message.success('删除成功');
			let json = {
				delVisible: false
			};

			if (data.id === this.state['keyTplId' + clickType]) {
				this.props.form.setFieldsValue({
					['keyTplId' + clickType]: null
				});
				json['currentTemplateName' + clickType] = '';
				json['keyTplId' + clickType] = null;
			}
			this.setState(json);
			this.getKeyTpl('refresh');
		});
	},
	delCancel() {
		this.setState({
			delVisible: false
		});
	},
	delKeyTpl(data) {
		this.setState({
			delData: data,
			delVisible: true
		});

	},
	componentWillUnmount: function () {

		// store.clickTypeParamsApp=[1];
		// store.clickTypeParamsAppPage=[1];
	},
	componentWillReceiveProps() {
		if (this.addremove) {
			return;
		}
		let type = 'App';
		if (this.props.clickType === 1) {
			type = 'AppPage';
		}
		let parameters = this.props.form.getFieldValue('parameters' + type);
		let arr = [];
		let arrI = [];
		let num = 0;
		for (let i in parameters) {
			arr.push((num++) + 1);
			arrI.push(i);

		}
		this.setState({
			['clickTypeParams' + type]: arr.length === 0 ? [1] : arr
		});

	},
	componentWillMount() {
		const deal = utils.queryString('deal', window.location.href);
		if (!deal || this.props.addPush) {//如果是分组推送，点击添加推送内容，要清空掉之前保留的信息
			window.parametersJson = {};
			_activity = '';
			_url = '';
			_customAttribute = '';
		}
	},
	componentDidMount() {

	},
	vidatePackageName(type) {
		const { getFieldProps } = this.props.form;

		return getFieldProps(type, {

			validate: [{
				rules: [{
					max: 100,
					message: '包名不能超过100个字'
				}, {
					validator: function (rule, value, callback) {
						value = value && value.trim();
						if (value && value === '' || (value && (!value.match(/^[a-zA-Z][\w_]*(\.[a-zA-Z][\w_]*)+$/)))) {
							callback(new Error('请输入包名的正确格式，比如：com.flyme.sms'));
						} else {
							callback();
						}
					}
				}],
				trigger: ['onBlur', 'onChange']
			}]
		});
	},
	changeRadio(e) {
		this.props.changeRadio(e);
		// this.addremove = false;

		// this.props.handleSubmit(e, 'deal');
		// if (value !== 1) {
		// 	store.clickTypeParams=[1];
		// 	this.setState({
		// 		clickTypeParams:[1]
		// 	});
		// }
	},
	getKeyTpl(refresh) {
		const self = this;
		const appId = utils.queryString('appId', window.location.href);
		if (refresh !== 'refresh' && this.state.keyTplStatus) {
			this.setState({
				keyTplStatus: false
			});
			// this.props.form.setFieldsValue({
			// 	['keyTplId' + this.props.clickType]: null,
			// 	templateName: ''
			// });
			return;
		}
		this.setState({
			loadTpl: true
		});
		ajax.get(restapi.cptListByAppId + '?appId=' + appId, function (result) {


			self.setState({
				loadTpl: false,
				keyTplStatus: refresh === 'refresh' ? true : !self.state.keyTplStatus,
				keyTplValue: result.value
			});
		});
	},
	render() {
		let text = '点击动作　';
		let label = this.props.pushOtherPackage ? <Info text={text} /> : text;
		return (
			<div>
				<FormItem {...this.props.formItemLayout} label={label}>
					{this.props.pushOtherPackage ? <FormItem>
						<Input placeholder='请输入调起的应用包名' style={{ width: 200 }} {...this.vidatePackageName('clickPackage') } />

					</FormItem> : null}
					<RadioGroup  {...this.props.getFieldProps('clickType', {
						initialValue: this.props.clickType,
						onChange: this.changeRadio
					}) }>
						<Radio name="clickType" value={0}>打开应用</Radio>
						<Radio name="clickType" value={1}>打开应用页面</Radio>
						<Radio name="clickType" value={2}>打开URI页面</Radio>
						<Radio name="clickType" value={3}>应用客户端自定义</Radio>

					</RadioGroup>


					{
						this.showAppPage()//打开应用页面
					}

					{(this.props.clickType === 2) ?//打开URI
						<div className="mt10">
							<FormItem>
								<Input type="textarea" style={{ width: 400 }} placeholder="输入URI" {...this.props.getFieldProps('url', {
									initialValue: _url,
									validate: [{
										rules: [{
											required: true,
											message: '请输入URI',
										}, {
											max: 1000,
											message: 'URI不能超过1000个字符'
										}],
										trigger: ['onBlur', 'onChange']
									}],
									onBlur(e) {
										_url = e.target.value;
									}
								}) }></Input>
							</FormItem>
						</div>
						: null}
					{(this.props.clickType === 3) ?//应用客户端自定义
						<div className="mt10">
							<FormItem>
								<Input type="textarea" style={{ width: 400 }} placeholder="自定义内容" {...this.props.getFieldProps('customAttribute', {
									initialValue: _customAttribute,
									validate: [{
										rules: [{
											required: true,
											message: '请输入自定义内容',
										}, {
											max: 1000,
											message: '内容不能超过1000个字符'
										}, {
											validator: function (rule, value, callback) {
												if (value && value.length <= 1000 && value.match(/^\s/)) {
													callback(new Error('行首不能输入空格'));
												}
												callback();
											}
										}],
										trigger: ['onBlur', 'onChange']
									}],
									onBlur(e) {
										_customAttribute = e.target.value;
									}
								}) }></Input>
							</FormItem>
						</div>
						: null}
				</FormItem>

				<Modal title="系统提示" visible={this.state.delVisible}
					onOk={this.delOk} onCancel={this.delCancel}>
					<p>删除参数模板：{this.state.delData && this.state.delData.templateName}?</p>
				</Modal>
			</div>
		);
	}
});

exports.render = ClickType;
exports.clickTypeParamsApp = store.clickTypeParamsApp;
exports.clickTypeParamsAppPage = store.clickTypeParamsAppPage;




// , {
// 									validator: function(rule, value, callback) {
// 										if(value && value.length<=1000 && !(/^[\w\-\_]+:\/\/([\w\-]+\.)+[a-zA-Z\-]+([\/\?]+[\w\-\@\%\!\&\=\+\~\:\#\;\,\{\}\?\u4e00-\u9fa5\_\.\/\"]*)*$/.test(value))){
// 											callback(new Error('请输入正确的URI'));
// 										}else{
// 											callback();
// 										}

// 									}
// 								}