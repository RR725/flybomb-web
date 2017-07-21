'use strict';
import React from 'react';
import { Input, Button, Row, Col, DatePicker, Radio, Select } from 'antd';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const ConfigDebug = React.createClass({
	getInitialState() {
		return {
			chosedType: 1,
			chosedDropMenu: 1
		};
	},
	componentWillUnmount: function () {
		if (document.querySelector('#configManage')) document.querySelector('#configManage').className = '';
	},
	getAppInfo() {
		const appId = utils.queryString('appId', window.location.href);
		this.setState({
			appId: appId
		});
		ajax.get(restapi.getAppInfo + '?appId=' + appId, (result) => {
			this.setState({
				dwAuth: result.value.dwAuth
			});
		});
	},
	componentWillReceiveProps() {//切换了应用之后要重新拉取数据
		let appId = utils.queryString('appId', window.location.href);
		if (this.state.appId && appId !== this.state.appId) {//切换了应用之后要重新拉取数据

			this.getAppInfo();
		}


	},
	componentDidMount() {
		if (document.querySelector('#configManage')) document.querySelector('#configManage').className = 'active';

		this.getAppInfo();
	},
	handleMenuClick(e) {
		let type;
		switch (e) {
			case '1':
				type = 'deviceId2PushId';
				break;
			case '2':
				type = 'alias2PushId';
				break;
			case '3':
				type = 'pushId2Alias';
				break;
			case '4':
				type = 'pushId2Tags';
				break;

		}
		this.setState({
			chosedDropMenu: e,
			[type + 'Display']: false
		});
		this.refs.sinput.refs.input.value = '';
	},
	onChangeDate(date, dateString) {
		this.refs.rp.setAttribute('data-date', dateString.join(','));
	},
	onChangeType(e) {
		this.setState({
			chosedType: e.target.value,
			getDetailByMsgIdDisplay: false,
			getDetailByPushIdDisplay: false
		});
	},
	handleSubmit(type) {
		const self = this;
		const appId = utils.queryString('appId', window.location.href);
		let value = document.querySelector('#' + type).value;
		value = value.trim();
		let url = restapi[type];
		let json = {
			appId: appId
		};
		if (type === 'deviceId2PushId') {
			json.deviceId = value;
		} else if (type === 'alias2PushId') {
			json.alias = value;
		} else if (type === 'getDetailByMsgId') {
			let pushIdValue = document.querySelector('#getDetailByMsgId_pushId').value;
			pushIdValue = pushIdValue.trim();
			json.pushId = pushIdValue;
			json.msgId = value;
		} else if (type === 'getDetailByPushId') {
			json.pushId = value;
			let date = this.refs.rp.getAttribute('data-date');
			if (!date) {
				let currentDate = utils.dateFormat('yyyy-MM-dd', new Date());
				date = currentDate + ',' + currentDate;
			}
			date = date.split(',');
			json.startTime = date[0];
			json.endTime = date[1];
		} else {
			json.pushId = value;
		}
		let pushIdStatus = false;
		if (type === 'getDetailByMsgId') {
			let pushId = json.pushId;
			if (pushId === '') {
				pushIdStatus = true;
			}
		}
		if (value === '' || pushIdStatus) {

			this.setState({
				[type + 'Text']: '输入框不能为空',
				[type + 'Display']: true
			});
			return;
		}
		url = utils.makeUrl(url, json);
		this.setState({
			[type + 'Display']: false
		});
		ajax.get(url, (result) => {
			let text = result.value;
			if (type === 'deviceOnlineStatus') {
				text = text ? '在线' : '离线';
			}
			if (type === 'deviceSubStatus') {
				text = <span>
					{text ? <p>AppId: {text.pushAppId}</p> : null}
					{text ? <p>包名: {text.packageName}</p> : null}
					<p>是否订阅: {text ? '已订阅' : '未订阅'}</p>
					{text ? <p>通知栏开关: {text.barSwitch ? '开' : '关'}</p> : null}
					{text ? <p>透传开关: {text.directSwitch ? '开' : '关'}</p> : null}
				</span>;
			}
			if (type === 'systemPushReview') {
				text = text ? <span>已推送<p>msgId：{text}</p> </span> : '推送失败';
			}
			//2017-2-8
			if (type === 'pushId2Tags') {
				let arr = [];
				for (var i = 0; i < text.tags.length; i++) {
					arr.push(<p key={text.tags[i].tagId}>{text.tags[i].tagName}</p>);
				}
				if (!text.tags.length) {
					arr = '无对应的标签';
				}
				text = <div>
					{arr}
				</div>;
			} else if (type === 'pushId2Alias') {
				text = text ? '别名：' + (text.alias ? text.alias : '无对应的别名') : '';
			} else if (type === 'alias2PushId') {
				let arr = [];
				for (let i = 0; i < text.length; i++) {
					arr.push(<p key={i}>{text[i]}</p>);
				}
				if (!text.length) {
					arr = '该别名无对应的PushId';
				}
				text = <div>
					{arr}
				</div>;
			} else if (type === 'getDetailByMsgId') {
				var arr = [];
				for (var j = 0; j < text.details.length; j++) {
					var d = text.details[j];
					arr.push(<p>{d.time}  {d.common}</p>);
				}
				text = <div>
					<div className="title">MsgId ：{text.msgId ? text.msgId + (text.pushType ? '（' + text.pushType + '）' : '') : '无数据'}</div>
					<div>{arr}</div>
				</div>;
			} else if (type === 'getDetailByPushId') {
				if (text.length > 0) {
					text = text.map(function (item, k) {
						var v = item;
						var p = [];
						var cn = 'info' + k + ' hide';
						for (var j = 0; j < v.details.length; j++) {
							var d = v.details[j];
							p.push(<p key={k + '' + j}>{d.time}  {d.common}</p>);
						}
						return (
							<div key={k}>
								<a className="title" href="javascript:void(0);" onClick={self.MsgIdcontrol.bind(self, k)}>MsgId ：{v.msgId} {v.pushType ? '（' + v.pushType + '）' : ''}</a>
								<div className={cn}>{p}</div>
							</div>
						);
					});
				} else {
					text = '无数据';
				}
				text = <div>
					{text}
				</div>;
			}
			this.setState({
				[type + 'Text']: text,
				[type + 'Display']: true
			});
		});
	},
	disabledDate(value) {
		return value.time > new Date().getTime();
	},
	MsgIdcontrol(i) {
		var dom = document.querySelectorAll('.info' + i)[0];
		dom.classList.toggle('hide');
	},
	render() {
		let input, result, btype;
		const userAuth = document.getElementById('userAuth') && document.getElementById('userAuth').innerHTML;//在main.js里设置值

		switch (this.state.chosedDropMenu + '') {
			case '1':
				input = <Input ref="sinput" id="deviceId2PushId" placeholder="请输入IMEI" />;
				result = <p style={{ display: this.state.deviceId2PushIdDisplay ? '' : 'none' }}>{this.state.deviceId2PushIdText}</p>;
				btype = 'deviceId2PushId';
				break;
			case '2':
				input = <Input ref="sinput" id="alias2PushId" placeholder="请输入别名" />;
				result = <div style={{ display: this.state.alias2PushIdDisplay ? '' : 'none' }}>{this.state.alias2PushIdText}</div>;
				btype = 'alias2PushId';
				break;
			case '3':
				input = <Input ref="sinput" id="pushId2Alias" placeholder="请输入PushId" />;
				result = <div className='break_word' style={{ display: this.state.pushId2AliasDisplay ? '' : 'none' }}>{this.state.pushId2AliasText}</div>;
				btype = 'pushId2Alias';
				break;
			case '4':
				input = <Input ref="sinput" id="pushId2Tags" placeholder="请输入PushId" />;
				result = <div style={{ display: this.state.pushId2TagsDisplay ? '' : 'none' }}>{this.state.pushId2TagsText}</div>;
				btype = 'pushId2Tags';
				break;
		}

		var search = (
			<Row className="list list_drop">
				<Col span='10'>
					<Col span="12">
						<Select defaultValue="IMEI查询PushId" size="large" onChange={this.handleMenuClick}>
							<Option value="1">IMEI查询PushId</Option>
							<Option value="2">别名查询PushId</Option>
							<Option value="3">PushId/IMEI 查询别名</Option>
							<Option value="4">PushId/IMEI 查询标签</Option>
						</Select>
					</Col>
					<Col span="12">
						{input}
					</Col>
					<Col span="24" className="mt5">
						{result}
					</Col>
				</Col>
				<Col span='3'><Button onClick={this.handleSubmit.bind(this, btype)} size="large" className="btn_normal_show ml10 w_80 ">查询</Button></Col>
			</Row>
		);
		return (
			<Row className="config_debug">
				<Col className="debug_sidebar" span="4">
					<ul>
						<li className="list">设备对应关系查询</li>
						<li className="list">设备是否在线查询</li>
						<li className="list list_sub">设备是否订阅查询</li>
						<li className="list">推送测试</li>
						{/*2017.2.8*/}
						{this.state.dwAuth || userAuth > 1 ?
							<li className="list">获取msgId明细记录</li> : null}
					</ul>
				</Col>
				<Col className="debug_content" span="20">
					{search}
					<Row className="list">
						<Col span='10'>
							<Input id="deviceOnlineStatus" placeholder="请输入PushId" />
							<p className="mt5" style={{ display: this.state.deviceOnlineStatusDisplay ? '' : 'none' }}>在线状态: {this.state.deviceOnlineStatusText}</p>
						</Col>
						<Col span='3'><Button onClick={this.handleSubmit.bind(this, 'deviceOnlineStatus')} size="large" className="btn_normal_show ml10 w_80 ">查询</Button></Col>
					</Row>
					<Row className="list list_sub">
						<Col span='10'>
							<Input id="deviceSubStatus" placeholder="请输入PushId" />
							<div className="mt5" style={{ display: this.state.deviceSubStatusDisplay ? '' : 'none' }}>
								{this.state.deviceSubStatusText}
							</div>
						</Col>
						<Col span='3'><Button onClick={this.handleSubmit.bind(this, 'deviceSubStatus')} size="large" className="btn_normal_show ml10 w_80 ">查询</Button></Col>
					</Row>
					<Row className="list">
						<Col span='10'>
							<Input id="systemPushReview" placeholder="请输入PushId" />
							<p className="mt5" style={{ display: this.state.systemPushReviewDisplay ? '' : 'none' }}>{this.state.systemPushReviewText}</p>
						</Col>
						<Col span='3'><Button onClick={this.handleSubmit.bind(this, 'systemPushReview')} size="large" className="btn_normal_show ml10 w_80 ">推送</Button></Col>
					</Row>
					{this.state.dwAuth || userAuth > 1 ?
						<Row className="list">
							<Row className="mb10">
								<RadioGroup onChange={this.onChangeType} value={this.state.chosedType}>
									<Radio value={1}>按任务查询</Radio>
									{userAuth > 1 ? <Radio value={2}>按日期查询</Radio> : null}
								</RadioGroup>
							</Row>
							<Row>
								<div className="msgid" style={this.state.chosedType == 1 ? { display: 'block' } : { display: 'none' }}>
									<Col span='13'>
										<Input id="getDetailByMsgId_pushId" className="mb10" placeholder="请输入PushId" />
										<Input id="getDetailByMsgId" placeholder="请输入MsgId/TaskId" />
										<div className="pushbox mt5" style={{ display: this.state.getDetailByMsgIdDisplay ? '' : 'none' }}>{this.state.getDetailByMsgIdText}</div>
									</Col>
									<Col span='3'><Button onClick={this.handleSubmit.bind(this, 'getDetailByMsgId')} size="large" className="btn_normal_show ml10 w_80 ">查询</Button></Col>
								</div>
								<div className="pushid" ref="rp" style={this.state.chosedType == 2 ? { display: 'block' } : { display: 'none' }}>
									<Col span='13'>
										<RangePicker
											defaultValue={[new Date(), new Date()]}
											style={{ width: '100%' }}
											onChange={this.onChangeDate}
											disabledDate={this.disabledDate} />
										<Input id="getDetailByPushId" className="mt10" placeholder="请输入PushId" />
										<div className="pushbox mt5" style={{ display: this.state.getDetailByPushIdDisplay ? '' : 'none' }}>{this.state.getDetailByPushIdText}</div>
									</Col>
									<Col span='3'><Button onClick={this.handleSubmit.bind(this, 'getDetailByPushId')} size="large" className="btn_normal_show ml10 w_80 ">查询</Button></Col>
								</div>
							</Row>
						</Row> : null
					}
				</Col>
			</Row>
		);
	}
});

module.exports = ConfigDebug;
