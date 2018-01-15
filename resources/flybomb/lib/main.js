"use strict";

import "babel-polyfill";

import "antd/dist/antd.css";
import "./main.css";
import "core-js/library/shim";

import React from "react";
import { render } from "react-dom";

import restapi from "./url-model";
import utils from "./utils";
// import router from './router';

import page404 from "./404";

//模块全部按需加载

import Home from "react-router!../js/manage"; //首页
import Add from "react-router!../js/manage/add"; //添加
import Login from "react-router!../js/manage/login"; //登录

import {
	Router,
	Route,
	IndexRoute,
	Link,
	hashHistory,
	IndexRedirect
} from "react-router";

import Header from "../components/header";
import Footer from "../components/footer";


var App = React.createClass({
	getInitialState() {
		return {
			loginInfo: null,
			userName: null,
			data: null
		};
	},
	componentDidMount() {},
	render: function() {
		const children = this.props.children;
	
		return (
			<div>
				<Header />
				<div className="container">{children}</div>
				<Footer />
			</div>
		);
	}
});

render(
	<Router history={hashHistory} state="999">
		<Route path="/" component={App}>
			<Route path="/manage" component={Home} />
			<Route path="/manage/add" component={Add} />
			<Route path="/manage/login" component={Login} />
			<IndexRedirect to="/manage" />
		</Route>
		<Route path="*" component={page404} />
	</Router>,
	document.getElementById("wrap")
);
