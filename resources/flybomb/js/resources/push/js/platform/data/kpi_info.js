'use strict';
import React from 'react';

import { Icon, Tooltip } from 'antd';






const Info = React.createClass({

	render() {

		const data = [{
			text: '推送率',
			title: '推送数/有效数*100%。衡量推送平台的推送效率'
		}, {
			text: '送达率',
			title: '接收数/推送数*100%。接收数为平台推送出去之后，成功接收消息的设备量，推送数为Push平台实际下发推送的数量；送达率衡量推送消息用户的接收率'
		}, {
			text: '到达率',
			title: '到达数/接收数*100%。到达数为消息从push服务到达APP的数量。衡量pushSDK转发消息的稳定性'
		}];
		const title = data.map((source) => {
			if (source.text === this.props.text) {
				return source.title;
			}
			return '';
		});
		return <span><Tooltip title={title}><Icon className="fs14 color999 fw_n cursor_p" type="info-circle-o" /></Tooltip>{this.props.text}</span>;
	}
});

module.exports = Info;