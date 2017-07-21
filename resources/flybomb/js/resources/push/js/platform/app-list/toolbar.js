'use strict';
import React from 'react';
import { Row, Col,  message,  Form } from 'antd';


import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';
import utils from '../../../lib/utils';
import ProductTypeApp from '../../../js/producttype-app';
let AddAppTask = React.createClass({
	getInitialState() {
		return {
			initData: {},
			values: [],
			data: null,
			noticeBarType: '0',
			noticeExpandType: '0',
			pushTimeType: '0',
			appName: '全部应用',
			appId: 0,
			errors: {},
			defaultAppid: '应用',
			randomUser: 1
		};
	},
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {


			if (errors) {

				console.log('Errors in form!!!');
				return;
			}
			values.noticeBarInfo = {
				noticeBarType: values.noticeBarType,
				title: values.title,
				content: values.content,
				noticeBarImgUrl: values.noticeBarImgUrl
			};
			delete values.noticeBarType;
			delete values.title;
			delete values.content;
			delete values.noticeBarImgUrl;




			ajax.post(restapi.addNotice, values, function () {
				message.success('提交成功');
			});
		});
	},
	// userExists(rule, value, callback) {
	// 	callback();
	// },
	validateTitle(type) {
		const { getFieldProps } = this.props.form;

		return getFieldProps(type, {
			rules: [
				{ required: true, message: '请输入标题' },
				{ min: 4, message: '标题不能少于4个字' },
				{ max: 15, message: '标题不能超过15个字' }
			]
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
		let id = utils.queryString('id', window.location.href);
		if (!id) return;
		self.props.form.setFieldsValue({
			appId: id
		});
	},
	changeRadio(e) {
		const data = {};
		data[e.target.name] = e.target.value;
		this.setState(data);
	},
	textInput() {

	},
	selectType(value, name) {
		this.props.form.setFieldsValue({
			appId: value
		});
		this.setState({
			appId: value,
			appName: name
		});
		let searchParam = {
			appId: value || 0,
			name: '',
			index: 1
		};
		this.props.onSearch(searchParam);
	},
	render() {

		const androidInitData = {
			api: restapi.listUserApp,
			width: '190',
			all: '全部应用',
			appName: this.state.appName,
			name: 'appId',
			appId: this.state.appId
		};
		return (
			<Form horizontal>
				<Row className="home_toolbar">
					<Col span="24">
						<ProductTypeApp.render notFoundContent="无数据" showSearch searchPlaceholder='搜索应用名称' selectType={this.selectType} initData={androidInitData} />

					</Col>
				</Row>
			</Form>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;

