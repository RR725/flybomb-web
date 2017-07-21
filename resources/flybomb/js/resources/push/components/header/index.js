'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon, Dropdown, Badge } from 'antd';
import { Link } from 'react-router';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../ajax';
import ProductTypeApp from '../../js/producttype-app';//产品类型和应用的下拉列表
import defaultPermission from '../../js/default-permission';


const Header = React.createClass({
	getInitialState() {
		return {
			userName: null,
			permission: true,
			unReadNum: 0
		};
	},
	componentDidMount() {
		const self = this;
		setTimeout(function () {
			ajax.get(restapi.getUnReadMessageNum, (result) => {
				self.setState({ unReadNum: result.value })
			})
		}, 2000);


	},

	render() {
		const logoutUrl = restapi.logout + '?gotoURL=' + encodeURIComponent(location.origin);
		let permission = this.props.data && this.props.data.value && this.props.data.value.permission;
		const hash = window.location.hash;
		const userTypes = this.props.loginInfo && this.props.loginInfo.userTypes || [];
		let userAuth = 0;
		for (let i = 0; i < userTypes.length; i++) {
			userAuth += userTypes[i];
		}
		const display = userAuth > 0 ? '' : 'none';
		const menu = (

			<Menu>
				<Menu.Item style={{ display: display }} key="0">
					<Link id="accountManage" activeClassName="active" to={'/account/manage'} >
						<span>账号管理</span>
					</Link>
				</Menu.Item>
				<Menu.Item key="1">
					<a href={logoutUrl}>退出</a>
				</Menu.Item>
			</Menu>

		);

		let appId = utils.queryString('appId', window.location.href);
		let newAppId = appId;
		let listApp = this.props.listApp;
		const firstApp = listApp[0];
		if (!appId || appId === '0') {
			if (firstApp) {
				newAppId = firstApp.appId;
			}

		}
		let personalAppId = null;
		for (let i = 0; i < listApp.length; i++) {
			if (listApp[i].packageName === 'com.meizu.media.reader' && userAuth > 1) {
				personalAppId = listApp[i].appId;
			}
		}
		const json = defaultPermission.data(appId, newAppId, personalAppId);

		let personalPush = permission && permission['个性化推送'];//控制在导航上显示的位置
		if (personalPush) {
			delete permission['个性化推送'];
			permission['个性化推送'] = personalPush;
		}
		let analyzePush = permission && permission['数据分析'];
		if (analyzePush) {
			delete permission['数据分析'];
			permission['数据分析'] = analyzePush;
		}
		let menuMain = null;
		let headMenu = [];
		headMenu.push(<Menu.Item key="home">
			<Link id="home" activeClassName="active" to={'/home'} >首页</Link>
		</Menu.Item>)
		if (userAuth > 1) {//超级管理员好多特权啊
			permission = json;
		}
		if ((permission && hash.indexOf('/home') !== 1 && hash.indexOf('/platform') !== 1 && hash.indexOf('/notice') !== 1 && hash.indexOf('/account') !== 1) || userAuth > 1) {
			let url = '';
			let id = '';
			for (let i in permission) {
				const df = json[i];
				for (let o = 0; o < df.length; o++) {
					if (permission[i][0].code === df[o].code) {
						url = df[o].to;
						id = df[o].id;
					}
				}
				headMenu.push(<Menu.Item key={i}><Link id={id} activeClassName="active" to={url} >{i}</Link></Menu.Item>);
			}
		}
		if (userAuth > 1) {//超级管理员权限才有

			headMenu.push(<Menu.Item key="platform">
				<Link id="platformManage" activeClassName="active" to={'/platform/app/list'} >
					<span>平台管理</span>
				</Link>
			</Menu.Item>)
		}
		menuMain = <Menu className='fl main_nav'
			selectedKeys={[this.state.current]}
			mode="horizontal">{headMenu}</Menu>
		return (
			<div className="header">
				<div className="header_con">
					<div className="fr fs14 account">
						<a title="公告" href={window.location.pathname+'#/notice/list?appId='+(appId || 0)} style={{ color: '#fff', paddingRight: 20 }}>
							<Badge count={this.state.unReadNum}>
								<Icon type="notification" />
							</Badge>
						</a>
						<Dropdown overlay={menu} trigger={['click']}>
							<a className="ant-dropdown-link" href="#">
								<img width="42" height="42" src={this.props.loginInfo && this.props.loginInfo.icon} />
								<span id="userName" data-id={this.props.loginInfo && this.props.loginInfo.userId} className="pr10">{this.props.loginInfo && this.props.loginInfo.flyme}</span>
								<Icon type="down" />
							</a>
						</Dropdown>
					</div>
					<h1 className="fl fs16"><img src={utils.cdn + "/resources/push/images/logo.jpg"} width="225" height="90" /></h1>
					{menuMain}

				</div>
			</div>
		);
	}
});

module.exports = Header;