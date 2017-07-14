'use strict';
import React from 'react';
import { Button, List, Radio, ListView, RefreshControl, TabBar, Icon, NavBar, WhiteSpace } from 'antd-mobile';
const RadioItem = Radio.RadioItem;
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
		console.log(this.initData)
		return {
			subjectList: [],
			dataSource: dataSource.cloneWithRows(this.initData),
			refreshing: false,
		};
	},
	componentDidMount() {
		this.randomDo();

		// this.manuallyRefresh = true;
		// setTimeout(() => this.setState({ refreshing: true }), 10);
	},
	randomDo(callback) {
		let subject = utils.queryString('subject', window.location.href);
		let type = utils.queryString('type', window.location.href);
		let url = restapi.questionListRandom;

		let data = {
			subject: subject,
			type: parseInt(type)
		};
		console.log(data)
		ajax.post(url, data, (result) => {
			console.log(result);
			if (callback) {
				callback(result.value)
			} else {

				this.setState({
					question: result.value
				});
			}
		});

	},
	getRadio() {

	},
	getCheckbox() {

	},
	getContainer() { },
	onChange(value) {
		this.setState({
			value,
		});
	},
	back() {
		window.location.hash = '/home';
	},
	onRefresh() {
		console.log('onRefresh');
		this.randomDo((value) => {
			setTimeout(() => {
				this.setState({ refreshing: true });
				this.initData = [`ref${pageIndex++}`];//, ...this.initData
				console.log(this.initData)
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.initData),
					refreshing: false,
					question: value,
					value: null
				});

				let dom = document.querySelector('#showQuestion');
				dom.style.display = 'none';
			}, 1000);
		});

	},
	showQuestion() {
		let dom = document.querySelector('#showQuestion');
		let display = dom.style.display;
		dom.style.display = display === '' ? 'none' : '';
	},
	render() {
		let subject = utils.queryString('subject', window.location.href);
		let type = utils.queryString('type', window.location.href);
		let question = this.state.question;
		if (!question) return null;
		let content = question.content;
		let radioData = content.map((data, key) => {
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
			let num = 0;
			answers.map(function (data, key) {
				if (data === question.answer) {
					num = key;
				}
			});
			let color = num === value ? 'green' : 'red';
			return (
				<div key={rowID}
					style={{
						padding: '0.08rem 0.16rem',
						backgroundColor: 'white',
					}}
				>
					<div className="question_container">
						<List renderHeader={() => question.title}>
							{radioData.map((data, key) => (
								<RadioItem key={data.value} checked={value === data.value} onChange={() => this.onChange(data.value)}>
									{answers[key]}、{data.label}
								</RadioItem>
							))}
						</List>
						<WhiteSpace></WhiteSpace>
						<Button onClick={() => this.showQuestion()} className="btn ">查看答案</Button>
						<div style={{ display: 'none' }} id="showQuestion">
							<List renderHeader={() => '解析'}>
								<div style={{ padding: '.3rem', color: color }}>答案：{question.answer}</div>
							</List>
							<List>
								<div style={{ lineHeight: '1.5', padding: '.3rem' }}>{question.point}</div>
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