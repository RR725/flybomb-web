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
		let url = restapi.dailyUserCount;
		const appId = utils.queryString('appId', window.location.href);
		if (appId && appId !== '0') {
			searchParam.appId = appId;
		} else {
			delete searchParam.appId;
		}
		url = utils.makeUrl(url, searchParam);
		ajax.get(url, function (result) {
			let data = result.value.result;
			data = data.sort(function (a, b) {
				return utils.dateParse(a.date + ' 00:00:00') - utils.dateParse(b.date + ' 00:00:00');
			});
			data.map(function (json, key) {
				data[key]['key'] = key;
			});
			self.setState({
				tableData: {
					data: data,
					loading: false,
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
		let searchParam = {
			index: 1,
			startTime: utils.dateFormat('yyyy-MM-dd', new Date(+new Date() - 6 * 1000 * 60 * 60 * 24)),
			endTime: utils.dateFormat('yyyy-MM-dd', new Date())
		};
		this.tableData(searchParam);

	},

	chartTable() {

	},
	getOption(type, title) {
		let data = this.state.tableData.data;
		if (!data) return {};
		let len = data.length;
		let date = [];
		let source = [];
		for (let i = 0; i < len; i++) {
			date.push(data[i].date);
			for (let o in data[i]) {
				if (o === type) {
					let result = data[i][o];
					result = result.split(',');
					result = result.join('');
					source.push(result);
				}
			}
		}
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
				data: date
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: title,
					type: 'line',
					smooth: true,
					stack: '总量',
					data: source
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