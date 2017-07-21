'use strict';
import React from 'react';
import { Button, Row, Col, Select, Form} from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

let AddAppTask = React.createClass({
	getInitialState() {
		return {

		};
	},
	handleSubmit() {
		let self = this;
		const moduleId = this.props.moduleId;
		let searchParam = {
			index: 1
		};
		if (moduleId && moduleId !== '') {
			searchParam.moduleId = moduleId;
		}
		self.props.onSearch(searchParam);
	},
	selectType(value) {
		this.props.changeModuleId(value);
	},
	render() {


		const optionsDom = this.props.optionsDom;
		if (!optionsDom) return null;
		return (
			<Form horizontal>
				<Row className="home_toolbar pmc_title">

					<Col span="3">
						<FormItem label="">
							<Select defaultValue={this.props.moduleId} value={this.props.moduleId} style={{ width: 150 }} onSelect={this.selectType} showSearch notFoundContent="无数据" searchPlaceholder='搜索模块名称'>
								<Option value='' key='-1'>全部模块</Option>
								{optionsDom}
							</Select>
						</FormItem>
					</Col>
					<Col span="6">
						<FormItem label="">
							<Button className="ml10" type="primary" onClick={this.handleSubmit} size="large">查询</Button>
						</FormItem>
					</Col>


				</Row>
			</Form>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;

