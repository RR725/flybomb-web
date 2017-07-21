'use strict';
import React from 'react';

import { Form,  Radio, Checkbox } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';
const Distinct = React.createClass({
	getInitialState() {
		return {
			listData: [],
			distinctId: {}
		};
	},
	changeRadio(e) {

		var value = e.target.value;
		if (value === 1) {
			this.listEffectivePushTask();
		}else{
			this.setState({
				distinctId:{}
			});
		}
		this.props.changeRadio(e);
	},
	changeCheckbox(evt) {
		const distinctId = this.state.distinctId;
		const listData = this.state.listData;
		const checked = evt.target.checked;
		const id = evt.target.name;

		distinctId[id] = checked ? true : false;
		this.setState({
			distinctId: distinctId
		});

		let newDistinctId = [];
		let newDistinctTitle = [];
		for (let i in distinctId) {
			if (distinctId[i]) {
				newDistinctId.push(i);
				for (let j in listData) {
					if (i == listData[j].id) {
						newDistinctTitle.push(i + '  ' + listData[j].title);
					}
				}
			}
		}
		this.setState({
			displayDistinct: newDistinctId.length > 0 ? 'none' : ''
		});
		this.props.changeCheckbox(newDistinctId, newDistinctTitle);

	},
	componentWillReceiveProps() {//切换了应用之后要重新拉取数据
		const deal = utils.queryString('deal', window.location.href);
		let appId = utils.queryString('appId', window.location.href);
		if (this.props.appId && appId !== this.props.appId || (deal && this.props.distinct === 1 && appId !== this.props.appId)) {//切换了应用之后要重新拉取数据 and 从设置用户群页面返回

			this.listEffectivePushTask();
		}
	},
	componentDidMount() {
		let self = this;

		const copyTaskId = this.props.copyTaskId;
		let newDistinctTitle = '';
		if (copyTaskId) {
			this.listEffectivePushTask(copyTaskId, function (value) {
				let json = {};
				let distinctId = [];
				for (let i = 0; i < value.length; i++) {
					if (value[i].choose) {
						let id = value[i].id;
						json['distinctId' + id] = id;
						json.displayDistinct = 'none';
						distinctId.push(id);
					}
				}
				self.props.form.setFieldsValue(json);
				self.props.changeCheckbox(distinctId, newDistinctTitle);
			});
		}
	},
	listEffectivePushTask(copyTaskId, callback) {
		let appId = utils.queryString('appId', window.location.href);
		const self = this;
		let url = restapi.listEffectivePushTask;
		let data = {
			appId: appId,
			pushType: this.props.pushType === 'notice' ? 0 : 1
		};
		if (copyTaskId) {
			data.copyTaskId = copyTaskId;
		}
		url = utils.makeUrl(url, data);

		ajax.get(url, function (result) {
			let value = result.value;
			let chooseTrue = [];
			let chooseFalse = [];
			value.map(function (data) {
				if (data.choose) {
					chooseTrue.push(data);
				} else {
					chooseFalse.push(data);
				}
			});
			let data = chooseTrue.concat(chooseFalse);


			self.setState({
				listData: data,
				loaded: true
			});
			callback && callback(value);
		});
	},
	render() {
		const self = this;
		const listData = this.state.listData;
		//  || this.props.form.getFieldValue('appId')
		let list = listData.map(function (data, key) {
			let checkedId = self.props.form.getFieldValue('distinctId' + data.id);
			return <FormItem className="mg0" key={key}>
				<label>
					<Checkbox name={String(data.id)} title={data.title} checked={checkedId ? true : false} {...self.props.getFieldProps('distinctId' + data.id, {

						onChange: self.changeCheckbox
					}) } />
					{data.id}<span title={data.title} className="distinct_title pl10">{data.title}</span>
				</label>
			</FormItem>;
		});
		if (listData.length === 0 && this.state.loaded) {
			list = <span className="color_error">无去重列表 </span>;
		}
		return (
			<FormItem {...this.props.formItemLayout} label="消息去重&nbsp;&nbsp;&nbsp;&nbsp;">
				<RadioGroup  {...this.props.getFieldProps('distinct', {
					initialValue: this.props.distinct,
					onChange: this.changeRadio
				}) }>
					<Radio name="distinct" value={0}>无</Radio>
					<Radio name="distinct" value={1}>去重</Radio>
				</RadioGroup>
				{(this.props.distinct === 1) ?
					<div className="user_type user_type_distinct" >
						{list}
						<span className="color_error" style={{ display: this.state.displayDistinct || this.props.displayDistinct }}>请选择去重任务</span>
					</div>

					: null}
			</FormItem>

		);
	}
});

module.exports = Distinct;