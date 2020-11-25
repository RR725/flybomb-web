'use strict';
import React from 'react';
import { Button, Row, Col, message, Checkbox, Radio, Select, Tag, Tooltip, Modal, Icon, Form, Input } from 'antd';
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax';
import AddSubject from './add-subject';
import questionType from '../question-type';
const formItemLayout = {
	labelCol: {
		span: 5
	},
	wrapperCol: {
		span: 19
	}
};

let Add = React.createClass({
	//{this.props.params.id}	
	getInitialState() {
		return {
			tags: [],
			inputVisible: false,
			inputValue: '',
			subjectList: [],
			loading: false
		};
	},
	componentWillUnmount: function () {

		document.querySelector('#home').className = '';
	},
	getList() {
		ajax.post(restapi.subjectList, {}, (result) => {
			this.setState({
				subjectList: result.value
			});
		});
	},
	componentDidMount() {
		document.querySelector('#home').className = 'active';
		this.getList();
		let obj = utils.getQueryObj(window.location.hash);
		let data = {
			questionId: obj.questionId
		};
		if (!obj.questionId) return;
		ajax.post(restapi.questionFindOne, data, (result) => {
			let value = result.value;
			this.setState({
				editData: value,
				tags: value.tags || []
			});
			this.props.form.setFieldsValue({
				type: String(result.value.type)
			});
		});
	},
	cantNull(type, html) {
		const { getFieldDecorator } = this.props.form;
		return getFieldDecorator(type, {
			validate: [{
				rules: [{
					whitespace: true,
					required: true,
					message: '请填写应用名称'
				}],
				trigger: ['onBlur', 'onChange']
			}]

		})(html);
	},
	changeSubject(value,options){
		this.setState({
			subjectId:options.props.data.subjectId
		});
	},
	handleSubmit() {
		let type = this.props.form.getFieldValue('type');
		let subject = this.props.form.getFieldValue('subject');
		let obj = utils.getQueryObj(window.location.hash);
		let id = obj.questionId;
		let tags = this.state.tags;
		if (!tags.length) {
			message.error('请至少填写一个标签');
			return;
		}
		this.props.form.validateFields((errors, values) => {
			let content = [],
				answer = '';
			for (let i in values) {
				let valuesI = values[i];
				if (i.indexOf('answer') > -1) {

					if (type === '2') {
						valuesI.sort();
						answer = valuesI.join(',');
					} else {
						answer = valuesI;
					}
				}
				if (i.indexOf('content') > -1) {
					content.push(valuesI);
				}
			}
			if (errors) {

				console.log('Errors in form!!!');
				return;
			}
			const data = {
				subject: values.subject,
				subjectId:this.state.subjectId,
				content: content,
				type: values.type,
				tags: tags,
				point: values.point || '',
				answer: answer,
				title: values.title
			};
			if (id) {
				data.questionId = id;
				ajax.post(restapi.updateQuestion, data, function () {
					message.success('修改成功');
				});
				return;
			}
			ajax.post(restapi.addQuestion, data, () => {
				message.success('新建成功');
				this.props.form.resetFields();
				this.props.form.setFieldsValue({
					type: type,
					subject: subject
				});
				this.setState({
					tags: []
				});
			});
		});
	},
	add() {
		this.toggleModal();
	},
	getContent() {

		const { getFieldDecorator } = this.props.form;
		let type = this.props.form.getFieldValue('type');
		let html;
		let editData = this.state.editData;
		if (type == '1') {
			let listRadio = ['A', 'B', 'C', 'D'];
			html = listRadio.map(function (data, key) {

				return <Row style={{ height: 44 }} key={key}><Col span="1">{data}</Col><Col span="23">

					{getFieldDecorator('content_radio_' + data, {
						initialValue: editData ? editData.content && editData.content[key] : '',
						validate: [{
							rules: [{
								whitespace: true,
								required: true,
								message: '请填写内容'
							}],
							trigger: ['onBlur', 'onChange']
						}]

					})(<Input />)}
				</Col>
				</Row>
			});
		} else if (type == '2') {
			let listCheckbox = ['A', 'B', 'C', 'D', 'E'];
			html = listCheckbox.map(function (data, key) {
				return <Row style={{ height: 44 }} key={key} ><Col span="1">{data}</Col><Col span="23">

					{getFieldDecorator('content_checkbox_' + data, {
						initialValue: editData ? editData.content && editData.content[key] : '',
						validate: [{
							rules: [{
								whitespace: true,
								required: true,
								message: '请填写内容'
							}],
							trigger: ['onBlur', 'onChange']
						}]

					})(<Input />)}
				</Col></Row>
			});
		} else {
			html = getFieldDecorator('content', {
				initialValue: editData ? editData.content : '',
				validate: [{
					rules: [{
						whitespace: true,
						required: true,
						message: '请填写内容'
					}],
					trigger: ['onBlur', 'onChange']
				}]
			})(<Input type="textarea" rows={6} />);
		}
		return html;
	},
	toggleModal() {

		this.setState({
			visible: !this.state.visible
		});
	},
	onChangeType(value) {
		this.setState({
			type: value
		});
	},
	getAnswer() {

		const { getFieldDecorator } = this.props.form;
		let type = this.props.form.getFieldValue('type');
		let html;
		let editData = this.state.editData;
		const radioStyle = {
			display: 'block',
			height: '32px',
			lineHeight: '32px',
		};
		let answer;
		if (type == '1') {
			let listRadio = ['A', 'B', 'C', 'D'];
			let radios = listRadio.map(function (data, key) {
				return <Col key={key} span="3"><Radio style={radioStyle} value={data}>
					{data}
				</Radio>
				</Col>

			});
			html = <RadioGroup style={{ width: '100%' }}>

				<Row>{radios}</Row>
			</RadioGroup>;
			answer = editData ? editData.answer : null;
		} else if (type == '2') {
			let listCheckbox = ['A', 'B', 'C', 'D', 'E'];
			let checkbox = listCheckbox.map(function (data, key) {
				return <Col key={key} span="3"><Checkbox value={data}>
					{data}

				</Checkbox></Col>
			});
			html = <Checkbox.Group>
				<Row >{checkbox}</Row>
			</Checkbox.Group>;
			answer = editData ? editData.answer : null;
			answer = editData ? answer.split(',') : [];

		} else {
			html = <Input type="textarea" rows={6} />;
			answer = editData ? editData.answer : '';
		}
		let dom = getFieldDecorator('answer_' + type, {
			initialValue: answer,
			validate: [{
				rules: [{
					required: true,
					message: '请填写答案'
				}],
				trigger: ['onBlur', 'onChange']
			}]

		})(html)
		return dom;
	},
	handleClose(removedTag) {
		const tags = this.state.tags.filter(tag => tag !== removedTag);
		this.setState({ tags });
	},

	showInput() {
		this.setState({ inputVisible: true }, () => this.input.focus());
	},

	handleInputChange(e) {
		this.setState({ inputValue: e.target.value });
	},
	addTag() {
		let type = this.props.form.getFieldValue('type');
		let tags = this.state.tags;
		if (type > 2) {
			tags.push(this.props.form.getFieldValue('title'));
		} else {
			if (type < 2) {

				let list = ['A', 'B', 'C', 'D'];
				list.map((data) => {
					tags.push(this.props.form.getFieldValue('content_radio_' + data));
				});
			} else {

				let list = ['A', 'B', 'C', 'D', 'E'];
				list.map((data) => {
					tags.push(this.props.form.getFieldValue('content_checkbox_' + data));
				});
			}
		}
		this.setState({
			tags: tags
		});
	},
	handleInputConfirm() {
		const state = this.state;
		const inputValue = state.inputValue;
		let tags = state.tags;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [...tags, inputValue];
		}
		this.setState({
			tags,
			inputVisible: false,
			inputValue: '',
		});
	},
	saveInputRef(input) {
		this.input = input;
	},
	render() {

		const { tags, inputVisible, inputValue } = this.state;

		let type = this.props.form.getFieldValue('type');

		let obj = utils.getQueryObj(window.location.hash);
		let id = obj.questionId;
		let buttonText = id ? '修改' : '创建';
		let editData = this.state.editData;

		const { getFieldDecorator } = this.props.form;
		var self = this;
		let subjectList = this.state.subjectList;
		let options = subjectList.map(function (data, key) {
			return <Select.Option key={key} data={data} value={data.name}>{data.name}</Select.Option>
		});
		let typeOptions = questionType.map(function (data, key) {

			return <Select.Option key={key} value={String(data.type)}>{data.type_desc}</Select.Option>
		});

		return (
			<div >
				<div className="home_toolbar">
					<Row>
						<Col span="20">
							<div className="title"><span className="border"></span>新建</div>
						</Col>
						<Col span="4">
							<Button onClick={this.add} type="primary" size="large">新建科目</Button>

						</Col>
					</Row>

				</div>
				<AddSubject toggleModal={this.toggleModal} getList={this.getList} visible={this.state.visible} />
				<Form style={{ paddingTop: 20 }} layout='horizontal'>

					<Row className="add_app">
						<Col span="18">
							<FormItem {...formItemLayout} label="科目" >
								{getFieldDecorator('subject', {
									initialValue: editData ? editData.subject : '',
									validate: [{
										rules: [{
											required: true,
											message: '请选择科目'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(
									<Select onSelect={this.changeSubject} style={{ width: 300 }}>
										{options}
									</Select>
									)}
							</FormItem>
							<FormItem {...formItemLayout} label="类型" >
								{getFieldDecorator('type', {
									initialValue: editData ? String(editData.type) : '',
									onChange: this.onChangeType,
									validate: [{
										rules: [{
											required: true,
											message: '请选择类型'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(
									<Select style={{ width: 300 }}>
										{typeOptions}
									</Select>
									)}
							</FormItem>
							<FormItem {...formItemLayout} label="标题" >
								{getFieldDecorator('title', {
									initialValue: editData ? editData.title : '',
									validate: [{
										rules: [{
											whitespace: true,
											required: true,
											message: '请填写标题'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(<Input />)}
							</FormItem>
							{type < 3 &&
								<FormItem {...formItemLayout} label="内容" >
									{this.getContent()}
								</FormItem>
							}


							<FormItem {...formItemLayout} label="答案" >

								{this.getAnswer()}
							</FormItem>
							{type < 3 &&
								<FormItem {...formItemLayout} label="要点透析" >

									{getFieldDecorator('point', {
										initialValue: editData ? editData.point : '',

									})(<Input type="textarea" rows={6} />)}
								</FormItem>
							}
							<FormItem {...formItemLayout} label="标签" >
								{tags.map((tag, index) => {
									const tagElem = (
										<Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
											{tag}
										</Tag>
									);
									return tagElem;
								})}
								{inputVisible && (
									<Input
										ref={this.saveInputRef}
										type="text"
										size="small"
										style={{ width: 78 }}
										value={inputValue}
										onChange={this.handleInputChange}
										onBlur={this.handleInputConfirm}
										onPressEnter={this.handleInputConfirm}
									/>
								)}
								{!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 新标签</Button>}
								{type < 4 && <Button className="ml10" size="small" type="dashed" onClick={this.addTag}>快速打标签</Button>}
							</FormItem>
							<FormItem className="create_app"  {...formItemLayout} label="&nbsp;">
								<Button type="primary" className="btn_normal_show color_bg" onClick={this.handleSubmit} size="large">{buttonText}</Button>

							</FormItem>



						</Col>
					</Row>
				</Form>
			</div >
		);
	}
});
Add = Form.create()(Add);


module.exports = Add;