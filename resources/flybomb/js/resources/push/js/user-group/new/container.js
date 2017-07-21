import React from 'react';
import { message, Form, Button, Icon, Input, Select, Checkbox } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import update from 'react/lib/update';
import Card from './card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import utils from '../../../lib/utils';
import restapi from '../../../lib/url-model';
import ajax from '../../../components/ajax';




let Container = React.createClass({
	getInitialState() {
		return {
			displayDropdown: false,
			checkedList: [[]],
			condition: true,//括号是否匹配
			defaultTreeList: [],
			listDimByTagIdAndName: [],
			cards: []
		};
	},


	moveCard(dragIndex, hoverIndex) {//拖拽
		const { cards } = this.state;
		if (cards.length === 0) return;
		const dragCard = cards[dragIndex];
		let state = update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			}
		});
		let newcards = state.cards;
		let len = newcards.length;
		let st = {};
		let ed = {};
		newcards.map(function (data, key) {//rdm用于识别同一对圆括号
			if (data.fname === '(') {
				st[data.rdm] = key;
			} else if (data.fname === ')') {
				ed[data.rdm] = key;
				if (key > 0) {
					newcards[key - 1].andor = false;
					newcards[key - 1].andorenable = true;//右括号前面一个不需要and or选择
				}
			}
		});
		let arrSt = [];
		let arrEd = [];
		for (let i in st) {
			if (st[i] || st[i] === 0) {
				arrSt.push(st[i]);
			}

		}
		for (let i in ed) {
			if (ed[i] || ed[i] === 0) {
				arrEd.push(ed[i]);
			}

		}
		arrSt.sort(function (a, b) {
			return a - b;
		});
		arrEd.sort(function (a, b) {
			return a - b;
		});
		//算最大值和最小值，用于判断括号是否匹配
		let minSt = Math.min.apply(null, arrSt);
		let maxSt = Math.max.apply(null, arrSt);
		let minEd = Math.min.apply(null, arrEd);
		let maxEd = Math.max.apply(null, arrEd);
		newcards = newcards.map(function (data, key) {

			let andor = true;

			let className = '';
			for (let i = 0; i < arrSt.length; i++) {
				if (key > arrSt[i] && key < arrEd[i]) {//括号里面的加上classname，设置背景色做区分
					className = 'symbol_content';
				}
			}
			if (data.fname === '(') {
				andor = false;
				className += ' symbol_left andor_hide';
			}
			if (data.fname === ')') {
				className += ' symbol_right';
				if (key === len - 1) {
					andor = false;
					className += ' symbol_right andor_hide';
				}
			}
			if (key === len - 1) {
				andor = false;
			}
			return {
				fid: data.fid,
				fname: data.fname,
				rdm: data.rdm,
				fpermission: data.fpermission,
				foperands: data.foperands,
				andorText: data.andorText || 'and',
				andor: data.andorenable ? false : andor,
				className: data.andorenable ? className + ' andor_hide' : className
			};

		});
		if (arrSt.length > 0 && arrEd.length > 0) {
			if (minSt > maxEd || maxSt > maxEd || minEd < minSt) {
				message.error('括号不匹配');
				this.setState({
					condition: false
				});
				return;
			}
		}
		if ((arrSt.length + arrEd.length) % 2 === 1 || arrSt.length !== arrEd.length) {
			message.error('括号不匹配');
			this.setState({
				condition: false
			});
			return;
		}
		// for (let i in st) {
		// 	if (st[i] > ed[i]) {
		// 		message.error('括号不匹配');
		// 		return;
		// 	}
		// }

		if (!cards.length) {
			state.condition = false;
		} else {

			state.condition = true;
		}
		state.cards = newcards;
		this.setState(state);
	},
	showSymbol() {//插入括号
		const self = this;
		let { cards } = this.state;
		const len = cards.length;
		const rdm = Math.ceil(Math.random() * 100000);
		if (len > 2) {
			cards[len - 3].andor = true;
		}

		let arrs = [{
			fid: rdm,
			fname: '(',
			andor: false,
			andorText: 'and',
			foperator: '(',
			rdm: rdm,
			className: 'symbol_left andor_hide'
		},
		{
			fid: rdm + 1,
			fname: ')',
			andor: false,
			andorText: 'and',
			foperator: ')',
			rdm: rdm,
			className: 'symbol_right andor_hide'
		}];
		cards = cards.concat(arrs);
		this.setState({
			cards: cards
		});
		setTimeout(function () {
			self.moveCard(0, 0);
		}, 0);
	},
	deleteItem(fid, fname) {//删除某一个条件
		const self = this;
		let cards = this.state.cards;
		fid = Number(fid);
		let json = {};
		for (let i = 0; i < cards.length; i++) {

			if (fid === cards[i].fid) {
				if (fname === '(' || fname === ')') {

					if (fname === ')' && cards.length > 1) {//右括号前面不需要再跟且、或
						cards[i - 1].andor = true;
					}
					cards.splice(i, 1);
					break;
				}
				for (let o = 0; o < cards[i].foperands.length; o++) {
					json['checkbox' + fid + '-' + cards[i].foperands[o].fid] = false;//复选框去掉勾选状态

				}
				cards.splice(i, 1);//从数组里删除
				this.setState({
					['freversed' + fid]: false
				});
			}
		}
		json['defaultTreeList' + fid] = [];//从下拉列表里选的多选
		let cardsLen = cards.length;
		let symbolArr = 0;
		for (let i = 0; i < cardsLen; i++) {
			if (i === cardsLen - 1) {//最后一个后面不需要再跟且、或
				cards[i].andor = false;
			}

			if (cards[i].fname === ')' || cards[i].fname === '(') {
				symbolArr += 1;//判断括号是否成对出现
			}
		}
		if (symbolArr % 2 === 1) {//奇数的话表示括号不是成对匹配
			// message.error('括号不匹配');
			for (let i = 0; i < cardsLen; i++) {
				if (cards[i].className.indexOf('symbol_content') > -1) {
					cards[i].className = cards[i].className.replace('symbol_content', '');//二个括号之前的内容不再加背景色
				}
			}
		}
		json.cards = cards;
		this.setState(json);
		setTimeout(function () {
			self.moveCard(0, 0);
		}, 0);
	},
	setFreversed(fid) {//反选
		this.setState({
			['freversed' + fid]: !this.state['freversed' + fid]
		});
	},
	getSubmitCards() {//按接口字段的格式重组JSON
		let cards = this.state.cards;
		let newcards = [];
		for (let i = 0; i < cards.length; i++) {
			let cardsI = cards[i];



			if (cardsI.fname === '(' || cardsI.fname === ')') {
				newcards.push({
					foperator: cardsI.fname,
					freversed: false
				});
				if (cardsI.andor) {
					newcards.push({
						foperator: cardsI.andorText,
						freversed: false
					});
				}
			} else {
				let dataIn = [{
					foperator: 'in',
					fid: cardsI.fid,
					fname: cardsI.fname,
					freversed: this.state['freversed' + cardsI.fid] ? true : false,
					foperands: cardsI.foperands
				}];
				if (cardsI.foperands && cardsI.foperands[0].fidType === 1) {//我的人群标签
					dataIn[0].foperator = '';
					dataIn[0].fidType = 1;
					dataIn[0].foperands = [];
					dataIn[0].fname = cardsI.foperands[0].fname;
				}
				if (i !== cards.length - 1 && cardsI.andorText) {
					dataIn.push({
						foperator: cardsI.andorText,
						freversed: false
					});
				}
				newcards = newcards.concat(dataIn);
			}
		}

		for (let i = 0; i < newcards.length; i++) {
			if (newcards[i].foperator === ')' && (newcards[i - 1].foperator === 'and' || newcards[i - 1].foperator === 'or')) {
				newcards.splice(i - 1, 1);
			}
		}
		for (let i = 0; i < newcards.length; i++) {
			if (newcards[i].foperator === '(' && (newcards[i + 1].foperator === 'and' || newcards[i + 1].foperator === 'or')) {
				newcards.splice(i + 1, 1);
			}
			if (newcards[i].foperator === '(' && newcards[i + 1].foperator === ')') {//空括号要排除掉
				newcards.splice(i + 1, 1);
				newcards.splice(i, 1);
			}
		}
		if (newcards[0] && (newcards[0].foperator === 'and' || newcards[0].foperator === 'or')) {//第一个是and or
			newcards.splice(0, 1);
		}
		if (newcards[newcards.length - 1] && (newcards[newcards.length - 1].foperator === 'and' || newcards[newcards.length - 1].foperator === 'or')) {//最后一个是and or
			newcards.splice(newcards.length - 1, 1);
		}
		return newcards;
	},
	handleSubmit() {
		let self = this;
		if (!this.fpermission) {
			message.error('有标签已无权限');
			return;
		}
		let newcards = this.getSubmitCards();
		let url = restapi.saveOrUpdateUserGroup;
		const id = utils.queryString('id', window.location.href);
		const currentId = utils.queryString('currentId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		const timingPushType = utils.queryString('timingPushType', window.location.href);
		const pushType = utils.queryString('pushType', window.location.href);
		let json = {
			appId: appId
		};
		if (id) {
			json.id = id;
		}
		url = utils.makeUrl(url, json);
		this.props.form.validateFields((errors, values) => {
			if (errors) {
				console.log(errors);
				console.log('Errors in form!!!');
				return;
			}
			self.setState({
				submiting: true
			});
			if (self.state.submiting) return;
			let data = {
				name: values.title,
				condition: JSON.stringify(newcards)
			};
			if (!newcards.length) {
				message.error('未选择任何条件');
				self.setState({
					submiting: false
				});
				return;
			}
			ajax.post(url, data, function () {
				self.setState({
					submiting: false
				});
				let path = pushType === 'personal' ? 'personal' : 'create';

				let pathname = window.location.pathname + '#/' + path + '/push';

				let opt = {
					pushType: pushType,
					deal: 'query',
					appId: appId,
					id: currentId ? currentId : id
				};
				if (timingPushType) {
					opt.timingPushType = timingPushType;
				}
				let url = utils.makeUrl(pathname, opt);
				window.location.href = url;
				// window.location.pathname + '#/' + path + '/push?pushType=' + pushType + '&deal=query&appId=' + appId + '&id=' + (currentId ? currentId : id);
			}, function () {
				self.setState({
					submiting: false
				});
			});
		});
	},
	back() {//返回上一个页面
		const timingPushType = utils.queryString('timingPushType', window.location.href);
		const id = utils.queryString('id', window.location.href);
		const currentId = utils.queryString('currentId', window.location.href);
		const appId = utils.queryString('appId', window.location.href);
		const pushType = utils.queryString('pushType', window.location.href);
		let path = pushType === 'personal' ? 'personal' : 'create';
		let pathname = window.location.pathname + '#/' + path + '/push';
		let opt = {
			pushType: pushType,
			deal: 'query',
			appId: appId,
			id: currentId ? currentId : id
		};
		if (timingPushType) {
			opt.timingPushType = timingPushType;
		}
		let url = utils.makeUrl(pathname, opt);
		window.location.href = url;
		// pathname +'?pushType=' + pushType + '&deal=query&appId=' + appId + '&id=' + (currentId ? currentId : id);
	},
	searchUserCount() {//查询用户群人数
		const self = this;

		if (!this.fpermission) {
			message.error('有标签已无权限');
			return;
		}
		let url = restapi.getUserCountByExpression;
		let newcards = this.getSubmitCards();
		const appId = utils.queryString('appId', window.location.href);
		url = utils.makeUrl(url, {
			appId: appId
		});
		let data = {
			condition: JSON.stringify(newcards)
		};
		if (self.state.searching) return;
		self.setState({
			userCount: '查询中...',
			searching: true
		});
		ajax.post(url, data, function (result) {
			self.setState({
				userCount: result.value + '人',
				searching: false
			});
		}, function () {
			self.setState({
				userCount: '',
				searching: false
			});
		});
	},
	componentDidMount() {
		const self = this;
		const id = utils.queryString('id', window.location.href);

		let url = restapi.getUserGroup;
		url = utils.makeUrl(url, {
			id: id
		});
		if (!id) {
			const appId = utils.queryString('appId', window.location.href);
			url = restapi.initUserGroup;
			url = utils.makeUrl(url, {
				appId: appId
			});
		}
		ajax.get(url, function (result) {
			let cards = result.value.conditions;
			if (!id) {
				cards = result.value.preConditions;
			}
			let json = {
				cards: cards
			};
			let st = [];
			let ed = [];
			for (let i = 0; i < cards.length; i++) {
				if (cards[i].foperator === 'and' || cards[i].foperator === 'or') {
					cards[i - 1].andor = true;
					cards[i - 1].andorText = cards[i].foperator;
					cards.splice(i, 1);
				}
				const rdm = Math.ceil(Math.random() * 100000);
				if (cards[i].foperator === '(' || cards[i].foperator === ')') {
					cards[i].andor = false;
					cards[i].andorText = 'and';
					cards[i].fname = cards[i].foperator;
					cards[i].fid = rdm;
					if (cards[i].foperator === '(') {
						st.push(i);

						cards[i].className = 'symbol_left andor_hide';
					} else {
						ed.push(i);
						cards[i].className = 'symbol_right andor_hide';
					}

				}
				let defaultTreeList = [];

				let foperands = cards[i].foperands;
				// if(!foperands){
				// 	foperands=[];
				// }
				if (foperands) {//我的人群标签
					if (!foperands.length) {
						foperands.push({
							fcounter: 0,
							fid: cards[i].fid,
							fidType: cards[i].fidType,
							fname: cards[i].fname
						});
						cards[i].fname = '我的人群标签';
						cards[i].foperands = foperands;
					}
					for (let o = 0; o < foperands.length; o++) {
						json['checkbox' + cards[i].fid + '-' + foperands[o].fid] = true;//普通的多选
						defaultTreeList.push(foperands[o].fname);
						if (!json['defaultTreeList' + cards[i].fid]) json['defaultTreeList' + cards[i].fid] = defaultTreeList;//从下拉列表里选的多选
					}
				}
				json['freversed' + cards[i].fid] = cards[i].freversed;//是否反选
				if (i === cards.length - 1) {
					cards[i].andorText = 'and';//给最后一个设成and，不然是个undefined
				}

			}
			for (let i = st.length - 1; i >= 0; i--) {
				let maxSt = st[i];
				let stEd = null;
				for (let o = 0; o < ed.length; o++) {
					if (ed[o] > maxSt) {
						stEd = ed[o];
						ed.splice(o, 1);
						break;
					}
				}
				let rdm = Math.ceil(Math.random() * 100000);
				cards[maxSt].rdm = rdm;
				cards[stEd].rdm = rdm;
				st.splice(i, 1);
			}
			json.cards = cards;
			self.setState(json);
			self.moveCard(0, 0);
			self.props.form.setFieldsValue({
				title: result.value.name
			});

		});
	},
	changeCheckbox(e) {//操作复选框
		const self = this;
		const data = e.target.data;
		const source = e.target.source;
		const checked = e.target.checked;
		let cards = this.state.cards;

		if (!cards) cards = [];
		let arr = [];
		data.fdimensions.map(function (d, i) {
			if (source.fid === d.fid) {
				if (checked) {
					arr.push(d);
				} else {
					arr.splice(i, 1);
				}
			}
		});
		for (let i = 0; i < cards.length; i++) {
			if (cards[i].fid === data.fid) {//已经选了条件

				if (!checked) {
					for (let o = 0; o < cards[i].foperands.length; o++) {
						if (cards[i].foperands[o].fid === source.fid) {
							if (cards[i].foperands.length === 1) {//只有一个整个删除
								cards.splice(i, 1);
								if (cards.length > 0) {
									cards[cards.length - 1].andor = false;//去掉最后一个且字
								}
								this.setState({
									cards: cards,
									['checkbox' + data.fid + '-' + source.fid]: checked
								});
								return;
							} else {
								cards[i].foperands.splice(o, 1);
							}
						}
					}
				} else {

					cards[i].foperands = cards[i].foperands.concat(arr);
				}
				this.setState({
					cards: cards,
					['checkbox' + data.fid + '-' + source.fid]: checked
				});
				return;
			}
		}

		cards.push({
			fid: data.fid,
			andor: true,
			fdimensionLazySize: data.fdimensionLazySize,
			andorText: 'and',
			fname: data.fname,
			foperands: arr
		});
		let cardsLen = cards.length;
		for (let i = 0; i < cardsLen; i++) {
			if (i === cardsLen - 1) {
				cards[i].andor = false;
			}
		}
		if (cards.length > 1) {
			cards[cards.length - 2].andor = true;
		}
		this.setState({
			cards: cards,
			['checkbox' + data.fid + '-' + source.fid]: checked
		});
		setTimeout(function () {
			self.moveCard(0, 0);
		}, 0);

	},
	selectAndor(text, fid) {//且或切换
		let cards = this.state.cards;
		let len = cards.length;
		for (let i = 0; i < len; i++) {
			if (cards[i].fid == fid) {
				cards[i].andorText = text === '且' ? 'and' : 'or';
			}
		}
		this.setState(cards);

	},
	getTreeData(name) {//搜索树列表
		const self = this;
		let url = restapi.listDimByTagIdAndName;
		const id = this.state.currentId;
		url = utils.makeUrl(url, {
			tid: id,
			name: name
		});
		ajax.get(url, function (result) {
			self.setState({
				['listDimByTagIdAndName' + id]: result.value
			});
		});
	},
	setFid(data) {//鼠标移到条件上的时候设置fid值，给下拉选择和取消选择提供当前的fid值
		this.setState({
			currentId: data.fid,
			currentName: data.fname
		});
	},
	setTreeName(data) {//点击输入框的时候先把下拉列表清空，通过输入文字进行搜索
		this.setState({
			['listDimByTagIdAndName' + data.fid]: []
		});
	},
	deselectTreeCheckbox(value) {//取消选择
		let defaultTreeList = this.state['defaultTreeList' + this.state.currentId];
		let cards = this.state.cards;
		for (let i = 0; i < cards.length; i++) {
			if (cards[i].fid === this.state.currentId) {
				for (let o = 0; o < cards[i].foperands.length; o++) {
					if (cards[i].foperands[o].fname === value) {
						cards[i].foperands.splice(o, 1);
						defaultTreeList.splice(o, 1);
					}
				}
				if (defaultTreeList.length === 0) {
					cards.splice(i, 1);
				}
				this.setState({
					cards: cards,
					['defaultTreeList' + this.state.currentId]: defaultTreeList
				});
			}

		}
		this.moveCard(0, 0);
	},
	selectTreeCheckbox(value, options) {//选择下拉列表里的项
		let data = options.props['data-value'];
		let cards = this.state.cards;
		let arr = [];
		let defaultTreeList = this.state['defaultTreeList' + this.state.currentId] || [];
		arr.push({
			fid: data.fid,
			fname: data.fname,
			fvalue: data.fvalue,
			fcounter: data.fcounter
		});
		defaultTreeList.push(data.fname);
		for (let i = 0; i < cards.length; i++) {
			if (cards[i].fid === this.state.currentId) {
				cards[i].foperands = cards[i].foperands.concat(arr);
				this.setState({
					cards: cards,
					['defaultTreeList' + this.state.currentId]: defaultTreeList
				});
				this.moveCard(0, 0);
				return;
			}

		}
		cards.push({
			fid: this.state.currentId,
			andor: true,
			andorText: 'and',
			fdimensionLazySize: data.fdimensionLazySize,
			fname: this.state.currentName,
			foperands: arr
		});
		this.setState({
			cards: cards,
			['defaultTreeList' + this.state.currentId]: defaultTreeList
		});
		this.moveCard(0, 0);
	},
	validateTitle(type) {

		const {
			getFieldProps
		} = this.props.form;
		return getFieldProps(type, {
			validate: [{
				rules: [{
					required: true,
					message: '请输入用户群名称'
				}, {
					max: 100,
					message: '用户群名称不能超过100个字'
				}, {
					validator: function (rule, value, callback) {

						if (value && value.length <= 100 && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						}
						callback();
					}
				}],
				trigger: ['onBlur', 'onChange']
			}]

		});
	},
	setHeight(data) {//展开或者收起超过3行的条件
		let more = 'more' + data.fid;
		this.setState({
			[more]: !this.state[more]
		});
	},
	clearUsergroup() {
		let cards = this.state.cards;
		let json = {};
		cards.map(function (data) {
			if (data.foperands) {
				data.foperands.map(function (source) {
					json['checkbox' + data.fid + '-' + source.fid] = false;
				});
			}
			json['defaultTreeList' + data.fid] = [];//从下拉列表里选的多选
			json['freversed' + data.fid] = false;


		});
		json.condition = true;
		json.cards = [];
		this.setState(json);

	},
	render() {
		const self = this;
		const { getFieldProps } = this.props.form;
		const { cards } = this.state;
		var json = {};
		for (let i in this.state) {
			if (i.indexOf('displayDropdown') !== -1) {
				json[i] = this.state[i];
			}
		}
		const formItemLayout = {
			labelCol: {
				span: 3
			},
			wrapperCol: {
				span: 21
			}
		};
		let listTagByCategoryId = this.props.listTagByCategoryId;
		let list = listTagByCategoryId.map(function (data, key) {
			let resource = null;

			let height = 'auto';

			let arr = [];
			let options = null;

			if (data.fdimensionLazySize > 0 || data.fguiType === 4) {//从服务器拉数据||搜索展示
				let listDimByTagIdAndName = self.state['listDimByTagIdAndName' + data.fid] || [];
				if (data.fdimensions.length > 0) {//搜索展示
					listDimByTagIdAndName = data.fdimensions;
				}
				let treeList = listDimByTagIdAndName.map(function (source, key) {
					return <Option data-value={source} value={source.fname} key={key}>{source.fname}</Option>;
				});
				options = <div id={'treeSelect' + data.fid} key={key} onClick={self.setTreeName.bind(self, data)} onMouseOver={self.setFid.bind(self, data)}><Select
					multiple
					value={self.state['defaultTreeList' + data.fid]}
					notFoundContent='无数据'
					placeholder="请输入关键字查找"
					data={data}
					onSearch={self.getTreeData}
					onSelect={self.selectTreeCheckbox}
					onDeselect={self.deselectTreeCheckbox}
				>{treeList}
				</Select></div>;
			} else {
				options = data.fdimensions.map(function (source) {
					let style = source.fidType === 1 ? { width: '100%' } : {};
					return <div className="list_box" style={style}>
						<Checkbox {...getFieldProps('checkbox' + data.fid + '-' + source.fid, {
							onChange: self.changeCheckbox
						}) }
							data={data}
							source={source}
							checked={self.state['checkbox' + data.fid + '-' + source.fid]}
							name={'checkbox' + data.fid + '-' + source.fid}
							key={source.fid}>
							{source.fname}{source.fcrowdSize ? `（${source.fcrowdSize}人）` : ''}
						</Checkbox>
					</div>;

				});
				// if (data.fguiType === 1) {
				// 	options = data.fdimensions.map(function (source, i) {
				// 		console.log(source)
				// 		return <Radio data={data} source={source} value={source.fvalue} key={i}>{source.fname}</Radio>
				// 	});
				// 	options = <RadioGroup key={key} value={self.state['radio' + data.fid] }  onChange={self.changeRadio }>
				// 		{options}
				// 	</RadioGroup>
				// }
			}

			arr.push(options);
			let zk = null;
			let moreStatus = self.state['more' + data.fid];
			if (data.fdimensions.length > 9 && data.fguiType !== 4) {

				height = moreStatus ? 'auto' : 56;
				zk = <div onClick={self.setHeight.bind(self, data)} className='get_more' key={key + 'zk'}>
					{!moreStatus ?
						<span>展开<Icon type="caret-down" /></span>
						:
						<span>收起<Icon type="caret-up" /></span>
					}
				</div>;
			}
			resource = <div className='ug_form' key={key}>
				<FormItem style={{ height: height }} {...formItemLayout} label={data.fname}>
					{arr}
				</FormItem>
				{zk}
			</div>;
			return resource;
		});
		if (!listTagByCategoryId.length && this.props.fid === 'myTag') {
			list = <span>无人群标签</span>;
		}
		let style = {};
		if (cards.length === 0) {
			style = {
				padding: 0,
				border: 'none'
			};
		}

		this.fpermission = true;
		return (
			<div>
				<div className="ug_list">
					{list}
				</div>

				<div className="tit"><div onClick={this.showSymbol} className="symbol"><span title='添加括号到条件'>() </span> </div><h3>请选择人群条件</h3></div>
				<div id="ugToolbar" className="ug_toolbar" style={style}>
					{cards.map((card, i) => {
						let fpermission = card.fpermission;
						if (!fpermission && fpermission !== undefined) {
							this.fpermission = false;
						}
						let fnames = [];
						if (card.foperands) {
							fnames = card.foperands.map(function (data) {
								return data.fname;
							});
						}
						let andor = card.andor;
						let json = {
							['freversed' + card.fid]: this.state['freversed' + card.fid]
						};
						return (
							<Card key={card.fid + fnames}
								index={i}
								// showDropdown={this.showDropdown.bind(this, card.fid) }
								{...json}
								andor={andor}
								fpermission={card.fpermission}
								deleteItem={this.deleteItem}
								className={card.className ? card.className : ''}
								fid={card.fid}
								andorText={card.andorText}
								setFreversed={this.setFreversed}
								selectAndor={this.selectAndor}
								fname={card.fname}
								fnames={fnames.join('、')}
								foperator={card.andorText}
								moveCard={this.moveCard} />
						);
					})}

				</div>
				<div className="ug_form">
					<FormItem className="form_input" {...formItemLayout}>
						<Input placeholder='请输入用户群名称' style={{ width: 500 }}  {...this.validateTitle('title') } />
					</FormItem>
					<Button type="primary" size="large" disabled={!this.state.condition} onClick={this.handleSubmit}>提交{this.state.submiting ? <Icon type="loading" /> : <span></span>}</Button>
					<Button style={{ marginLeft: 10 }} type="primary" size="large" onClick={this.back}>返回</Button>
					<Button style={{ marginLeft: 10 }} type="primary" size="large" onClick={this.clearUsergroup}>清空用户群</Button>
					<Button style={{ marginLeft: 10 }} disabled={!this.state.condition} type="primary" size="large" onClick={this.searchUserCount}>查询用户群人数</Button>
					<span style={{ marginLeft: 10 }}>{this.state.userCount}</span>
				</div>
			</div>
		);
	}
});
export default DragDropContext(HTML5Backend)(Container);