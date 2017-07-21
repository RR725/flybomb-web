'use strict';
import React from 'react';

import { Tooltip } from 'antd';






const Info = React.createClass({
	getContainer() {
		return document.getElementById('detailTable');
	},
	render() {

		const data = [{
			text: '目标数',
			title: '计划推送的目标数'
		}, {
			text: '日增用户数',
			title: '当天首次订阅应用的设备数'
		}, {
			text: '在线峰值用户数',
			title: '订阅该应用的设备中，当天同时在线的数量峰值'
		}, {
			text: '日联网用户数',
			title: '订阅该应用的设备中，当天有联网行为的设备数总和'
		}, {
			text: '累计注册用户数',
			title: '历史累积订阅该应用的设备数，已卸载应用不计入累计用户数中'
		}, {
			text: '联网数',
			title: '联网并且与通道形成长链接的设备数'
		}, {
			text: '到达应用数',
			title: 'PushSDK将消息发送给应用的数量（flyme6中，通知栏消息由pushSDK弹出，此埋点仍保留有上报数据）'
		}, {
			text: '划掉数',
			title: '在通知栏中划掉消息的数量。透传消息不统计该项'
		}, {
			text: '已卸载数',
			title: '本次推送任务中应用已被卸载的数量，数据上将出现接收数大于展示数。（flyme6固件此应用会被反订阅，在重新订阅前下次推送任务将不朝它推送；flyme6以下固件应用没有被反订阅）'
		}, {
			text: '有效数',
			title: '从目标数中去除错误或无效的ID，实际有效的ID数量。筛选包括开关状态，订阅状态，pushid有效性以及其他可以推送状态'
		}, {
			text: '推送数',
			title: 'Push平台实际下发推送的数量'
		}, {
			text: '接收数',
			title: 'Push服务接收数，任务有效期内，联网并正常接收到推送消息的数量'
		}, {
			text: '展示数',
			title: '客户端从Push服务收到消息，并在通知栏中展示的数量（3.0以下版本SDK，数据统计T+1，3.0以上实时统计。透传消息没有展示数统计）'
		}, {
			text: '点击数',
			title: '用户点击消息的数量（3.0以下版本SDK，数据统计T+1，3.0以上实时统计。透传消息没有点击数统计）'
		}, {
			text: 'App ID',
			title: '应用的唯一标识，客户端订阅推送时使用'
		}, {
			text: 'App Key',
			title: '客户端身份标识，客户端订阅推送时使用'
		}, {
			text: 'App Secret',
			title: '服务端身份标识，服务端 SDK 初始化使用'
		}, {
			text: '点击动作',
			title: '调起包名不是必填项，如不填，则参数传给本应用'
		}, {
			text: '推送黑名单',
			title: '选择黑名单后，本次推送将不会朝这批用户推送'
		}, {
			text: '定速推送',
			title: '开启定速推送后，此任务的推送速率将按设置的速率推送。速率不会超过应用最大推送速率'
		}, {
			text: '定时展示',
			title: '开启定时展示后，目标用户的展示量将平摊到时间段内'
		}, {
			text: '任务定制',
			title: '设置好循环推送的周期后，会在规定的时间点进行推送'
		}];
		const title = data.map((source) => {
			let text = this.props.text;
			if (text.indexOf(source.text) > -1) {
				return source.title;
			}
			return '';
		});
		return <span><Tooltip getTooltipContainer={this.getContainer} title={title}><i className="fs14 color999 fw_n cursor_p anticon anticon-info-circle-o"></i></Tooltip>{this.props.text}</span>;
	}
});

module.exports = Info;