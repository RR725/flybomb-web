/*
 * @Author: ecofe 
 * @Date: 2017-02-17 11:26:58 
 * @Last Modified by: ecofe
 * @Last Modified time: 2017-03-31 09:15:57
 */
'use strict';
import React from 'react';
import { Input, Form, Button, message, Checkbox } from 'antd';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax';
// import Editor from './editor';
import '../../lib/umeditor/umeditor.config.js';
import '../../lib/umeditor/umeditor.js';
// import '../../lib/ueditor/ueditor.config.js';
// import '../../lib/ueditor/ueditor.all.js';

const FormItem = Form.Item;

const Ueditor = React.createClass({
	componentDidMount: function () {
		var editor = window.UM.getEditor(this.props.id);
		this.props.ueditor(editor);
		var self = this;
		editor.ready(function () {

			const noticeId = utils.queryString('noticeId', window.location.href);
			if (noticeId) {
				let data = {
					noticeId: noticeId
				};
				ajax.post(restapi.getNotice, data, (result) => {
					self.props.ueditor(editor, result.value);
					editor.setContent(result.value.content);
				});
			}

			editor.addListener('contentChange selectionchange', function () {
				var text = editor.getContent();
				self.props.onTextChange(text);
			});
		});
	},
	render: function () {
		return <script id={this.props.id} type="text/plain">{this.props.text}</script>;
	}
});
let CommentForm = React.createClass({
	getInitialState: function () {
		return { id: 'ueditor' + Date.now(), content: '', editor: null };
	},
	handleTextChange: function (content) {
		this.setState({ content: content });
		const hasContents = this.state.editor.hasContents();
		let contentTxt = this.state.editor.getContentTxt();
		contentTxt = contentTxt.trim();
		if (!hasContents || !contentTxt) {
			document.querySelector('#' + this.state.id).style.border = '1px solid #f60';
			document.querySelector('#' + this.state.id).style.boxShadow = '0 0 0 2px rgba(255, 85, 0, 0.2)';
			document.querySelector('#contentError').style.visibility = 'visible';
		} else {
			document.querySelector('#' + this.state.id).style.border = 'none';

			document.querySelector('#contentError').style.visibility = 'hidden';
			document.querySelector('#' + this.state.id).style.boxShadow = 'none';

		}
	},
	onCommentSubmit(comment) {

		const noticeId = utils.queryString('noticeId', window.location.href);
		let url = restapi.createNotice;
		let msg = '新建成功';
		if (noticeId) {
			comment.noticeId = noticeId;
			url = restapi.updateNotice;
			msg = '编辑成功';
		}

		ajax.post(url, comment, function () {
			message.success(msg);
			window.location.href =window.location.pathname+ '#/notice/list';
		});
	},
	handleSubmit: function (status) {
		this.props.form.validateFields((errors, values) => {
			const hasContents = this.state.editor.hasContents();
			let contentTxt = this.state.editor.getContentTxt();
			contentTxt = contentTxt.trim();
			if (!hasContents || !contentTxt) {
				document.querySelector('#' + this.state.id).style.border = '1px solid #f60';
				document.querySelector('#' + this.state.id).style.boxShadow = '0 0 0 2px rgba(255, 85, 0, 0.2)';
				document.querySelector('#contentError').style.visibility = 'visible';
				return;
			}
			if (errors) {

				console.log('Errors in form!!!');
				return;
			}
			var content = this.state.content.trim();
			// if(!author||!text) return;
			const data = {
				title: values.title.trim(),
				status: status,
				content: content,
				top: values.top || this.state.top ? 1 : 0
			};

			this.onCommentSubmit(data);

		});

	},
	setEditor: function (editor, result) {
		this.setState({ editor: editor });
		if (!result) return;
		this.setState({ title: result.title, top: result.top });

	},

	validateTitle(type) {
		const {getFieldProps} = this.props.form;
		return getFieldProps(type, {
			initialValue: this.state.title,
			validate: [{
				rules: [{
					required: true,
					message: '请输入标题'
				}, {
					max: 300,
					message: '标题不能超过300个字'
				}, {
					validator: function (rule, value, callback) {

						if (value && value.length <= 300 && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						}
						callback();
					}
				}],
				trigger: ['onBlur', 'onChange']
			}]
		});
	},
	onChangeTop(e) {
		this.setState({
			top: e.target.checked,
		});
	},
	render: function () {
		return (
			<Form horizontal>
				<FormItem className="notice-title"><Input placeholder='标题'  {...this.validateTitle('title') } /></FormItem>
				<Ueditor id={this.state.id} value={this.state.content} ueditor={this.setEditor} onTextChange={this.handleTextChange} />
				<FormItem>
					<div id='contentError' style={{ visibility: 'hidden' }} className="has-error">
						<div className="ant-form-explain">请输入内容</div>
					</div>
					<Button onClick={this.handleSubmit.bind(this, 1)} type="primary" size="large">发布</Button>
					<Button className="ml10" onClick={this.handleSubmit.bind(this, 0)} type="primary" size="large">存为草稿</Button>
					<label className="pl10"><Checkbox onChange={this.onChangeTop} checked={this.state.top} className="mr10" />置顶</label>
				</FormItem>

			</Form>
		);
	}
});


CommentForm = Form.create()(CommentForm);



module.exports = CommentForm;