'use strict';
import React from 'react';
import Toolbar from './toolbar';
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
	tableData(searchParam, url) {//表格需要的数据
		const self = this;
		this.setState({
			tableData: {
				loading: true
			}
		});
		const params = {
			index: searchParam.index,
			startTime: searchParam.startTime,
			endTime: searchParam.endTime
		};
		const appId = searchParam.appId;
		if (appId && appId !== '0') {
			params.appId = searchParam.appId;
		}
		const newUrl = utils.makeUrl(url, params);
		ajax.get(newUrl, function (result) {

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
							params.index = current;
							self.setState({
								current: current
							});
							self.tableData(params, url);

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
			index: 1,
			startTime: utils.dateFormat('yyyy-MM-dd', new Date(+new Date() - 6 * 1000 * 60 * 60 * 24)),
			endTime: utils.dateFormat('yyyy-MM-dd', new Date())
		};
		this.tableData(searchParam, restapi.dailyPushCount);
	},
	render() {
		return (
			<div>
				<Toolbar  refresh={this.state.refresh} tableData={this.state.tableData} onSearch={this.tableData}  />

			</div>
		);
	}
});

module.exports = App;