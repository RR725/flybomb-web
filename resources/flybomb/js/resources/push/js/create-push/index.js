'use strict';
import React from 'react';
import Notice from './notice';//推送通知
import Message from './message';//透传消息
import Group from './group';//分组推送
import Timing from './timing';//定时推送
import utils from '../../lib/utils';
const App = React.createClass({
	//{this.props.params.id}	
	getInitialState() {
		return {
			refresh: false
		};
	},

	componentWillUnmount: function () {
		if (document.querySelector('#createPush')) document.querySelector('#createPush').className = '';
	},
	componentDidMount() {
		if (document.querySelector('#createPush')) document.querySelector('#createPush').className = 'active';

	},

	render() {
		const search = this.props.location.search;
		const pushType = utils.queryString('pushType', search);
		return (
			<div>
				{pushType === 'message' ? <Message pushType={pushType} /> : null}
				{pushType === 'notice' ? <Notice pushType={pushType} /> : null}
				{pushType === 'group' ? <Group pushType={pushType} /> : null }
				{pushType === 'timing' ? <Timing /> : null }


			</div>

		);
	}
});

module.exports = App;