'use strict';
import React from 'react';

import { Table, Button, Popover, message, Tooltip } from 'antd';
import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';


const App = React.createClass({
	getContent(managerId, index) {
		return <div>
			<Button type="primary" className="color_bg mr10" onClick={this.togglePopover.bind(this, managerId)}>取消</Button>
			<Button onClick={this.delAccount.bind(this, managerId, index)}>确定</Button>
		</div>;
	},
	getInitialState() {
		let self = this;
		return {
			createSubAccount: false,
			current: 1,
			dataSource: null,
			pagination: null,
			columns: [{
				title: '子账号',
				key: '0',
				className: 'ta_c',
				dataIndex: 'managerName',
				render(text, record) {
					return <span className={record.isDel ? 'colord9' : ''}>{text}</span>;
				}
			}, {
				title: '操作',
				key: '1',
				className: 'ta_c',
				render(text, record, index) {
					let cls = !record.isDel ? 'i_disable' : 'i_undisable';
					let disableText = !record.isDel ? '禁用' : '启用';
					return (
						<div className="btn_wrap">
							<Tooltip title="编辑">
								<i onClick={self.modifyAccount.bind(self, record.managerName, record.managerId, record.appId)} className="i_edit"></i>
							</Tooltip>
							<Tooltip title={disableText}>
								<i onClick={self.disabledAccount.bind(self, record.managerId, record.isDel, index)} className={cls}></i>
							</Tooltip>
							<Tooltip title="删除">
								<Popover
									placement="bottom"
									visible={self.state['visible' + record.managerId]}
									content={self.getContent(record.managerId, index)}
									title="确定删除该账号?"
									onVisibleChange={self.togglePopover.bind(self, record.managerId)}
									trigger="click"   >
									<i onClick={self.togglePopover.bind(self, record.managerId)} className="i_del"></i>
								</Popover>

							</Tooltip>
						</div>
					);
				}
			}],
			refresh: false
		};
	},
	componentWillMount() {
	},
	togglePopover(managerId) {
		this.setState({
			['visible' + managerId]: !this.state['visible' + managerId]
		});
	},
	modifyAccount(managerName, managerId, appId) {

		let data = {
			managerName: managerName,
			managerId: managerId,
			appId: appId
		};
		this.props.toggleModal('createSubAccount', data);
	},
	disabledAccount(managerId, isDel) {
		const self = this;
		let url = restapi.changeStatus;
		let data = {
			flymeAccountId: managerId,
			status: isDel ? 1 : 0
		};
		const editData = self.props.editData;
		if (editData && editData.appId) {
			data.appId = editData.appId;
		}

		ajax.post(url, data, function () {

			const type = self.props.type;
			let json = {};
			json[type] = true;
			json.editData = editData;

			if (editData.accountName) {
				self.props.onSearchFlyme(editData.accountName, self.props.searchCurrent);
			} else {
				self.props.getAllSubAccountTable(json, type, self.props.searchCurrent);
			}
		});
	},
	delAccount(managerId) {
		let url = restapi.delSubAccount;
		const self = this;
		let data = {
			flymeAccountId: managerId
		};
		const editData = self.props.editData;
		if (editData && editData.appId) {
			data.appId = editData.appId;
		}
		ajax.post(url, data, function () {
			message.success('删除成功');
			const type = self.props.type;
			let json = {};
			json[type] = true;
			json.editData = editData;

			if (editData.accountName) {
				self.props.onSearchFlyme(editData.accountName, self.props.searchCurrent);
			} else {
				self.props.getAllSubAccountTable(json, type, self.props.searchCurrent);
			}
			self.props.homeTable({ index: self.props.homeCurrent });
			self.togglePopover(managerId);
		});
	},
	addAccount() {
		const editData = this.props.editData;
		this.props.toggleModal('createSubAccount', {
			appId: editData.appId
		});
	},
	render() {
		const editData = this.props.editData;
		let button = null;
		if (editData && editData.appId) {
			button = (<Button style={{ position: 'relative', top: '-42px', zIndex: 99 }} type="primary" onClick={this.addAccount} className=" color_bg ml10" >
				添加账号
			</Button>);
		}
		return (
			<div>

				<Table
					columns={this.state.columns}
					loading={this.props.tableData.loading}
					dataSource={this.state.dataSource || this.props.tableData.data}
					pagination={this.state.pagination || this.props.tableData.pagination} />
				{button}
			</div>
		);
	}
});

module.exports = App;
