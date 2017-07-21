'use strict';
import React from 'react';
import Toolbar from './toolbar';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax';

const App = React.createClass({
	//{this.props.params.id}	
	getInitialState() {
		return {
			current: 1,
			appId: 0,
			tableData: {
				loading: false,//ajax完成状态
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
		let url = restapi.homeList;
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
						// showQuickJumper:true,
						total: result.value.amount,
						current: searchParam.index,
						pageSize: 10,
						showSizeChanger: false,
						// onShowSizeChange(current, pageSize) {
						// 	console.log('Current: ', current, '; PageSize: ', pageSize);
						// },
						onChange(current) {
							let searchParam = {
								appId: 0,
								name: '',
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
	// onSearch(json) {
	// 	let searchParam={
	// 		appId: 0,
	// 		name:'',
	// 		index:1
	// 	};
	// 	Object.assign(searchParam,json);

	// 	this.setState({
	// 		current:1
	// 	});
	// 	this.tableData(searchParam);
	// },
	componentWillUnmount: function () {
		document.querySelector('#home').className = '';
	},
	componentDidMount() {
		document.querySelector('#home').className = 'active';
	},
	render() {
		return (
			<div>
				<Toolbar current={this.state.current} refresh={this.state.refresh} tableData={this.state.tableData} getTableData={this.tableData}  />
			</div>
		);
	}
});

module.exports = App;