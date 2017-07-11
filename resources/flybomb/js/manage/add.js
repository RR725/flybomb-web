'use strict';
import React from 'react';
import { Button, Row, Col, message, Checkbox, Radio, Select, Tooltip, Modal, Icon, Form, Input } from 'antd';
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax';
import AddSubject from './add-subject';
import questionType from './type';
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
			id: obj.id
		};
		if(!obj.id)return;
		ajax.post(restapi.questionFindOne, data, function (result) {
			console.log(result)
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
	handleSubmit() {
		let type = this.props.form.getFieldValue('type');
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
				content: content,
				type: values.type,
				answer: answer,
				title: values.title
			};
			ajax.post(restapi.addQuestion, data, function () {
				message.success('新建成功');
			});
		});
	},
	add() {
		this.toggleModal();
	},
	getContent() {

		const { getFieldDecorator } = this.props.form;
		let type = this.props.form.getFieldValue('type');
		console.log(type)
		let html;

		if (type === '1') {
			let listRadio = ['A', 'B', 'C', 'D'];
			html = listRadio.map(function (data, key) {
				return <Row style={{ height: 44 }} key={key}><Col span="1">{data}</Col><Col span="23">

					{getFieldDecorator('content_radio_' + data, {
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
		} else if (type === '2') {
			let listCheckbox = ['A', 'B', 'C', 'D', 'E'];
			html = listCheckbox.map(function (data, key) {
				return <Row style={{ height: 44 }} key={key} ><Col span="1">{data}</Col><Col span="23">

					{getFieldDecorator('content_checkbox_' + data, {
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

		const radioStyle = {
			display: 'block',
			height: '32px',
			lineHeight: '32px',
		};
		if (type === '1') {
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
		} else if (type === '2') {
			let listCheckbox = ['A', 'B', 'C', 'D', 'E'];
			let checkbox = listCheckbox.map(function (data, key) {
				return <Col key={key} span="3"><Checkbox value={data}>
					{data}

				</Checkbox></Col>
			});
			html = <Checkbox.Group>
				<Row >{checkbox}</Row>
			</Checkbox.Group>;

		} else {
			html = <Input type="textarea" rows={6} />
		}
		let dom = getFieldDecorator('answer_' + type, {
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
	render() {


		let type = this.props.form.getFieldValue('type');



		const { getFieldDecorator } = this.props.form;
		var self = this;
		let subjectList = this.state.subjectList;
		let options = subjectList.map(function (data, key) {
			return <Select.Option key={key} value={data.name}>{data.name}</Select.Option>
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
									validate: [{
										rules: [{
											required: true,
											message: '请选择科目'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(
									<Select style={{ width: 300 }}>
										{options}
									</Select>
									)}
							</FormItem>
							<FormItem {...formItemLayout} label="类型" >
								{getFieldDecorator('type', {
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
							<FormItem {...formItemLayout} label="内容" >
								{this.getContent()}
							</FormItem>



							<FormItem {...formItemLayout} label="答案" >

								{this.getAnswer()}
							</FormItem>


							<FormItem className="create_app"  {...formItemLayout} label="&nbsp;">
								<Button  type="primary" className="btn_normal_show color_bg" onClick={this.handleSubmit} size="large">创建</Button>

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