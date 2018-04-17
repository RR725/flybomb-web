'use strict';
import React from 'react';
import { Picker, List, Button, WhiteSpace } from 'antd-mobile';

import { createForm } from 'rc-form';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax/index-mobile';

import questionType from '../question-type';




const Home = React.createClass({
	getInitialState() {
		return {
			subjectList: []
		};
	},
	componentDidMount() {
		ajax.post(restapi.subjectList, {}, (result) => {
			let subjectList = [];
			result.value.map(function (data) {
				subjectList.push({
					label: data.name,
					value: data.subjectId
				});
			});
			this.setState({
				subjectList: subjectList
			});
		});
	},
	randomDo(type) {
		let subjectList = this.state.subjectList;
		let url = restapi.questionList;
		this.props.form.validateFields((errors, values) => {
			let subject = '';
			subjectList.map(function (data, key) {
				if (data.value === parseInt(values.subject[0])) {
					subject = data.value;
				}
			});
			let data = {
				subject: subject,
				type: parseInt(values.type[0])
			};
			let json={
				subject:subject,
				type:values.type[0]

			};
			if(type === 'err'){
				json.err = true;
			}

			window.location.hash = utils.makeUrl('/home/question',json);
		});

	},
	render() {
		const { getFieldProps } = this.props.form;
		let typeNum=this.props.form.getFieldValue('type');
		typeNum = typeNum && typeNum[0];
		console.log()
		let type = questionType.map(function (data, key) {
			return {
				label: data.type_desc,
				value: data.type
			}
		});
		let subjectList = this.state.subjectList;
		return (
			<div style={{ padding: "0 0.16rem" }}>


				<Picker data={subjectList} cols={1} {...getFieldProps('subject', {
					initialValue: subjectList.length && [subjectList[0].value],
				}) }>
					<List.Item arrow="horizontal">科目</List.Item>
				</Picker>
				<WhiteSpace></WhiteSpace>
				<Picker data={type} cols={1} {...getFieldProps('type', {
					initialValue: type.length && [type[0].value],
				}) }>
					<List.Item arrow="horizontal">题型</List.Item>
				</Picker>


				<WhiteSpace></WhiteSpace>
				<Button onClick={this.randomDo} className="btn ">随机刷题</Button>
				

				<WhiteSpace></WhiteSpace>
				{typeNum < 3 && 
					<Button onClick={()=>this.randomDo('err')} className="btn ">错题集</Button>
				}
			</div>
		);
	}
});

const HomeWrapper = createForm()(Home);
module.exports = HomeWrapper;