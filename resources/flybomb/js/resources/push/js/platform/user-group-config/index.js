'use strict';
import React from 'react';
import Toolbar from './toolbar';
import Table from './table';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';

const App = React.createClass({
	//{this.props.params.id}	
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
		const self = this;
		this.setState({
			tableData: {
				loading: true
			}
		});
		if (searchParam.index) {
			this.setState({
				current: searchParam.index
			});
		}
		let url = restapi.listOpenTag;
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
						current: self.state.current,
						pageSize: 10,
						showSizeChanger: false,
						// onShowSizeChange(current, pageSize) {
						// 	console.log('Current: ', current, '; PageSize: ', pageSize);
						// },
						onChange(current) {
							let searchParam = {
								appId: 0,
								index: current
							};
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
	componentWillUnmount: function () {
		if (document.querySelector('#platformManage')) document.querySelector('#platformManage').className = '';
	},
	componentDidMount() {
		if (document.querySelector('#platformManage')) document.querySelector('#platformManage').className = 'active';
		let searchParam = {
			index: 1
		};
		this.tableData(searchParam);
	},
	render() {
		return (
			<div>
				<Toolbar current={this.state.current} onSearch={this.tableData}  />
				<Table current={this.state.current}  onSearch={this.tableData} refresh={this.state.refresh} tableData={this.state.tableData}   />
			</div>
		);
	}
});
module.exports = App;