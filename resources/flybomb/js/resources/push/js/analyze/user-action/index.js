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
	tableData(searchParam) {//表格需要的数据
		const self = this;
		this.setState({
			tableData: {
				loading: true,
				data: []
			},
			current: searchParam.index
		});
		let url = restapi.dailyPushCount;
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

		if (document.querySelector('#dataAnalyze')) document.querySelector('#dataAnalyze').className = '';
	},
	componentDidMount() {

		if (document.querySelector('#dataAnalyze')) document.querySelector('#dataAnalyze').className = 'active';
		let searchParam = {
			index: 1,
			startTime: utils.dateFormat('yyyy-MM-dd', new Date(+new Date() - 6 * 1000 * 60 * 60 * 24)),
			endTime: utils.dateFormat('yyyy-MM-dd', new Date())
		};
		this.tableData(searchParam);

	},

	chartTable() {

	},
	getOption(type) {
		let option = {
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					type: ''        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},

			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: '邮件营销',
					type: 'line',
					smooth: true,
					stack: '总量',
					data: [type, 132, 101, 134, 90, 230, 210]
				}
			]
		};

		return option;
	},
	render() {
		return (
			<div>



				<Toolbar
					searchData={this.state.searchData}
					refresh={this.state.refresh}
					tableData={this.state.tableData}
					current={this.state.current}
					appId={this.state.appId}
					onChange={this.onChange}
					getOption={this.getOption}
					onSearch={this.tableData} />

			</div>
		);
	}
});

module.exports = App;
				// <Table refresh={this.props.refresh} tableData={this.props.tableData} />