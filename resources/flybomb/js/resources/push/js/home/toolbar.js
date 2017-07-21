'use strict';
import React from 'react';
import {Form, Select, Button, Row, Icon, Col} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import Table from './table';
import ProductTypeApp from '../producttype-app';
let _currentApp = {};



let App = React.createClass({

	getInitialState() {
		return {
			data: null,
			searchStatus: false,
			appName: '全部应用',
			appId: 0
		};
	},


	handleSearch() {
		this.setState({
			searchStatus: !this.state.searchStatus
		});
	},
	selectType(value, name) {

		const searchType = this.state.searchType;
		this.props.form.setFieldsValue({
			appId: value
		});
		this.setState({
			appId: value,
			appName: name
		});
		if (value != 0) {
			_currentApp.current = 1;
		}
		let searchParam = {
			// appId: value || 0,
			index: _currentApp.current || 1
		};
		if (typeof value === 'number') {//按包名搜的时候，如果包名和应用名称相同，value的值要取name
			value = name;
		}
		searchParam[searchType || 'appId'] = value || 0;
		this.props.getTableData(searchParam);
	},
	componentWillReceiveProps() {
	},
	componentDidMount() {
		const hash = window.location.hash;
		const type = utils.queryString('type', hash);

		let searchParam = {
			appId: 0,
			index: _currentApp.current || 1
		};
		if (type) {
			if (_currentApp.appId) {
				const allApp = ProductTypeApp.allApp;
				let appName = this.state.appName;
				for (let i = 0; i < allApp.length; i++) {
					if (allApp[i].appId == _currentApp.appId) {
						appName = allApp[i].name;
					}
				}
				this.selectType(_currentApp.appId, appName);
			} else {
				this.props.getTableData(searchParam);
			}

		} else {
			searchParam.index = 1;
			this.props.getTableData(searchParam);
		}

	},
	addApp(url) {

		_currentApp.appId = this.state.appId;
		let hash = window.location.hash;
		const obj = {
			type: 'back'
		};

		_currentApp.current = _currentApp.current > 1 ? _currentApp.current : this.props.current;

		hash = utils.makeUrl(hash.split('?')[0], obj);
		window.location.hash = hash;
		window.location.hash = url;
	},
	changeType(value) {
		this.setState({
			searchType: value
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

		const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值
		return (
			<div>
				<Form horizontal>
					<div className="home_toolbar">
						<Row>
							<Col span="4">
								<div className="title"><span className="border"></span>应用列表</div>
							</Col>
							<Col span="10">&nbsp;
							</Col>
							<Col span="10">

								<div style={{ textAlign: 'right' }}>
									<Col span="3">
										&nbsp;

									</Col>
									<Col span="21">
										{userAuth > 1 ?
											<FormItem className="display_ib mr10">
												<Select onChange={this.changeType} defaultValue="appId" style={{ width: 100 }}>
													<Option value="appId">按应用搜</Option>
													<Option value="packageName">按包名搜</Option>
													<Option value="pushAppId">按AppID搜</Option>
												</Select>
											</FormItem>
											: null}
										<FormItem className="display_ib mr10">
											<ProductTypeApp.render searchType={this.state.searchType} notFoundContent="无数据" showSearch searchPlaceholder='搜索应用名称'  selectType={this.selectType} initData={androidInitData}  />
										</FormItem>
										{userAuth > 0 ?
											<Button onClick={this.addApp.bind(this, '/home/add-app') } type="primary" size="large"><Icon style={{ fontSize: 12, fontWeight: 'bold' }} type="plus" />新建应用</Button>

											: null}
									</Col>

								</div>
							</Col>
						</Row>

					</div>
				</Form>

				<Table.render  refresh={this.props.refresh} tableData={this.props.tableData}   />
			</div>
		);
	}
});

App = Form.create()(App);
module.exports = App;