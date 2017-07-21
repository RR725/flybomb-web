'use strict';
import React from 'react';
import { Row, Col, Form, Button, Input } from 'antd';
import Table from './table';
import utils from '../../../lib/utils';

import Add from './add';
import PushTime from '../../push-time';
const FormItem = Form.Item;

const formItemLayout = {
	labelCol: {
		span: 6
	},
	wrapperCol: {
		span: 18
	}
};
let BlackToolbar = React.createClass({

	getInitialState() {
		return {
			data: null,
			value: '',
			searchStatus: false
		};
	},
	componentDidMount() {
		this.onSearch();
	},

	onSearch() {
		const appId = utils.queryString('appId', window.location.href);
		const startTime = this.props.form.getFieldValue('startTime');
		const endTime = this.props.form.getFieldValue('endTime');
		const title = this.props.form.getFieldValue('title');
		const param = {
			appId: appId,
			index: 1
		};
		if (startTime) {
			param.startTime = utils.dateFormat('yyyy-MM-dd', startTime);
		}
		if (endTime) {
			param.endTime = utils.dateFormat('yyyy-MM-dd', endTime);
		}
		if (title) {
			param.title = title;
		}
		if (startTime && endTime && startTime > endTime) return;
		this.props.getTableData(param);

	},
	render() {

		const {
			getFieldProps
		} = this.props.form;
		return (
			<div>
				<Add tableData={this.props.tableData} getTableData={this.onSearch}></Add>
				<Form>
					<div className="sub_toolbar config_toolbar">
						<Row>

							<Col span="4">
								<div className="title"><span className="border"></span>资源列表</div>
							</Col>
						</Row>

					</div>
					<Row className="mt10">


						<Col span="24">
							<PushTime required={1} router='personal' form={this.props.form} />

						</Col>

					</Row>
					<Row className="mt10">


						<Col span="8">
							<FormItem {...formItemLayout} label="备注&nbsp;&nbsp;&nbsp;&nbsp;">
								<Input placeholder="备注" {...getFieldProps('title') } />
							</FormItem>

						</Col>
						<Col span="6">

							<Button className="ml10" type="primary" onClick={this.onSearch} size="large">查询</Button>

						</Col>

					</Row>

					<Table current={this.props.current} tagName={this.state.tagName} getTableData={this.props.getTableData} refresh={this.props.refresh} tableData={this.props.tableData} />
				</Form>
			</div>
		);
	}
});

BlackToolbar = Form.create()(BlackToolbar);

module.exports = BlackToolbar;