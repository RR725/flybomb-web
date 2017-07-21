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
				loading: true
			}
		});
		let url = restapi.accountManaging;
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
	componentDidMount() {
		let searchParam = {
			index: 1
		};
		this.tableData(searchParam);
	},
	render() {
		return (
			<div>
				<Toolbar homeCurrent={this.state.current} current={this.state.current} refresh={this.state.refresh} tableDataList={this.state.tableData} onSearch={this.tableData} />
			</div>
		);
	}
});

module.exports = App;