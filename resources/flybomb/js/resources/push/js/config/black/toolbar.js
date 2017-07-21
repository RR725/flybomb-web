'use strict';
import React from 'react';
import { Row, Col, Form, Button, Input } from 'antd';
import Table from './table';
import utils from '../../../lib/utils';
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


	onSearch() {
		const appId = utils.queryString('appId', window.location.href);
		const blackName = this.props.form.getFieldValue('blackNameSearch');
		const param = {
			appId: appId,
			index: 1
		};
		if (blackName) {
			param.blackName = blackName;
		}
		this.props.getTableData(param);

	},
	render() {

		const {
			getFieldProps
		} = this.props.form;
		return (
			<Form>
				<div className="sub_toolbar config_toolbar">
					<Row>

						<Col span="4">
							<div className="title"><span className="border"></span>黑名单列表</div>
						</Col>
					</Row>

				</div>
				<Row className="mt10">


					<Col span="8">
						<FormItem {...formItemLayout} label="黑名单名称">
							<Input {...getFieldProps('blackNameSearch') } />
						</FormItem>

					</Col>
					<Col span="6">

						<Button className="ml10" type="primary" onClick={this.onSearch} size="large">查询</Button>

					</Col>

				</Row>

				<Table setTableDataDisable={this.props.setTableDataDisable} blackName={this.props.form.getFieldValue('blackNameSearch')} current={this.props.current} tagName={this.state.tagName} getTableData={this.props.getTableData} refresh={this.props.refresh} tableData={this.props.tableData} />
			</Form>
		);
	}
});

BlackToolbar = Form.create()(BlackToolbar);

module.exports = BlackToolbar;