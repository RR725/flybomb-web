'use strict';
import React from 'react';

import { Input, Row, Col, Icon, Popover, message, Button } from 'antd';

import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';





let Distinct = React.createClass({
	getInitialState() {
		const href = window.location.href;
		let search = href.split('#');
		const pushType = utils.queryString('pushType', search[1]);
		return {
			pushType: pushType,
			values: null,
			popoverVisible: false
		};
	},
	handleSave() {
		const pushType = this.state.pushType;
		const self = this;
		if (!this.props.visible) return;
		if (pushType === 'timing') {
			this.props.handleOk();
			return;
		}
		this.props.handleSubmit(null, 'group', function (values) {
			self.props.setTableData(values);

		});
	},

	handleVisibleChange(visible) {
		const self = this;
		if (this.props.groupPush) {
			this.props.handleSubmit(null, 'group', function (values) {
				let data = self.props.addPushData;
				values.pushTimeInfo = data.pushTimeInfo;
				values.userTypeInfo = data.userTypeInfo;
				self.setState({
					values: values,
					popoverVisible: visible
				});
			});

		} else {

			self.setState({
				popoverVisible: visible
			});
		}
	},
	pushReview() {
		const pushId = document.querySelector('#pushId' + this.props.type).value;
		let json = this.props.requestData;
		const pushType = this.props.type === 'notice' ? 0 : 1;
		json.pushId = pushId.replace(/^\s+/, '').replace(/\s+$/, '');

		if (!json.pushId) {
			return message.error('请输入PushId');
		}

		let source = {};

		if (pushType === 1) {
			source = {
				appId: json.appId,
				pushId: json.pushId,
				title: json.title,
				content: json.content,
				pushTimeInfo: {
					offLine: json.pushTimeInfo.offLine,
					validTime: json.pushTimeInfo.validTime
				}
			};
			json = source;
		}

		// 修复bug：http://redmine.meizu.com/issues/360117
		// if (json.advanceInfo && !json.advanceInfo.noticeImgUrl) {
		// 	json.advanceInfo.noticeImgUrl = this.props.noticeImgUrl;
		// };

		const data = {
			pushType: pushType,
			appId: json.appId,
			json: JSON.stringify(json)
		};
		ajax.post(restapi.pushReview, data, function () {

			message.success('预推成功');
		});
	},
	render() {

		const pushType = this.state.pushType;

		const content = (
			<div>
				<Row style={{ height: 36, lineHeight: '33px' }}>
					<Col className="mr10 fs16" span="5">预推测试</Col>
					<Col className="mr10" span="11"><Input id={'pushId' + this.props.type} placeholder="输入PushId" /></Col>
					<Col span="6"><Button className="w_80" type="primary" onClick={this.pushReview} size="large">预推</Button></Col>
				</Row>
			</div>
		);
		return <div style={{ textAlign: 'center' }}>
			{this.props.groupPush || this.props.personalPush ? null : <p key='p' className="push_review_num">预计推送人数<span className="num">{this.props.pushReviewNumber}</span></p>}
			{this.props.personalPush ? null : <Popover overlayClassName="prepush_position" key='popover' placement="topLeft" key="test" content={content} trigger="click"
				visible={this.state.popoverVisible} onVisibleChange={this.handleVisibleChange}>
				<Button type="ghost" className="color_bdc" size="large">预推测试</Button>
			</Popover>}
			{this.props.groupPush || pushType === 'timing' ?
				<Button key='button' key="submit" type="primary" size="large" style={{ marginLeft: 8 }} onClick={this.handleSave}>
					保存{this.props.submiting ? <Icon type="loading" /> : <span></span>}
				</Button>
				:
				<Button key='button' key="submit" type="primary" size="large" style={{ marginLeft: 8 }} onClick={this.props.handleOk}>
					推送{this.props.submiting ? <Icon type="loading" /> : <span></span>}
				</Button>
			}
		</div>;
	}
});




module.exports = Distinct;