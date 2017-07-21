'use strict';
import React from 'react';
import { Row, Col, Form, Input, Button, Upload, Icon, message } from 'antd';
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

let AddMaterial = React.createClass({

	getInitialState() {
		return {
			data: null,
			value: ''
		};
	},


	add() {
		const appId = utils.queryString('appId', window.location.href);
		let self = this;
		this.props.form.validateFields((errors, values) => {
			if (errors) {

				console.log('Errors in form!!!');
				return;
			}
			const data = {
				title: values.title.trim(),
				appId: appId,
				filePath: values.filePath
			};

			ajax.post(restapi.materialAdd, data, function () {
				message.success('新建成功');

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
		let url = restapi.materialUpload;

		const {
			getFieldProps
		} = this.props.form;
		const appId = utils.queryString('appId', window.location.href);
		url = utils.makeUrl(url, {
			appId: appId
		});
		let size = 10;
		const props = {
			name: 'materialFile',
			data: {},
			accept: '.xlsx,.xls',
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
				let name=file.name;
				let arr=name.split('.');
				let len=arr.length;
				let surfix=arr[len-1];
				
				const isExcel = (surfix==='xlsx' || surfix==='xls' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel');
				if (!isExcel) {
					message.error('请上传Excel文件');
					self.setState({
						loading: false
					});
				}
				return isExcel;
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
							filePath: undefined
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
							filePath: value
						});
						self.setState({
							blackNum: value.blackNum,
							appName: value.appName
						});

					} else {

						info.fileList.pop();
						message.error(info.file.response.message);


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
								<span className="border"></span>上传资源
							</div>

						</Col>
					</Row>

				</div>



				<Row className="mt10">
					<Col span="8">
						<FormItem {...formItemLayout} label='备注'>

							<Input {...getFieldProps('title', {
								validate: [{

									rules: [{
										required: true,
										message: '请填写备注'
									}, {
										max: 150,
										message: '备注不能超过150个字'
									}],

									trigger: ['onBlur', 'onChange']
								}]
							}) } placeholder='备注' />
						</FormItem>
						<FormItem className='mt10' {...formItemLayout} label='&nbsp;'>

							<Upload {...getFieldProps('filePath', {
								validate: [{

									rules: [{
										required: true,
										message: '请上传文件'
									}],

									trigger: ['onBlur', 'onChange']
								}]
							}) } style={{ width: 200 }} {...props} >
								<Button disabled={this.state.loading ? true : false} size="large" className="btn_normal_show " type="ghost">
									Excel文档批量导入
					{this.state.loading ? <Icon type="loading" /> : <span></span>}
								</Button>
							</Upload>
							<span className="upload_tips"><a download href={restapi.materialDownload + '?appId=' + appId}>下载模板</a></span>
						</FormItem>
						<FormItem className='mt10' {...formItemLayout} label='&nbsp;'>

							<Button size="large" onClick={this.add} type="primary">新增</Button>
						</FormItem>


					</Col>

				</Row>
			</Form>
		);
	}
});

AddMaterial = Form.create()(AddMaterial);

module.exports = AddMaterial;

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