'use strict';
import React from 'react';
import { Button, Row, Col, Radio, Input, Modal, Form } from 'antd';

const RadioGroup = Radio.Group;

const FormItem = Form.Item;

import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';


import PushTime from '../../push-time';


import Table from './table';

import ToolbarChart from './toolbar-chart';


const formItemLayoutSmall = {
	labelCol: { span: 2 },
	wrapperCol: { span: 22 }
};



let PushAttr = React.createClass({
	getInitialState() {
		return {
			initData: {},
			showAnalyze: false,
			values: [],
			currentSearchType: 0,
			data: null,
			noticeBarType: '0',
			noticeExpandType: '0',
			pushTimeType: 0,
			errors: {}
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
			values.startTime = values.startTime && utils.dateFormat('yyyy-MM-dd', values.startTime);
			for (let i in values) {
				if (values[i] === '' || (!values[i] && values[i] !== 0)) {
					delete values[i];
				}

			}
			this.getTableData();
			// this.props.onSearch(values);
		});
	},
	componentDidMount() {
		
		const taskId = utils.queryString('taskId', window.location.href);
		if(taskId){
			this.getTableData();
		}
	},
	
	getTableData() {
		let searchType = this.props.form.getFieldValue('searchType');
		let startTime = this.props.form.getFieldValue('startTime');
		startTime = startTime && utils.dateFormat('yyyy-MM-dd', startTime);

		let url = searchType === 0 ? restapi.getTaskStatics : restapi.dailyPushStatics;
		let taskId=this.props.form.getFieldValue('taskId');
		let data = searchType === 0 ? {
			taskId: taskId.trim(),
			index: 1
		} : {
			startTime: startTime,
			endTime: startTime,
			index: 1
		};
		this.setState({
			showAnalyze: true
		});
		this.props.onSearch(data, url);
	},

	changeRadio(e) {
		let searchType = this.props.form.getFieldValue('searchType');
		let json = {
			currentSearchType: e.target.value,
			clearTableVisible: false
		};
		if (this.state.showAnalyze) {
			json.clearTableVisible = true;
			json.currentSearchType = searchType;
		}
		this.setState(json);
	},
	clearTabelCancel() {
		this.props.form.setFieldsValue({
			searchType: this.state.currentSearchType
		});
		this.setState({
			clearTableVisible: false
		});
	},
	clearTabelOk() {

		this.setState({
			clearTableVisible: false,
			showAnalyze: false,
			currentSearchType: this.state.currentSearchType === 0 ? 1 : 0
		});
	},
	render() {

		const taskId = utils.queryString('taskId', window.location.href);
		let startTime = this.props.form.getFieldValue('startTime');
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<Form horizontal>
					<Row>
						<Col className="pl10" span="24">
							<FormItem {...formItemLayoutSmall} label="查询类型">
								<RadioGroup  {...getFieldProps('searchType', {
									initialValue: 0,
									onChange: this.changeRadio
								}) }>
									<Radio name="searchType" value={0}>按任务ID查询</Radio>
									<Radio name="searchType" value={1}>按应用查询</Radio>

								</RadioGroup>
							</FormItem>

						</Col>

					</Row>
					<Row>
						<Col className="pl10" span="24">
							{this.state.currentSearchType === 0 ?
								<FormItem {...formItemLayoutSmall} label="任务ID">
									<Input type='number' style={{ width: 200 }} placeholder="输入任务ID" {...getFieldProps('taskId', {
										onChange: this.changeInput,
										initialValue:taskId,
										validate: [{
											rules: [{
												whitespace:true,
												required: true,
												message: '请输入任务ID'
											}],
											trigger: ['onBlur', 'onChange']
										}]
									}) }></Input>
								</FormItem>
								: <PushTime router='analyze' type='day' form={this.props.form} />
							}
						</Col>

					</Row>
					<Row>
						<Col className="pl10" span="24">

							<FormItem {...formItemLayoutSmall} label="&nbsp;">
								<Button type="primary" onClick={this.handleSubmit} size="large">查询</Button>
							</FormItem>

						</Col>

					</Row>
				</Form>
				{this.state.showAnalyze &&
					<div>
						{!this.props.tableData.loading &&
							<Table current={this.props.current} onSearch={this.props.onSearch} refresh={this.props.refresh} tableData={this.props.tableData} />
						}

						{this.props.tableData.data && this.props.tableData.data.length > 0 &&
							<div className="mt20">
								<ToolbarChart startTime={startTime} searchType={this.state.currentSearchType} tableData={this.props.tableData}></ToolbarChart>
							</div>
						}
					</div>
				}
				<Modal
					width={700}
					onCancel={this.clearTabelCancel}
					onOk={this.clearTabelOk}
					title='系统提示'
					visible={this.state.clearTableVisible} >
					<div style={{ margin: '20px 0 20px 30px' }}>切换 “查询类型” 将会清除当前页面分析数据，请确定是否切换？</div>



				</Modal>
			</div>
		);
	}
});

PushAttr = Form.create()(PushAttr);


module.exports = PushAttr;

