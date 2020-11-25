'use strict';
import React from 'react';

import { Table } from 'antd';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax';

import questionType from '../question-type';
import { Link } from 'react-router';




const HomeTable = React.createClass({
	getInitialState() {
		let self = this;
		return {
			columns: [{
				title: '科目名称',
				key: '0',
				dataIndex: 'subject',
				className: 'td_appname '
			}, {
				title: '类型',
				className: 'td_appname',
				key: '1',
				dataIndex: 'type',
				render(text, record) {
					let filter=questionType.filter(function (data) {
						return data.type === text;
					});
					return filter[0].type_desc
				}
			}, {
				title: '标题',
				className: 'ta_l',
				key: '2',
				dataIndex: 'title'
			}, {
				title: '操作',
				className: 'ta_c',
				key: '3',
				render(text, record) {
					return (
						<Link to={'/manage/add?questionId=' + record.questionId} >修改</Link>

					);
				},
				dataIndex: ''
			}],
			refresh: false
		};
	},


	render() {
		return (
			<Table className="home_table" columns={this.state.columns} loading={this.props.tableData.loading} dataSource={this.props.tableData.data} pagination={this.props.tableData.pagination} />
		);
	}
});
exports.render = HomeTable;