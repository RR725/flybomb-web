'use strict';
import React from 'react';
import { Button, List, Radio, ListView, Checkbox, Flex, TabBar, Icon, NavBar, WhiteSpace } from 'antd-mobile';
const RadioItem = Radio.RadioItem;

const CheckboxItem = Checkbox.CheckboxItem;
import { createForm } from 'rc-form';
import restapi from '../../lib/url-model';
import utils from '../../lib/utils';
import ajax from '../../components/ajax/index-mobile';

import questionType from '../question-type';

let db;


let pageIndex = 0;

const Question = React.createClass({
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
			browserError:'none',
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
		// setTimeout(() => this.refs.lv.scrollTo(0, 0), 800); 
	},
	recommendQuestion() {

		let questionId = utils.queryString('questionId', window.location.href);
		ajax.post(restapi.questionFindOne, (result) => {
			this.setState({
				question: result.value
			});
		});
	},
	getErrQuestion(event){
		const self=this;
		var dbName = 'SHUASHUADB', version = 1, db;
		var request = window.indexedDB && window.indexedDB.open(dbName, version);
		let table='flyblom';
		db = event.target.result;
	    // console.log(event.target === request); // true
	    db.onsuccess = function(event) {
	        console.log('数据库操作成功!');

	    };
	    db.onerror = function(event) {
	        console.error('数据库操作发生错误！', event.target.errorCode);
	    };
	    console.log('打开数据库成功!');
	    var transaction = db.transaction([table], 'readwrite');
		transaction.oncomplete = function(event) {
		    console.log('事务完成！');

		};
		transaction.onerror = function(event) {
		    console.log('事务失败！', event.target.errorCode);
		};
		transaction.onabort = function(event) {
		    console.log('事务回滚！');
		};
		var list = [];
		var objectStore = transaction.objectStore(table);
		objectStore.openCursor().onsuccess = function(event) {
		    var cursor = event.target.result;
		    if (cursor) {
		        list.push(cursor.value);
		        cursor.continue();
		    } else {

				let subject = utils.queryString('subject', window.location.href);
				let type = utils.queryString('type', window.location.href);
				let errorList=[];
				list.map(function(data){
					if(data.subjectId==subject && data.type==type ){
						errorList.push(data);
					}
				});
				let len=errorList.length;
				let json={
					question:{}
				}
				if(len){
					let rdm = Math.floor(Math.random()*len);
					json = {
			        	question: errorList[rdm],
			        	browserError: window.indexedDB?'none':'',
						errorTotal: len
			        }
				}

				self.initData = [`ref${pageIndex++}`];//用于刷新，避免rowHasChanged的值不改变
				json.dataSource = self.state.dataSource.cloneWithRows(self.initData);

				self.setState(json);
		        
		    }
		};


	},
	randomDo(callback) {
		const self=this;
		let subject = utils.queryString('subject', window.location.href);
		let err = utils.queryString('err', window.location.href);
		if(err==='true'){
			this.openDB(function(event){
				self.getErrQuestion(event);
			});
			return;
		}
		subject = decodeURIComponent(subject);
		let type = utils.queryString('type', window.location.href);
		let questionId = utils.queryString('questionId', window.location.href);
		let url = restapi.questionListRandom;
		let data = {
			subject: Number(subject),
			type: parseInt(type)
		};
		if (callback && typeof callback === 'object') {
			this.setState({
				status: true,
				disabled: false
			});
			console.log(callback)
			let pathname = window.location.pathname;
			let hash = '/home/question';
			hash = utils.makeUrl(hash, {
				subject: callback.subjectId,
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
			document.documentElement.scrollTop=0;
			// document.body.scrollTop = 0;
		}

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
				subject:rdmData.subject,
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
	openDB(callback){
		if(!window.indexedDB) return;
		let self=this;
		var dbName = 'SHUASHUADB', version = 1;
		var request = window.indexedDB && window.indexedDB.open(dbName, version);
		let table='flyblom';
		request.onerror = function(event) {
		    console.error('创建数据库出错');
		    console.error('error code:', event.target.errorCode);
		};
		request.onupgradeneeded = function(event) { // 更新对象存储空间和索引 .... 
		    var database = event.target.result;
		    var objectStore = database.createObjectStore(table, { keyPath: "questionId" });
		    objectStore.createIndex('subjectId', 'subjectId', { unique: false });
		};
		request.onsuccess = function(event) {
		   
		   callback(event);
		};

	},
	setErrQuestion(event,option,type){
		let table='flyblom';
		db = event.target.result;
	    // console.log(event.target === request); // true
	    db.onsuccess = function(event) {
	        console.log('数据库操作成功!');

	    };
	    db.onerror = function(event) {
	        console.error('数据库操作发生错误！', event.target.errorCode);
	    };
	    console.log('打开数据库成功!');
	    var transaction = db.transaction([table], 'readwrite');
		transaction.oncomplete = function(event) {
		    console.log('事务完成！');

		};
		transaction.onerror = function(event) {
		    console.log('事务失败！', event.target.errorCode);
		};
		transaction.onabort = function(event) {
		    console.log('事务回滚！');
		};
		var objectStore = transaction.objectStore(table);  // 指定对象存储空间
		if(type==='add'){
			 var request = objectStore.add(option);
		    request.onsuccess = function(event) {
		        console.log(event.target.result, option.questionId); // add()方法调用成功后result是被添加的值的键(id)
		    };
		}else{
			if(!option) return;
			var request =  transaction
				.objectStore(table)
				.delete(option.questionId);  // 通过键questionId来删除
			request.onsuccess = function(event) {
			    console.log('删除成功！');
			    console.log(event.target.result);
			};
		}
	},
	onChange(value) {
		let answers = ['A', 'B', 'C', 'D'];
		let question = this.state.question;
		const self=this;
		let answer = answers[value];
		let type = utils.queryString('type', window.location.href);
		let data = value;
		let json = {
			value: value
		};
		console.log(question.answer);
		let status=question.answer===answer;
		
		
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
			status=question.answer===data;
		}
		console.log(data);
		if(status){
			this.openDB(function(event){
				self.setErrQuestion(event,question,'delete');
			});
		}else{
			this.openDB(function(event){
				self.setErrQuestion(event,question,'add');
			});
		}
		this.setState(json);
	},
	back() {
		window.location.hash = '/home';
	},
	// onRefresh() {
	// 	this.randomDo((value, data) => {
	// 		setTimeout(() => {
	// 			this.setState({ refreshing: true });
	// 			this.initData = [`ref${pageIndex++}`];//, ...this.initData
	// 			let opt = {
	// 				dataSource: this.state.dataSource.cloneWithRows(this.initData),
	// 				refreshing: false,
	// 				// question: value,
	// 				value: null
	// 			};
	// 			Object.assign(opt, data);
	// 			this.setState(opt);

	// 			let dom = document.querySelector('#showQuestion');
	// 			if (dom) {
	// 				dom.style.display = 'none';
	// 			}
	// 		}, 1000);
	// 	});

	// },
	showQuestion(type) {
		let dom = document.querySelector('#showQuestion');
		let display = dom.style.display;
		dom.style.display = type === 'show'?'none': display === '' ? 'none' : '';
		this.setState({
			disabled:true
		});
	},
	nextQuestion(){
		this.showQuestion('show');
		this.randomDo();
		let json={
			value:null,
			checkboxValue:[],
			disabled:false
		};
		let state = this.state;
		for(let i in state){
			if(i.indexOf('checked')>-1){
				json[i]=false;
			}
		}
		this.setState(json);
	},
	render() {
		let self = this;
		let subject = utils.queryString('subject', window.location.href);
		let err = utils.queryString('err', window.location.href);
		subject = decodeURIComponent(subject);
		let type = utils.queryString('type', window.location.href);
		let question = this.state.question;
		let recommendData = this.state.recommendData;
		if (!question) return null;
		if (!question.title) return <div style={{marginTop:30}} className="ta_c">无数据！<p style={{display:this.state.browserError,fontSize:12,color:'#f60'}}>想查看错题集请使用Chrome浏览器进行访问，谢谢～</p></div>;
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
		const errorTotal=this.state.errorTotal;
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
					<RadioItem disabled={this.state.disabled} key={data.value} checked={value === data.value} onChange={() => this.onChange(data.value)}>
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
						<CheckboxItem disabled={this.state.disabled} key={data.value} checked={this.state['checked' + data.value]} onChange={() => this.onChange(data.value)}>
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
						<Flex>
							<Flex.Item><Button onClick={() => this.showQuestion()} className="btn ">查看答案</Button></Flex.Item>
							<Flex.Item><Button disabled={errorTotal === 1 ? true : false} onClick={() => this.nextQuestion()} className="btn ">下一个</Button></Flex.Item>
					    </Flex>
						
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
						{errorTotal?
							<div style={{marginTop:20}}>
								{errorTotal===1?
									<span>恭喜你！已经是最后一个错题了～</span>
									:<span>还有错题<span style={{color:'red'}}> {errorTotal} </span>个，加油～</span>
								}
							</div>
							:
							err!=='true' &&
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
							}
						</div>
					</div>
				</div>
			);
		};




		return (
			<div style={{ padding: "0 0.16rem" }}>

				<ListView
					ref="lv"
					dataSource={this.state.dataSource}
					renderRow={row}
					// renderSeparator={separator}
					initialListSize={5}
					pageSize={5}
					// scrollRenderAheadDistance={200}
					// scrollEventThrottle={20}
					// useBodyScroll={true}
					style={{
						height: document.documentElement.clientHeight,
						margin: '0.1rem 0',

					}}
					// scrollerOptions={{ scrollbars: true }}
					// refreshControl={<RefreshControl
					// 	refreshing={this.state.refreshing}
					// 	onRefresh={this.onRefresh}
					// />}
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