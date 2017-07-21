'use strict';
import React from 'react';
import Toolbar from './toolbar';
import Add from './add';
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
	setTableDataDisable(index){
		let data=this.state.tableData.data;
		data.map(function(data,key){
			let disable=data.disable;
			if(key===index){
				data.disable=disable?false:true;
			}
		});
		this.setState({
			tableData:{
				data:data
			}
		});
	},
	tableData(searchParam) {//表格需要的数据
		const self = this;
		const appId = utils.queryString('appId', window.location.href);
		this.setState({
			tableData: {
				loading: true
			}
		});
		let url = restapi.blackList;
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
							let result = {
								appId: appId,
								index: current
							};
							if (searchParam.blackName) {
								result.blackName = searchParam.blackName;
							}
							self.setState({
								current: current
							});
							self.tableData(result);

						}
					}
				}
			});
		});
	},
	// componentWillReceiveProps() {
	// 	const appId = utils.queryString('appId', window.location.href);
	// 	let searchParam = {
	// 		appId: appId,
	// 		index: 1
	// 	};
	// 	this.setState({
	// 		current: 1
	// 	});
	// 	this.tableData(searchParam);
	// },
	componentWillUnmount: function () {

		if (document.querySelector('#configManage')) document.querySelector('#configManage').className = '';
	},
	componentDidMount() {
		if (document.querySelector('#configManage')) document.querySelector('#configManage').className = 'active';
		const appId = utils.queryString('appId', window.location.href);
		this.setState({
			appId: appId
		});
	},
	render() {
		return (
			<div>
				<Add tableData={this.state.tableData} getTableData={this.tableData}></Add>
				<Toolbar setTableDataDisable={this.setTableDataDisable} current={this.state.current} refresh={this.state.refresh} tableData={this.state.tableData} getTableData={this.tableData} />

			</div>
		);
	}
});

module.exports = App;