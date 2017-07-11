webpackJsonp([4],{

/***/ 1759:
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
		getInitialState: function getInitialState() {
			return {};
		},
		componentDidMount: function componentDidMount() {},
		handleSubmit: function handleSubmit() {
			var type = this.props.form.getFieldValue('type');
			this.props.form.validateFields(function (errors, values) {

				if (errors) {

					console.log('Errors in form!!!');
					return;
				}
				var data = {
					name: values.name,
					password: values.password
				};
				_ajax2.default.post(_urlModel2.default.addQuestion, data, function () {
					_antd.message.success('新建成功');
				});
			});
		},
		render: function render() {

			var type = this.props.form.getFieldValue('type');

			var getFieldDecorator = this.props.form.getFieldDecorator;

			var self = this;

			return _react2.default.createElement(
				'div',
				null,
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
								_extends({}, formItemLayout, { label: '\u7528\u6237\u540D' }),
								getFieldDecorator('name', {
									validate: [{
										rules: [{
											whitespace: true,
											required: true,
											message: '请填写用户名'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(_react2.default.createElement(_antd.Input, null))
							),
							_react2.default.createElement(
								FormItem,
								_extends({}, formItemLayout, { label: '\u5BC6\u7801' }),
								getFieldDecorator('password', {
									validate: [{
										rules: [{
											whitespace: true,
											required: true,
											message: '请填写密码'
										}],
										trigger: ['onBlur', 'onChange']
									}]

								})(_react2.default.createElement(_antd.Input, null))
							),
							_react2.default.createElement(
								FormItem,
								_extends({ className: 'create_app' }, formItemLayout, { label: '\xA0' }),
								_react2.default.createElement(
									_antd.Button,
									{ type: 'primary', className: 'btn_normal_show color_bg', onClick: this.handleSubmit, size: 'large' },
									'\u767B\u5F55'
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

/***/ }

});