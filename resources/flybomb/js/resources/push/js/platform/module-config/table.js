'use strict';
import React from 'react';

import { Table, Button, message, Popover, Tooltip } from 'antd';
import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';

const App = React.createClass({


	togglePopover(id) {
		this.setState({
			['visible' + id]: !this.state['visible' + id]
		});
	},
	getContent(id) {
		return <div>
			<Button type="primary" className="color_bg mr10" onClick={this.togglePopover.bind(this, id)}>取消</Button>
			<Button onClick={this.delOk.bind(this, id)}>确定</Button>
		</div>;
	},
	delOk(id) {
		const self = this;
		ajax.post(restapi.deleteModuleUrl, { id: id }, function () {
			message.success('模块配置删除成功');
			self.togglePopover(id);
			const moduleId = self.props.moduleId;
			let searchParam = {
				index: self.props.current
			};

			if (moduleId && moduleId !== '') {
				searchParam.moduleId = moduleId;
			}
			self.props.onSearch(searchParam);
		});
	},
	getInitialState() {
		let self = this;
		return {
			columns: [{
				title: '模块名称',
				key: '0',
				className: 'ta_l',
				dataIndex: 'moduleName'
			}, {
				title: 'URL地址',
				key: '1',
				className: 'ta_l',
				dataIndex: 'url'
			}, {
				title: '操作',
				className: 'ta_c',
				key: '2',
				render(text, record) {
					const id = record.id;

					return (
						<Tooltip title="删除">
							<Popover
								placement="bottom"
								visible={self.state['visible' + id]}
								content={self.getContent(id)}
								title={'确定删除URL地址?'}
								onVisibleChange={self.togglePopover.bind(self, id)}
								trigger="click"   >
								<i className="i_del"></i>
							</Popover>
						</Tooltip>
					);
				},
				dataIndex: ''
			}],
			refresh: false
		};
	},

	render() {
		const dataSource = this.props.tableData.data;
		if (!dataSource || dataSource.length === 0) return null;
		return (
			<Table columns={this.state.columns} loading={this.props.tableData.loading} dataSource={dataSource} pagination={this.props.tableData.pagination} />
		);
	}
});

module.exports = App;