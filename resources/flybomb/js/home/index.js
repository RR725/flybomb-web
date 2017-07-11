'use strict';
import React from 'react';
import { Picker, List, WhiteSpace } from 'antd-mobile';

import { createForm } from 'rc-form';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax';





const Home = React.createClass({
	//{this.props.params.id}	
	getInitialState() {
		return {
			subjectList:[]
		};
	},
	componentDidMount() {
		ajax.post(restapi.subjectList, {}, (result) => {
			let subjectList=[];
			result.value.map(function(data){
				subjectList.push({
					label:data.name,
					value:data.subjectId
				});
			});
			this.setState({
				subjectList:subjectList
			});
		});
	},

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>


				<Picker data={this.state.subjectList} cols={1} {...getFieldProps('district3') }>
					<List.Item arrow="horizontal">选择</List.Item>
				</Picker>

			</div>
		);
	}
});

const HomeWrapper = createForm()(Home);
module.exports = HomeWrapper;