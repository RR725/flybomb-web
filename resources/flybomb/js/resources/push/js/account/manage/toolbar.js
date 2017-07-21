'use strict';
import React from 'react';
import { Button, Row, Col, Modal, message, Form } from 'antd';


import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';
import utils from '../../../lib/utils';
import ProductTypeApp from '../../../js/producttype-app';

import TableAllSubAccount from './table-all-sub-account';
import CreateSubAccount from './create-sub-account';


import TableList from './table';



import SearchFlyme from '../../../js/search';




let AddAppTask = React.createClass({
	getInitialState() {
		return {
			initData: {},
			current: 1,
			searchCurrent: 1,
			values: [],
			subAccountTitle: '全部子账号',
			authData: {
				appList: []
			},
			tableData: {
				loading: true,//ajax完成状态
				data: [],//表格数据
				pagination: null//表格分页
			},
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
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {


			if (errors) {

				console.log('Errors in form!!!');
				return;
			}
			values.noticeBarInfo = {
				noticeBarType: values.noticeBarType,
				title: values.title,
				content: values.content,
				noticeBarImgUrl: values.noticeBarImgUrl
			};
			delete values.noticeBarType;
			delete values.title;
			delete values.content;
			delete values.noticeBarImgUrl;




			ajax.post(restapi.addNotice, values, function () {
				message.success('提交成功');
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
	changeRadio(e) {
		const data = {};
		data[e.target.name] = e.target.value;
		this.setState(data);
	},
	textInput() {

	},
	selectType(value, name) {
		this.props.form.setFieldsValue({
			appId: value
		});
		this.setState({
			appId: value,
			appName: name
		});
		let searchParam = {
			index: 1
		};
		if (value) {
			searchParam.appId = value;
		}
		this.props.onSearch(searchParam);
	},
	allSubAccount() { },
	createSubAccount() { },
	getAllSubAccountTable(json, type, current) {

		const self = this;
		const appId = (json.editData && json.editData.appId);
		let url = restapi.showSubAccount;
		let source = {
			index: current,
			pageSize: 6
		};
		if (appId) {
			source.appId = appId;
		}
		url = utils.makeUrl(url, source);
		ajax.get(url, function (result) {
			const data = result.value.result;
			for (let i = 0; i < data.length; i++) {
				data[i].key = i;
			}
			self.setState(json);
			self.setState({
				tableData: {
					data: data,
					loading: false,
					pagination: {
						total: result.value.amount,
						current: current,
						pageSize: 6,
						showSizeChanger: false,
						// onShowSizeChange(current, pageSize) {
						// 	console.log('Current: ', current, '; PageSize: ', pageSize);
						// },
						onChange(current) {
							self.setState({
								current: current,
								searchCurrent: current
							});
							json[type] = true;
							self.getAllSubAccountTable(json, type, current);

						}
					}
				}

			});
		});
	},
	toggleModal(type, editData) {
		const self = this;

		let json = {};
		json[type] = !this.state[type];
		json.editData = editData;
		if (type === 'allSubAccount' && !this.state[type]) {

			json.searchCurrent = 1;
			this.getAllSubAccountTable(json, type, 1);
			if (editData && editData.appId) {
				this.setState({
					subAccountTitle: '子账号'
				});
			}
		}
		if (type === 'createSubAccount') {
			if (!this.state[type]) {
				let url = restapi.authorizePage;
				let data = {

				};
				if (editData && editData.managerId) {
					data.userId = editData.managerId;
				}
				if (editData && editData.appId) {
					data.appId = editData.appId;
				}

				url = utils.makeUrl(url, data);

				ajax.get(url, function (result) {
					let value = result.value;
					let appList = value.appList;
					let appModuleVoList = value.appModuleVoList || [];

					for (let i = 0; i < appList.length; i++) {//设置过权限的应用调换到前面的位置
						for (let o = 0; o < appModuleVoList.length; o++) {
							if (appList[i].appId === appModuleVoList[o].appId) {
								const sapp = appList.splice(i, 1);
								appList.unshift(sapp[0]);
							}
						}
					}
					value.appList = appList;
					self.setState({
						authData: value
					});
					self.setState(json);
				});
			} else {
				const appId = this.state.appId;
				let searchParam = {
					index: this.props.current

				};
				if (appId) {
					searchParam.appId = appId;
				}

				let json = {
					allSubAccount: true,
					editData: {
						appId: editData.appId
					}
				};
				if (editData && editData.appId) {
					this.getAllSubAccountTable(json, 'allSubAccount', 1);
				}
				this.props.onSearch(searchParam);
			}
		}
		if (this.state[type]) {
			this.setState(json);
		}
	},

	onSearchFlyme(value, current) {

		const self = this;
		if (!current || current == 0) {
			current = 1;
			this.setState({
				searchCurrent: current,
				current: current
			});
		}
		let url = restapi.subAccountSearching;
		const json = {
			accountName: value,
			index: current || this.state.searchCurrent,
			pageSize: 6
		};
		const editData = this.state.editData;
		if (editData && editData.appId) {
			json.appId = editData.appId;
		}
		editData.accountName = value;
		url = utils.makeUrl(url, json);
		ajax.get(url, function (result) {
			let data = result.value.result;
			for (let i = 0; i < data.length; i++) {
				data[i].key = i;
			}
			self.setState({
				editData: editData,
				tableData: {
					data: data,
					loading: false,
					pagination: {
						total: result.value.amount,
						current: current || self.state.searchCurrent,
						pageSize: 6,
						showSizeChanger: false,
						// onShowSizeChange(current, pageSize) {
						// 	console.log('Current: ', current, '; PageSize: ', pageSize);
						// },
						onChange(current) {
							self.setState({
								searchCurrent: current,
								current: current
							});
							self.onSearchFlyme(value, current);

						}
					}
				}
			});

		});
	},
	render() {

		let self = this;
		const androidInitData = {
			api: restapi.listMainApp,
			width: '190',
			all: '全部应用',
			appName: this.state.appName,
			name: 'appId',
			appId: this.state.appId
		};
		return (
			<div>
				<Form horizontal>
					<Row className="home_toolbar">
						<Col span="8">
							<ProductTypeApp.render notFoundContent="无数据" showSearch searchPlaceholder='搜索应用名称' selectType={this.selectType} initData={androidInitData} />

						</Col>
						<Col span="9">
							&nbsp;
						</Col>
						<Col span="7" className="ta_r">
							<Button type="ghost" onClick={this.toggleModal.bind(this, 'allSubAccount')} className="btn_normal_show " size="large">
								全部子账号
							</Button>
							<Button type="primary" onClick={this.toggleModal.bind(this, 'createSubAccount')} className="btn_normal_show color_bg ml10" size="large">
								创建子账号
							</Button>
						</Col>
					</Row>
					<Modal title={this.state.subAccountTitle} footer={null} visible={this.state.allSubAccount}
						onOk={this.delOk} onCancel={this.toggleModal.bind(this, 'allSubAccount')}>

						<div className="sub_account_search"><div className="fr"><SearchFlyme onSearch={this.onSearchFlyme} /></div></div>

						<TableAllSubAccount
							homeCurrent={this.props.homeCurrent}
							homeTable={this.props.onSearch}
							editData={this.state.editData}
							current={this.state.current}
							searchCurrent={this.state.searchCurrent}
							onSearchFlyme={this.onSearchFlyme}
							type="allSubAccount"
							getAllSubAccountTable={this.getAllSubAccountTable}
							authData={this.state.authData}
							toggleModal={this.toggleModal}
							self={self}
							refresh={this.state.refresh}
							tableData={this.state.tableData} />
					</Modal>

					{this.state.createSubAccount ?
						<CreateSubAccount editData={this.state.editData} authData={this.state.authData} toggleModal={this.toggleModal} self={self} createSubAccount={this.state.createSubAccount} />
						: null}

				</Form>

				<TableList homeCurrent={this.props.homeCurrent} toggleModal={this.toggleModal} refresh={this.props.refresh} onSearch={this.props.onSearch} tableData={this.props.tableDataList} />
			</div>
		);
	}
});

AddAppTask = Form.create()(AddAppTask);


module.exports = AddAppTask;

