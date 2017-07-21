'use strict';

import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

import restapi from '../lib/url-model';
import utils from '../lib/utils';
import ajax from '../components/ajax';
import Reflux from 'reflux';

var actions = Reflux.createActions([
	'productType'
]);


var store = Reflux.createStore({
	listenables: [actions],
	firstApp: null
});




const ProductType = React.createClass({
	mixins: [Reflux.listenTo(store, 'getData')],
	getInitialState() {
		return {
			value: null,
			initNum: 0,
			loaded: false
		};
	},
	componentDidMount() {
		this.getData();

	},
	getAppListCb(value) {

		let self = this;
		let appId = utils.queryString('appId', window.location.href);
		self.setState({
			value: value,
			loaded: true
		});

		for (let i = 0; i < value.length; i++) {
			const valueI = value[i];
			if (appId == valueI.appId) {
				self.selectType(valueI.appId, valueI.name);
			}
		}
		// if(!appId || appId==='0'){
		// 	self.selectType(value[0].appId,value[0].name)
		// }
		store.firstApp = {
			appId: value[0] && value[0].appId,
			appName: value[0] && value[0].name
		};
		store.allApp = value;



		exports.firstApp = store.firstApp;
		exports.allApp = store.allApp;
	},
	getData() {

		const self = this;
		let value;


		//ajax.get(this.props.initData.api,function(result){
		if (this.props.initData.api == restapi.listMainApp) {
			ajax.get(this.props.initData.api, function (result) {
				value = result.value;
				self.getAppListCb(value);
			});
		} else {
			value = window.ListApp;//入口main.js里设置ListApp的值
			self.getAppListCb(value);
		}


		//});
	},
	selectType(value, label) {

		if (typeof label !== 'string') {
			label = label.props.children;
		}

		const result = this.state.value;
		if (!result) return;
		for (let i = 0; i < result.length; i++) {
			if (value === result[i].name) {

				value = result[i].appId;
			}
		}
		this.setState({
			defaultValue: label
		});

		this.props.selectType(value, label);
	},
	// filterOption(searchValue,options){
	// 	let value=options.props.children;
	// 	searchValue=searchValue.toLocaleLowerCase();
	// 	value=value.toLocaleLowerCase();
	// 	if(value.indexOf(searchValue)>-1){
	// 		console.log(searchValue.toLocaleLowerCase())
	// 		return true
	// 	}
	// 	return false;
	// },
	render() {
		if (!this.state.loaded) {
			return <div></div>;
		}
		let value = this.state.value;
		var searchType = this.props.searchType;
		let appName = this.props.initData.appName;
		let appId = this.props.initData.appId;
		// const hash=window.location.hash;
		// let obj = utils.getQueryObj(hash);
		// const appId=obj.appId;
		// if((!appId || appId==='0') && (hash.indexOf('data/push/stat')===2 ||hash.indexOf('config')===2)){
		// 	obj.appId=value[0].appId;
		// 	const newHash=utils.makeUrl(hash.split('?')[0],obj);
		// 	appName=value[0].name;
		// 	window.location.hash=newHash;

		// }
		let options = value.map(function (data, key) {
			const value = String(data[searchType || 'appId']);
			return <Option className="applist_item" key={key + 1} title={data.name} value={value}>{data.name}</Option>;
		});
		//<span className="data_appid">{value}</span>
		if (this.props.initData.all) {
			options.unshift(<Option key={0} value={String(0)}>{this.props.initData.all}</Option>);
		}
		let cantNull = {};
		let changeJson = {};
		// if(appName==='全部应用'){
		// 	appName=value[0].name
		// }
		if (this.props.cantNull) {
			cantNull = this.props.cantNull(this.props.initData.name, value[0].name);
		} else {
			changeJson = {
				onSelect: this.selectType
			};
			if (!searchType && appName) {
				changeJson.defaultValue = String(appId);
				changeJson.value = String(appId);
			}
			if (searchType === 'appId' || !searchType) {
				changeJson.optionFilterProp = 'children';

			} else {
				delete changeJson.optionFilterProp;
			}
		}
		return (
			<div className="select_applist">
				<Select disabled={this.props.disabled} {...cantNull} notFoundContent={this.props.notFoundContent} onSearch={this.onSearch} searchPlaceholder={this.props.searchPlaceholder} showSearch={this.props.showSearch} {...changeJson} size="large" placeholder={this.props.initData.title} style={{ width: this.props.initData.width + 'px' }}>
					{options}
				</Select>
			</div>
		);
	}
});


exports.render = ProductType;