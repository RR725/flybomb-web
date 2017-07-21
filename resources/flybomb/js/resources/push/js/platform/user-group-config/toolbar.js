'use strict';
import React from 'react';
import { Button, Row, Col, Select, message, Radio, Form } from 'antd';


const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;




import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';
import utils from '../../../lib/utils';

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 }
};





let AddAppTask = React.createClass({
	getInitialState() {
		return {
			subDisplay: 'none',
			disabled: true,
			initData: {},
			values: [],
			data: null,
			noticeBarType: '0',
			noticeExpandType: '0',
			pushTimeType: '0',
			appName: '全部应用',
			appId: 0,
			errors: {},
			defaultAppid: '应用',
			randomUser: 1
		};
	},
	addOpenTag() {
		let self = this;
		this.props.form.validateFields((errors, values) => {

			if (errors) {

				console.log('Errors in form!!!');
				return;
			}
			values.categoryCode = self.state.categoryCode;
			values.categoryName = self.state.categoryName;
			values.tagCode = self.state.tagCode;
			values.tagName = self.state.tagName;

			ajax.post(restapi.addOpenTag, values, function () {
				message.success('添加成功');
				self.props.onSearch({ index: self.props.current });
			});
		});
	},
	componentWillMount() {
		let self = this;
		let id = utils.queryString('id', window.location.href);
		if (!id) return;
		self.props.form.setFieldsValue({
			appId: id
		});
	},
	getCategaryData(name) {
		const self = this;
		let url = restapi[name];
		if (name === 'listTagByCategory') {
			url = utils.makeUrl(url, {
				cid: this.props.form.getFieldValue('cid')
			});
		}
		ajax.get(url, function (result) {
			const value = result.value;
			const optionDom = value.map(function (data, key) {
				let id = name === 'listTagByCategory' ? String(data.tid) : String(data.cid);
				return <Option key={key} data={data} value={id}>{data.name}<span className="data_appid">{id}</span></Option>;
			});

			self.setState({
				[name]: optionDom
			});

		});
	},
	selectMainList(value, data) {
		this.props.form.setFieldsValue({
			cid: value,
			categoryCode: data.props.data.code,
			categoryName: data.props.data.name
		});
		this.setState({
			subDisplay: '',
			disabled: true,
			tagData: undefined,
			categoryCode: data.props.data.code,
			categoryName: data.props.data.name
		});
		this.getCategaryData('listTagByCategory');//拿二级标签
	},
	selectSubList(value, data) {
		this.props.form.setFieldsValue({
			tid: value,
			tagCode: data.props.data.code,
			tagName: data.props.data.name
		});
		this.setState({
			tid: value,
			disabled: false,
			tagData: data.props.children,
			tagCode: data.props.data.code,
			tagName: data.props.data.name
		});
	},
	componentDidMount() {
		this.getCategaryData('listCategary');//拿一级标签

	},
	render() {

		const { getFieldProps } = this.props.form;

		return (
			<Form horizontal className="pugc_title">
				<Row>
					<Col span="12">
						<FormItem  {...formItemLayout} label="一级标签&nbsp;&nbsp;&nbsp;&nbsp;">
							<Select {...getFieldProps('cid') } optionFilterProp="children" onSelect={this.selectMainList} style={{ width: 190 }} showSearch notFoundContent='无数据' placeholder='请选择标签'>
								{this.state.listCategary}
							</Select>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
						<FormItem style={{ display: this.state.subDisplay }}  {...formItemLayout} label="二级标签&nbsp;&nbsp;&nbsp;&nbsp;">
							<Select {...getFieldProps('tid') } optionFilterProp="children" value={this.state.tagData} onSelect={this.selectSubList} style={{ width: 290 }} showSearch notFoundContent='无数据' placeholder='请选择标签'>
								{this.state.listTagByCategory}
							</Select>

						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
						<FormItem  {...formItemLayout} label="终端展示样式&nbsp;&nbsp;&nbsp;&nbsp;">
							<RadioGroup {...getFieldProps('displayType', {
								initialValue: 0
							}) }>
								<Radio name="noticeBarType" value={0}>排列展示</Radio>
								<Radio name="noticeBarType" value={1}>下拉框展示</Radio>

							</RadioGroup>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Col span="12">
						<FormItem  {...formItemLayout} label="&nbsp;">
							<Button onClick={this.addOpenTag} type="primary" disabled={this.state.disabled} size="large">添加选中</Button>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;

