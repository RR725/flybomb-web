'use strict';
import React from 'react';

import { Form, Modal } from 'antd';


import Notice from '../notice';//推送通知
import Message from '../message';//透传消息

// 保存之前输入的展开方式文本
window.vedioFilePathJson = {};


let AddPushModal = React.createClass({
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

		let pushType = this.props.pushType;
		const title = pushType === 'notice' ? '推送通知' : '透传消息';

		return (

			this.props.visible ? <Modal footer={null}
				width={pushType === 'notice' ? 1240 : 800}
				onCancel={this.props.handleCancel}
				title={title}
				visible={this.props.visible} >
				{pushType === 'notice' ?
					<Notice
						setTableData={this.props.setTableData}
						addPushData={this.props.addPushData}
						tableDataIndex={this.props.tableDataIndex}
						pushType={pushType}
						addPush={this.props.addPush}
						totalReviewNumber={this.props.totalReviewNumber}
						visible={this.props.visible}
						groupPush={true}
						groupType={this.props.groupType} />
					:
					<Message
						setTableData={this.props.setTableData}
						addPushData={this.props.addPushData}
						tableDataIndex={this.props.tableDataIndex}
						pushType={pushType}
						addPush={this.props.addPush}
						totalReviewNumber={this.props.totalReviewNumber}
						visible={this.props.visible}
						groupPush={true}
						groupType={this.props.groupType} />
				}


			</Modal>
				: null


		);
	}
});




AddPushModal = Form.create()(AddPushModal);


module.exports = AddPushModal;

