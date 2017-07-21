'use strict';
import React from 'react';
import { Form, Radio, DatePicker, Button, TimePicker } from 'antd';
const ButtonGroup = Button.Group;
import utils from '../../../lib/utils';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const startTime = new Date();

const formItemLayout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 17
	}
};
window._cronWeeks = [1];
let ValidateTime = React.createClass({
	getInitialState() {
		return {
			cronWeek: [1],
			cronWeek1: true
		};
	},
	onChange(value) {
		this.props.onChangePushTime(value);
	},
	selectCronWeek(type) {
		let cronWeek = this.state.cronWeek;
		let week = cronWeek.filter(function (data) {
			return data !== type;
		});
		if (week.length === cronWeek.length) {
			cronWeek.push(type);
		} else {
			cronWeek = week;
		}
		cronWeek.sort();
		window._cronWeeks = cronWeek;
		this.setState({
			cronWeek: cronWeek,
			['cronWeek' + type]: !this.state['cronWeek' + type]
		});

		this.props.selectCronWeek(cronWeek);
	},
	componentWillUnmount: function () {
		if (!this.props.jumpUserGroup) {
			window._cronWeeks = [1];
		}
	},
	selectCronTime() {
	},
	componentDidMount() {

		const pushType = utils.queryString('pushType', window.location.href);
		if (pushType === 'timing') {
			let cronWeek = window._cronWeeks;

			if (this.props.selectCronWeek) {
				this.props.selectCronWeek(cronWeek);
			}
			let dateNow = new Date();
			let data = {
				dateNow: dateNow,
				cronWeek: cronWeek
			};
			cronWeek.map(function (opt) {
				data['cronWeek' + opt] = true;
			});
			this.setState(data);
		}

	},

	onSelect() {

	},
	render() {
		const href = window.location.href;
		let search = href.split('#');
		const pushType = utils.queryString('pushType', search[1]);
		const disabledDate = function (current) {
			return current && current.getTime() + 1000 * 60 * 60 * 24 <= Date.now();
		};
		let weeks = ['一', '二', '三', '四', '五', '六', '日'];
		const buttons = weeks.map((data, key) => {
			let num = key + 1;
			return <Button key={key} onClick={() => this.selectCronWeek(num)} type={this.state['cronWeek' + num] ? 'primary' : ''}>{data}</Button>;
		});
		let dateNow = this.state.dateNow;
		let html = pushType === 'timing' ?
			<FormItem {...formItemLayout} label="任务定制&nbsp;&nbsp;&nbsp;&nbsp;">
				<FormItem className="timing_push radio_btn time_push_checkbox" {...this.props.formItemLayout} label="推送周期&nbsp;&nbsp;&nbsp;&nbsp;">
					<ButtonGroup>
						{buttons}
					</ButtonGroup>
				</FormItem>
				<FormItem style={{ paddingTop: 10 }} className="timing_push" {...this.props.formItemLayout} label="推送时间&nbsp;&nbsp;&nbsp;&nbsp;">

					<TimePicker  {...this.props.getFieldProps('cronTime', {
						initialValue: dateNow,
						onChange: this.selectCronTime,
						validate: [{
							rules: [{
								required: true,
								type: 'date',
								message: '请选择时间',
							}],
							trigger: ['onBlur', 'onChange']
						}]
					}) } placeholder="选择时间" size="large" />
				</FormItem>
			</FormItem>
			:
			<FormItem {...this.props.formItemLayout} label="推送时间&nbsp;&nbsp;&nbsp;&nbsp;">
				<RadioGroup onChange={this.onChange} {...this.props.getFieldProps('pushTimeType', {
					initialValue: this.props.pushTimeType,
					onChange: this.props.changeRadio
				}) }>
					<Radio name="pushTimeType" value={0}>即时</Radio>
					<Radio name="pushTimeType" value={1}>定时</Radio>

				</RadioGroup>
				{(this.props.pushTimeType === 1) ?
					<FormItem className="display_ib mg0">
						<DatePicker disabledDate={disabledDate} {...this.props.getFieldProps('startTime', {
							initialValue: startTime,
							onChange: this.onChange,
							validate: [{
								rules: [{
									required: true,
									type: 'date',
									message: '请输入推送时间',
								}, {
									validator: function (rule, value, callback) {
										const currentTime = +new Date();
										const st = +new Date(value);
										if (value && currentTime - st > 0) {
											callback('推送时间不能早于当前时间');
										} else {
											callback();
										}
									}
								}],
								trigger: ['onBlur', 'onChange']
							}]
						}) } showTime format="yyyy-MM-dd HH:mm:ss" />
					</FormItem>

					: null}
			</FormItem>;
		return html;
	}
});

ValidateTime = Form.create()(ValidateTime);
module.exports = ValidateTime;




