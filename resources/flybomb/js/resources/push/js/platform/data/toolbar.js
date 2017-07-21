'use strict';
import React from 'react';
import { Button, Row, Col, Tabs, Form} from 'antd';


const FormItem = Form.Item;

const TabPane = Tabs.TabPane;
import PushTime from '../../push-time';



import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';
import utils from '../../../lib/utils';
import ProductTypeApp from '../../../js/producttype-app';


import TablePushCount from './table_push_count';
import TableSdkUser from './table_sdk_user';
import TableKpi from './table_kpi';


const formItemLayoutSmall = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};



let AddAppTask = React.createClass({
	getInitialState() {
		return {
			initData: {},
			values: [],
			startTimeStatus: 'success',
			endTimeStatus: 'success',
			data: null,
			appName: '全部应用',
			noticeBarType: '0',
			noticeExpandType: '0',
			pushTimeType: 6,
			errors: {},
			restapi: restapi.dailyPushCount,
			defaultAppid: '应用',
			randomUser: 1,
			appId: 0,
			startTime: new Date(+new Date() - 6 * 1000 * 60 * 60 * 24),
			endTime: new Date()
		};
	},
	componentWillMount() {
		let self = this;
		let id = utils.queryString('id', window.location.href);
		if (!id) return;
		self.props.form.setFieldsValue({
			appId: id
		});
	},
	selectType(value, name) {
		this.props.form.setFieldsValue({
			appId: value
		});
		this.setState({
			appId: value,
			appName: name
		});
		// let searchParam = {
		// 	appId: value || 0,
		// 	index: 1,
		// 	startTime: utils.dateFormat('yyyy-MM-dd', this.state.startTime),
		// 	endTime: utils.dateFormat('yyyy-MM-dd', this.state.endTime)
		// };
		// this.props.onSearch(searchParam,this.state.restapi);
	},
	handleSubmit(e) {
		let self = this;
		e.preventDefault();
		const appId = this.state.appId;
		this.props.form.validateFields((errors, values) => {

			if (self.state.display === '') {

				return;
			}

			if (errors) {

				console.log('Errors in form!!!');
				return;
			}


			values.index = 1;
			values.startTime = utils.dateFormat('yyyy-MM-dd', values.startTime);
			values.endTime = utils.dateFormat('yyyy-MM-dd', values.endTime);

			if (appId && appId !== '0') {
				values.appId = appId;
			}
			for (let i in values) {
				if (values[i] === '') {
					delete values[i];
				}

			}

			this.props.onSearch(values, this.state.restapi);
		});
	},
	onChange(value) {
		const appId = this.state.appId;
		let searchParam = {
			index: 1,
			startTime: utils.dateFormat('yyyy-MM-dd', this.props.form.getFieldValue('startTime')),
			endTime: utils.dateFormat('yyyy-MM-dd', this.props.form.getFieldValue('endTime'))
		};
		let url = restapi.dailyPushCount;
		if (value === '2') {
			url = restapi.dailyUserCount;
		}
		if (value === '3') {
			url = restapi.dailyKPICount;
		}
		this.setState({
			restapi: url
		});
		if (appId && appId !== '0') {
			searchParam.appId = appId;
		}

		this.props.onSearch(searchParam, url);
	},
	componentDidMount() {
		const self = this;

		let url = restapi.appCount;
		ajax.get(url, function (result) {
			const value = result.value;
			self.setState({
				totalAppNum: value.totalAppNum,
				totalDeveloperNum: value.totalDeveloperNum
			});
		});

	},
	render() {

		const androidInitData = {
			api: restapi.listUserApp,
			width: '190',
			all: '全部应用',
			appName: this.state.appName,
			name: 'appId',
			appId: this.state.appId
		};
		const operations = (
			<div className="platform_data_operations">
				<span className="developer_num">开发者数量<span className="num">{this.state.totalDeveloperNum}</span></span>
				<span className="app_num">接入应用数<span className="num">{this.state.totalAppNum}</span></span>
			</div>
		);
		return (
			<Form horizontal>
				<Row>
					<Col span="24">

						<PushTime router='analyze' type='day' form={this.props.form} />

					</Col>
				</Row>
				<Row>
					<Col span="6">
						<FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="应用名称&nbsp;&nbsp;&nbsp;&nbsp;">
							<ProductTypeApp.render notFoundContent="无数据" showSearch searchPlaceholder='搜索应用名称' selectType={this.selectType} initData={androidInitData} />
						</FormItem>

					</Col>
					<Col span="6">

						<FormItem {...formItemLayoutSmall} label="">
							<Button className="ml10" type="primary" onClick={this.handleSubmit} size="large">查询</Button>
						</FormItem>
					</Col>
				</Row>
				<Tabs onChange={this.onChange} tabBarExtraContent={operations} className="platform_data">
					<TabPane tab="推送量" key="1">
						<TablePushCount refresh={this.props.refresh} tableData={this.props.tableData} />
					</TabPane>
					<TabPane tab="SDK用户数" key="2">
						<TableSdkUser refresh={this.props.refresh} tableData={this.props.tableData} />
					</TabPane>
					<TabPane tab="KPI" key="3">
						<TableKpi refresh={this.props.refresh} tableData={this.props.tableData} />
					</TabPane>
				</Tabs>
			</Form>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;

