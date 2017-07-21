'use strict';
import React from 'react';
import Notice from './notice';//推送通知
import Message from './message';//透传消息
import utils from '../../lib/utils';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const App = React.createClass({
	//{this.props.params.id}	
	getInitialState() {
		return {
		};
	},
	onChange(value) {
		let hash = window.location.hash;
		let obj = utils.getQueryObj(hash);
		obj.timingPushType = value;
		let query = utils.makeUrl('#/create/push/', obj);
		window.location.hash = query;
	},
	render() {

		let hash = window.location.hash;
		let obj = utils.getQueryObj(hash);
		let defaultActiveKey = obj.timingPushType || '1';
		return (
			<div>
				<Tabs onChange={this.onChange} defaultActiveKey={defaultActiveKey} >
					<TabPane tab="定时通知" key="1"><Notice pushType="notice" /></TabPane>
					<TabPane tab="定时透传消息" key="2"><Message pushType="message" /> </TabPane>
				</Tabs>


			</div>

		);
	}
});

module.exports = App;