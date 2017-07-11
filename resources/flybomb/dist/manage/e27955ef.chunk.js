webpackJsonp([2],{

/***/ 773:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(594);

	var _react2 = _interopRequireDefault(_react);

	var _toolbar = __webpack_require__(774);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	var _urlModel = __webpack_require__(1);

	var _urlModel2 = _interopRequireDefault(_urlModel);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _ajax = __webpack_require__(1683);

	var _ajax2 = _interopRequireDefault(_ajax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = _react2.default.createClass({
		displayName: 'App',
		getInitialState: function getInitialState() {
			return {
				current: 1,
				appId: 0,
				tableData: {
					loading: false, //ajax完成状态
					data: [], //表格数据
					pagination: null //表格分页
				}
			};
		},
		tableData: function tableData(searchParam) {
			//表格需要的数据
			var self = this;

			var url = _urlModel2.default.questionList;
			_ajax2.default.post(url, {}, function (result) {
				console.log(result);
				var data = result.value.result;
				data.map(function (json, key) {
					data[key]['key'] = key;
				});
				self.setState({
					tableData: {
						data: data,
						loading: false,
						pagination: {
							total: result.value.total,
							current: searchParam.index,
							pageSize: 10,
							showSizeChanger: false,

							onChange: function onChange(current) {
								var searchParam = {
									appId: 0,
									name: '',
									index: current
								};
								self.setState({
									current: current
								});
								self.tableData(searchParam);
							}
						}
					}
				});
			});
		},

		componentWillUnmount: function componentWillUnmount() {
			document.querySelector('#home').className = '';
		},
		componentDidMount: function componentDidMount() {
			document.querySelector('#home').className = 'active';
		},
		render: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_toolbar2.default, { current: this.state.current, refresh: this.state.refresh, tableData: this.state.tableData, getTableData: this.tableData })
			);
		}
	});

	module.exports = App;

/***/ },

/***/ 774:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(594);

	var _react2 = _interopRequireDefault(_react);

	var _antd = __webpack_require__(775);

	var _urlModel = __webpack_require__(1);

	var _urlModel2 = _interopRequireDefault(_urlModel);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _table = __webpack_require__(1682);

	var _table2 = _interopRequireDefault(_table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Option = _antd.Select.Option;
	var FormItem = _antd.Form.Item;

	var _currentApp = {};

	var App = _react2.default.createClass({
		displayName: 'App',
		getInitialState: function getInitialState() {
			return {};
		},
		componentDidMount: function componentDidMount() {

			var searchParam = {
				index: 1
			};

			searchParam.index = 1;
			this.props.getTableData(searchParam);
		},
		add: function add(url) {

			window.location.hash = url;
		},
		render: function render() {

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_antd.Form,
					{ layout: 'horizontal' },
					_react2.default.createElement(
						'div',
						{ className: 'home_toolbar' },
						_react2.default.createElement(
							_antd.Row,
							null,
							_react2.default.createElement(
								_antd.Col,
								{ span: '4' },
								_react2.default.createElement(
									'div',
									{ className: 'title' },
									_react2.default.createElement('span', { className: 'border' }),
									'\u5217\u8868'
								)
							),
							_react2.default.createElement(
								_antd.Col,
								{ span: '10' },
								'\xA0'
							),
							_react2.default.createElement(
								_antd.Col,
								{ span: '10' },
								_react2.default.createElement(
									'div',
									{ style: { textAlign: 'right' } },
									_react2.default.createElement(
										_antd.Col,
										{ span: '3' },
										'\xA0'
									),
									_react2.default.createElement(
										_antd.Col,
										{ span: '21' },
										_react2.default.createElement(
											_antd.Button,
											{ onClick: this.add.bind(this, '/manage/add'), type: 'primary', size: 'large' },
											'\u65B0\u5EFA'
										)
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(_table2.default.render, { refresh: this.props.refresh, tableData: this.props.tableData })
			);
		}
	});

	App = _antd.Form.create()(App);
	module.exports = App;

/***/ },

/***/ 1682:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(594);

	var _react2 = _interopRequireDefault(_react);

	var _antd = __webpack_require__(775);

	var _urlModel = __webpack_require__(1);

	var _urlModel2 = _interopRequireDefault(_urlModel);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _ajax = __webpack_require__(1683);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _type = __webpack_require__(1693);

	var _type2 = _interopRequireDefault(_type);

	var _reactRouter = __webpack_require__(1694);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HomeTable = _react2.default.createClass({
		displayName: 'HomeTable',
		getInitialState: function getInitialState() {
			var self = this;
			return {
				columns: [{
					title: '科目名称',
					key: '0',
					dataIndex: 'subject',
					className: 'td_appname '
				}, {
					title: '类型',
					className: 'td_appname',
					key: '1',
					dataIndex: 'type',
					render: function render(text, record) {
						console.log(text);
						var filter = _type2.default.filter(function (data) {
							return data.type === text;
						});
						return filter[0].type_desc;
					}
				}, {
					title: '标题',
					className: 'ta_c',
					key: '2',
					dataIndex: 'title'
				}, {
					title: '操作',
					className: 'ta_c',
					key: '3',
					render: function render(text, record) {
						return _react2.default.createElement(
							_reactRouter.Link,
							{ to: '/manage/add?id=' + record.questionId },
							'\u4FEE\u6539'
						);
					},

					dataIndex: ''
				}],
				refresh: false
			};
		},
		render: function render() {
			return _react2.default.createElement(_antd.Table, { className: 'home_table', columns: this.state.columns, loading: this.props.tableData.loading, dataSource: this.props.tableData.data, pagination: this.props.tableData.pagination });
		}
	});
	exports.render = HomeTable;

/***/ },

/***/ 1693:
/***/ function(module, exports) {

	'use strict';

	module.exports = [{
		type: 1,
		type_desc: '单选题'
	}, {
		type: 2,
		type_desc: '多选题'
	}, {
		type: 3,
		type_desc: '名词解释'
	}, {
		type: 4,
		type_desc: '简答题'
	}, {
		type: 5,
		type_desc: '论述题'
	}];

/***/ }

});