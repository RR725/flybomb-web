'use strict';
import React from 'react';
import {
	Button, Modal, message, Form, Input
}
	from 'antd';


const FormItem = Form.Item;
import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';
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
			currentData: [],
			jsonData: [],
			authData: [],//权限的列表
			authChecked: [],//选中的权限，用来控制app的选择状态，是否勾上，数组为空不勾，数组有值勾上
			createSubAccount: this.props.createSubAccount
		};
	},
	handleSubmit(e) {
		let self = this;
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {


			if (errors) {

				console.log('Errors in form!!!');
				return;
			}


			values.appId = self.props.appId;
			values.mainAccountId = self.props.mainAccountId;
			ajax.post(restapi.changeMainAccount, values, function () {
				message.success('主账号更改成功');
				self.props.toggleModal();

				self.props.onSearch({ index: self.props.homeCurrent, appId: values.appId });//刷新主账号列表

				self.props.form.setFieldsValue({
					newAccountName: ''
				});
				const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值
				if (userAuth < 2) {
					const logoutUrl = restapi.logout + '?gotoURL=' + encodeURIComponent(location.origin);
					window.location.href = logoutUrl;
				}

			});
		});
	},
	render() {


		const { getFieldProps } = this.props.form;
		var self = this;

		return (

			<Modal footer={null} title="修改主账号" visible={this.props.showMainAccountModal}
				onCancel={this.props.toggleModal}>
				<Form horizontal>
					<FormItem {...formItemLayout} label='原主账号&nbsp;&nbsp;&nbsp;&nbsp;'>
						<span>{this.props.mainAccount}</span>
					</FormItem>
					<FormItem {...formItemLayout} label='新账号&nbsp;&nbsp;&nbsp;&nbsp;'>
						<FormItem><Input style={{ width: 190 }} placeholder='Flyme账号' {...getFieldProps('newAccountName', {
							validate: [{
								rules: [{
									required: true,
									message: '请输入Flyme账号'
								}, {
									min: 4,
									message: 'Flyme账号不能少于4个字符'
								}, {
									max: 32,
									message: 'Flyme账号不能多于32个字符'
								}, {
									validator: function (rule, value, callback) {
										if (value && value.length >= 4 && value.length <= 32 && value === self.props.mainAccount) {
											callback(new Error('不能和现有的主账号同名'));
										} else {
											callback();
										}

									}
								}],
								trigger: ['onBlur', 'onChange']
							}]
						}) } placeholder="Flyme账号" /></FormItem>
						<p className="fs12  color999">修改主账号后, 控制台将退出登录, 需使用新账号才能重新登录管理</p>
					</FormItem>
					<FormItem {...formItemLayout} label="&nbsp;">
						<Button className="ml10 mt20" type="primary" onClick={this.handleSubmit} size="large">保存</Button>
					</FormItem>
				</Form>
			</Modal>

		);
	}
});
App = Form.create()(App);


module.exports = App;