'use strict';
import React from 'react';
import { Picker, List, Button, WhiteSpace } from 'antd-mobile';

import { createForm } from 'rc-form';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax';

import questionType from '../question-type';




const Home = React.createClass({
	//{this.props.params.id}	
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

	render() {
		const { getFieldProps } = this.props.form;
		let type = questionType.map(function (data, key) {
			return {
				label: data.type_desc,
				value: data.type
			}
		});
		return (
			<div style={{ padding: "0 0.16rem" }}>


				<Picker data={this.state.subjectList} cols={1} {...getFieldProps('subject') }>
					<List.Item arrow="horizontal">科目</List.Item>
				</Picker>
				<WhiteSpace></WhiteSpace>
				<Picker data={type} cols={1} {...getFieldProps('type') }>
					<List.Item arrow="horizontal">题型</List.Item>
				</Picker>


				<WhiteSpace></WhiteSpace>
				<Button className="btn ">随机刷题</Button>
				<WhiteSpace></WhiteSpace>
				<Button className="btn ">顺序刷题</Button>
			</div>
		);
	}
});

const HomeWrapper = createForm()(Home);
module.exports = HomeWrapper;