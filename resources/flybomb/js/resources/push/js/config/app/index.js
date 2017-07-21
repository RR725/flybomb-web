'use strict';
import React from 'react';
import { Form, Select, Radio, Popover, DatePicker, Upload, Button, message, Row, Icon, Col, Input } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';

import Info from '../../info';
const formItemLayout = {
	labelCol: {
		span: 5
	},
	wrapperCol: {
		span: 19
	}
};
const smallFormItemLayout = {
	labelCol: {
		span: 10
	},
	wrapperCol: {
		span: 14
	}
};

let App = React.createClass({
	//{this.props.params.id}	
	getInitialState() {
		return {
			value: {},
			visible: false,
			appNameModifyStatus: false,
			showNumberModifyStatus: false,
			limitRateModifyStatus: false,
			unVerifySubExpireTimeModifyStatus: false,
			collapseModifyStatus: false,
			msgCacheLimitModifyStatus: false,
			appTagLimitModifyStatus: false,
			limitTimesModifyStatus: false,
			appName: '',
			showNumber: '',
			appTagLimit: '',
			msgCacheLimit: '',
			msgCache: '',
			limitRate: '',
			collapse: ''
		};
	},
	componentWillUnmount: function () {
		if (document.querySelector('#configManage')) document.querySelector('#configManage').className = '';

		clearInterval(this.state.buildTime);
	},
	getData() {
		const self = this;
		const appId = utils.queryString('appId', window.location.href);
		if (appId) {
			ajax.get(restapi.getAppInfo + '?appId=' + appId, function (result) {
				const value = result.value;
				self.setState({
					value: value,
					appId: appId,
					msgCache: value.msgCache,
					appName: value.appName,
					showNumber: value.showNumber,
					msgCacheLimit: value.msgCacheLimit,
					appTagLimit: value.appTagLimit,
					limitTimes: value.limitTimes,
					collapse: value.collapse,
					limitRate: value.limitRate,
					channelAccess: value.channelAccess,
					flymeAuth: value.flymeAuth,
					unVerifySub: value.unVerifySub ? 1 : 0,
					unVerifySubExpireTime: value.unVerifySubExpireTime ? utils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(value.unVerifySubExpireTime)) : utils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(+new Date() + 1000 * 60 * 60 * 24 * 30)),
					dwAuth: value.dwAuth ? 1 : 0,
					insightAuth: value.insightAuth ? 1 : 0,
					pushOtherPackage: value.pushOtherPackage ? 1 : 0,
					appSecret: value.appSecret,
					msgTotalLimit: value.msgTotalLimit,
					apiTaskLimit: value.apiTaskLimit,
					directLimit: value.directLimit,
					appIconUrl: value.appIconUrl
				});
			});
		}
	},
	componentWillReceiveProps() {
		const appId = utils.queryString('appId', window.location.href);
		if (appId !== this.state.appId) {
			const status = this.checkNotSave();
			if (!status) {

				let hash = window.location.hash;
				let obj = utils.getQueryObj(hash);
				let h = hash.split('?')[0];
				obj.appId = this.state.appId;
				hash = utils.makeUrl(h, obj);
				window.location.href = window.location.pathname + hash;
				return;
			}
			this.setState({
				builded: false,
				codeImg: ''
			});
			clearInterval(this.state.buildTime);
			this.getData();
		}


	},
	componentDidMount() {

		const appId = utils.queryString('appId', window.location.href);
		this.setState({
			appId: appId
		});
		if (document.querySelector('#configManage')) document.querySelector('#configManage').className = 'active';
		this.getData();
	},
	cantNull(type, current) {
		const { getFieldProps } = this.props.form;

		return getFieldProps(type, {
			initialValue: current,
			rules: [
				{ required: true, message: '不能为空' }
			]
		});
	},
	resetAppSecret() {
		const self = this;
		ajax.post(restapi.resetAppSecret, { appId: this.state.appId }, function (result) {

			const value = result.value;
			self.props.form.setFieldsValue({
				appSecret: value
			});
			self.setState({
				appSecret: value
			});
			message.success('重置成功');
			self.togglePopover('visibleReset');
		});
	},
	modify(e) {
		let json = {};

		const status = this.checkNotSave();
		if (!status) return;
		json[e.target.className] = true;
		this.setState(json);
		if (e.target.className === 'appNameModifyStatus') {

			this.props.form.setFieldsValue({
				appName: this.state.appName
			});
		}
	},
	changeChannelAccess(value) {
		const self = this;
		let url = restapi.updateApp;
		const data = {
			appId: this.state.appId,
			channelAccess: value
		};
		ajax.post(url, data, function () {

			message.success('保存成功');

			self.setState({
				channelAccess: !self.state.channelAccess ? 1 : 0
			});

		});
	},
	changeUnVerifySub(e) {

		const self = this;

		if (this.state.unVerifySub === e.target.value) {
			return;
		}
		const status = this.checkNotSave('unVerifySub');
		if (!status) return;
		if (e.target.value) {
			this.setState({
				unVerifySubExpireTimeModifyStatus: true,
				unVerifySub: 1
			});
			return;
		}
		let url = restapi.updateApp;
		const data = {
			appId: this.state.appId,
			unVerifySub: e.target.value
		};
		ajax.post(url, data, function () {

			message.success('保存成功');

			self.setState({
				unVerifySub: self.state.unVerifySub ? 0 : 1
			});
		});
	},
	changeDwAuth(e) {

		const self = this;
		const status = this.checkNotSave();
		if (!status) return;
		if (this.state.dwAuth === e.target.value) {
			return;
		}
		let url = restapi.updateApp;
		const data = {
			appId: this.state.appId,
			dwAuth: e.target.value
		};
		ajax.post(url, data, function () {

			message.success('保存成功');

			self.setState({
				dwAuth: self.state.dwAuth ? 0 : 1
			});
		});
	},
	changeInsightAuth(e) {
		const self = this;
		const status = this.checkNotSave();
		if (!status) return;
		if (this.state.insightAuth === e.target.value) {
			return;
		}
		let url = restapi.updateApp;
		const data = {
			appId: this.state.appId,
			insightAuth: e.target.value
		};
		ajax.post(url, data, function () {

			message.success('保存成功');

			self.setState({
				insightAuth: self.state.insightAuth ? 0 : 1
			});
		});
	},
	changePushOtherPackage(e) {

		const self = this;
		const status = this.checkNotSave();
		if (!status) return;
		if (this.state.pushOtherPackage === e.target.value) {
			return;
		}
		let url = restapi.updateApp;
		const data = {
			appId: this.state.appId,
			pushOtherPackage: e.target.value
		};
		ajax.post(url, data, function () {

			message.success('保存成功');

			self.setState({
				pushOtherPackage: self.state.pushOtherPackage ? 0 : 1
			});
		});
	},
	changeMsgCache(e) {
		const self = this;
		const status = this.checkNotSave();
		if (!status) return;
		if (this.state.msgCache === e.target.value) {
			return;
		}
		let url = restapi.updateApp;
		const data = {
			appId: this.state.appId,
			msgCache: e.target.value,
			msgCacheLimit: this.state.msgCacheLimit
		};
		ajax.post(url, data, function () {

			message.success('保存成功');

			self.setState({
				msgCache: !self.state.msgCache
			});
		});
	},
	changeFlymeAuth(e) {
		const self = this;
		const status = this.checkNotSave();
		if (!status) return;
		if (this.state.flymeAuth === e.target.value) {
			return;
		}
		let url = restapi.updateApp;
		const data = {
			appId: this.state.appId,
			flymeAuth: e.target.value
		};
		ajax.post(url, data, function () {

			message.success('保存成功');

			self.setState({
				flymeAuth: !self.state.flymeAuth
			});
		});
	},
	save(name, evt) {
		const { getFieldError } = this.props.form;
		evt.stopPropagation();
		const self = this;
		let url = restapi.updateApp;
		let data = {};

		if (getFieldError('appName')) {
			return;
		}
		data[name] = this.state[name];

		data.appId = this.state.appId;
		if (name === 'appName') {
			data[name] = this.props.form.getFieldValue('appName').trim();
		}
		if (name === 'unVerifySubExpireTime') {
			data.unVerifySub = 1;
		}
		ajax.post(url, data, function () {

			// window.location.hash='/config/app?appId='+data.appId+'&refresh=true';
			message.success('保存成功');
			let json = {};

			json[name] = self.state[name];
			json[name + 'ModifyStatus'] = false;
			self.setState(json);

		});

	},
	keyup(e) {
		let json = {};
		json[e.target.name] = e.target.value;
		this.setState(json);
	},
	delApp() {
		this.setState({
			visible: true
		});
	},
	delOk() {
		ajax.post(restapi.delApp, { appId: this.state.appId }, function () {
			message.success('应用删除成功');
			window.location.hash = '/home?refresh=true';
		});
	},
	delCancel() {

		this.setState({
			visible: false
		});
	},
	checkNotSave() {
		let status = true;
		const arr = [
			'appNameModifyStatus',
			'showNumberModifyStatus',
			'limitRateModifyStatus',
			'unVerifySubExpireTimeModifyStatus',
			'collapseModifyStatus',
			'appTagLimitModifyStatus',
			'limitTimesModifyStatus',
			'msgCacheLimitModifyStatus',
			'apiTaskLimitModifyStatus',
			'directLimitModifyStatus',
			'msgTotalLimitModifyStatus'
		];
		for (let i = 0; i < arr.length; i++) {
			if (this.state[arr[i]]) {

				// if(type==='unVerifySub' && arr[i]==='unVerifySubExpireTimeModifyStatus' && status){
				// 	status=true;
				// 	break;
				// }
				message.error('你有未保存的选项');
				status = false;
			}
		}
		return status;
	},
	blur(e) {
		const className = e.target.className;
		if (className.indexOf('Modify') > -1) {

			return;
		}
		this.checkNotSave();
		// this.setState({
		// 	appNameModifyStatus:false,
		// 	showNumberModifyStatus:false,
		// 	limitRateModifyStatus:false,
		// 	collapseModifyStatus:false
		// });

	},

	getContent(type) {
		if (type === 'showApkCode') {
			return <div style={{ position: 'relative' }}>
				<div className='loading'>
					<Icon type="loading" />
					<p>正在生成二维码，请稍等...</p>
				</div>

				{this.state.codeImg ? <img width='200' height='200' src={this.state.codeImg} /> : <div style={{ width: 200, height: 200 }}></div>}
			</div>;
		}
		return <div>
			<Button type="primary" className="color_bg mr10" onClick={this.togglePopover.bind(this, type)}>取消</Button>
			<Button onClick={type === 'visibleReset' ? this.resetAppSecret : this.delOk}>确定</Button>
		</div>;
	},

	togglePopover(type) {
		this.setState({
			[type]: !this.state[type]
		});
	},
	buildApk() {
		if (this.state.builded) {
			return;
		}
		let self = this;
		let url = restapi.buildApk;
		url = utils.makeUrl(url, {
			appId: this.state.appId
		});
		this.setState({
			builded: true
		});
		let num = 0;
		let time = setInterval(() => {
			num++;
			ajax.get(url, function (result) {
				let value = result.value;
				if (value === 1) {
					if (!self.state.build) {
						self.setState({
							codeImg: ''
						});
					}
				}
				if ((value !== 1 && value !== 3) || num > 60) {//后端返回超时失败或者前端轮循超过二分钟（二秒钟一次）
					let msg = result.message;
					clearInterval(time);
					self.setState({
						builded: false
					});

					message.error(msg || '打包超时，请重试');
					self.togglePopover('showApkCode');
				}
				if (value === 3) {
					self.setState({
						codeImg: restapi.generateQrCoder + '?appId=' + self.state.appId
					});
					clearInterval(time);
				}
			});
		}, 2000);
		this.setState({
			buildTime: time
		});
	},
	downloadApkCode() {
		let url = restapi.downloadApkCode;
		url = utils.makeUrl(url, {
			appId: this.state.appId
		});
		ajax.get(url, function () {
			window.location.href = url;
		});

	},
	changeUnVerifySubExpireTime(e) {
		this.setState({
			unVerifySubExpireTime: utils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(e))
		});
	},
	render() {
		const { getFieldProps } = this.props.form;
		var self = this;
		const props = {
			name: 'iconFile',
			action: restapi.updateIcon + '?appId=' + this.state.appId,
			data: {},
			headers: {
				authorization: 'authorization-text',
			},
			showUploadList: false,
			beforeUpload(file) {
				self.setState({
					loading: true
				});
				const fileType = file.type;
				const isImg = fileType.indexOf('image') >= 0;
				if (!isImg) {
					message.error('请上传图片格式的文件');
					self.setState({
						loading: false
					});
				}
				return isImg;
			},
			onChange(info) {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (info.file.response) {
					if (info.file.response.code === '200') {

						message.success(`${info.file.name} 上传成功。`);
						self.props.form.setFieldsValue({
							appIconUrl: info.file.response.value
						});
						self.setState({
							appIconUrl: info.file.response.value
						});
					} else {
						message.error(info.file.response.message);
					}

					self.setState({
						loading: false
					});
				}
			}
		};

		const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值
		const disabledDate = function (current) {
			return current && current.getTime() + 1000 * 60 * 60 * 24 <= Date.now();
		};
		return (
			<div onClick={this.blur}>
				<Row className="title_bb">
					<Col span="8">
						<img src={this.state.appIconUrl || utils.cdn + '/resources/push/images/default_icon.png'} width="24" height="24" />



						<span>{this.props.form.getFieldValue('appName') || this.state.appName}</span>
					</Col>
					<Col span="12">&nbsp; </Col>
					<Col span="4" className="ta_r">
						{userAuth > 1 &&
							<Popover
								placement="bottom"
								visible={self.state.visibleDel}
								content={self.getContent('visibleDel')}
								title={'确定删除应用?'}
								onVisibleChange={this.togglePopover.bind(this, 'visibleDel')}
								trigger="click"   >
								<span className=" del_app">删除应用</span>

							</Popover>
						}
					</Col>
				</Row>
				<Form horizontal id='detailTable' className="config_app">
					<Row>
						<Col span="24">
							<FormItem className="config_appname" {...formItemLayout} label="应用名称&nbsp;&nbsp;&nbsp;&nbsp;">
								{this.state.appNameModifyStatus ?
									<span>
										<FormItem><Input {...getFieldProps('appName', {
											initialValue: this.props.form.getFieldValue('appName') || this.state.appName,
											validate: [{
												rules: [{
													required: true,
													message: '请填写应用名称'
												}, {
													min: 2,
													message: '应用名称不能少于2个字'
												}, {
													max: 10,
													message: '应用名称不能超过10个字'
												}, {
													validator: function (rule, value, callback) {

														if (value && value.length >= 2 && value.length <= 10 && value.match(/^\s/)) {
															callback(new Error('行首不能输入空格'));
														}
														callback();
													}
												}],
												trigger: ['onBlur', 'onChange']
											}]
										}) } className="Modify" name="appName" style={{ width: 160 }} /></FormItem>
										<Button onClick={this.save.bind(this, 'appName')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
											<span className="Modify">保存</span>
										</Button>
									</span>
									:
									<span className="appNameModifyStatus" onClick={this.modify}>{this.props.form.getFieldValue('appName') || this.state.appName}</span>
								}
							</FormItem>
							<FormItem {...formItemLayout} label="应用包名&nbsp;&nbsp;&nbsp;&nbsp;">
								<span>{this.state.value.packageName}</span>
							</FormItem>
							<FormItem {...formItemLayout} label="应用图标&nbsp;&nbsp;&nbsp;&nbsp;">
								<Upload {...getFieldProps('appIconUrl') } style={{ width: 170 }}  {...props}  >
									<Button size="large" className="btn_normal_show " type="ghost">
										更换图片{this.state.loading ? <Icon type="loading" /> : <span></span>}
									</Button>

								</Upload>
								<span style={{ position: 'static' }} className="upload_tips">尺寸为480*480，500KB以内</span>
								{this.state.appIconUrl ?
									<div className="img_review"><img width="160" height="160" src={this.state.appIconUrl || utils.cdn + '/resources/push/images/default_icon.png'} /></div>
									:
									<div className="img_review"><div>图片预览</div></div>
								}
							</FormItem>
							<FormItem {...formItemLayout} label={<Info text="App ID&nbsp;&nbsp;&nbsp;&nbsp;" />}>
								<span>{this.state.value.pushAppId}</span>
							</FormItem>
							<FormItem {...formItemLayout} label={<Info text="App Key&nbsp;&nbsp;&nbsp;&nbsp;" />}>
								<span>{this.state.value.appKey}</span>
							</FormItem>
							<FormItem {...formItemLayout} label={<Info text="App Secret&nbsp;&nbsp;&nbsp;&nbsp;" />}  >
								<span>{this.state.appSecret}</span>


								<Popover
									placement="bottom"
									visible={self.state.visibleReset}
									content={self.getContent('visibleReset')}
									title="确定重置吗?"
									onVisibleChange={self.togglePopover.bind(self, 'visibleReset')}
									trigger="click"   >
									<Button className="btn_normal_show fs14  w_80" type="ghost">重置</Button>

								</Popover>
							</FormItem>
							{userAuth > 1 ?
								<FormItem {...formItemLayout} label="订阅白名单&nbsp;&nbsp;&nbsp;&nbsp;">
									<RadioGroup value={this.state.unVerifySub} defaultValue={this.state.unVerifySub} onChange={this.changeUnVerifySub} >
										<Radio name="unVerifySub" value={1}>打开</Radio>
										<Radio name="unVerifySub" value={0}>关闭</Radio>
									</RadioGroup>
									{this.state.unVerifySub ?
										this.state.unVerifySubExpireTimeModifyStatus ?
											<span>
												<span className="pl10 pr10">有效期至：</span>
												<DatePicker disabledDate={disabledDate} {...getFieldProps('startTime', {
													initialValue: this.state.unVerifySubExpireTime,
													onChange: this.changeUnVerifySubExpireTime
												}) } showTime format={'yyyy-MM-dd H:mm:ss'} />
												<Button onClick={this.save.bind(this, 'unVerifySubExpireTime')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
													<span className="Modify">保存</span>
												</Button>
											</span>
											:
											<span className="unVerifySubExpireTimeModifyStatus" onClick={this.modify}>
												<span className="pl10 pr10">有效期至：</span>
												{this.state.unVerifySubExpireTime}
											</span>
										: null}

								</FormItem>
								: null}
							<FormItem {...formItemLayout} label='快速集成&nbsp;&nbsp;&nbsp;&nbsp;'>
								<Button onClick={this.downloadApkCode} size="large" className="btn_normal_show " type="ghost">下载代码</Button>

								<Popover
									overlayClassName="show_apk_code"
									placement="right"
									visible={self.state.showApkCode}
									content={self.getContent('showApkCode')}
									onVisibleChange={this.togglePopover.bind(this, 'showApkCode')}
									trigger="click"   >
									<Button onClick={this.buildApk} size="large" className="btn_normal_show ml10" type="ghost">扫描下载DemoAPK</Button>

								</Popover>
							</FormItem>
						</Col>
					</Row>
					{userAuth > 1 ?
						<div>
							<Row>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label="通道权限&nbsp;&nbsp;&nbsp;&nbsp;">
										<Select onChange={this.changeChannelAccess} defaultValue={String(this.state.channelAccess)} value={String(this.state.channelAccess)}
											style={{ width: 160 }} size="large" >
											<Option value="0">共享通道</Option>
											<Option value="1">独立通道</Option>
										</Select>
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label="通道速率&nbsp;&nbsp;&nbsp;&nbsp;">
										{this.state.limitRateModifyStatus ?
											<span>
												<Input min='1' type="number" className="Modify" defaultValue={this.state.limitRate} name="limitRate" onChange={this.keyup} style={{ width: 160 }} />
												<Button onClick={this.save.bind(this, 'limitRate')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
													<span className="Modify">保存</span>
												</Button>
											</span>
											:
											<span className="limitRateModifyStatus" onClick={this.modify}>{this.state.limitRate}</span>
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label="离线消息数&nbsp;&nbsp;&nbsp;&nbsp;">
										{this.state.collapseModifyStatus ?
											<span>
												<Input min='1' type="number" className="Modify" defaultValue={this.state.collapse} name="collapse" onChange={this.keyup} style={{ width: 160 }} />
												<Button onClick={this.save.bind(this, 'collapse')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
													<span className="Modify">保存</span>
												</Button>
											</span>
											:
											<span className="collapseModifyStatus" onClick={this.modify}>{this.state.collapse}</span>
										}
									</FormItem>
								</Col>

								<Col span="12">
									<FormItem {...smallFormItemLayout} label="每天推送限制&nbsp;&nbsp;&nbsp;&nbsp;">
										{this.state.limitTimesModifyStatus ?
											<span>
												<Input min='1' type="number" className="Modify" defaultValue={this.state.limitTimes} name="limitTimes" onChange={this.keyup} style={{ width: 160 }} />
												<Button onClick={this.save.bind(this, 'limitTimes')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
													<span className="Modify">保存</span>
												</Button>
											</span>
											:
											<span className="limitTimesModifyStatus" onClick={this.modify}>{this.state.limitTimes}</span>
										}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label="标签个数限制&nbsp;&nbsp;&nbsp;&nbsp;">
										{this.state.appTagLimitModifyStatus ?
											<span>
												<Input min='1' type="number" className="Modify" defaultValue={this.state.appTagLimit} name="appTagLimit" onChange={this.keyup} style={{ width: 160 }} />
												<Button onClick={this.save.bind(this, 'appTagLimit')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
													<span className="Modify">保存</span>
												</Button>
											</span>
											:
											<span className="appTagLimitModifyStatus" onClick={this.modify}>{this.state.appTagLimit}</span>
										}
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label="Flyme账户权限&nbsp;&nbsp;&nbsp;&nbsp;">
										<RadioGroup value={this.state.flymeAuth} defaultValue={this.state.flymeAuth} onChange={this.changeFlymeAuth} >
											<Radio name="flymeAuth" value={true}>打开</Radio>
											<Radio name="flymeAuth" value={false}>关闭</Radio>
										</RadioGroup>

									</FormItem>
								</Col>

							</Row>
							<Row>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label="缓存消息&nbsp;&nbsp;&nbsp;&nbsp;">
										<RadioGroup value={this.state.msgCache} defaultValue={this.state.msgCache} onChange={this.changeMsgCache} >
											<Radio name="msgCache" value={true}>打开</Radio>
											<Radio name="msgCache" value={false}>关闭</Radio>
										</RadioGroup>

									</FormItem>
								</Col>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label="缓存消息上限&nbsp;&nbsp;&nbsp;&nbsp;">
										{this.state.msgCacheLimitModifyStatus ?
											<span>
												<Input type="number" min={1} max={99999} className="Modify" defaultValue={this.state.msgCacheLimit} name="msgCacheLimit" onChange={this.keyup} style={{ width: 160 }} />
												<Button onClick={this.save.bind(this, 'msgCacheLimit')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
													<span className="Modify">保存</span>
												</Button>
											</span>
											:
											<span className="msgCacheLimitModifyStatus" onClick={this.modify}>{this.state.msgCacheLimit}</span>
										}
									</FormItem>
								</Col>

							</Row>
							<Row>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label={<span className="label_pdr">应用推送消息总量（条/天）</span>}>
										{this.state.msgTotalLimitModifyStatus ?
											<span>
												<Input type="number" min={1} className="Modify" defaultValue={this.state.msgTotalLimit} name="msgTotalLimit" onChange={this.keyup} style={{ width: 160 }} />
												<Button onClick={this.save.bind(this, 'msgTotalLimit')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
													<span className="Modify">保存</span>
												</Button>
											</span>
											:
											<span className="msgTotalLimitModifyStatus" onClick={this.modify}>{this.state.msgTotalLimit}</span>
										}
									</FormItem>
								</Col>

								<Col span="12">
									<FormItem {...smallFormItemLayout} label="开启明细查询&nbsp;&nbsp;&nbsp;&nbsp;">
										<RadioGroup value={this.state.dwAuth} defaultValue={this.state.dwAuth} onChange={this.changeDwAuth} >
											<Radio name="dwAuth" value={1}>打开</Radio>
											<Radio name="dwAuth" value={0}>关闭</Radio>
										</RadioGroup>

									</FormItem>
								</Col>
							</Row>
							<Row>

								<Col span="12">
									<FormItem {...smallFormItemLayout} label={<span className="label_pdr">总Task创建数量限制（次/天）</span>}>
										{this.state.apiTaskLimitModifyStatus ?
											<span>
												<Input type="number" min={1} className="Modify" defaultValue={this.state.apiTaskLimit} name="apiTaskLimit" onChange={this.keyup} style={{ width: 160 }} />
												<Button onClick={this.save.bind(this, 'apiTaskLimit')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
													<span className="Modify">保存</span>
												</Button>
											</span>
											:
											<span className="apiTaskLimitModifyStatus" onClick={this.modify}>{this.state.apiTaskLimit}</span>
										}

									</FormItem>
								</Col>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label="允许推送其他包名&nbsp;&nbsp;&nbsp;&nbsp;">
										<RadioGroup value={this.state.pushOtherPackage} defaultValue={this.state.pushOtherPackage} onChange={this.changePushOtherPackage} >
											<Radio name="pushOtherPackage" value={1}>打开</Radio>
											<Radio name="pushOtherPackage" value={0}>关闭</Radio>
										</RadioGroup>

									</FormItem>
								</Col>
							</Row>
							<Row>

								<Col span="12">
									<FormItem {...smallFormItemLayout} label="推送属性分析&nbsp;&nbsp;&nbsp;&nbsp;">
										<RadioGroup value={this.state.insightAuth} defaultValue={this.state.insightAuth} onChange={this.changeInsightAuth} >
											<Radio name="insightAuth" value={1}>打开</Radio>
											<Radio name="insightAuth" value={0}>关闭</Radio>
										</RadioGroup>

									</FormItem>
								</Col>
								<Col span="12">
									<FormItem {...smallFormItemLayout} label={<span className="label_pdr">透传总量限制</span>}>
										{this.state.directLimitModifyStatus ?
											<span>
												<Input type="number" min={1} className="Modify" defaultValue={this.state.directLimit} name="directLimit" onChange={this.keyup} style={{ width: 160 }} />
												<Button onClick={this.save.bind(this, 'directLimit')} size="large" className="btn_normal_show ml10 w_80 " type="ghost">
													<span className="Modify">保存</span>
												</Button>
											</span>
											:
											<span className="directLimitModifyStatus" onClick={this.modify}>{this.state.directLimit}</span>
										}

									</FormItem>
								</Col>
							</Row>
						</div>
						: null}
				</Form>

			</div>
		);
	}
});
App = Form.create()(App);
module.exports = App;



