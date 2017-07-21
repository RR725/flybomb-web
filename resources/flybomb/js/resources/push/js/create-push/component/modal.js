'use strict';
import React from 'react';

import { Modal } from 'antd';


import utils from '../../../lib/utils';
import PushDetail from '../../push-detail';
import PreviewPush from './preview-push';//预推测试


const modalFormItemLayout = {
	labelCol: {
		span: 6
	},
	wrapperCol: {
		span: 18
	}
};
const PushModal = React.createClass({
	getInitialState() {
		return {
			popoverVisible: false
		};
	},
	componentDidMount() {
		if (document.querySelector('#prepush')) {
			document.querySelector('#prepush').classList = 'prepush_position';
		}
	},

	render() {
		const startTime = this.props.form.getFieldValue('startTime');

		const noticeExpandType = this.props.form.getFieldValue('noticeExpandType');
		let noticeExpandTypeText = '　';
		if (noticeExpandType === 0) {
			noticeExpandTypeText = '标准';
		}
		if (noticeExpandType === 1) {
			noticeExpandTypeText = <div>文本<div className="break_word lh15 mt5 mb5 pr40">{this.props.noticeExpandContent}</div></div>;
		}
		if (noticeExpandType === 2) {
			noticeExpandTypeText = <div>大图<div className="break_word lh15 mt5 mb5 pr40">
				<img width="225" height="144" src={window.bigImageFilePathJson.noticeExpandImgUrl || this.props.form.getFieldValue('noticeExpandImgUrl')} />
			</div></div>;
		}
		if (noticeExpandType === 3) {
			noticeExpandTypeText = 'ACT文件';
		}
		const clickType = this.props.form.getFieldValue('clickType');
		let clickTypeText = '　';
		if (clickType === 0) {
			clickTypeText = '打开应用';
		}
		if (clickType === 1) {
			clickTypeText = '打开应用页面';
		}
		if (clickType === 2) {
			clickTypeText = '打开URI页面';
		}
		if (clickType === 3) {
			clickTypeText = '应用客户端自定义';
		}
		let clickPackage = this.props.form.getFieldValue('clickPackage');
		let userType = this.props.form.getFieldValue('userType');
		if (userType === 2 && this.props.personalPush) {
			userType = 6;
		}
		let userTypeText = '　';
		if (userType === 0) {
			userTypeText = '全部用户';
		}
		if (userType === 1) {
			userTypeText = '用户群';
			const userGroupName = this.props.userGroupName;
			if (userGroupName) {
				userTypeText += '(' + userGroupName + ')';
			}
		}
		if (userType === 2) {
			userTypeText = 'PushId';
		}
		if (userType === 3) {
			userTypeText = 'Flyme账户';
		}
		if (userType === 4) {
			userTypeText = '别名';
		}
		if (userType === 5) {
			userTypeText = '标签';
		}
		if (userType === 6) {
			userTypeText = 'IMEI';
		}
		let notificationTypeText = '　';
		let clickTypeInfoText = [];
		let userName = '';
		if (this.props.requestData) {
			const notificationType = this.props.requestData.advanceInfo.notificationType;
			const clickTypeInfo = this.props.requestData.clickTypeInfo;
			var params = {};
			const arr = [];
			for (let i in notificationType) {
				if (notificationType[i]) {
					if (i === 'vibrate') {
						arr.push('震动');
					}
					if (i === 'lights') {

						arr.push('闪灯');
					}
					if (i === 'sound') {

						arr.push('声音');
					}
				}
			}
			notificationTypeText = arr.join('+');
			if (arr.length === 0) {
				notificationTypeText = '无';
			}
			//点击动作的文本
			if (clickTypeInfo) {
				params = clickTypeInfo.parameters;
				if (clickType == 1 || clickType == 2 || clickType == 3) {
					let text = clickTypeInfo.activity || clickTypeInfo.url || clickTypeInfo.customAttribute || '';
					if (clickType === 1) {
						text = '页面地址：' + text;
					}
					clickTypeInfoText.push(<div className="break_word" key={text}>{text}</div>);
				}
				if (clickType != 2 && clickType != 3) {
					for (let j in params) {
						if (j != 'undefined' && j != '') {

							clickTypeInfoText.push(<div key={j}><p>参数：{j.trim()}</p><p className="break_word" >值：{String(params[j]).trim()}</p></div>);
						}

					}
				}
			}



			userName = document.getElementById('userName').innerHTML;
		}
		let titleList = [];
		if (this.props.distinctTitle) {
			titleList = this.props.distinctTitle.map(function (k, key) {
				return <div key={key}>{k}</div>;
			});
		}
		// if(notificationType0==='0'){
		// 	notificationTypeText='震动';
		// }
		// if(notificationType1==='1'){
		// 	notificationTypeText='闪灯';
		// }
		// if(notificationType0==='0' && notificationType1==='1'){
		// 	notificationTypeText='震动+闪灯';
		// }
		let fixStartDisplayTime = this.props.form.getFieldValue('fixStartDisplayTime');
		let fixEndDisplayTime = this.props.form.getFieldValue('fixEndDisplayTime');

		fixStartDisplayTime = fixStartDisplayTime ? utils.dateFormat('yyyy-MM-dd hh:mm:ss', fixStartDisplayTime) : null;
		fixEndDisplayTime = fixEndDisplayTime ? utils.dateFormat('yyyy-MM-dd hh:mm:ss', fixEndDisplayTime) : null;
		const fixDisplayTime = fixEndDisplayTime && fixStartDisplayTime ? fixStartDisplayTime + ' 至 ' + fixEndDisplayTime : '';
		const title = this.props.type === 'notice' ? '推送通知' : '透传消息';
		let listSceneTag = this.props.listSceneTag;
		let cronWeek = this.props.cronWeek;
		let cronTime = this.props.form.getFieldValue('cronTime');
		if (cronTime && typeof cronTime === 'object') {
			cronTime = utils.dateFormat('hh:mm:ss', cronTime);
		}

		const pushDetailData = {
			formItemLayout: modalFormItemLayout,
			appName: this.props.appName,
			// userFileName:this.props.requestData && this.props.requestData.userTypeInfo && this.props.requestData.userTypeInfo.target,
			noticeBarType: this.props.form.getFieldValue('noticeBarType'),
			noticeBarImgUrl: window.smallImageFilePathJson.noticeBarImgUrl || this.props.form.getFieldValue('noticeBarImgUrl'),
			title: this.props.form.getFieldValue('title'),
			content: this.props.form.getFieldValue('content'),
			noticeExpandTypeText: noticeExpandTypeText,
			clickTypeText: clickTypeText,
			clickPackage: clickPackage,
			startTime: startTime,
			offLine: this.props.form.getFieldValue('offLine'),
			validTime: this.props.form.getFieldValue('validTime'),
			userTypeText: userTypeText,
			listSceneTag: listSceneTag,
			distinct: this.props.form.getFieldValue('distinct'),
			fixSpeed: this.props.form.getFieldValue('fixSpeed'),
			fixSpeedRate: this.props.form.getFieldValue('fixSpeedRate'),
			fixDisplay: this.props.form.getFieldValue('fixDisplay'),
			fixDisplayTime: fixDisplayTime,
			msgCache: this.props.form.getFieldValue('msgCache'),
			msgCacheStatus: this.props.msgCacheStatus,
			suspend: this.props.form.getFieldValue('suspend'),
			clearNoticeBar: this.props.form.getFieldValue('clearNoticeBar'),
			notificationTypeText: notificationTypeText,
			noticeImgUrl: this.props.noticeImgUrl,
			pushType: this.props.type === 'notice' ? 0 : 1,
			clickTypeInfoText: clickTypeInfoText,
			userName: userName,
			articleLength: this.props.form.getFieldValue('articleLength'),//个性化推送-文章长度
			freshnessNew: this.props.form.getFieldValue('freshnessNew'),//个性化推送-新闻新鲜度
			distinctTitle: titleList,
			tagIdsName: this.props.form.getFieldValue('tagIdsName'),
			userGroupDesc: userType === 1 ? this.props.userGroupDesc : null,
			scopeDesc: this.props.form.getFieldValue('scope') == 0 ? '并集' : '交集',
			black: this.props.form.getFieldValue('black'),
			blackList: this.props.blackList,
			cronTime: cronTime,
			cronWeek: cronWeek,
			listMaterial: this.props.listMaterial,
			pushPercent: this.props.pushPercent
		};

		let footer = <PreviewPush
			submiting={this.props.submiting}
			handleOk={this.props.handleOk}
			type={this.props.type}
			personalPush={this.props.personalPush}
			requestData={this.props.requestData}
			handleCancel={this.props.handleCancel}
			visible={this.props.visible}
			pushReviewNumber={this.props.pushReviewNumber}
			popoverVisible={this.state.popoverVisible} />;
		return (
			<Modal footer={footer}
				width={700}
				onCancel={this.props.handleCancel}
				title={title}
				visible={this.props.visible} >
				<PushDetail pushDetailData={pushDetailData} personalPush={this.props.personalPush} />



			</Modal>

		);
	}
});

module.exports = PushModal;




























