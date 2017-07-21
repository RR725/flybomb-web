/*
 * @Author: ecofe 
 * @Date: 2017-02-24 17:59:58 
 * @Last Modified by: ecofe
 * @Last Modified time: 2017-03-31 09:19:01
 */
'use strict';
import React from 'react';

import { Table, Button, Popover, message, Tooltip } from 'antd';
import restapi from '../../lib/url-model';
import ajax from '../../components/ajax';
import { Link } from 'react-router';

const App = React.createClass({
	getInitialState() {
		let self = this;

		const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值
		let columns = [{
			title: '公告标题',
			key: '0',
			width: 500,
			className: 'ta_l',
			render(text, record) {
				return <Link
					className={record.read ? '' : 'fw_b'}
					to={'/notice/detail/' + record.noticeId + (record.read ? '' : '?refresh=true')}>
					{record.top?'【置顶】':''}<span style={{color:'#333'}}>{text}</span>
				</Link>;
			},
			dataIndex: 'title'
		}, {
			title: '更新时间',
			key: '1',
			className: 'ta_c',
			dataIndex: 'lmodify'
		}];
		if (userAuth > 1) {
			columns = columns.concat([
				{
					title: '状态',
					key: '2',
					className: 'ta_r',
					dataIndex: 'statusDesc'
				}, {
					title: '操作',
					key: '3',
					className: 'ta_r',
					render(text, record, index) {
						return <div>
							<a onClick={self.modify.bind(self, record, 'status')} href="javascript:;">
								{record.statusDesc === '发布' ? '草稿' : '发布'}
							</a>
							<a className="pl10" onClick={self.modify.bind(self, record, 'top')} href="javascript:;">

								{record.top ? '取消置顶' : '置顶'}
							</a>
							<Tooltip title="编辑">
								<Link className="pl10" to={'/notice?noticeId=' + record.noticeId}><i className="i_edit"></i></Link>
							</Tooltip>
							<Popover
								placement="bottom"
								visible={self.state['visible' + index]}
								content={self.getContent('visible' + index, record, index)}
								title={'确定删除?'}
								onVisibleChange={self.togglePopover.bind(self, 'visible' + index)}
								trigger="click"   >
								<span>

									<Tooltip title="删除">
										<a className="pl10" href="javascript:;"><i className="i_del"></i></a>
									</Tooltip>
								</span>

							</Popover>
						</div>;
					},
					dataIndex: ''
				}
			]);
		}
		return {
			userAuth: userAuth,
			columns: columns,
			refresh: false
		};
	},
	modify(record, type) {
		let data = {
			noticeId: record.noticeId
		};
		if (type === 'status') {
			data[type] = record.statusDesc === '发布' ? 0 : 1;
		}
		if (type === 'top') {
			data[type] = record.top ? 0 : 1;
		}
		ajax.post(restapi.updateNotice, data, () => {

			message.success('设置成功');

			this.props.onRefresh();
		});
	},
	getContent(type, record, index) {
		return <div>
			<Button type="primary" className="color_bg mr10" onClick={this.togglePopover.bind(this, type)}>取消</Button>
			<Button onClick={this.del.bind(this, type, record, index)}>确定</Button>
		</div>;
	},
	del(type, record) {
		let data = {
			noticeId: record.noticeId
		};
		ajax.post(restapi.DeleteNotice, data, () => {
			this.props.onRefresh();
			this.togglePopover(type);
		});
	},
	togglePopover(type) {
		this.setState({
			[type]: !this.state[type]
		});
	},

	render() {
		let data = this.props.tableData.data;
		return (
			<div id='detailTable'>
				<Table columns={this.state.columns} loading={this.props.tableData.loading} dataSource={data} pagination={this.props.tableData.pagination} />
			</div>
		);
	}
});

module.exports = App;