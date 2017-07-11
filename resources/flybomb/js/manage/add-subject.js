'use strict';
import React from 'react';
import { Button, Row, Col, message, Radio, Select, Tooltip, Modal, Icon, Form, Input } from 'antd';
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
import restapi from '../../lib/url-model';
import ajax from '../../components/ajax';
const formItemLayout = {
	labelCol: {
		span: 5
	},
	wrapperCol: {
		span: 19
	}
};

let App = React.createClass({
	getInitialState() {
		return {
			subjectList: [],
			loading: false
		};
	},
	componentDidMount() {
	},
	handleOk() {
		this.props.form.validateFields((errors, values) => {
		
			if (errors && Object.keys(errors).length === 0) {
				errors = null;
			}
			if (errors) {

				console.log('Errors in form!!!');
				return;
			}
			const data = {

				name: values.addName
			};

			ajax.post(restapi.addSubject, data, () => {
				message.success('新建成功');
				this.props.toggleModal();
				this.props.getList();
			});

		});

	},
	handleCancel() {

		this.props.toggleModal();
	},

	render() {


		const {
			getFieldDecorator
		} = this.props.form;
		var self = this;
		return (

			<Form style={{ paddingTop: 20 }} layout='horizontal'>
				<Modal
					title="新建科目"
					visible={this.props.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}>
					<FormItem {...formItemLayout} label="科目" >
						{getFieldDecorator('addName', {
							validate: [{
								rules: [{
									whitespace: true,
									required: true,
									message: '请填写科目名称'
								}],
								trigger: ['onBlur', 'onChange']
							}]

						})(<Input style={{ width: 300 }} />)}
					</FormItem>
				</Modal>
			</Form>
		);
	}
});
App = Form.create()(App);


module.exports = App;