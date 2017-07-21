'use strict';
import React from 'react';

import { Form, Input, Radio} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const ValidateTime = React.createClass({

	getInitialState() {
		return {
			show: true
		};
	},
	validateTime(type) {
		let self = this;
		return this.props.getFieldProps(type, {
			initialValue: self.props.form.getFieldValue('validTime') || '24',
			rules: [{
				validator: function (rule, value, callback) {
					value = String(value);
					if (!value) {
						callback(new Error('请输入有效时长'));
						return;
					}
					if (value && value.match(/^\s/)) {
						callback(new Error('行首不能输入空格'));
						return;
					}
					if (value && (!value.match(/^\d+$/) || value > 72)) {
						self.props.form.setFieldsValue({
							[type]: 72
						});
						// callback(new Error('有效时长为1-72之间'));
					}
					if (value && (!value.match(/^\d+$/) || value < 1 )) {
						self.props.form.setFieldsValue({
							[type]: 1
						});
						// callback(new Error('有效时长为1-72之间'));
					} else {
						callback();
					}
				}
			}]
		});
	},
	render() {
		return (
			<div>

				<FormItem {...this.props.formItemLayout}  label="是否离线&nbsp;&nbsp;&nbsp;&nbsp;">
					<RadioGroup  {...this.props.getFieldProps('offLine', {
						initialValue: this.props.form.getFieldValue('offLine')
					}) }>
						<Radio name="offLine" value={1}>是</Radio>
						<Radio name="offLine" value={0}>否</Radio>
					</RadioGroup>

				</FormItem>
				{this.props.form.getFieldValue('offLine') ?
					<FormItem className="valid_time" extra="&nbsp;&nbsp;小时"  {...this.props.formItemLayout}  label="有效时长&nbsp;&nbsp;&nbsp;&nbsp;">
						<Input type='number' min={1} max={72}  style={{ width: 200 }}  {...this.validateTime('validTime') }  />
					</FormItem>
					: null}
			</div>

		);
	}
});

module.exports = ValidateTime;