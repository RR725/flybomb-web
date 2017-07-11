webpackJsonp([3],{

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

/***/ },

/***/ 1756:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(594);

	var _react2 = _interopRequireDefault(_react);

	var _antd = __webpack_require__(775);

	var _urlModel = __webpack_require__(1);

	var _urlModel2 = _interopRequireDefault(_urlModel);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _ajax = __webpack_require__(1683);

	var _ajax2 = _interopRequireDefault(_ajax);

	var _addSubject = __webpack_require__(1757);

	var _addSubject2 = _interopRequireDefault(_addSubject);

	var _type = __webpack_require__(1693);

	var _type2 = _interopRequireDefault(_type);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RadioGroup = _antd.Radio.Group;

	var FormItem = _antd.Form.Item;

	var formItemLayout = {
		labelCol: {
			span: 5
		},
		wrapperCol: {
			span: 19
		}
	};

	var Add = _react2.default.createClass({
		displayName: 'Add',

		//{this.props.params.id}	
		getInitialState: function getInitialState() {
			return {
				subjectList: [],
				loading: false
			};
		},

		componentWillUnmount: function componentWillUnmount() {

			document.querySelector('#home').className = '';
		},
		getList: function getList() {
			var _this = this;

			_ajax2.default.post(_urlModel2.default.subjectList, {}, function (result) {
				_this.setState({
					subjectList: result.value
				});
			});
		},
		componentDidMount: function componentDidMount() {
			var _this2 = this;

			document.querySelector('#home').className = 'active';
			this.getList();
			var obj = _utils2.default.getQueryObj(window.location.hash);
			var data = {
				id: obj.id
			};
			if (!obj.id) return;
			_ajax2.default.post(_urlModel2.default.questionFindOne, data, function (result) {
				console.log(result);
				_this2.setState({
					editData: result.value
				});
			});
		},
		cantNull: function cantNull(type, html) {
			var getFieldDecorator = this.props.form.getFieldDecorator;

			return getFieldDecorator(type, {
				validate: [{
					rules: [{
						whitespace: true,
						required: true,
						message: '请填写应用名称'
					}],
					trigger: ['onBlur', 'onChange']
				}]

			})(html);
		},
		handleSubmit: function handleSubmit() {
			var type = this.props.form.getFieldValue('type');
			var obj = _utils2.default.getQueryObj(window.location.hash);
			var id = obj.id;
			this.props.form.validateFields(function (errors, values) {
				var content = [],
				    answer = '';
				for (var i in values) {
					var valuesI = values[i];
					if (i.indexOf('answer') > -1) {

						if (type === '2') {
							valuesI.sort();
							answer = valuesI.join(',');
						} else {
							answer = valuesI;
						}
					}
					if (i.indexOf('content') > -1) {
						content.push(valuesI);
					}
				}
				if (errors) {

					console.log('Errors in form!!!');
					return;
				}
				var data = {
					subject: values.subject,
					content: content,
					type: values.type,
					point: values.point || '',
					answer: answer,
					title: values.title
				};
				if (id) {
					data.questionId = id;
					_ajax2.default.post(_urlModel2.default.updateQuestion, data, function () {
						_antd.message.success('修改成功');
					});
					return;
				}
				_ajax2.default.post(_urlModel2.default.addQuestion, data, function () {
					_antd.message.success('新建成功');
				});
			});
		},
		add: function add() {
			this.toggleModal();
		},
		getContent: function getContent() {
			var getFieldDecorator = this.props.form.getFieldDecorator;

			var type = this.props.form.getFieldValue('type');
			var html = void 0;
			var editData = this.state.editData;
			if (type == '1') {
				var listRadio = ['A', 'B', 'C', 'D'];
				html = listRadio.map(function (data, key) {

					return _react2.default.createElement(
						_antd.Row,
						{ style: { height: 44 }, key: key },
						_react2.default.createElement(
							_antd.Col,
							{ span: '1' },
							data
						),
						_react2.default.createElement(
							_antd.Col,
							{ span: '23' },
							getFieldDecorator('content_radio_' + data, {
								initialValue: editData ? editData.content[key] : '',
								validate: [{
									rules: [{
										whitespace: true,
										required: true,
										message: '请填写内容'
									}],
									trigger: ['onBlur', 'onChange']
								}]

							})(_react2.default.createElement(_antd.Input, null))
						)
					);
				});
			} else if (type == '2') {
				var listCheckbox = ['A', 'B', 'C', 'D', 'E'];
				html = listCheckbox.map(function (data, key) {
					return _react2.default.createElement(
						_antd.Row,
						{ style: { height: 44 }, key: key },
						_react2.default.createElement(
							_antd.Col,
							{ span: '1' },
							data
						),
						_react2.default.createElement(
							_antd.Col,
							{ span: '23' },
							getFieldDecorator('content_checkbox_' + data, {
								initialValue: editData ? editData.content[key] : '',
								validate: [{
									rules: [{
										whitespace: true,
										required: true,
										message: '请填写内容'
									}],
									trigger: ['onBlur', 'onChange']
								}]

							})(_react2.default.createElement(_antd.Input, null))
						)
					);
				});
			} else {
				html = getFieldDecorator('content', {
					initialValue: editData ? editData.content : '',
					validate: [{
						rules: [{
							whitespace: true,
							required: true,
							message: '请填写内容'
						}],
						trigger: ['onBlur', 'onChange']
					}]
				})(_react2.default.createElement(_antd.Input, { type: 'textarea', rows: 6 }));
			}
			return html;
		},
		toggleModal: function toggleModal() {

			this.setState({
				visible: !this.state.visible
			});
		},
		onChangeType: function onChangeType(value) {
			this.setState({
				type: value
			});
		},
		getAnswer: function getAnswer() {
			var getFieldDecorator = this.props.form.getFieldDecorator;

			var type = this.props.form.getFieldValue('type');
			var html = void 0;
			var editData = this.state.editData;
			var radioStyle = {
				display: 'block',
				height: '32px',
				lineHeight: '32px'
			};
			var answer = void 0;
			if (type == '1') {
				var listRadio = ['A', 'B', 'C', 'D'];
				var radios = listRadio.map(function (data, key) {
					return _react2.default.createElement(
						_antd.Col,
						{ key: key, span: '3' },
						_react2.default.createElement(
							_antd.Radio,
							{ style: radioStyle, value: data },
							data
						)
					);
				});
				html = _react2.default.createElement(
					RadioGroup,
					{ style: { width: '100%' } },
					_react2.default.createElement(
						_antd.Row,
						null,
						radios
					)
				);
				answer = editData ? editData.answer : null;
			} else if (type == '2') {
				var listCheckbox = ['A', 'B', 'C', 'D', 'E'];
				var checkbox = listCheckbox.map(function (data, key) {
					return _react2.default.createElement(
						_antd.Col,
						{ key: key, span: '3' },
						_react2.default.createElement(
							_antd.Checkbox,
							{ value: data },
							data
						)
					);
				});
				html = _react2.default.createElement(
					_antd.Checkbox.Group,
					null,
					_react2.default.createElement(
						_antd.Row,
						null,
						checkbox
					)
				);
				answer = editData ? editData.answer : null;
				answer = editData ? answer.split(',') : [];
			} else {
				html = _react2.default.createElement(_antd.Input, { type: 'textarea', rows: 6 });
				answer = editData ? editData.answer : '';
			}
			var dom = getFieldDecorator('answer_' + type, {
				initialValue: answer,
				validate: [{
					rules: [{
						required: true,
						message: '请填写答案'
					}],
					trigger: ['onBlur', 'onChange']
				}]

			})(html);
			return dom;
		},
		render: function render() {

			var type = this.props.form.getFieldValue('type');

			var obj = _utils2.default.getQueryObj(window.location.hash);
			var id = obj.id;
			var buttonText = id ? '修改' : '创建';
			var editData = this.state.editData;

			var getFieldDecorator = this.props.form.getFieldDecorator;

			var self = this;
			var subjectList = this.state.subjectList;
			var options = subjectList.map(function (data, key) {
				return _react2.default.createElement(
					_antd.Select.Option,
					{ key: key, value: data.name },
					data.name
				);
			});
			var typeOptions = _type2.default.map(function (data, key) {

				return _react2.default.createElement(
					_antd.Select.Option,
					{ key: key, value: String(data.type) },
					data.type_desc
				);
			});

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'home_toolbar' },
					_react2.default.createElement(
						_antd.Row,
						null,
						_react2.default.createElement(
							_antd.Col,
							{ span: '20' },
							_react2.default.createElement(
								'div',
								{ className: 'title' },
								_react2.default.createElement('span', { className: 'border' }),
								'\u65B0\u5EFA'
							)
						),
						_react2.default.createElement(
							_antd.Col,
							{ span: '4' },
							_react2.default.createElement(
								_antd.Button,
								{ onClick: this.add, type: 'primary', size: 'large' },
								'\u65B0\u5EFA\u79D1\u76EE'
							)
						)
					)
				),
				_react2.default.createElement(_addSubject2.default, { toggleModal: this.toggleModal, getList: this.getList, visible: this.state.visible }),
				_react2.default.createElement(
					_antd.Form,
					{ style: { paddingTop: 20 }, layout: 'horizontal' },
					_react2.default.createElement(
						_antd.Row,
						{ className: 'add_app' },
						_react2.default.createElement(
							_antd.Col,
							{ span: '18' },
							_react2.default.createElement(
								FormItem,
								_extends({}, formItemLayout, { label: '\u79D1\u76EE' }),
								getFieldDecorator('subject', {
									initialValue: editData ? editData.subject : '',
									validate: [{
										rules: [{
											required: true,
											message: '请选择科目'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(_react2.default.createElement(
									_antd.Select,
									{ style: { width: 300 } },
									options
								))
							),
							_react2.default.createElement(
								FormItem,
								_extends({}, formItemLayout, { label: '\u7C7B\u578B' }),
								getFieldDecorator('type', {
									initialValue: editData ? String(editData.type) : '',
									onChange: this.onChangeType,
									validate: [{
										rules: [{
											required: true,
											message: '请选择类型'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(_react2.default.createElement(
									_antd.Select,
									{ style: { width: 300 } },
									typeOptions
								))
							),
							_react2.default.createElement(
								FormItem,
								_extends({}, formItemLayout, { label: '\u6807\u9898' }),
								getFieldDecorator('title', {
									initialValue: editData ? editData.title : '',
									validate: [{
										rules: [{
											whitespace: true,
											required: true,
											message: '请填写标题'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(_react2.default.createElement(_antd.Input, null))
							),
							_react2.default.createElement(
								FormItem,
								_extends({}, formItemLayout, { label: '\u5185\u5BB9' }),
								this.getContent()
							),
							_react2.default.createElement(
								FormItem,
								_extends({}, formItemLayout, { label: '\u7B54\u6848' }),
								this.getAnswer()
							),
							type < 3 && _react2.default.createElement(
								FormItem,
								_extends({}, formItemLayout, { label: '\u8981\u70B9\u900F\u6790' }),
								getFieldDecorator('point', {
									initialValue: editData ? editData.point : '',
									validate: [{
										rules: [{
											required: true,
											message: '请填写要点透析'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(_react2.default.createElement(_antd.Input, { type: 'textarea', rows: 6 }))
							),
							_react2.default.createElement(
								FormItem,
								_extends({ className: 'create_app' }, formItemLayout, { label: '\xA0' }),
								_react2.default.createElement(
									_antd.Button,
									{ type: 'primary', className: 'btn_normal_show color_bg', onClick: this.handleSubmit, size: 'large' },
									buttonText
								)
							)
						)
					)
				)
			);
		}
	});
	Add = _antd.Form.create()(Add);

	module.exports = Add;

/***/ },

/***/ 1757:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(594);

	var _react2 = _interopRequireDefault(_react);

	var _antd = __webpack_require__(775);

	var _urlModel = __webpack_require__(1);

	var _urlModel2 = _interopRequireDefault(_urlModel);

	var _ajax = __webpack_require__(1683);

	var _ajax2 = _interopRequireDefault(_ajax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RadioGroup = _antd.Radio.Group;

	var FormItem = _antd.Form.Item;

	var formItemLayout = {
		labelCol: {
			span: 5
		},
		wrapperCol: {
			span: 19
		}
	};

	var App = _react2.default.createClass({
		displayName: 'App',
		getInitialState: function getInitialState() {
			return {
				subjectList: [],
				loading: false
			};
		},
		componentDidMount: function componentDidMount() {},
		handleOk: function handleOk() {
			var _this = this;

			this.props.form.validateFields(function (errors, values) {

				if (errors && Object.keys(errors).length === 0) {
					errors = null;
				}
				if (errors) {

					console.log('Errors in form!!!');
					return;
				}
				var data = {

					name: values.addName
				};

				_ajax2.default.post(_urlModel2.default.addSubject, data, function () {
					_antd.message.success('新建成功');
					_this.props.toggleModal();
					_this.props.getList();
				});
			});
		},
		handleCancel: function handleCancel() {

			this.props.toggleModal();
		},
		render: function render() {
			var getFieldDecorator = this.props.form.getFieldDecorator;

			var self = this;
			return _react2.default.createElement(
				_antd.Form,
				{ style: { paddingTop: 20 }, layout: 'horizontal' },
				_react2.default.createElement(
					_antd.Modal,
					{
						title: '\u65B0\u5EFA\u79D1\u76EE',
						visible: this.props.visible,
						onOk: this.handleOk,
						onCancel: this.handleCancel },
					_react2.default.createElement(
						FormItem,
						_extends({}, formItemLayout, { label: '\u79D1\u76EE' }),
						getFieldDecorator('addName', {
							validate: [{
								rules: [{
									whitespace: true,
									required: true,
									message: '请填写科目名称'
								}],
								trigger: ['onBlur', 'onChange']
							}]

						})(_react2.default.createElement(_antd.Input, { style: { width: 300 } }))
					)
				)
			);
		}
	});
	App = _antd.Form.create()(App);

	module.exports = App;

/***/ }

});