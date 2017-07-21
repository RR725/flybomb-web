'use strict';
import React from 'react';

import { Table } from 'antd';
import ModifyMainAccount from './modify-main-account';

let ManageTabel = React.createClass({
	getInitialState() {
		let self = this;
		return {
			showMainAccountModal: false,
			columns: [{
				title: '应用名称',
				key: '0',
				dataIndex: 'appName',
				className: 'td_appname ',
				render(text, record) {
					return <div><img src={record.appIconUrl || '/resources/push/images/default_icon.png'} width="24" height="24" />{text}</div>;
				}
			}, {
				title: '主账号',
				key: '1',
				className: 'ta_c',
				dataIndex: 'mainAccountName',
				render(text, record) {
					let options = {
						name: text,
						appId: record.appId,
						mainAccountId: record.mainAccountId
					};
					return <div onClick={self.toggleModal.bind(self, window.event, options)}>
						<a href="javascript:;">{text}</a>
					</div>;
				}
			}, {
				title: '子账号',
				key: '2',
				className: 'ta_c',
				dataIndex: 'subAccountNum',
				render(text, record) {

					return <div onClick={self.showSubAccount.bind(self, window.event, record.appId)}>
						<a href="javascript:;">{text}</a>
					</div>;
				}
			}],
			refresh: false
		};
	},
	toggleModal(evt, options) {
		let json = {
			showMainAccountModal: !this.state.showMainAccountModal
		};

		if (options) {
			json.mainAccount = options.name;
			json.appId = options.appId;
			json.mainAccountId = options.mainAccountId;
		}
		this.setState(json);
	},

	showSubAccount(evt, appId) {
		//changeMainAccount
		const editData = {
			appId: appId
		};
		this.props.toggleModal('allSubAccount', editData);
	},
	render() {

		return (
			<div>

				<Table columns={this.state.columns} loading={this.props.tableData.loading} dataSource={this.props.tableData.data} pagination={this.props.tableData.pagination} />
				<ModifyMainAccount
					mainAccountId={this.state.mainAccountId}
					appId={this.state.appId}
					homeCurrent={this.props.homeCurrent}
					onSearch={this.props.onSearch}
					toggleModal={this.toggleModal}
					mainAccount={this.state.mainAccount}
					showMainAccountModal={this.state.showMainAccountModal} />

			</div>
		);
	}
});


module.exports = ManageTabel;