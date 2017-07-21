'use strict';
import React from 'react';

import { Radio, DatePicker, Form } from 'antd';
import utils from '../lib/utils';

import validate from './validate-date';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;




const PushTime = React.createClass({

	getInitialState() {
		const router = this.props.router;
		const day = 1000 * 60 * 60 * 24;
		const nd = new Date();
		const dt = router === 'userdata' ? new Date(+new Date() - 6 * day) : nd;
		let st = utils.dateFormat('yyyy-MM-dd', dt);
		const startTime = utils.dateParse(st + ' 00:00:00');
		return {
			startTimeStatus: 'success',
			endTimeStatus: 'success',
			startTime: startTime,
			endTime: nd,
			display: 'none',
			errorTips: '',
			pushTimeType: 0
		};
	},
	changeRadio(e) {

		const value = e.target.value;
		const time = +new Date();
		const day = 1000 * 60 * 60 * 24;
		let json = {
			pushTimeType: value
		};

		if (value === 1) {
			json.endTime = new Date(time - Number(value) * day);
		} else {
			json.endTime = new Date();
		}
		if (typeof value === 'number') {
			json.startTime = new Date(time - Number(value) * day);
			let st = utils.dateFormat('yyyy-MM-dd', json.startTime);
			if (value === 1 || value === 0) {
				json.startTime = utils.dateParse(st + ' 00:00:00');
			}
			if (value === 1) {
				json.endTime = utils.dateParse(st + ' 23:59:59');
			}
			json.display = 'none';
			json.startTimeStatus = 'success';
			json.endTimeStatus = 'success';
			json.errorTips = '';

		} else {
			json.startTime = new Date();
		}
		this.setState(json);

		this.props.form.setFieldsValue(json);


	},
	componentDidMount() {
		if (this.props.router === 'userdata') {
			this.setState({
				pushTimeType: 6
			});
		}
	},

	onOpen() {
		this.setState({
			pushTimeType: 'other'
		});
	},
	changeStartTime(value) {

		const router = this.props.router;
		const required = this.props.required;
		const data = {
			router: router,
			required: required
		};
		const et = this.props.form.getFieldValue('endTime');
		const json = validate.changeStartTime(value, et, data);

		this.setState(json);

	},
	changeEndTime(value) {

		const required = this.props.required;
		const data = {
			required: required
		};
		const st = this.props.form.getFieldValue('startTime');
		const json = validate.changeEndTime(value, st, data);
		this.setState(json);
	},
	render() {

		let second = '';
		const type = this.props.type;
		const router = this.props.router;
		if (type === 'second') {
			second = ' H:mm:ss';
		}
		const { getFieldProps } = this.props.form;
		return (
			<FormItem className="radio_btn" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} label="时间&nbsp;&nbsp;&nbsp;&nbsp;">
				{router === 'personal' ? null :
					<RadioGroup onChange={this.changeRadio} value={this.state.pushTimeType} size="large" style={{ marginRight: 10 }} >

						{router === 'userdata' ? null : <RadioButton value={0}>今天</RadioButton>}
						{router === 'userdata' ? null : <RadioButton value={1}>昨天</RadioButton>}
						{router === 'analyze' ? null : <RadioButton value={6}>最近7天</RadioButton>}
						{router === 'analyze' ? null : <RadioButton value={30}>最近30天</RadioButton>}
						<RadioButton value="other">选择日期</RadioButton>

					</RadioGroup >
				}
				<FormItem validateStatus={this.state.startTimeStatus} className="display_ib va_t mg0"><DatePicker {...getFieldProps('startTime', {
					initialValue: this.state.startTime,
					onChange: this.changeStartTime
				}) } toggleOpen={this.onOpen} showTime format={'yyyy-MM-dd' + second} /></FormItem>
				{router === 'analyze' ? null : <span className="pl10 pr10">至</span>}
				{router === 'analyze' ? null : <FormItem validateStatus={this.state.endTimeStatus} className="display_ib va_t mg0"><DatePicker {...getFieldProps('endTime', {
					initialValue: this.state.endTime,
					onChange: this.changeEndTime
				}) } toggleOpen={this.onOpen} showTime format={'yyyy-MM-dd' + second} /></FormItem>}
				<span style={{ display: this.state.display }} className="color_error pl10">{this.state.errorTips}</span>
			</FormItem>
		);
	}
});

module.exports = PushTime;