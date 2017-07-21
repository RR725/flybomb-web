'use strict';
import React from 'react';

import {Button, Form, message, Row, Col, Select, Input} from 'antd';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';


const FormItem = Form.Item;


let App = React.createClass({
	getInitialState() {
		return {

		};
	},


	handleSubmit() {
		const self = this;
		this.props.form.validateFields((errors, values) => {
			if (errors) {
				console.log(errors);
				console.log('Errors in form!!!');
				return;
			}
			let url = restapi.addModuleUrl;
			const moduleId = values.moduleId;
			url = utils.makeUrl(url, {
				moduleId: moduleId,
				url: values.url
			});
			ajax.get(url, function () {
				message.success('新增成功');
				self.props.onSearch({
					moduleId: moduleId,
					index: 1
				});
				self.props.changeModuleId(moduleId);

			});
		});
	},
	validate(type, message) {

		const { getFieldProps } = this.props.form;
		return getFieldProps(type, {

			validate: [{
				rules: [{
					required: true,
					message: message,
				}],
				trigger: ['onBlur', 'onChange']
			}]


		});
	},
	render() {


		const optionsDom = this.props.optionsDom;
		if (!optionsDom) return null;

		return (
			<div>
				<Form horizontal>
					<Row>
						<Col span="24">
							<FormItem labelCol={{ span: 2 }} wrapperCol= {{ span: 7 }}  label="模块名称&nbsp;&nbsp;&nbsp;&nbsp;">
								<Select style={{ width: 150 }} {...this.validate('moduleId', '请选择模块名称') }  showSearch notFoundContent="无数据" searchPlaceholder='搜索模块名称'>
									{optionsDom}
								</Select>
							</FormItem>

						</Col>
					</Row>
					<Row>
						<Col span="24">
							<FormItem labelCol={{ span: 2 }} wrapperCol= {{ span: 20 }}  label="URL地址&nbsp;&nbsp;&nbsp;&nbsp;">
								<Input style={{ width: 500 }}  {...this.validate('url', '请输入URL地址') } />
							</FormItem>

						</Col>

					</Row>
					<Row>

						<Col span="12">

							<FormItem  labelCol={{ span: 4 }} wrapperCol= {{ span: 20 }}  label="&nbsp;">
								<Button type="primary" onClick={this.handleSubmit} size="large">新增</Button>
							</FormItem>
						</Col>
					</Row>

				</Form>
			</div>
		);
	}
});



App = Form.create()(App);


module.exports = App;
