'use strict';
import React from 'react';

import { Table, Popover, Button, message } from 'antd';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';


const App = React.createClass({

	getInitialState() {
		return {
			refresh: false,
			status: 0
		};
	},
	createFile(tagId) {
		let self = this;
		const appId = utils.queryString('appId', window.location.href);
		const data = {
			appId: appId,
			tagId: tagId
		};
		ajax.post(restapi.createTagUserFile, data, function () {
			// console.log(result)
			// const status=result.value.result;
			// let dataSource=self.props.tableData.data;
			// for(let i=0;i<dataSource.length;i++){
			// 	if(i===index){
			// 		dataSource[i].status=status;
			// 	}
			// }
			// self.setState({
			// 	dataSource:dataSource
			// });
			self.setState({
				['status' + tagId]: 1,
				refresh: false
			});
		});

	},
	componentDidMount() {
		const appId = utils.queryString('appId', window.location.href);
		let searchParam = {
			appId: appId,
			index: this.props.current
		};
		this.props.getTableData(searchParam);


	},
	handleVisibleChange(tagId) {
		this.setState({
			['visible' + tagId]: !this.state['visible' + tagId]
		});
	},
	refresh(tagId) {
		const appId = utils.queryString('appId', window.location.href);
		let searchParam = {
			appId: appId,
			index: this.props.current
		};
		const tagName = this.props.tagName;
		if (tagName) {
			searchParam.tagName = tagName;
		}
		this.setState({
			['status' + tagId]: null,
			refresh: true
		});
		this.props.getTableData(searchParam);
	},
	getContent(record) {

		return <div>
			<Button type="primary" className="color_bg mr10" onClick={() => this.togglePopover(record)}>取消</Button>
			<Button onClick={() => this.delOk(record)}>确定</Button>
		</div>;
	},
	delOk(record) {
		let url = restapi.blackDelete;
		const appId = utils.queryString('appId', window.location.href);
		let self = this;
		ajax.post(url, { blackId: record.id, appId: appId }, function () {
			message.success('黑名单删除成功');

			self.togglePopover(record);

			self.refreshTable();

		});
	},

	refreshTable() {

		let blackName = this.props.blackName;
		const appId = utils.queryString('appId', window.location.href);
		let json = {
			index: this.props.current,
			appId: appId
		};
		if (blackName) {
			json.blackName = blackName;
		}
		this.props.getTableData(json);
	},
	disabled(record, index) {
		const appId = utils.queryString('appId', window.location.href);
		let url = restapi.blackDisable;
		let self = this;
		let data = {
			appId: appId,
			disable: record.disable ? false : true,
			blackId: record.id
		};
		ajax.post(url, data, function () {
			let msg = record.disable ? '启用成功' : '禁用成功';
			message.success(msg);
			// self.refreshTable();
			self.props.setTableDataDisable(index);
		});
	},
	togglePopover(record) {
		let id = record.id;
		this.setState({
			['visibleDel' + id]: !this.state['visibleDel' + id]
		});
	},
	render() {
		const appId = utils.queryString('appId', window.location.href);
		const self = this;
		const columns = [{
			title: '应用名称',
			key: '0',
			dataIndex: 'appName',
			className: 'ta_l',
			render(text, record) {
				let className = record.disable ? 'colord9' : '';
				return <span className={className}>{text}</span>;
			}
		}, {
			title: '包名',
			className: 'ta_l',
			key: '1',
			dataIndex: 'packageName',
			render(text, record) {
				let className = record.disable ? 'colord9' : '';
				return <span className={className}>{text}</span>;
			}
		}, {
			title: '黑名单名称',
			className: 'ta_l',
			key: '2',
			dataIndex: 'blackName',
			render(text, record) {
				let className = record.disable ? 'colord9' : '';
				return <span className={className}>{text}</span>;
			}
		}, {
			title: '数量',
			className: 'ta_r',
			key: '3',
			dataIndex: 'blackNum',
			render(text, record) {
				let className = record.disable ? 'colord9' : '';
				return <span className={className}>{text}</span>;
			}
		}, {
			title: '操作',
			className: 'ta_c',
			key: '4',
			render(text, record, index) {
				let downloadUrl = '/garcia/webjsp/push/black/download?appId=' + appId + '&blackId=' + record.id;
				return (
					<div>
						<a href={downloadUrl} >下载</a>
						{record.disable ?
							<a className="pl10" href="javascript:;" onClick={() => self.disabled(record, index)}>启用</a>
							:
							<a className="pl10" href="javascript:;" onClick={() => self.disabled(record, index)}>禁用</a>
						}
						<Popover
							placement="bottom"
							visible={self.state['visibleDel' + record.id]}
							content={self.getContent(record)}
							title={'确定删除黑名单?'}
							onVisibleChange={() => self.togglePopover(record)}
							trigger="click"   >
							<a className="pl10" href="javascript:;" >删除</a>

						</Popover>

					</div>
				);
			},
			dataIndex: ''
		}];
		return (
			<Table className="home_table" columns={columns} loading={this.props.tableData.loading} dataSource={this.props.tableData.data} pagination={this.props.tableData.pagination} />
		);
	}
});

module.exports = App;