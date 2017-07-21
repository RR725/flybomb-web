'use strict';
import React from 'react';
import { Button, Row, Col, Form } from 'antd';


const FormItem = Form.Item;

import utils from '../../../lib/utils';


import PushTime from '../../push-time';



const formItemLayoutSmall = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};



let AddAppTask = React.createClass({
	getInitialState() {
		return {
			initData: {},
			values: [],
			data: null,
			noticeBarType: '0',
			noticeExpandType: '0',
			pushTimeType: 0,
			errors: {}
		};
	},
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {


			if (errors) {

				console.log('Errors in form!!!');
				return;
			}

			const st = values.startTime;
			const et = values.endTime;
			if (+new Date(st) > +new Date(et)) {
				return;
			}

			values.index = 1;
			values.startTime = utils.dateFormat('yyyy-MM-dd', values.startTime);
			values.endTime = utils.dateFormat('yyyy-MM-dd', values.endTime);
			for (let i in values) {
				if (values[i] === '') {
					delete values[i];
				}

			}

			this.props.onSearch(values);
		});
	},
	render() {

		return (
			<Form horizontal>
				<Row>
					<Col span="24">

						<PushTime type='day' form={this.props.form} />
					</Col>

				</Row>
				<Row>
					<Col style={{ paddingLeft: '89px' }}>
						<FormItem {...formItemLayoutSmall} label="">
							<Button className="ml10" type="primary" onClick={this.handleSubmit} size="large">查询</Button>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;

