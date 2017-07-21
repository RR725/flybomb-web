/*
 * @Author: ecofe 
 * @Date: 2017-02-17 11:26:58 
 * @Last Modified by: ecofe
 * @Last Modified time: 2017-03-31 09:16:53
 */
'use strict';
import React from 'react';
import { Input, Form, Button, Row, Col, Select } from 'antd';
import { Link } from 'react-router';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax';
// import Editor from './editor';
import Table from './table';
const FormItem = Form.Item;
const Option = Select.Option;


const formItemLayoutSmall = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};

let NoticeList = React.createClass({
	getInitialState() {
		return {

			current: 1,
			tableData: {
				loading: true,//ajax完成状态
				data: [],//表格数据
				pagination: null//表格分页
			}
		};
	},
	tableData(searchParam) {//表格需要的数据
		const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值
		const self = this;
		this.setState({
			tableData: {
				loading: true,
				data: []
			},
			current: searchParam.index
		});
		let url = userAuth > 1 ? restapi.noticeListByAdmin : restapi.noticeListByIndex;

		url = utils.makeUrl(url, searchParam);
		ajax.get(url, function (result) {
			let data = result.value.result;
			// data.map(function (json, key) {
			// 	data[key]['key'] = key;
			// });
			self.setState({
				tableData: {
					data: data,
					loading: false,
					pagination: {
						total: result.value.amount,
						current: searchParam.index,
						pageSize: 10,
						showSizeChanger: false,
						// onShowSizeChange(current, pageSize) {
						// 	console.log('Current: ', current, '; PageSize: ', pageSize);
						// },
						onChange(current) {

							searchParam.index = current;
							self.setState({
								current: current,
								searchData: searchParam
							});

							self.tableData(searchParam);

						}
					}
				}
			});
		}, function () {//接口请求失败的回调
			self.setState({
				tableData: {
					loading: false
				}

			});
		});
	},
	componentDidMount() {

		let searchParam = {
			index: 1
		};
		this.tableData(searchParam);
	},
	handleSubmit(type) {

		this.props.form.validateFields((errors, values) => {
			if (errors) {

				console.log('Errors in form!!!');
				return;
			}
			values.title=values.title.trim();
			values.index =type==='click'?1:this.state.current;
			this.tableData(values);
		});
	},
	render() {

		const { getFieldProps } = this.props.form;

		const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值
		return <div>
			<Form horizontal>
				<Row>

					<Col span="5">

						<FormItem {...formItemLayoutSmall} label="标题名称&nbsp;&nbsp;&nbsp;&nbsp;">
							<Input placeholder="输入标题名称"  {...getFieldProps('title', {
								initialValue: ''
							}) } />
						</FormItem>
					</Col>
					{userAuth > 1 ?
						<Col span="5">

							<FormItem {...formItemLayoutSmall} label="状态&nbsp;&nbsp;&nbsp;&nbsp;">

								<Select {...getFieldProps('status', {
									initialValue: '-1'
								}) } size="large">
									<Option value="-1">全部</Option>
									<Option value="1">已发布</Option>
									<Option value="0">草稿</Option>
								</Select>
							</FormItem>
						</Col>
						: null}
					<Col span="6" >
						<Button className="ml10" type="primary" onClick={this.handleSubmit.bind(this,'click')} size="large">查询</Button>
						{userAuth > 1 ? <Link to='/notice'><Button className="ml10" type="primary" size="large">添加公告</Button></Link> : null}
					</Col>
				</Row>


			</Form>

			<Table current={this.state.current} onRefresh={this.handleSubmit} onSearch={this.tableData} tableData={this.state.tableData} />
		</div>;
	}

});



NoticeList = Form.create()(NoticeList);
module.exports = NoticeList;