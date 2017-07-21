'use strict';
import React from 'react';
import { Button, Row, Col, Select, Form, Input } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;




import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';
import utils from '../../../lib/utils';


import Table from './table';


import PushTime from '../../push-time';



const formItemLayoutSmall = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};


let AddAppTask = React.createClass({
	getInitialState() {
		return {
			buttonGroupType: 'ghost',
			initData: {},
			sourceValue: '',
			sourceType: [{
				id: '',
				desc: '全部'
			}],
			values: [],
			data: null,
			noticeBarType: '0',
			noticeExpandType: '0',
			pushTimeType: 0,
			errors: {},
			defaultAppid: '应用'
		};
	},
	handleSubmit(type) {
		this.props.form.validateFields((errors, values) => {

			if (errors) {

				console.log('Errors in form!!!');
				return;
			}

			const st = values.startTime;
			const et = values.endTime;
			if (+new Date(st) > +new Date(et)) {
				return;
			}
			values.index = 1;
			values.startTime = typeof values.startTime === 'string' ? values.startTime : utils.dateFormat('yyyy-MM-dd hh:mm:ss', values.startTime);
			values.endTime = typeof values.endTime === 'string' ? values.endTime : utils.dateFormat('yyyy-MM-dd hh:mm:ss', values.endTime);

			let data = {};
			for (let i in values) {

				if (values[i] !== '') {
					data[i] = values[i];
				}


			}
			let sourceValue = this.state.sourceValue;
			if (sourceValue) {

				data.sourceType = sourceValue;
			}
			this.setState({
				searchData: values
			});
			if (type === 'search') {
				this.props.onSearch(data);
			}
			if (type === 'export') {
				this.exportData(data);
			}
		});
	},
	componentDidMount() {
		const dt = new Date();
		let appId = utils.queryString('appId', window.location.href);
		let searchParam = {
			appId: appId,
			index: 1,
			startTime: utils.dateFormat('yyyy-MM-dd', dt) + ' 00:00:00',
			endTime: utils.dateFormat('yyyy-MM-dd hh:mm:ss', dt)
		};

		this.setState({
			appId: appId,
			searchData: searchParam
		});
		this.props.onSearch(searchParam);
		this.getSourceType();
	},
	componentWillReceiveProps() {//切换了应用之后要重新拉取数据
		let appId = utils.queryString('appId', window.location.href);
		if (this.state.appId && appId !== this.state.appId) {//切换了应用之后要重新拉取数据
			this.getSourceType('changeApp');
		}
		this.setState({
			appId: appId
		});
	},
	getSourceType(type) {
		let self = this;
		let appId = utils.queryString('appId', window.location.href);
		let url = restapi.getSourceType;
		url = utils.makeUrl(url, {
			appId: appId || 0
		});
		ajax.get(url, function (result) {
			let sourceType = self.state.sourceType;
			if (type === 'changeApp') {
				sourceType = [{
					id: '',
					desc: '全部'
				}];
			}
			sourceType = sourceType.concat(result.value);
			let data = {
				sourceType: sourceType
			};
			if (self.state.sourceType.length !== sourceType.length && self.state.sourceValue === '3') {
				data.sourceValue = '';
			}
			self.setState(data);

		});

	},
	cantNull(item, value) {

		const { getFieldProps } = this.props.form;

		return getFieldProps(item, {
			initialValue: value
		});
	},
	exportData(data) {
		const appId = utils.queryString('appId', window.location.href);
		if (appId && appId !== '0') {
			data.appId = appId;
		} else {
			delete data.appId;
		}
		let type=this.props.type;
		let url = restapi.exportTaskStatics;
		if(type==='platform'){
			url=restapi.exportTaskStaticsDetail;
		}
		url = utils.makeUrl(url, data);
		window.location.href = url;


	},
	changeSourceType(value) {
		let data = {
			sourceValue: value
		};
		this.setState(data);
	},
	render() {

		const searchData = this.state.searchData || this.props.searchData;

		let sourceType = this.state.sourceType;
		let options = sourceType.map(function (data, key) {
			return <Option key={key} value={String(data.id)}>{data.desc}</Option>;
		});
		return (
			<div>
				<Form horizontal>
					<Row>
						<Col span="24">
							<PushTime type='second' form={this.props.form} />

						</Col>
					</Row>
					<Row>



						<Col span="6">

							<FormItem {...formItemLayoutSmall} label="任务来源&nbsp;&nbsp;&nbsp;&nbsp;">

								<Select value={this.state.sourceValue} onChange={this.changeSourceType} size="large">
									{options}
								</Select>
							</FormItem>
						</Col>

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

								<Select {...this.cantNull('pushStatus', '') } size="large">
									<Option value="">全部</Option>
									<Option value="0">待推送</Option>
									<Option value="1">推送中</Option>
									<Option value="3">已完成</Option>
									<Option value="4">取消</Option>
									<Option value="5">推送失败</Option>
								</Select>
							</FormItem>
						</Col>
					</Row>
					<Row>

						<Col span="6">

							<FormItem {...formItemLayoutSmall} label="任务ID&nbsp;&nbsp;&nbsp;&nbsp;">
								<Input placeholder="输入任务ID"  {...this.cantNull('taskId', '') } />
							</FormItem>
						</Col>
						<Col span="6">

							<FormItem {...formItemLayoutSmall} label="标题名称&nbsp;&nbsp;&nbsp;&nbsp;">
								<Input placeholder="输入标题关键字"  {...this.cantNull('title', '') } />
							</FormItem>
						</Col>
						<Col span="6" >
							<Button className="ml10" type="primary" onClick={this.handleSubmit.bind(this, 'search')} size="large">查询</Button>
							<Button className="ml10" type="primary" onClick={this.handleSubmit.bind(this, 'export')} size="large">导出</Button>
						</Col>
					</Row>


				</Form>

				<Table type={this.props.type} appName={this.props.appName} searchData={searchData} current={this.props.current} onSearch={this.props.onSearch} refresh={this.props.refresh} tableData={this.props.tableData} />
			</div>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;

