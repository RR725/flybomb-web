'use strict';
import React from 'react';
import { Button, Row, Col, Select, Form, Input } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

import utils from '../../../lib/utils';


import Table from './table';





const formItemLayoutSmall = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};


let AddAppTask = React.createClass({
	getInitialState() {
		return {
			buttonGroupType: 'ghost',
			initData: {},
			values: [],
			data: null,
			noticeBarType: '0',
			noticeExpandType: '0',
			pushTimeType: 0,
			errors: {},
			defaultAppid: '应用'
		};
	},
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {

			if (errors) {

				console.log('Errors in form!!!');
				return;
			}

			values.index = 1;

			let data = {};
			for (let i in values) {

				if (values[i] !== '') {
					data[i] = values[i];
				}


			}
			this.setState({
				searchData: data
			});
			this.props.onSearch(data);
		});
	},
	componentDidMount() {
		let appId = utils.queryString('appId', window.location.href);
		let searchParam = {
			appId: appId,
			index: 1
		};

		this.setState({
			searchData: searchParam
		});
		this.props.onSearch(searchParam);

	},
	cantNull(item, value) {

		const { getFieldProps } = this.props.form;

		return getFieldProps(item, {
			initialValue: value
		});
	},
	render() {
		const searchData = this.state.searchData || this.props.searchData;

		//<span style={{display:dispaly}} className="color_error pl10">结束时间不能早于开始时间</span>
		return (
			<div>
				<Form horizontal>
					<Row>


						<Col span="6">

							<FormItem {...formItemLayoutSmall} label="推送类型&nbsp;&nbsp;&nbsp;&nbsp;">
								<Select {...this.cantNull('pushType', '') } size="large">
									<Option value="">全部</Option>
									<Option value="0">通知</Option>
									<Option value="1">透传消息</Option>
								</Select>
							</FormItem>
						</Col>
						<Col span="6">

							<FormItem {...formItemLayoutSmall} label="状态&nbsp;&nbsp;&nbsp;&nbsp;">

								<Select {...this.cantNull('isValid', '') } size="large">
									<Option value="">全部</Option>
									<Option value='1'>生效</Option>
									<Option value='0'>失效</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="6">

							<FormItem {...formItemLayoutSmall} label="定时任务ID&nbsp;&nbsp;&nbsp;&nbsp;">
								<Input placeholder="输入定时任务ID" {...this.cantNull('cronTaskId', '') } />
							</FormItem>
						</Col>
						<Col span="6">

							<FormItem {...formItemLayoutSmall} label="标题名称&nbsp;&nbsp;&nbsp;&nbsp;">
								<Input placeholder="输入标题关键字"  {...this.cantNull('title', '') } />
							</FormItem>
						</Col>
						<Col span="6" >

							<FormItem {...formItemLayoutSmall} label="">
								<Button className="ml10" type="primary" onClick={this.handleSubmit} size="large">查询</Button>
							</FormItem>
						</Col>
					</Row>

				</Form>

				<Table searchData={searchData} current={this.props.current} onSearch={this.props.onSearch} refresh={this.props.refresh} tableData={this.props.tableData} />
			</div>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;



