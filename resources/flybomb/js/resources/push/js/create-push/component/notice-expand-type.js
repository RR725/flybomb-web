'use strict';
import React from 'react';

import { Form, Input, Radio } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

import utils from '../../../lib/utils';
import UploadBigImg from './upload-img';//上传图片


window._noticeExpandContent = '';




const Distinct = React.createClass({
	getInitialState() {
		return {
			listData: [],
			distinctId: {}
		};
	},

	componentWillMount() {
		const deal = utils.queryString('deal', window.location.href);
		if (!deal || this.props.addPush) {//如果是分组推送，点击添加推送内容，要清空掉之前保留的信息

			window._noticeExpandContent = '';
		}
	},
	validateNoticeExpandContent(type) {

		const {
			getFieldProps
		} = this.props.form;

		return getFieldProps(type, {
			initialValue: window._noticeExpandContent,
			validate: [{
				rules: [{
					required: true,
					message: '请输入展开文本'
				}, {
					max: 100,
					message: '展开文本不能超过100个字'
				}, {
					validator: function (rule, value, callback) {

						if (value && value.length <= 100 && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						}
						callback();
					}
				}],
				trigger: ['onBlur', 'onChange']
			}],
			onBlur: (e) => {
				window._noticeExpandContent = e.target.value;

			}
		});
	},
	render() {
		let formItemLayout = this.props.formItemLayout;
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<FormItem {...formItemLayout} label="展开方式&nbsp;&nbsp;&nbsp;&nbsp;">
					<RadioGroup {...getFieldProps('noticeExpandType', {
						initialValue: this.props.form.getFieldValue('noticeExpandType'),
						onChange: this.props.changeRadio
					}) }>
						<Radio name="noticeExpandType" value={0}>标准</Radio>

						{this.props.noticeBarType === 0 || this.props.noticeBarType === 2 ? <Radio name="noticeExpandType" value={1}>文本</Radio> : null}

						<Radio name="noticeExpandType" value={2}>大图</Radio>

						{this.props.flymeAuth && (this.props.noticeBarType === 0 || this.props.noticeBarType === 2) ? <Radio name="noticeExpandType" value={3}>ACT文件</Radio> : null}

					</RadioGroup>
					<UploadBigImg
						type='noticeExpandType'
						form={this.props.form}
						bigImageDisplay={this.props.bigImageDisplay}
						url='noticeExpandImgUrl'
						value={2} />
					<UploadBigImg
						type='noticeExpandType'
						form={this.props.form}
						vedioDisplay={this.props.vedioDisplay}
						url='vedioUrl'
						value={3} />


				</FormItem>

				{(this.props.form.getFieldValue('noticeExpandType') === 1 && (this.props.form.getFieldValue('noticeBarType') === 0 || this.props.form.getFieldValue('noticeBarType') === 2)) ?

					<FormItem {...formItemLayout} label="&nbsp;">
						<Input placeholder='请输入展开文本' style={{ width: 400 }} {...this.validateNoticeExpandContent('noticeExpandContent') } type="textarea" />
					</FormItem>
					: null}
			</div>

		);
	}
});

module.exports = Distinct;