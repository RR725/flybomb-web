"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { Menu, Icon, Dropdown, Badge } from "antd";
import { Link } from "react-router";
import restapi from "../../lib/url-model";
import utils from "../../lib/utils";
import ajax from "../ajax";

const Header = React.createClass({
	getInitialState() {
		return {
			userName: null,
			permission: true,
			unReadNum: 0,
			loginInfo: {}
		};
	},
	componentDidMount() {
		if (window.location.hash.indexOf("#/login") > -1) {
			return;
		}
		ajax.post(restapi.checkLogin, {}, result => {
			const value = result.value;
			if (!value.isLogined) {
				window.location.hash = "/login";
				return;
			}
			this.setState({
				loginInfo: value
			});
		});
	},
	logout() {
		ajax.post(restapi.logout, {}, () => {
			window.location.hash = "/login";
		});
	},
	render() {
		const logoutUrl =
			restapi.logout + "?gotoURL=" + encodeURIComponent(location.origin);
		let permission =
			this.props.data &&
			this.props.data.value &&
			this.props.data.value.permission;
		const hash = window.location.hash;
		const userTypes =
			(this.props.loginInfo && this.props.loginInfo.userTypes) || [];
		let userAuth = 0;
		for (let i = 0; i < userTypes.length; i++) {
			userAuth += userTypes[i];
		}
		const menu = (
			<Menu>
				<Menu.Item key="1">
					<a href={logoutUrl}>退出</a>
				</Menu.Item>
			</Menu>
		);

		let appId = utils.queryString("appId", window.location.href);

		let menuMain = null;
		let headMenu = [];
		headMenu.push(
			<Menu.Item key="home">
				<Link id="home" activeClassName="active" to={"/manage"}>
					首页
				</Link>
			</Menu.Item>
		);

		menuMain = (
			<Menu
				className="fl main_nav"
				selectedKeys={[this.state.current]}
				mode="horizontal"
			>
				{headMenu}
			</Menu>
		);
		return (
			<div className="header">
				<div className="header_con">
					{this.state.loginInfo.isLogined && (
						<div className="fr fs14 account">
							<span>{this.state.loginInfo.name}</span>
							<a onClick={this.logout} href="javascript:;">
								退出
							</a>
						</div>
					)}
					<h1 className="fl fs16" />
					{menuMain}
				</div>
			</div>
		);
	}
});

module.exports = Header;
