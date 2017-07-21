'use strict';
import React from 'react';
import {  Form } from 'antd';

import utils from '../../../lib/utils';
import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';
import Container from './container';



let App = React.createClass({
	getInitialState() {
		return {
			listCategory: [],//用户群侧边栏一级列表
			listTagByCategoryId: []//用户群二级列表
		};
	},
	getDefaultProps() {
		return {

		};
	},
	componentDidMount() {
		const self = this;
		let url = restapi.userProfileListCategory;
		const appId = utils.queryString('appId', window.location.href);
		url = utils.makeUrl(url, {
			appId: appId
		});
		function* setData() {
			let data = yield ajax.get(url, function (result) {
				let value = result.value;

				sd.next(value);
			});
			data.push({ fname: '我的人群标签', alink: true });
			self.setState({
				listCategory: data
			});
		}
		let sd = setData();
		sd.next();

	},
	listTagByCategoryId(cid) {
		const self = this;
		const appId = utils.queryString('appId', window.location.href);
		let url = restapi.listTagByCategoryId;
		url = utils.makeUrl(url, {
			cid: cid,
			appId: appId
		});
		ajax.get(url, function (result) {
			self.setState({
				listTagByCategoryId: result.value,
				fid: cid
			});

		});
	},
	listMyTag(){

		const self = this;
		const appId = utils.queryString('appId', window.location.href);
		let url = restapi.listTagBySeed;
		url = utils.makeUrl(url, {
			appId: appId
		});
		ajax.get(url, function (result) {
			let fdimensions=result.value;

			let data=fdimensions.map(function(source){
				// source.byTag=true;
				return {
					fname:'我的人群标签',
					fid:source.fid,
					fidType:1,
					fdimensions:[source]
				};
			});
			
			self.setState({
				listTagByCategoryId: data,
				fid:'myTag'
			});

		});
	},
	render() {
		const self = this;
		const sidebar = this.state.listCategory.map(function (data) {
			let arr = [];
			if (data.alink) {
				arr.push(<dt className={self.state.fid === 'myTag' ? 'cursor_p current' : 'cursor_p'} onClick={self.listMyTag}>{data.fname}</dt>);
			} else {
				arr.push(<dt>{data.fname}</dt>);
				const list = data.fchildren.map(function (source) {
					return <dd className={self.state.fid === source.fid ? 'current' : ''} onClick={self.listTagByCategoryId.bind(self, source.fid)}>{source.fname}</dd>;
				});
				arr = arr.concat(list);
			}
			return arr;
		});
		return <Form horizontal><div className="usergroup">
			<div className="ug_sidebar">
				<dl>
					{sidebar}
				</dl>
			</div>
			<div className="ug_content">
				<Container fid={this.state.fid} form={this.props.form} listTagByCategoryId={this.state.listTagByCategoryId} />

			</div>
		</div>
		</Form>;
	}
});
App = Form.create()(App);


module.exports = App;