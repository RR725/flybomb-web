'use strict';
import React from 'react';

import { Select } from 'antd';



const Option = Select.Option;

import Toolbar from './toolbar';
import Table from './table';
import AddModule from './add';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';

const App = React.createClass({
	//{this.props.params.id}	
	getInitialState() {
		return {
			current: 1,
			moduleId: '',
			tableData: {
				loading: true,//ajax完成状态
				data: [],//表格数据
				pagination: null//表格分页
			}
		};
	},
	moduleListData() {
		const url = restapi.listModule;
		const self = this;
		ajax.get(url, function (result) {

			const list = result.value;
			if (!list) return null;
			const optionsDom = list.map(function (data, key) {
				return <Option value={String(data.id)} key={key}>{data.name}</Option>;
			});
			self.setState({
				optionsDom: optionsDom
			});
			let searchParam = {
				index: 1
			};
			self.tableData(searchParam);
		});
	},
	tableData(searchParam) {//表格需要的数据
		const self = this;
		this.setState({
			tableData: {
				loading: true
			}
		});
		let url = restapi.listModuleUrl;
		url = utils.makeUrl(url, searchParam);
		ajax.get(url, function (result) {
			let data = result.value.result;
			data.map(function (json, key) {
				data[key]['key'] = key;
			});
			self.setState({
				tableData: {
					data: data,
					loading: false,
					pagination: {
						total: result.value.amount,
						current: searchParam.index || self.state.current,
						pageSize: 10,
						showSizeChanger: false,
						onChange(current) {
							let searchParam = {
								index: current
							};
							const moduleId = self.state.moduleId;
							if (moduleId && moduleId !== '') {
								searchParam.moduleId = moduleId;
							}
							self.setState({
								current: current
							});
							self.tableData(searchParam);

						}
					}
				}
			});
		});
	},
	changeModuleId(value) {
		this.setState({
			moduleId: value
		});
	},
	componentWillUnmount: function () {
		if (document.querySelector('#platformManage')) document.querySelector('#platformManage').className = '';
	},
	componentDidMount() {
		if (document.querySelector('#platformManage')) document.querySelector('#platformManage').className = 'active';

		this.moduleListData();
	},
	render() {
		return (
			<div>
				<AddModule changeModuleId={this.changeModuleId} onSearch={this.tableData} optionsDom={this.state.optionsDom} />

				<Toolbar moduleId={this.state.moduleId} changeModuleId={this.changeModuleId} onSearch={this.tableData} optionsDom={this.state.optionsDom} />
				<Table moduleId={this.state.moduleId} onSearch={this.tableData} current={this.state.current} refresh={this.state.refresh} tableData={this.state.tableData} />
			</div>
		);
	}
});

module.exports = App;