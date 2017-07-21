import React from 'react';
import { Form }
	from 'antd';
import {
	Link
}
	from 'react-router';
const FormItem = Form.Item;
import utils from '../../lib/utils';
import restapi from '../../lib/url-model';

import ProductTypeApp from '../../js/producttype-app';//产品类型和应用的下拉列表
import defaultPermission from '../../js/default-permission';
let Sider = React.createClass({
	getInitialState() {
		return {
			permission: true,
			all: '全部应用'
		};
	},
	getSubNav(type, config) {
		let appId = utils.queryString('appId', window.location.href);
		let newAppId = appId;
		const firstApp = this.props.listApp[0];
		if (!appId || appId === '0') {
			if (firstApp) {
				newAppId = firstApp.appId;
			}

		}
		const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值
		let data = this.props.data;
		if (userAuth > 1) {
			data = {
				value: {
					permission: defaultPermission.data(appId, newAppId)
				}
			}
		}
		if (!data) return <span></span>
		const dataSource = data && data.value && data.value.permission;
		const source = dataSource[type];
		if (!source) { return null }
		const li = source.map(function (data, key) {
			for (let i = 0; i < config.length; i++) {
				if (data.code === config[i].code) {
					return <li key={key}>
						<Link activeClassName="active" to={config[i].url} >{data.name}</Link>
					</li>
				}
			}

		})
		return li;
	},
	componentDidMount() {
		let appId = utils.queryString('appId', window.location.href)

		this.setState({
			appId: appId
		});
		// console.log(this.props.path);
		// const hash=utils.makeUrl(this.props.path,{});
		// window.location.href=window.location.pathname+'#'+hash;
	},
	selectType(value, name) {
		//console.log(value)
		//console.log(name)
		this.props.form.setFieldsValue({
			appId: value
		});
		this.setState({
			appId: value,
			appName: name
		});
		let obj = utils.getQueryObj(window.location.hash);
		if (value) {
			obj.appId = value;
		} else {
			obj.appId = 0;
		}
		const hash = utils.makeUrl(this.props.path, obj);
		window.location.href = window.location.pathname + '#' + hash;
	},
	getAppName(appId, appName) {

		const allApp = this.props.listApp;//拿到所有应用
		if (allApp) {
			for (let i = 0; i < allApp.length; i++) {
				if (allApp[i].appId == appId) {
					appName = allApp[i].name
				}
			}
		}
		return appName;
	},
	render() {
		let appId = utils.queryString('appId', window.location.href);
		let newAppId = appId;
		const firstApp = this.props.listApp[0];
		if (!appId || appId === '0') {
			if (firstApp) {
				newAppId = firstApp.appId;
			}

		}
		let html;
		const path = this.props.path;
		let appName = this.state.appName || '全部应用';
		const type = path.split('/')[1];
		let all = '全部应用';
		// const firstApp = this.props.listApp[0];

		if (type === 'config' || type === 'create' || type === 'analyze') {
			all = null;
			appName = this.getAppName(appId, appName);
		}
		if (path.indexOf('/config/black') > -1) {
			all = '全部应用';
		}
		if (path.indexOf('/data/') > -1 || path.indexOf('/config/black') > -1) {
			if (!appId || appId === '0') {
				appName = '全部应用';
				// if(firstApp){
				// 	appId=firstApp.appId;


				// }
			} else {
				appName = this.getAppName(appId, appName);
			}
		}
		const androidInitData = {
			api: restapi.listUserApp,
			width: '190',
			all: all,
			appName: appName,
			name: 'appId',
			appId: appId
		};
		const formItemLayout = {
			labelCol: {
				span: 4
			},
			wrapperCol: {
				span: 20
			}
		};
		const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值
		const disabled = userAuth > 1 ? false : true;
		const appList = (
			<li className="app_name">
				<FormItem  {...formItemLayout} label="应用名称&nbsp;&nbsp;&nbsp;&nbsp;">
					<ProductTypeApp.render notFoundContent="无数据" showSearch={true} searchPlaceholder='搜索' disabled={disabled} selectType={this.selectType} initData={androidInitData} />
				</FormItem>
			</li>
		);
		if (type === 'data') {
			html = <div className="subnav">
				<ul className="subnav_con">

					{this.getSubNav('数据统计', [{
						url: '/data/push/record?appId=' + appId,
						code: '2000'
					}, {
						url: '/data/push/stat?appId=' + appId,
						code: '2001'
					}, {
						url: '/data/push/data?appId=' + appId,
						code: '2002'
					}, {
						url: '/data/push/group/push?appId=' + appId,
						code: '2003'
					}, {
						url: '/data/push/user/data?appId=' + appId,
						code: '2004'
					}, {
						url: '/data/detail/list?appId=' + (appId || 0),
						code: '2005'
					}, {
						url: '/data/push/timing?appId=' + appId,
						code: '2006'
					}])}
					{path.indexOf('data/push/detail') > -1 ? <span style={{ display: 'none' }}>{appList}</span> : appList}
				</ul>
			</div>
		} else if (type === 'platform') {


			html = <div className="subnav">
				<ul className="subnav_con">
					<li>
						<Link id="pushRecord" activeClassName="active" to="/platform/app/list" >应用列表</Link>
					</li>
					<li>
						<Link activeClassName="active" to="/platform/data" >平台数据</Link>
					</li>
					<li>
						<Link activeClassName="active" to="/platform/module/config" >模块配置</Link>
					</li>
					<li>
						<Link activeClassName="active" to="/platform/user/group/config" >用户群配置</Link>
					</li>
				

				</ul>
			</div>

		} else if (type === 'create') {
			html = <div className="subnav">
				<ul className="subnav_con">
					{this.getSubNav('创建推送', [{
						url: '/create/push/?pushType=notice&appId=' + appId,
						code: '1000'
					}, {
						url: '/create/push/?pushType=message&appId=' + appId,
						code: '1001'
					}, {
						url: '/create/push/?pushType=group&appId=' + appId,
						code: '1002'
					}, {
						url: '/create/push/?pushType=timing&appId=' + appId,
						code: '1003'
					}])}
					{appList}
				</ul>
			</div>



		} else if (type === 'account') {
			html = <div className="subnav">
				<ul className="subnav_con">
					<li>
						<Link id="accountManage" activeClassName="active" to="/account/manage" >账号管理</Link>
					</li>
				</ul>
			</div>
		} else if (type === 'notice') {
			html = <div className="subnav">
				<ul className="subnav_con">
					<li>
						<Link id="NoticeList" activeClassName="active" to="/notice/list" >公告</Link>
					</li>
				</ul>
			</div>



		} else if (type === 'config') {
			html = <div className="subnav">
				<ul className="subnav_con">
					{this.getSubNav('配置管理', [{
						url: '/config/app?appId=' + newAppId,
						code: '3000'
					}, {
						url: '/config/tag?appId=' + newAppId,
						code: '3001'
					}, {
						url: '/config/debug?appId=' + newAppId,
						code: '3002'
					}, {
						url: '/config/black?appId=' + appId,
						code: '3003'
					}])}
					{appList}
				</ul>
			</div>

		} else if (type === 'analyze') {
			html = <div className="subnav">
				<ul className="subnav_con">
					{this.getSubNav('数据分析', [{
						url: '/analyze/push/attr?appId=' + appId,
						code: '5000'
						// },{
						// url: '/analyze/user/action?appId=' + appId,
						// code: '5001'
					}])}
					{appList}
				</ul>
			</div>
		} else if (type === 'personal') {
			html = <div className="subnav">
				<ul className="subnav_con">
					{this.getSubNav('个性化推送', [{
						url: '/personal/push?pushType=personal&appId=' + appId,
						code: '4000'
					},{
						url: '/personal/push/resource/lib?pushType=personal&appId=' + appId,
						code: '4001'
					}])}
					{appList}
				</ul>
			</div>
		} else {
			html = null;
		}
		return <Form horizontal>{html}</Form>;
	}
});
Sider = Form.create()(Sider);
module.exports = Sider;


