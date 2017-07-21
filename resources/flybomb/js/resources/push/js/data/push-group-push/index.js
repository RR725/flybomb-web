'use strict';
import React from 'react';
import Toolbar from './toolbar';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';

const App = React.createClass({
	getInitialState() {
		return {
			current: 1,
			appId: utils.queryString('appId', window.location.href),
			tableData: {
				loading: true,//ajax完成状态
				data: [],//表格数据
				pagination: null//表格分页
			}
		};
	},
	componentWillReceiveProps() {
		let appId = utils.queryString('appId', window.location.href);
		this.setState({
			appId: appId
		});
		// let searchParam={
		// 	appId: appId,
		// 	index:1,
		// 	startTime:utils.dateFormat('yyyy-MM-dd',new Date()),
		// 	endTime:utils.dateFormat('yyyy-MM-dd',new Date())
		// };
		// this.tableData(searchParam);	
	},
	tableData(searchParam) {//表格需要的数据
		const self = this;
		this.setState({
			tableData: {
				loading: true,
				data: []
			},
			current: searchParam.index
		});
		let url = restapi.taskGroupList;
		const appId = utils.queryString('appId', window.location.href);
		if (appId && appId !== '0') {
			searchParam.appId = appId;
		} else {
			delete searchParam.appId;
		}
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
	componentWillUnmount: function () {
		if (document.querySelector('#dataStat')) document.querySelector('#dataStat').className = '';
	},
	componentDidMount() {
		if (document.querySelector('#dataStat')) document.querySelector('#dataStat').className = 'active';
	},
	render() {
		return (
			<div>
				<Toolbar searchData={this.state.searchData} refresh={this.state.refresh} tableData={this.state.tableData} current={this.state.current} appId={this.state.appId} onSearch={this.tableData}  />
			</div>
		);
	}
});

module.exports = App;