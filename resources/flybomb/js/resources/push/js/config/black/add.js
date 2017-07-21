'use strict';
import React from 'react';
import { Row, Col, Form, Input, Button, Upload, Modal, Icon, message } from 'antd';
import utils from '../../../lib/utils';

import ajax from '../../../components/ajax';
import restapi from '../../../lib/url-model';
const FormItem = Form.Item;


const formItemLayout = {
	labelCol: {
		span: 6
	},
	wrapperCol: {
		span: 18
	}
};

let AddBlack = React.createClass({

	getInitialState() {
		return {
			data: null,
			value: '',
			searchStatus: false
		};
	},



	handleCancel() {
		this.setState({
			visible: false
		});
	},
	handleOk() {
		const self = this;
		const appId = utils.queryString('appId', window.location.href);
		this.props.form.validateFields((errors, values) => {
			if (errors) {
				console.log(errors);
				console.log('Errors in form!!!');
				return;
			}
			let url = restapi.blackAdd;
			url = utils.makeUrl(url, {
				blackName: values.blackName,
				blackFilePath: values.blackFilePath,
				appId: appId || 0
			});
			ajax.get(url, function () {
				message.success('保存成功');
				self.handleCancel();
				let searchParam = {
					appId: appId,
					index: 1
				};
				self.props.getTableData(searchParam);
			});
		});
	},
	render() {
		const self = this;
		let url = restapi.blackUpload;

		const {
			getFieldProps
		} = this.props.form;
		const appId = utils.queryString('appId', window.location.href);
		url = utils.makeUrl(url, {
			appId: appId
		});
		let size = 10;
		const props = {
			name: 'blackFile',
			data: {},
			accept: '.txt',
			action: url,
			beforeUpload(file) {
				self.setState({
					loading: true
				});
				const fileType = file.type;
				if (file.size > 1024 * 1024 * size) {
					message.error(`文件大小不能超过${size}M`);
					self.setState({
						loading: false
					});
					return false;
				}

				if (self.props.tableData.data.length > 4) {
					message.error('每个业务限定设置5条黑名单');
					self.setState({
						loading: false
					});
					return false;
				}
				const isText = fileType === 'text/plain';
				if (!isText) {
					message.error('请上传txt格式的文件');
					self.setState({
						loading: false
					});
				}
				return isText;
			},
			headers: {
				authorization: 'authorization-text',
			},
			onChange(info) {
				if (info.file.status === 'removed') {
					self.setState({
						loading: false
					});
					if (info.fileList.length < 1) {

						self.props.form.setFieldsValue({
							blackFilePath: undefined
						});
					}
					return;
				}
				if ('error' === info.file.status) {
					self.setState({
						loading: false
					});
				}
				if ('done' === info.file.status) {
					self.setState({
						loading: false
					});
					if (info.file.response.code == 200) {
						let value = info.file.response.value;
						if (info.fileList.length > 1) {
							info.fileList.shift();
						}
						message.success(`${info.file.name} 上传成功。`);
						self.props.form.setFieldsValue({
							blackFilePath: value.blackFilePath
						});
						self.setState({
							visible: true,
							blackNum: value.blackNum,
							appName: value.appName
						});


					} else {

						info.fileList.pop();
						message.error(info.file.response.message);
						self.setState({
							visible:false
						});

					}
				}
			}
		}; 
		return (
			<Form className="add_black">
				<div className="sub_toolbar config_toolbar">
					<Row>

						<Col span="14">
							<div className="title">
								<span className="border"></span>新建黑名单
								<span className="fs12 pl10 color999">每个业务限定设置5条黑名单</span>
							</div>

						</Col>
					</Row>

				</div>



				<Row className="mt10">
					<Col span="8">

						<FormItem {...formItemLayout} label='&nbsp;'>

							<Upload {...getFieldProps('blackFilePath') } style={{ width: 200 }} {...props} >
								<Button disabled={this.state.loading ? true : false} size="large" className="btn_normal_show " type="ghost">
									TXT文档批量导入
					{this.state.loading ? <Icon type="loading" /> : <span></span>}
								</Button>
							</Upload>
							<span className="upload_tips">最多不超过10M，UTF-8无BOM格式编码文件，内容以回车键进行分割</span>
						</FormItem>


					</Col>

				</Row>
				{this.state.visible &&
					<Modal
						width={1000}
						onCancel={this.handleCancel}
						onOk={this.handleOk}
						okText='保存'
						cancelText='取消'
						title='添加黑名单'
						visible={true}>
						<FormItem {...formItemLayout} label="黑名单名称">
							<Input style={{ width: 200 }} {...getFieldProps('blackName', {

								validate: [{
									rules: [{
										required: true,
										message: '请输入黑名单名称',
									}, {
										max: 30,
										message: '黑名单不能超过30个字',
									}],
									trigger: ['onBlur', 'onChange']
								}]
							}) } />
						</FormItem>
						<FormItem {...formItemLayout} label="应用名称">
							<div style={{ padding: '3px 0' }}>{this.state.appName}</div>
						</FormItem>
						<FormItem {...formItemLayout} label="设备数">
							<div style={{ padding: '3px 0' }}>{this.state.blackNum}</div>
						</FormItem>

					</Modal>
				}
			</Form>
		);
	}
});

AddBlack = Form.create()(AddBlack);

module.exports = AddBlack;

	// <Row className="mt10">
	// 				<Col span="8">
	// 					<FormItem {...getFieldProps('blackName', {

	// 						validate: [{
	// 							rules: [{
	// 								required: true,
	// 								message: '请输入黑名单名称',
	// 							}],
	// 							trigger: ['onBlur', 'onChange']
	// 						}]
	// 					}) } {...formItemLayout} label='黑名单名称'>
	// 						<Input />
	// 					</FormItem>

	// 				</Col>

	// 			</Row>

	// 			<Row className="mt10">
	// 				<Col span="8">

	// 					<FormItem {...formItemLayout} label='&nbsp;'>

	// 						<Button type="primary" onClick={this.handleSubmit} size="large">确认上传</Button>
	// 					</FormItem>


	// 				</Col>

	// 			</Row>