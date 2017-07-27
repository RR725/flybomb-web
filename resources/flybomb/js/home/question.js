'use strict';
import React from 'react';
import { Button, List, Radio, ListView, Checkbox, RefreshControl, TabBar, Icon, NavBar, WhiteSpace } from 'antd-mobile';
const RadioItem = Radio.RadioItem;

const CheckboxItem = Checkbox.CheckboxItem;
import { createForm } from 'rc-form';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax/index-mobile';

import questionType from '../question-type';




let pageIndex = 0;

const Question = React.createClass({
	//{this.props.params.id}	
	getInitialState() {
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});

		this.initData = [];
		for (let i = 0; i < 1; i++) {
			this.initData.push(`r${i}`);
		}
		return {
			checkboxValue: [],
			recommendData: [],
			subjectList: [],
			dataSource: dataSource.cloneWithRows(this.initData),
			refreshing: false,
		};
	},
	componentWillReceiveProps() {
		let type = utils.queryString('type', window.location.href);
		if (type !== this.state.type && !this.state.status) {//用在点了相关推荐，且type值有变化，返回上一个页面
			this.randomDo();
		}

	},

	componentDidMount() {
		let type = utils.queryString('type', window.location.href);
		this.setState({
			type: type
		});
		this.randomDo();

	},
	recommendQuestion() {

		let questionId = utils.queryString('questionId', window.location.href);
		ajax.post(restapi.questionFindOne, (result) => {
			this.setState({
				question: result.value
			});
		});
	},
	randomDo(callback) {
		let subject = utils.queryString('subject', window.location.href);
		subject = decodeURIComponent(subject);
		let type = utils.queryString('type', window.location.href);
		let questionId = utils.queryString('questionId', window.location.href);
		let url = restapi.questionListRandom;
		let data = {
			subject: subject,
			type: parseInt(type)
		};
		if (callback && typeof callback === 'object') {
			this.setState({
				status: true
			});
			let pathname = window.location.pathname;
			let hash = '/home/question';
			hash = utils.makeUrl(hash, {
				subject: callback.subject,
				type: callback.type,
				// questionId: callback.questionId
			});
			window.location.hash = hash;
			url = restapi.questionFindOne;
			data = {
				questionId: callback.questionId
			};

			let dom = document.querySelector('#showQuestion');
			dom.style.display = 'none';
			document.body.scrollTop = 0;
		}

		let self = this;
		function* getData() {
			let rdmData = yield ajax.post(url, data, (result) => {
				let value = result.value;
				let data = {
					question: value
				};
				if (type === '2') {
					for (let i = 0; i < 5; i++) {
						data['checked' + i] = false;
					}
					data.checkboxValue = [];
				}
				if (callback && typeof callback === 'function') {
					callback(value, data)
				} else {
					self.initData = [`ref${pageIndex++}`];//用于刷新，避免rowHasChanged的值不改变
					data.dataSource = self.state.dataSource.cloneWithRows(self.initData);
					data.value = null;
					data.status = false;
					self.setState(data);
				}
				gd.next(value);
			});
			ajax.post(restapi.questionRecommend, {
				tags: rdmData.tags || [],
				questionId: rdmData.questionId
			}, (result) => {
				self.setState({
					recommendData: result.value
				});
			})
		}

		let gd = getData();
		gd.next();


	},
	getRadio() {

	},
	getCheckbox() {

	},
	getContainer() { },
	onChange(value) {

		let type = utils.queryString('type', window.location.href);
		let data = value;
		let json = {
			value: value
		};
		if (type === '2') {
			let checkboxValue = this.state.checkboxValue;
			let filterValue = checkboxValue.filter(function (data, key) {
				return data !== value;
			});
			if (filterValue.length === checkboxValue.length) {
				checkboxValue.push(value);
			} else {
				checkboxValue = filterValue;
			}
			let answers = ['A', 'B', 'C', 'D', 'E'];
			let checkboxData = [];
			checkboxValue.map(function (data, key) {
				checkboxData.push(answers[data])
			});
			checkboxData.sort();
			data = checkboxData.join(',');
			json.value = data;
			json['checked' + value] = !this.state['checked' + value];
			json.checkboxValue = checkboxValue;
		}
		this.setState(json);
	},
	back() {
		window.location.hash = '/home';
	},
	onRefresh() {
		this.randomDo((value, data) => {
			setTimeout(() => {
				this.setState({ refreshing: true });
				this.initData = [`ref${pageIndex++}`];//, ...this.initData
				let opt = {
					dataSource: this.state.dataSource.cloneWithRows(this.initData),
					refreshing: false,
					// question: value,
					value: null
				};
				Object.assign(opt, data);
				this.setState(opt);

				let dom = document.querySelector('#showQuestion');
				if (dom) {
					dom.style.display = 'none';
				}
			}, 1000);
		});

	},
	showQuestion() {
		let dom = document.querySelector('#showQuestion');
		let display = dom.style.display;
		dom.style.display = display === '' ? 'none' : '';
	},
	render() {
		let self = this;
		let subject = utils.queryString('subject', window.location.href);
		subject = decodeURIComponent(subject);
		let type = utils.queryString('type', window.location.href);
		let question = this.state.question;
		let recommendData = this.state.recommendData;
		if (!question) return null;
		let content = question.content || [];
		let contentData = content.map((data, key) => {
			return {
				value: key,
				label: data
			}
		});
		let value = this.state.value;
		let data = [question];
		let index = data.length - 1;
		const separator = (sectionID, rowID) => (
			<div
				key={`${sectionID}-${rowID}`}
				style={{
					backgroundColor: '#F5F5F9',
					height: 8,
					borderTop: '1px solid #ECECED',
					borderBottom: '1px solid #ECECED',
				}}
			/>
		);


		const row = (rowData, sectionID, rowID) => {
			let answers = ['A', 'B', 'C', 'D'];
			let answerHtml = <List renderHeader={() => question.title}>
				{contentData.map((data, key) => (
					<RadioItem key={data.value} checked={value === data.value} onChange={() => this.onChange(data.value)}>
						{answers[key]}、{data.label}
					</RadioItem>
				))}
			</List>;
			let num = 0;
			answers.map(function (data, key) {
				if (data === question.answer) {
					num = key;
				}
			});
			let color = num === value ? 'green' : 'red';
			if (type === '2') {
				answers.push('E');
				answerHtml = <List renderHeader={() => question.title}>
					{contentData.map((data, key) => (
						<CheckboxItem key={data.value} checked={this.state['checked' + data.value]} onChange={() => this.onChange(data.value)}>
							{answers[key]}、{data.label}
						</CheckboxItem>
					))}
				</List>
				color = question.answer === value ? 'green' : 'red';
			}
			if (type > 2) {
				answerHtml = <List renderHeader={() => question.title}>

				</List>;
				color = '#000';
			}
			return (
				<div key={rowID}
					style={{
						padding: '0.08rem 0.16rem',
						backgroundColor: 'white',
					}}
				>
					<div className="question_container">
						{answerHtml}
						<WhiteSpace></WhiteSpace>
						<Button onClick={() => this.showQuestion()} className="btn ">查看答案</Button>
						<div style={{ display: 'none' }} id="showQuestion">
							<List renderHeader={() => '解析'}>
								<div
									style={{
										padding: '.3rem',
										wordBreak: 'break-all',
										lineHeight: '1.5',
										color: color
									}}>答案：{question.answer}</div>
							</List>
							{question.point &&
								<List>
									<div style={{ lineHeight: '1.5', padding: '.3rem' }}>{question.point}</div>
								</List>
							}
						</div>
						<div>
							<List renderHeader={() => '相关推荐'}>
								{recommendData.length ? recommendData.map(function (data, key) {

									return <div
										key={key}
										onClick={() => self.randomDo(data)}
										style={{
											padding: '.3rem',
											wordBreak: 'break-all',
											borderBottom: '1px solid #ddd',
											lineHeight: '1.5'
										}}>{data.title}</div>
								})
									: <div style={{ lineHeight: '1.5', padding: '.3rem' }}>无</div>
								}

							</List>
						</div>
					</div>
				</div>
			);
		};




		return (
			<div style={{ padding: "0 0.16rem" }}>

				<ListView
					dataSource={this.state.dataSource}
					renderRow={row}
					// renderSeparator={separator}
					initialListSize={5}
					pageSize={5}
					scrollRenderAheadDistance={200}
					scrollEventThrottle={20}
					style={{
						height: document.documentElement.clientHeight,
						margin: '0.1rem 0',

					}}
					scrollerOptions={{ scrollbars: true }}
					refreshControl={<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this.onRefresh}
					/>}
				/>




				<TabBar
					unselectedTintColor="#949494"
					tintColor="#33A3F4"
					barTintColor="white"
					hidden={this.state.hidden}
				>
					<TabBar.Item
						title="首页"
						key="首页"
						icon={<Icon type={require('../../svg/home.svg')} />}
						onPress={() => {
							this.back();
						}}
						data-seed="logId"
					>

					</TabBar.Item>
				</TabBar>
			</div>
		);
	}
});

module.exports = Question;