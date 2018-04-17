'use strict';
import React from 'react';
import Toolbar from './toolbar';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax';

const App = React.createClass({
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
		
		let url = restapi.questionList;
		
		ajax.post(url, searchParam, function (result) {
			let data = result.value.result;
			data.map(function (json, key) {
				data[key]['key'] = key;
			});
			self.setState({
				tableData: {
					data: data,
					loading: false,
					pagination: {
						total: result.value.total,
						current: searchParam.pageNum,
						pageSize: 10,
						showSizeChanger: false,
						
						onChange(current) {
							let searchParam = {
								pageNum: current
							};
							self.tableData(searchParam);

						}
					}
				}
			});
		});
	},
	componentWillUnmount: function () {
		document.querySelector('#home').className = '';
	},
	componentDidMount() {
		document.querySelector('#home').className = 'active';
	},
	render() {
		return (
			<div>
				<Toolbar  refresh={this.state.refresh} tableData={this.state.tableData} getTableData={this.tableData}  />
			</div>
		);
	}
});

module.exports = App;