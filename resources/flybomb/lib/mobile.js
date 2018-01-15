"use strict";

import "babel-polyfill";

import "antd-mobile/dist/antd-mobile.css";
import "./mobile.css";
import "core-js/library/shim";

import React from "react";
import { render } from "react-dom";

import restapi from "./url-model";
import utils from "./utils";
// import router from './router';

import page404 from "./404";

//模块全部按需加载

import Home from "react-router!../js/home"; //首页
import Question from "react-router!../js/home/question"; //详情

import {
	Router,
	Route,
	IndexRoute,
	Link,
	hashHistory,
	IndexRedirect
} from "react-router";



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
				<div className="container">{children}</div>
			</div>
		);
	}
});

render(
	<Router history={hashHistory} state="999">
		<Route path="/" component={App}>
			<Route path="/home" component={Home} />
			<Route path="/home/question" component={Question} />
			<IndexRedirect to="/home" />
		</Route>
		<Route path="*" component={page404} />
	</Router>,
	document.getElementById("wrap")
);
