'use strict';
import React from 'react';
import { Form, Row, Col, Table } from 'antd';

const FormItem = Form.Item;

import utils from '../lib/utils';
let PushDetail = React.createClass({
	getInitialState() {
		return {
			toggleStatus: true
		};
	},
	toggleUserGroup(e) {
		let text = e.target.innerText;
		let title = e.target.title;
		if (title.length > 120) {
			text = title.slice(0, 120);
		}
		e.target.style.height = this.state.toggleStatus ? 'auto' : '70px';
		const desc = this.state.toggleStatus ? title : text + '...';
		this.setState({
			toggleStatus: !this.state.toggleStatus,
			desc: desc
		});

	},
	render() {
		const data = this.props.pushDetailData;
		const type = this.props.type;
		const cronTaskId = utils.queryString('cronTaskId', window.location.href);
		const startTime = data.startTime ? typeof data.startTime === 'string' ? data.startTime : utils.dateFormat('yyyy-MM-dd hh:mm:ss', data.startTime) : '即时';
		const dataSource = data.appLogVos;
		const href = window.location.href;
		let search = href.split('#');
		const pushType = utils.queryString('pushType', search[1]);
		let columns = [{
			title: '操作时间',
			key: '0',
			dataIndex: 'time',
			width: 250
		}, {
			title: '操作者',
			key: '1',
			dataIndex: 'account',
			width: 250
		}, {
			title: '行为',
			key: '2',
			dataIndex: 'remark',
			width: 150
		}];
		let userGroupDesc = data.userGroupDesc;
		if (userGroupDesc && userGroupDesc.length > 120) {
			const desc = userGroupDesc.slice(0, 120) + '...';
			userGroupDesc = <div onClick={this.toggleUserGroup} title={userGroupDesc} style={{ cursor: 'pointer', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflow: 'hidden', lineHeight: 1.8, height: 70 }}>{this.state.desc || desc}</div>;
		}
		let listMaterial = data.listMaterial;
		let materialHtml;
		if (listMaterial) {
			materialHtml = listMaterial.map(function (data, key) {
				return <div key={key} title={data.title}><span className="ellipsis display_ib va_t" style={{ width: 200 }}>{data.title}</span><span className="pl10">数量：{data.total}</span></div>;
			});
		}
		let blackList = data.blackList;
		let hasBlackList, blackListText, blackText;
		if (blackList) {

			blackListText = blackList.map(function (data, key) {
				if (data.choose) {
					hasBlackList = true;
					return <div key={key}><span>{data.blackName}</span><span className="pl10">数量：{data.blackNum}</span></div>;
				}
			});

			if (!hasBlackList) {

				blackListText = '无黑名单';
			}
			blackText = !data.black ? '禁用' : blackListText;
		}
		let cronWeek = data.cronWeek || [];
		let weeks = ['一', '二', '三', '四', '五', '六', '日'];
		let cronWeeks = cronWeek.map(function (data) {
			return '周' + weeks[data - 1];
		});
		cronWeeks = cronWeeks.join('、');
		if (cronWeek.length === 7) {
			cronWeeks = '每天';
		}
		return <Row className="push_detail">
			<Col span='22'>
				{data.detailType !== 'data' ?
					<FormItem {...data.formItemLayout} label="创建者&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{data.userName}</div>
					</FormItem>
					: null
				}
				{data.detailType === 'data' ?
					<FormItem className="detail_logs" {...data.formItemLayout} label="操作日志&nbsp;&nbsp;&nbsp;&nbsp;">
						<div style={{ width: 650 }}><Table pagination={false} columns={columns} dataSource={dataSource} /></div>
					</FormItem>

					: null
				}
				{data.detailType === 'data' && type !== 'groupPush' ?
					<FormItem {...data.formItemLayout} label="任务来源&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{data.sourceTypeDesc || '　'}</div>
					</FormItem>
					: null
				}
				{data.detailType === 'data' ?
					<FormItem {...data.formItemLayout} label="通知类型&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{type === 'groupPush' ? data.pushType : (data.pushTypeDesc || '　')}</div>
					</FormItem>
					: null
				}
				{type !== 'groupPush' ? <FormItem {...data.formItemLayout} label="应用名称&nbsp;&nbsp;&nbsp;&nbsp;">
					<div>{data.appName || '　'}</div>
				</FormItem> : null
				}
				{type === 'groupPush' ? <FormItem {...data.formItemLayout} label="目标用户类型&nbsp;&nbsp;&nbsp;&nbsp;">
					<div>{data.groupType || '　'}</div>
				</FormItem> : null
				}
				{data.pushType === 0 ?
					<FormItem {...data.formItemLayout} label="通知栏样式&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{data.noticeBarType === 1 ? <span><p>图片</p><img width="225" height="44" src={data.noticeBarImgUrl} /></span> : data.noticeBarType === 0 ? '标准' : '安卓原生' || '　'}</div>
					</FormItem>
					: null
				}
				{type !== 'groupPush' ?
					<FormItem {...data.formItemLayout} label="标题&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{data.title || '　'}</div>
					</FormItem> : null}
				{this.props.personalPush || data.personalPush ?
					<FormItem {...data.formItemLayout} label="内容选择&nbsp;&nbsp;&nbsp;&nbsp;">
						{materialHtml}
					</FormItem> :
					type !== 'groupPush' ?
						<FormItem {...data.formItemLayout} label="内容&nbsp;&nbsp;&nbsp;&nbsp;">
							<div className='break_word lh15 mt5 mb5 pr40'>{data.content || '　'}</div>
						</FormItem> : null}
				{data.pushType === 0 ?

					this.props.personalPush || data.personalPush ? null :
						<div>
							<FormItem {...data.formItemLayout} label="展开方式&nbsp;&nbsp;&nbsp;&nbsp;">
								<div>{data.noticeExpandTypeText}</div>
							</FormItem>
							<FormItem {...data.formItemLayout} label="点击动作&nbsp;&nbsp;&nbsp;&nbsp;">
								<div>{data.clickTypeText}</div>
								{data.clickPackage ? <div>调起应用：{data.clickPackage}</div> : null}
								<div>{data.clickTypeInfoText}</div>

							</FormItem>

						</div>

					: null
				}
				{pushType === 'timing' || cronTaskId  ?
					<FormItem {...data.formItemLayout} label="任务定制&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{cronWeeks}&nbsp;&nbsp;&nbsp;&nbsp;{data.cronTime}</div>
					</FormItem>
					:
					<FormItem {...data.formItemLayout} label="推送时间&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{data.startTime ? startTime : '即时'}</div>
					</FormItem>
				}
				<FormItem {...data.formItemLayout} label="是否离线&nbsp;&nbsp;&nbsp;&nbsp;">
					<div>{(data.offLine ? '是' : '否') || '　'}</div>
					{data.offLine ?
						<div>有效时长：{data.validTime + '小时' || '　'}</div>
						: null}
				</FormItem>
				{type === 'groupPush' && data.groupType === '不同用户群' ? null :
					<FormItem {...data.formItemLayout} label="指定用户&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{data.userTypeText}</div>
						{data.userFileName ?
							<div>文件名: {data.userFileName}</div>
							: null}
						{data.tagIdsName ?
							<div>{data.scopeDesc}: {data.tagIdsName}</div>
							: null}
						{data.userGroupDesc ?
							<span>{userGroupDesc}</span>
							: null}
					</FormItem>
				}
				{(this.props.personalPush || data.personalPush) &&
					<FormItem {...data.formItemLayout} label="推送场景&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{data.listSceneTag}</div>

					</FormItem>
				}
				{type !== 'groupPush' ?
					<FormItem {...data.formItemLayout} label="消息去重&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{data.distinct ? '去重' : '不去重'}</div>
						{data.distinctTitle}
					</FormItem> : null}

				{(this.props.personalPush || data.personalPush) &&
					<FormItem {...data.formItemLayout} label="数量筛选&nbsp;&nbsp;&nbsp;&nbsp;">
						<div>{data.pushPercent}%</div>

					</FormItem>
				}
				{type !== 'groupPush' ?
					this.props.personalPush || data.personalPush ?
						<FormItem {...data.formItemLayout} label="推送黑名单&nbsp;&nbsp;&nbsp;&nbsp;">
							<Row><Col span="19">{blackText}</Col></Row>
						</FormItem>
						:
						<FormItem {...data.formItemLayout} label="高级设置&nbsp;&nbsp;&nbsp;&nbsp;">
							<div><span>定速推送：</span><span>{data.fixSpeed ? data.fixSpeedRate : '关闭'}</span></div>
							{data.pushType === 0 ?// <div>联网方式：{this.props.form.getFieldValue('netType')?'仅WiFi':'不限'}</div>
								<div>
									<div><span>定时展示：</span><span>{data.fixDisplay ? data.fixDisplayTime : '关闭'}</span></div>
									{data.msgCacheStatus ?
										<div><span>消息缓存：</span><span>{data.msgCache ? '打开' : '关闭'}</span></div>
										: null}
									<div><span>通知栏悬浮窗：</span><span>{data.suspend ? '显示' : '不显示'}</span></div>
									<div><span>清除通知栏：</span><span>{data.clearNoticeBar ? '可清除' : '不可清除'}</span></div>
									<div><span>通知提醒类型：</span><span>{data.notificationTypeText}</span></div>

								</div>
								: null}

							<Row><Col span="5">推送黑名单：</Col><Col style={{ marginLeft: data.detailType === 'data' ? -110 : -10 }} span="19">{blackText}</Col></Row>
						</FormItem> : null
				}
			</Col>
		</Row>;
	}
});

PushDetail = Form.create()(PushDetail);
module.exports = PushDetail;

// <div>自定义图标：
// 								{data.noticeImgUrl ?
// 									<img className="mt10" style={{ verticalAlign: 'top' }} src={data.noticeImgUrl} width="120" height="120" />
//									: ' '
// 								}
// 							</div>