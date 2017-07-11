webpackJsonp([2],{

/***/ 777:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _style3 = __webpack_require__(778);

	var _picker = __webpack_require__(789);

	var _picker2 = _interopRequireDefault(_picker);

	var _style4 = __webpack_require__(920);

	var _list = __webpack_require__(923);

	var _list2 = _interopRequireDefault(_list);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	var _rcForm = __webpack_require__(926);

	var _urlModel = __webpack_require__(5);

	var _urlModel2 = _interopRequireDefault(_urlModel);

	var _utils = __webpack_require__(6);

	var _utils2 = _interopRequireDefault(_utils);

	var _ajax = __webpack_require__(1033);

	var _ajax2 = _interopRequireDefault(_ajax);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Home = _react2.default.createClass({
		displayName: 'Home',

		//{this.props.params.id}	
		getInitialState: function getInitialState() {
			return {
				subjectList: []
			};
		},
		componentDidMount: function componentDidMount() {
			var _this = this;

			_ajax2.default.post(_urlModel2.default.subjectList, {}, function (result) {
				var subjectList = [];
				result.value.map(function (data) {
					subjectList.push({
						label: data.name,
						value: data.subjectId
					});
				});
				_this.setState({
					subjectList: subjectList
				});
			});
		},
		render: function render() {
			var getFieldProps = this.props.form.getFieldProps;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_picker2.default,
					_extends({ data: this.state.subjectList, cols: 1 }, getFieldProps('district3')),
					_react2.default.createElement(
						_list2.default.Item,
						{ arrow: 'horizontal' },
						'\u9009\u62E9'
					)
				)
			);
		}
	});

	var HomeWrapper = (0, _rcForm.createForm)()(Home);
	module.exports = HomeWrapper;

/***/ },

/***/ 778:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(779);

	__webpack_require__(787);

/***/ },

/***/ 779:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(780);

	__webpack_require__(785);

/***/ },

/***/ 780:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(781);

	__webpack_require__(783);

/***/ },

/***/ 781:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(782);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(307)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/normalize.css/normalize.css", function() {
			var newContent = require("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/normalize.css/normalize.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 782:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(306)();
	exports.push([module.id, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n", ""]);

/***/ },

/***/ 783:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(784);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(307)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/less-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/antd-mobile/lib/style/index.less", function() {
			var newContent = require("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/less-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/antd-mobile/lib/style/index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 784:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(306)();
	exports.push([module.id, ".hairline-remove-right-bottom {\n  border-bottom: 0;\n}\n.hairline-remove-right-bottom:after {\n  display: none;\n}\n.hairline-remove-right-bottom-bak:after {\n  display: none;\n}\n.hairline-remove-left-top:before {\n  display: none;\n}\n/*do not import this file except components/style/index.less*/\n.am-fade-enter,\n.am-fade-appear {\n  opacity: 0;\n  animation-duration: .2s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  animation-play-state: paused;\n}\n.am-fade-leave {\n  animation-duration: .2s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  animation-play-state: paused;\n}\n.am-fade-enter.am-fade-enter-active,\n.am-fade-appear.am-fade-appear-active {\n  animation-name: amFadeIn;\n  animation-play-state: running;\n}\n.am-fade-leave.am-fade-leave-active {\n  animation-name: amFadeOut;\n  animation-play-state: running;\n}\n@keyframes amFadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes amFadeOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.am-slide-up-enter,\n.am-slide-up-appear {\n  transform: translate(0, 100%);\n}\n.am-slide-up-enter,\n.am-slide-up-appear,\n.am-slide-up-leave {\n  animation-duration: .2s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  animation-play-state: paused;\n}\n.am-slide-up-enter.am-slide-up-enter-active,\n.am-slide-up-appear.am-slide-up-appear-active {\n  animation-name: amSlideUpIn;\n  animation-play-state: running;\n}\n.am-slide-up-leave.am-slide-up-leave-active {\n  animation-name: amSlideUpOut;\n  animation-play-state: running;\n}\n@keyframes amSlideUpIn {\n  0% {\n    transform: translate(0, 100%);\n  }\n  100% {\n    transform: translate(0, 0);\n  }\n}\n@keyframes amSlideUpOut {\n  0% {\n    transform: translate(0, 0);\n  }\n  100% {\n    transform: translate(0, 100%);\n  }\n}\n.am.am-zoom-enter,\n.am.am-zoom-leave {\n  display: block;\n}\n.am-zoom-enter,\n.am-zoom-appear {\n  opacity: 0;\n  animation-duration: .2s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);\n  animation-play-state: paused;\n}\n.am-zoom-leave {\n  animation-duration: .2s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);\n  animation-play-state: paused;\n}\n.am-zoom-enter.am-zoom-enter-active,\n.am-zoom-appear.am-zoom-appear-active {\n  animation-name: amZoomIn;\n  animation-play-state: running;\n}\n.am-zoom-leave.am-zoom-leave-active {\n  animation-name: amZoomOut;\n  animation-play-state: running;\n}\n@keyframes amZoomIn {\n  0% {\n    opacity: 0;\n    transform-origin: 50% 50%;\n    transform: scale(0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform-origin: 50% 50%;\n    transform: scale(1, 1);\n  }\n}\n@keyframes amZoomOut {\n  0% {\n    opacity: 1;\n    transform-origin: 50% 50%;\n    transform: scale(1, 1);\n  }\n  100% {\n    opacity: 0;\n    transform-origin: 50% 50%;\n    transform: scale(0, 0);\n  }\n}\n.am-slide-down-enter,\n.am-slide-down-appear {\n  transform: translate(0, -100%);\n}\n.am-slide-down-enter,\n.am-slide-down-appear,\n.am-slide-down-leave {\n  animation-duration: .2s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  animation-play-state: paused;\n}\n.am-slide-down-enter.am-slide-down-enter-active,\n.am-slide-down-appear.am-slide-down-appear-active {\n  animation-name: amSlideDownIn;\n  animation-play-state: running;\n}\n.am-slide-down-leave.am-slide-down-leave-active {\n  animation-name: amSlideDownOut;\n  animation-play-state: running;\n}\n@keyframes amSlideDownIn {\n  0% {\n    transform: translate(0, -100%);\n  }\n  100% {\n    transform: translate(0, 0);\n  }\n}\n@keyframes amSlideDownOut {\n  0% {\n    transform: translate(0, 0);\n  }\n  100% {\n    transform: translate(0, -100%);\n  }\n}\n*,\n*:before,\n*:after {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nhtml {\n  font-size: 50PX;\n}\nbody {\n  user-select: none;\n  font-size: 32px;\n  background-color: #f5f5f9;\n}\n*[contenteditable] {\n  -webkit-user-select: auto !important;\n}\n*:focus {\n  outline: none;\n}\na {\n  background: transparent;\n  text-decoration: none;\n  outline: none;\n}\n", ""]);

/***/ },

/***/ 785:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(786);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(307)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/less-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/antd-mobile/lib/picker-view/style/index.less", function() {
			var newContent = require("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/less-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/antd-mobile/lib/picker-view/style/index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 786:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(306)();
	exports.push([module.id, ".hairline-remove-right-bottom {\n  border-bottom: 0;\n}\n.hairline-remove-right-bottom:after {\n  display: none;\n}\n.hairline-remove-right-bottom-bak:after {\n  display: none;\n}\n.hairline-remove-left-top:before {\n  display: none;\n}\n.am-picker-col {\n  display: block;\n  position: relative;\n  height: 476px;\n  overflow: hidden;\n  width: 100%;\n}\n.am-picker-col-content {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n  padding: 204px 0;\n}\n.am-picker-col-item {\n  touch-action: manipulation;\n  text-align: center;\n  font-size: 32px;\n  height: 68px;\n  line-height: 68px;\n  color: #000000;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.am-picker-col-item-selected {\n  font-size: 34px;\n}\n.am-picker-col-mask {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 100%;\n  margin: 0 auto;\n  width: 100%;\n  z-index: 3;\n  background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\n  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\n  background-position: top, bottom;\n  background-size: 100% 204px;\n  background-repeat: no-repeat;\n}\n.am-picker-col-indicator {\n  box-sizing: border-box;\n  width: 100%;\n  height: 68px;\n  position: absolute;\n  left: 0;\n  top: 204px;\n  z-index: 3;\n  border-top: 1 PX solid #dddddd;\n  border-bottom: 1 PX solid #dddddd;\n}\n.am-picker {\n  display: flex;\n  align-items: center;\n}\n.am-picker-item {\n  flex: 1;\n  text-align: center;\n}\n", ""]);

/***/ },

/***/ 787:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(788);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(307)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/less-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/antd-mobile/lib/picker/style/index.less", function() {
			var newContent = require("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/less-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/antd-mobile/lib/picker/style/index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 788:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(306)();
	exports.push([module.id, ".hairline-remove-right-bottom {\n  border-bottom: 0;\n}\n.hairline-remove-right-bottom:after {\n  display: none;\n}\n.hairline-remove-right-bottom-bak:after {\n  display: none;\n}\n.hairline-remove-left-top:before {\n  display: none;\n}\n.am-picker-popup {\n  left: 0;\n  bottom: 0;\n  position: fixed;\n  width: 100%;\n  background-color: #ffffff;\n}\n.am-picker-popup-wrap {\n  position: fixed;\n  overflow: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1000;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n.am-picker-popup-mask {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.4);\n  height: 100%;\n  z-index: 1000;\n}\n.am-picker-popup-mask-hidden {\n  display: none;\n}\n.am-picker-popup-header {\n  background-image: -webkit-linear-gradient(top, #e7e7e7, #e7e7e7, transparent, transparent);\n  background-image: linear-gradient(to bottom, #e7e7e7, #e7e7e7, transparent, transparent);\n  background-position: bottom;\n  background-size: 100% 1px;\n  background-repeat: no-repeat;\n  display: flex;\n  align-items: center;\n  position: relative;\n}\n.am-picker-popup-header:after {\n  display: block;\n  position: absolute;\n  content: '';\n  left: 0;\n  bottom: 0;\n  right: auto;\n  top: auto;\n  width: 100%;\n  border-bottom: 1 PX solid #dddddd;\n}\n.am-picker-popup-header .am-picker-popup-header-right {\n  text-align: right;\n}\n.am-picker-popup-item {\n  color: #108ee9;\n  font-size: 34px;\n  padding: 18px 30px;\n  height: 84px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.am-picker-popup-item-active {\n  background-color: #dddddd;\n}\n.am-picker-popup-title {\n  flex: 1;\n  text-align: center;\n  color: #000000;\n}\n.am-picker-popup .am-picker-popup-close {\n  display: none;\n}\n", ""]);

/***/ },

/***/ 789:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(790);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(828);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(829);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(833);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(869);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	var _Popup = __webpack_require__(877);

	var _Popup2 = _interopRequireDefault(_Popup);

	var _Cascader = __webpack_require__(905);

	var _Cascader2 = _interopRequireDefault(_Cascader);

	var _MultiPicker = __webpack_require__(907);

	var _MultiPicker2 = _interopRequireDefault(_MultiPicker);

	var _arrayTreeFilter = __webpack_require__(906);

	var _arrayTreeFilter2 = _interopRequireDefault(_arrayTreeFilter);

	var _styles = __webpack_require__(918);

	var _styles2 = _interopRequireDefault(_styles);

	var _popupProps = __webpack_require__(919);

	var _popupProps2 = _interopRequireDefault(_popupProps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function getDefaultProps() {
	    var defaultFormat = function defaultFormat(values) {
	        return values.join(',');
	    };
	    return {
	        triggerType: 'onClick',
	        prefixCls: 'am-picker',
	        pickerPrefixCls: 'am-picker-col',
	        popupPrefixCls: 'am-picker-popup',
	        format: defaultFormat,
	        cols: 3,
	        cascade: true,
	        extra: '请选择',
	        okText: '确定',
	        dismissText: '取消',
	        title: '',
	        styles: _styles2['default']
	    };
	}

	var Picker = function (_React$Component) {
	    (0, _inherits3['default'])(Picker, _React$Component);

	    function Picker() {
	        (0, _classCallCheck3['default'])(this, Picker);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).apply(this, arguments));

	        _this.getSel = function () {
	            var value = _this.props.value || [];
	            var treeChildren = void 0;
	            if (_this.props.cascade) {
	                treeChildren = (0, _arrayTreeFilter2['default'])(_this.props.data, function (c, level) {
	                    return c.value === value[level];
	                });
	            } else {
	                treeChildren = value.map(function (v, i) {
	                    return _this.props.data[i].filter(function (d) {
	                        return d.value === v;
	                    })[0];
	                });
	            }
	            return _this.props.format && _this.props.format(treeChildren.map(function (v) {
	                return v.label;
	            }));
	        };
	        return _this;
	    }

	    (0, _createClass3['default'])(Picker, [{
	        key: 'render',
	        value: function render() {
	            var props = this.props;
	            var children = props.children,
	                _props$value = props.value,
	                value = _props$value === undefined ? [] : _props$value,
	                extra = props.extra,
	                okText = props.okText,
	                itemStyle = props.itemStyle,
	                dismissText = props.dismissText,
	                popupPrefixCls = props.popupPrefixCls,
	                cascade = props.cascade;

	            var cascader = void 0;
	            var popupMoreProps = {};
	            if (cascade) {
	                cascader = _react2['default'].createElement(_Cascader2['default'], { prefixCls: props.prefixCls, pickerPrefixCls: props.pickerPrefixCls, data: props.data, cols: props.cols, onChange: props.onPickerChange, pickerItemStyle: itemStyle });
	            } else {
	                cascader = _react2['default'].createElement(
	                    _MultiPicker2['default'],
	                    { prefixCls: props.prefixCls, pickerPrefixCls: props.pickerPrefixCls, pickerItemStyle: itemStyle },
	                    props.data.map(function (d) {
	                        return { props: { children: d } };
	                    })
	                );
	                popupMoreProps = {
	                    pickerValueProp: 'selectedValue',
	                    pickerValueChangeProp: 'onValueChange'
	                };
	            }
	            return _react2['default'].createElement(
	                _Popup2['default'],
	                (0, _extends3['default'])({ cascader: cascader }, _popupProps2['default'], props, { prefixCls: popupPrefixCls, value: value, dismissText: dismissText, okText: okText }, popupMoreProps),
	                _react2['default'].cloneElement(children, { extra: this.getSel() || extra })
	            );
	        }
	    }]);
	    return Picker;
	}(_react2['default'].Component);

	exports['default'] = Picker;

	Picker.defaultProps = getDefaultProps();
	module.exports = exports['default'];

/***/ },

/***/ 877:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(790);

	var _extends3 = _interopRequireDefault(_extends2);

	var _classCallCheck2 = __webpack_require__(828);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(829);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(833);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(869);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	var _Popup = __webpack_require__(878);

	var _Popup2 = _interopRequireDefault(_Popup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var PopupCascader = function (_React$Component) {
	    (0, _inherits3['default'])(PopupCascader, _React$Component);

	    function PopupCascader() {
	        (0, _classCallCheck3['default'])(this, PopupCascader);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (PopupCascader.__proto__ || Object.getPrototypeOf(PopupCascader)).apply(this, arguments));

	        _this.onOk = function (v) {
	            var _this$props = _this.props,
	                onChange = _this$props.onChange,
	                onOk = _this$props.onOk;

	            if (onChange) {
	                onChange(v);
	            }
	            if (onOk) {
	                onOk(v);
	            }
	        };
	        return _this;
	    }

	    (0, _createClass3['default'])(PopupCascader, [{
	        key: 'render',
	        value: function render() {
	            return _react2['default'].createElement(_Popup2['default'], (0, _extends3['default'])({ picker: this.props.cascader }, this.props, { onOk: this.onOk }));
	        }
	    }]);
	    return PopupCascader;
	}(_react2['default'].Component);

	PopupCascader.defaultProps = {
	    pickerValueProp: 'value',
	    pickerValueChangeProp: 'onChange'
	};
	exports['default'] = PopupCascader;
	module.exports = exports['default'];

/***/ },

/***/ 878:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	var _rcDialog = __webpack_require__(879);

	var _rcDialog2 = _interopRequireDefault(_rcDialog);

	var _createReactClass = __webpack_require__(880);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _PopupMixin = __webpack_require__(901);

	var _PopupMixin2 = _interopRequireDefault(_PopupMixin);

	var _rcTouchable = __webpack_require__(903);

	var _rcTouchable2 = _interopRequireDefault(_rcTouchable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var PopupPicker = (0, _createReactClass2['default'])({
	  mixins: [_PopupMixin2['default']],
	  getDefaultProps: function getDefaultProps() {
	    return {
	      prefixCls: 'rmc-picker-popup',
	      triggerType: 'onClick',
	      WrapComponent: 'span'
	    };
	  },
	  getModal: function getModal() {
	    var props = this.props;
	    if (!this.state.visible) {
	      return null;
	    }
	    var prefixCls = props.prefixCls;

	    return _react2['default'].createElement(
	      _rcDialog2['default'],
	      { prefixCls: '' + prefixCls, className: props.className || '', visible: true, closable: false, transitionName: props.transitionName || props.popupTransitionName, maskTransitionName: props.maskTransitionName, onClose: this.hide, style: props.style },
	      _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'div',
	          { className: prefixCls + '-header' },
	          _react2['default'].createElement(
	            _rcTouchable2['default'],
	            { activeClassName: prefixCls + '-item-active' },
	            _react2['default'].createElement(
	              'div',
	              { className: prefixCls + '-item ' + prefixCls + '-header-left', onClick: this.onDismiss },
	              props.dismissText
	            )
	          ),
	          _react2['default'].createElement(
	            'div',
	            { className: prefixCls + '-item ' + prefixCls + '-title' },
	            props.title
	          ),
	          _react2['default'].createElement(
	            _rcTouchable2['default'],
	            { activeClassName: prefixCls + '-item-active' },
	            _react2['default'].createElement(
	              'div',
	              { className: prefixCls + '-item ' + prefixCls + '-header-right', onClick: this.onOk },
	              props.okText
	            )
	          )
	        ),
	        this.getContent()
	      )
	    );
	  },
	  render: function render() {
	    return this.getRender();
	  }
	});
	exports['default'] = PopupPicker;
	module.exports = exports['default'];

/***/ },

/***/ 901:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty2 = __webpack_require__(902);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function noop() {}
	exports['default'] = {
	    getDefaultProps: function getDefaultProps() {
	        return {
	            onVisibleChange: noop,
	            okText: 'Ok',
	            pickerValueProp: 'selectedValue',
	            pickerValueChangeProp: 'onValueChange',
	            dismissText: 'Dismiss',
	            title: '',
	            onOk: noop,
	            onDismiss: noop
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            pickerValue: 'value' in this.props ? this.props.value : null,
	            visible: this.props.visible || false
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if ('value' in nextProps) {
	            this.setState({
	                pickerValue: nextProps.value
	            });
	        }
	        if ('visible' in nextProps) {
	            this.setVisibleState(nextProps.visible);
	        }
	    },
	    onPickerChange: function onPickerChange(pickerValue) {
	        if (this.state.pickerValue !== pickerValue) {
	            this.setState({
	                pickerValue: pickerValue
	            });
	            var _props = this.props,
	                picker = _props.picker,
	                pickerValueChangeProp = _props.pickerValueChangeProp;

	            if (picker && picker.props[pickerValueChangeProp]) {
	                picker.props[pickerValueChangeProp](pickerValue);
	            }
	        }
	    },
	    saveRef: function saveRef(picker) {
	        this.picker = picker;
	    },
	    setVisibleState: function setVisibleState(visible) {
	        this.setState({
	            visible: visible
	        });
	        if (!visible) {
	            this.setState({
	                pickerValue: null
	            });
	        }
	    },
	    fireVisibleChange: function fireVisibleChange(visible) {
	        if (this.state.visible !== visible) {
	            if (!('visible' in this.props)) {
	                this.setVisibleState(visible);
	            }
	            this.props.onVisibleChange(visible);
	        }
	    },
	    getRender: function getRender() {
	        var props = this.props;
	        var children = props.children;
	        if (!children) {
	            return this.getModal();
	        }
	        var _props2 = this.props,
	            WrapComponent = _props2.WrapComponent,
	            disabled = _props2.disabled;

	        var child = children;
	        var newChildProps = {};
	        if (!disabled) {
	            newChildProps[props.triggerType] = this.onTriggerClick;
	        }
	        return _react2['default'].createElement(
	            WrapComponent,
	            { style: props.wrapStyle },
	            _react2['default'].cloneElement(child, newChildProps),
	            this.getModal()
	        );
	    },
	    onTriggerClick: function onTriggerClick(e) {
	        var child = this.props.children;
	        var childProps = child.props || {};
	        if (childProps[this.props.triggerType]) {
	            childProps[this.props.triggerType](e);
	        }
	        this.fireVisibleChange(!this.state.visible);
	    },
	    onOk: function onOk() {
	        this.props.onOk(this.picker && this.picker.getValue());
	        this.fireVisibleChange(false);
	    },
	    getContent: function getContent() {
	        if (this.props.picker) {
	            var _React$cloneElement;

	            var pickerValue = this.state.pickerValue;

	            if (pickerValue === null) {
	                pickerValue = this.props.value;
	            }
	            return _react2['default'].cloneElement(this.props.picker, (_React$cloneElement = {}, (0, _defineProperty3['default'])(_React$cloneElement, this.props.pickerValueProp, pickerValue), (0, _defineProperty3['default'])(_React$cloneElement, this.props.pickerValueChangeProp, this.onPickerChange), (0, _defineProperty3['default'])(_React$cloneElement, 'ref', this.saveRef), _React$cloneElement));
	        } else {
	            return this.props.content;
	        }
	    },
	    onDismiss: function onDismiss() {
	        this.props.onDismiss();
	        this.fireVisibleChange(false);
	    },
	    hide: function hide() {
	        this.fireVisibleChange(false);
	    }
	};
	module.exports = exports['default'];

/***/ },

/***/ 905:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classCallCheck2 = __webpack_require__(828);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(829);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(833);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(869);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	var _arrayTreeFilter = __webpack_require__(906);

	var _arrayTreeFilter2 = _interopRequireDefault(_arrayTreeFilter);

	var _MultiPicker = __webpack_require__(907);

	var _MultiPicker2 = _interopRequireDefault(_MultiPicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Cascader = function (_React$Component) {
	    (0, _inherits3['default'])(Cascader, _React$Component);

	    function Cascader() {
	        (0, _classCallCheck3['default'])(this, Cascader);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Cascader.__proto__ || Object.getPrototypeOf(Cascader)).apply(this, arguments));

	        _this.state = {
	            value: _this.getValue(_this.props.data, _this.props.defaultValue || _this.props.value)
	        };
	        _this.onValueChange = function (value, index) {
	            var children = (0, _arrayTreeFilter2['default'])(_this.props.data, function (c, level) {
	                return level <= index && c.value === value[level];
	            });
	            var data = children[index];
	            var i = void 0;
	            for (i = index + 1; data && data.children && data.children.length && i < _this.props.cols; i++) {
	                data = data.children[0];
	                value[i] = data.value;
	            }
	            value.length = i;
	            if (!('value' in _this.props)) {
	                _this.setState({
	                    value: value
	                });
	            }
	            if (_this.props.onChange) {
	                _this.props.onChange(value);
	            }
	        };
	        return _this;
	    }

	    (0, _createClass3['default'])(Cascader, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if ('value' in nextProps) {
	                this.setState({
	                    value: this.getValue(nextProps.data, nextProps.value)
	                });
	            }
	        }
	    }, {
	        key: 'getValue',
	        value: function getValue(d, val) {
	            var data = d || this.props.data;
	            var value = val || this.props.value || this.props.defaultValue;
	            if (!value || !value.length) {
	                value = [];
	                for (var i = 0; i < this.props.cols; i++) {
	                    if (data && data.length) {
	                        value[i] = data[0].value;
	                        data = data[0].children;
	                    }
	                }
	            }
	            return value;
	        }
	    }, {
	        key: 'getCols',
	        value: function getCols() {
	            var _props = this.props,
	                data = _props.data,
	                cols = _props.cols;

	            var value = this.state.value;
	            var childrenTree = (0, _arrayTreeFilter2['default'])(data, function (c, level) {
	                return c.value === value[level];
	            }).map(function (c) {
	                return c.children;
	            });
	            childrenTree.length = cols - 1;
	            childrenTree.unshift(data);
	            return childrenTree.map(function (children) {
	                return {
	                    props: {
	                        children: children || []
	                    }
	                };
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var props = this.props;
	            var prefixCls = props.prefixCls,
	                pickerPrefixCls = props.pickerPrefixCls,
	                className = props.className,
	                rootNativeProps = props.rootNativeProps,
	                disabled = props.disabled,
	                pickerItemStyle = props.pickerItemStyle,
	                indicatorStyle = props.indicatorStyle;

	            return _react2['default'].createElement(_MultiPicker2['default'], { prefixCls: prefixCls, pickerPrefixCls: pickerPrefixCls, disabled: disabled, className: className, selectedValue: this.state.value, rootNativeProps: rootNativeProps, indicatorStyle: indicatorStyle, pickerItemStyle: pickerItemStyle, onValueChange: this.onValueChange }, this.getCols());
	        }
	    }]);
	    return Cascader;
	}(_react2['default'].Component);

	Cascader.defaultProps = {
	    cols: 3,
	    prefixCls: 'rmc-cascader',
	    pickerPrefixCls: 'rmc-picker',
	    data: [],
	    disabled: false
	};
	exports['default'] = Cascader;
	module.exports = exports['default'];

/***/ },

/***/ 907:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(790);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(908);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _createReactClass = __webpack_require__(880);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _Picker = __webpack_require__(909);

	var _Picker2 = _interopRequireDefault(_Picker);

	var _MultiPickerMixin = __webpack_require__(917);

	var _MultiPickerMixin2 = _interopRequireDefault(_MultiPickerMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var MultiPicker = (0, _createReactClass2['default'])({
	    mixins: [_MultiPickerMixin2['default']],
	    render: function render() {
	        var _this = this;

	        var _props = this.props,
	            prefixCls = _props.prefixCls,
	            pickerPrefixCls = _props.pickerPrefixCls,
	            className = _props.className,
	            rootNativeProps = _props.rootNativeProps,
	            disabled = _props.disabled,
	            pickerItemStyle = _props.pickerItemStyle,
	            indicatorStyle = _props.indicatorStyle,
	            pure = _props.pure,
	            children = _props.children;

	        var selectedValue = this.getValue();
	        var colElements = children.map(function (col, i) {
	            return _react2['default'].createElement(
	                'div',
	                { key: col.key || i, className: prefixCls + '-item' },
	                _react2['default'].createElement(_Picker2['default'], (0, _extends3['default'])({ itemStyle: pickerItemStyle, disabled: disabled, pure: pure, indicatorStyle: indicatorStyle, prefixCls: pickerPrefixCls, selectedValue: selectedValue[i], onValueChange: function onValueChange() {
	                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                            args[_key] = arguments[_key];
	                        }

	                        return _this.onValueChange.apply(_this, [i].concat(args));
	                    } }, col.props))
	            );
	        });
	        return _react2['default'].createElement(
	            'div',
	            (0, _extends3['default'])({}, rootNativeProps, { className: (0, _classnames2['default'])(className, prefixCls) }),
	            colElements
	        );
	    }
	});
	exports['default'] = MultiPicker;
	module.exports = exports['default'];

/***/ },

/***/ 909:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defineProperty2 = __webpack_require__(902);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	var _createReactClass = __webpack_require__(880);

	var _createReactClass2 = _interopRequireDefault(_createReactClass);

	var _classnames = __webpack_require__(908);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _zscroller = __webpack_require__(910);

	var _zscroller2 = _interopRequireDefault(_zscroller);

	var _PickerMixin = __webpack_require__(915);

	var _PickerMixin2 = _interopRequireDefault(_PickerMixin);

	var _isChildrenEqual = __webpack_require__(916);

	var _isChildrenEqual2 = _interopRequireDefault(_isChildrenEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Picker = (0, _createReactClass2['default'])({
	    mixins: [_PickerMixin2['default']],
	    getDefaultProps: function getDefaultProps() {
	        return {
	            prefixCls: 'rmc-picker',
	            pure: true
	        };
	    },
	    getInitialState: function getInitialState() {
	        var selectedValueState = void 0;
	        var _props = this.props,
	            selectedValue = _props.selectedValue,
	            defaultSelectedValue = _props.defaultSelectedValue,
	            children = _props.children;

	        if (selectedValue !== undefined) {
	            selectedValueState = selectedValue;
	        } else if (defaultSelectedValue !== undefined) {
	            selectedValueState = defaultSelectedValue;
	        } else if (children && children.length) {
	            selectedValueState = children[0].value;
	        }
	        return {
	            selectedValue: selectedValueState
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        // https://github.com/react-component/m-picker/issues/18
	        this.itemHeight = this.refs.indicator.getBoundingClientRect().height;
	        // compact
	        this.refs.content.style.padding = this.itemHeight * 3 + 'px 0';
	        this.zscroller = new _zscroller2['default'](this.refs.content, {
	            scrollingX: false,
	            snapping: true,
	            locking: false,
	            penetrationDeceleration: .1,
	            minVelocityToKeepDecelerating: 0.5,
	            scrollingComplete: this.scrollingComplete
	        });
	        this.zscroller.setDisabled(this.props.disabled);
	        this.zscroller.scroller.setSnapSize(0, this.itemHeight);
	        this.select(this.state.selectedValue);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        if ('selectedValue' in nextProps) {
	            this.setState({
	                selectedValue: nextProps.selectedValue
	            });
	        }
	        this.zscroller.setDisabled(nextProps.disabled);
	    },
	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        return this.state.selectedValue !== nextState.selectedValue || !(0, _isChildrenEqual2['default'])(this.props.children, nextProps.children, this.props.pure);
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        this.zscroller.reflow();
	        this.select(this.state.selectedValue);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        this.zscroller.destroy();
	    },
	    scrollTo: function scrollTo(top) {
	        this.zscroller.scroller.scrollTo(0, top);
	    },
	    fireValueChange: function fireValueChange(selectedValue) {
	        if (selectedValue !== this.state.selectedValue) {
	            if (!('selectedValue' in this.props)) {
	                this.setState({
	                    selectedValue: selectedValue
	                });
	            }
	            if (this.props.onValueChange) {
	                this.props.onValueChange(selectedValue);
	            }
	        }
	    },
	    scrollingComplete: function scrollingComplete() {
	        var _zscroller$scroller$g = this.zscroller.scroller.getValues(),
	            top = _zscroller$scroller$g.top;

	        if (top >= 0) {
	            this.doScrollingComplete(top);
	        }
	    },
	    getChildMember: function getChildMember(child, m) {
	        return child[m];
	    },
	    getValue: function getValue() {
	        return this.props.selectedValue || this.props.children && this.props.children[0] && this.props.children[0].value;
	    },
	    toChildrenArray: function toChildrenArray(children) {
	        // when use preact，when the children is [] will change to undeined
	        return children || [];
	    },
	    render: function render() {
	        var _pickerCls;

	        var _props2 = this.props,
	            children = _props2.children,
	            prefixCls = _props2.prefixCls,
	            className = _props2.className,
	            itemStyle = _props2.itemStyle,
	            indicatorStyle = _props2.indicatorStyle;
	        var selectedValue = this.state.selectedValue;

	        var itemClassName = prefixCls + '-item';
	        var selectedItemClassName = itemClassName + ' ' + prefixCls + '-item-selected';
	        var items = this.toChildrenArray(children).map(function (item) {
	            return _react2['default'].createElement(
	                'div',
	                { style: itemStyle, className: selectedValue === item.value ? selectedItemClassName : itemClassName, key: item.value },
	                item.label
	            );
	        });
	        var pickerCls = (_pickerCls = {}, (0, _defineProperty3['default'])(_pickerCls, className, !!className), (0, _defineProperty3['default'])(_pickerCls, prefixCls, true), _pickerCls);
	        return _react2['default'].createElement(
	            'div',
	            { className: (0, _classnames2['default'])(pickerCls) },
	            _react2['default'].createElement('div', { className: prefixCls + '-mask' }),
	            _react2['default'].createElement('div', { className: prefixCls + '-indicator', ref: 'indicator', style: indicatorStyle }),
	            _react2['default'].createElement(
	                'div',
	                { className: prefixCls + '-content', ref: 'content' },
	                items
	            )
	        );
	    }
	});
	exports['default'] = Picker;
	module.exports = exports['default'];

/***/ },

/***/ 910:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(790);

	var _extends3 = _interopRequireDefault(_extends2);

	var _Scroller = __webpack_require__(911);

	var _Scroller2 = _interopRequireDefault(_Scroller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var MIN_INDICATOR_SIZE = 8;

	function setTransform(nodeStyle, value) {
	  nodeStyle.transform = value;
	  nodeStyle.webkitTransform = value;
	  nodeStyle.MozTransform = value;
	}

	function setTransformOrigin(nodeStyle, value) {
	  nodeStyle.transformOrigin = value;
	  nodeStyle.webkitTransformOrigin = value;
	  nodeStyle.MozTransformOrigin = value;
	}

	function DOMScroller(content) {
	  var _this = this;

	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var scrollbars = void 0;
	  var indicators = void 0;
	  var indicatorsSize = void 0;
	  var scrollbarsSize = void 0;
	  var indicatorsPos = void 0;
	  var scrollbarsOpacity = void 0;
	  var contentSize = void 0;
	  var clientSize = void 0;

	  this.content = content;
	  this.container = content.parentNode;
	  this.options = (0, _extends3['default'])({}, options, {
	    scrollingComplete: function scrollingComplete() {
	      _this.clearScrollbarTimer();
	      _this.timer = setTimeout(function () {
	        if (_this._destroyed) {
	          return;
	        }
	        if (options.scrollingComplete) {
	          options.scrollingComplete();
	        }
	        if (scrollbars) {
	          ['x', 'y'].forEach(function (k) {
	            if (scrollbars[k]) {
	              _this.setScrollbarOpacity(k, 0);
	            }
	          });
	        }
	      }, 0);
	    }
	  });

	  if (this.options.scrollbars) {
	    scrollbars = this.scrollbars = {};
	    indicators = this.indicators = {};
	    indicatorsSize = this.indicatorsSize = {};
	    scrollbarsSize = this.scrollbarsSize = {};
	    indicatorsPos = this.indicatorsPos = {};
	    scrollbarsOpacity = this.scrollbarsOpacity = {};
	    contentSize = this.contentSize = {};
	    clientSize = this.clientSize = {};

	    ['x', 'y'].forEach(function (k) {
	      var optionName = k === 'x' ? 'scrollingX' : 'scrollingY';
	      if (_this.options[optionName] !== false) {
	        scrollbars[k] = document.createElement('div');
	        scrollbars[k].className = 'zscroller-scrollbar-' + k;
	        indicators[k] = document.createElement('div');
	        indicators[k].className = 'zscroller-indicator-' + k;
	        scrollbars[k].appendChild(indicators[k]);
	        indicatorsSize[k] = -1;
	        scrollbarsOpacity[k] = 0;
	        indicatorsPos[k] = 0;
	        _this.container.appendChild(scrollbars[k]);
	      }
	    });
	  }

	  var init = true;
	  var contentStyle = content.style;

	  // create Scroller instance
	  this.scroller = new _Scroller2['default'](function (left, top, zoom) {
	    if (!init && options.onScroll) {
	      options.onScroll();
	    }
	    setTransform(contentStyle, 'translate3d(' + -left + 'px,' + -top + 'px,0) scale(' + zoom + ')');
	    if (scrollbars) {
	      ['x', 'y'].forEach(function (k) {
	        if (scrollbars[k]) {
	          var pos = k === 'x' ? left : top;
	          if (clientSize[k] >= contentSize[k]) {
	            _this.setScrollbarOpacity(k, 0);
	          } else {
	            if (!init) {
	              _this.setScrollbarOpacity(k, 1);
	            }
	            var normalIndicatorSize = clientSize[k] / contentSize[k] * scrollbarsSize[k];
	            var size = normalIndicatorSize;
	            var indicatorPos = void 0;
	            if (pos < 0) {
	              size = Math.max(normalIndicatorSize + pos, MIN_INDICATOR_SIZE);
	              indicatorPos = 0;
	            } else if (pos > contentSize[k] - clientSize[k]) {
	              size = Math.max(normalIndicatorSize + contentSize[k] - clientSize[k] - pos, MIN_INDICATOR_SIZE);
	              indicatorPos = scrollbarsSize[k] - size;
	            } else {
	              indicatorPos = pos / contentSize[k] * scrollbarsSize[k];
	            }
	            _this.setIndicatorSize(k, size);
	            _this.setIndicatorPos(k, indicatorPos);
	          }
	        }
	      });
	    }
	    init = false;
	  }, this.options);

	  // bind events
	  this.bindEvents();

	  // the content element needs a correct transform origin for zooming
	  setTransformOrigin(content.style, 'left top');

	  // reflow for the first time
	  this.reflow();
	}

	DOMScroller.prototype.setDisabled = function setDisabled(disabled) {
	  this.disabled = disabled;
	};

	DOMScroller.prototype.clearScrollbarTimer = function clearScrollbarTimer() {
	  if (this.timer) {
	    clearTimeout(this.timer);
	    this.timer = null;
	  }
	};

	DOMScroller.prototype.setScrollbarOpacity = function setScrollbarOpacity(axis, opacity) {
	  if (this.scrollbarsOpacity[axis] !== opacity) {
	    this.scrollbars[axis].style.opacity = opacity;
	    this.scrollbarsOpacity[axis] = opacity;
	  }
	};

	DOMScroller.prototype.setIndicatorPos = function setIndicatorPos(axis, value) {
	  if (this.indicatorsPos[axis] !== value) {
	    if (axis === 'x') {
	      setTransform(this.indicators[axis].style, 'translate3d(' + value + 'px,0,0)');
	    } else {
	      setTransform(this.indicators[axis].style, 'translate3d(0, ' + value + 'px,0)');
	    }
	    this.indicatorsPos[axis] = value;
	  }
	};

	DOMScroller.prototype.setIndicatorSize = function setIndicatorSize(axis, value) {
	  if (this.indicatorsSize[axis] !== value) {
	    this.indicators[axis].style[axis === 'x' ? 'width' : 'height'] = value + 'px';
	    this.indicatorsSize[axis] = value;
	  }
	};

	DOMScroller.prototype.reflow = function reflow() {
	  if (this.scrollbars) {
	    this.contentSize.x = this.content.offsetWidth;
	    this.contentSize.y = this.content.offsetHeight;
	    this.clientSize.x = this.container.clientWidth;
	    this.clientSize.y = this.container.clientHeight;
	    if (this.scrollbars.x) {
	      this.scrollbarsSize.x = this.scrollbars.x.offsetWidth;
	    }
	    if (this.scrollbars.y) {
	      this.scrollbarsSize.y = this.scrollbars.y.offsetHeight;
	    }
	  }
	  // set the right scroller dimensions
	  this.scroller.setDimensions(this.container.clientWidth, this.container.clientHeight, this.content.offsetWidth, this.content.offsetHeight);

	  // refresh the position for zooming purposes
	  var rect = this.container.getBoundingClientRect();
	  this.scroller.setPosition(rect.x + this.container.clientLeft, rect.y + this.container.clientTop);
	};

	DOMScroller.prototype.destroy = function destroy() {
	  this._destroyed = true;
	  window.removeEventListener('resize', this.onResize, false);
	  this.container.removeEventListener('touchstart', this.onTouchStart, false);
	  this.container.removeEventListener('touchmove', this.onTouchMove, false);
	  this.container.removeEventListener('touchend', this.onTouchEnd, false);
	  this.container.removeEventListener('touchcancel', this.onTouchCancel, false);
	  this.container.removeEventListener('mousedown', this.onMouseDown, false);
	  document.removeEventListener('mousemove', this.onMouseMove, false);
	  document.removeEventListener('mouseup', this.onMouseUp, false);
	  this.container.removeEventListener('mousewheel', this.onMouseWheel, false);
	};

	DOMScroller.prototype.bindEvents = function bindEvents() {
	  var _this2 = this;

	  var that = this;

	  // reflow handling
	  window.addEventListener('resize', this.onResize = function () {
	    that.reflow();
	  }, false);

	  var lockMouse = false;
	  var releaseLockTimer = void 0;

	  this.container.addEventListener('touchstart', this.onTouchStart = function (e) {
	    lockMouse = true;
	    if (releaseLockTimer) {
	      clearTimeout(releaseLockTimer);
	      releaseLockTimer = null;
	    }
	    // Don't react if initial down happens on a form element
	    if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i) || _this2.disabled) {
	      return;
	    }
	    _this2.clearScrollbarTimer();
	    // reflow since the container may have changed
	    that.reflow();
	    that.scroller.doTouchStart(e.touches, e.timeStamp);
	  }, false);

	  this.container.addEventListener('touchmove', this.onTouchMove = function (e) {
	    e.preventDefault();
	    that.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
	  }, false);

	  this.container.addEventListener('touchend', this.onTouchEnd = function (e) {
	    that.scroller.doTouchEnd(e.timeStamp);
	    releaseLockTimer = setTimeout(function () {
	      lockMouse = false;
	    }, 300);
	  }, false);

	  this.container.addEventListener('touchcancel', this.onTouchCancel = function (e) {
	    that.scroller.doTouchEnd(e.timeStamp);
	    releaseLockTimer = setTimeout(function () {
	      lockMouse = false;
	    }, 300);
	  }, false);

	  this.onMouseUp = function (e) {
	    that.scroller.doTouchEnd(e.timeStamp);
	    document.removeEventListener('mousemove', _this2.onMouseMove, false);
	    document.removeEventListener('mouseup', _this2.onMouseUp, false);
	  };

	  this.onMouseMove = function (e) {
	    that.scroller.doTouchMove([{
	      pageX: e.pageX,
	      pageY: e.pageY
	    }], e.timeStamp);
	  };

	  this.container.addEventListener('mousedown', this.onMouseDown = function (e) {
	    if (lockMouse || e.target.tagName.match(/input|textarea|select/i) || _this2.disabled) {
	      return;
	    }
	    _this2.clearScrollbarTimer();
	    that.scroller.doTouchStart([{
	      pageX: e.pageX,
	      pageY: e.pageY
	    }], e.timeStamp);
	    // reflow since the container may have changed
	    that.reflow();
	    e.preventDefault();
	    document.addEventListener('mousemove', _this2.onMouseMove, false);
	    document.addEventListener('mouseup', _this2.onMouseUp, false);
	  }, false);

	  this.container.addEventListener('mousewheel', this.onMouseWheel = function (e) {
	    if (that.options.zooming) {
	      that.scroller.doMouseZoom(e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
	      e.preventDefault();
	    }
	  }, false);
	};

	exports['default'] = DOMScroller;
	module.exports = exports['default'];

/***/ },

/***/ 911:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Animate = __webpack_require__(912);

	var _Animate2 = _interopRequireDefault(_Animate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var Scroller; /*
	               * Scroller
	               * http://github.com/zynga/scroller
	               *
	               * Copyright 2011, Zynga Inc.
	               * Licensed under the MIT License.
	               * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
	               *
	               * Based on the work of: Unify Project (unify-project.org)
	               * http://unify-project.org
	               * Copyright 2011, Deutsche Telekom AG
	               * License: MIT + Apache (V2)
	               */

	var NOOP = function NOOP() {};

	/**
	 * A pure logic 'component' for 'virtual' scrolling/zooming.
	 */
	Scroller = function Scroller(callback, options) {

	  this.__callback = callback;

	  this.options = {

	    /** Enable scrolling on x-axis */
	    scrollingX: true,

	    /** Enable scrolling on y-axis */
	    scrollingY: true,

	    /** Enable animations for deceleration, snap back, zooming and scrolling */
	    animating: true,

	    /** duration for animations triggered by scrollTo/zoomTo */
	    animationDuration: 250,

	    /** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
	    bouncing: true,

	    /** Enable locking to the main axis if user moves only slightly on one of them at start */
	    locking: true,

	    /** Enable pagination mode (switching between full page content panes) */
	    paging: false,

	    /** Enable snapping of content to a configured pixel grid */
	    snapping: false,

	    /** Enable zooming of content via API, fingers and mouse wheel */
	    zooming: false,

	    /** Minimum zoom level */
	    minZoom: 0.5,

	    /** Maximum zoom level */
	    maxZoom: 3,

	    /** Multiply or decrease scrolling speed **/
	    speedMultiplier: 1,

	    /** Callback that is fired on the later of touch end or deceleration end,
	     provided that another scrolling action has not begun. Used to know
	     when to fade out a scrollbar. */
	    scrollingComplete: NOOP,

	    /** This configures the amount of change applied to deceleration when reaching boundaries  **/
	    penetrationDeceleration: 0.03,

	    /** This configures the amount of change applied to acceleration when reaching boundaries  **/
	    penetrationAcceleration: 0.08

	  };

	  for (var key in options) {
	    this.options[key] = options[key];
	  }
	};

	// Easing Equations (c) 2003 Robert Penner, all rights reserved.
	// Open source under the BSD License.

	/**
	 * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
	 **/
	var easeOutCubic = function easeOutCubic(pos) {
	  return Math.pow(pos - 1, 3) + 1;
	};

	/**
	 * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
	 **/
	var easeInOutCubic = function easeInOutCubic(pos) {
	  if ((pos /= 0.5) < 1) {
	    return 0.5 * Math.pow(pos, 3);
	  }

	  return 0.5 * (Math.pow(pos - 2, 3) + 2);
	};

	var members = {

	  /*
	   ---------------------------------------------------------------------------
	   INTERNAL FIELDS :: STATUS
	   ---------------------------------------------------------------------------
	   */

	  /** {Boolean} Whether only a single finger is used in touch handling */
	  __isSingleTouch: false,

	  /** {Boolean} Whether a touch event sequence is in progress */
	  __isTracking: false,

	  /** {Boolean} Whether a deceleration animation went to completion. */
	  __didDecelerationComplete: false,

	  /**
	   * {Boolean} Whether a gesture zoom/rotate event is in progress. Activates when
	   * a gesturestart event happens. This has higher priority than dragging.
	   */
	  __isGesturing: false,

	  /**
	   * {Boolean} Whether the user has moved by such a distance that we have enabled
	   * dragging mode. Hint: It's only enabled after some pixels of movement to
	   * not interrupt with clicks etc.
	   */
	  __isDragging: false,

	  /**
	   * {Boolean} Not touching and dragging anymore, and smoothly animating the
	   * touch sequence using deceleration.
	   */
	  __isDecelerating: false,

	  /**
	   * {Boolean} Smoothly animating the currently configured change
	   */
	  __isAnimating: false,

	  /*
	   ---------------------------------------------------------------------------
	   INTERNAL FIELDS :: DIMENSIONS
	   ---------------------------------------------------------------------------
	   */

	  /** {Integer} Available outer left position (from document perspective) */
	  __clientLeft: 0,

	  /** {Integer} Available outer top position (from document perspective) */
	  __clientTop: 0,

	  /** {Integer} Available outer width */
	  __clientWidth: 0,

	  /** {Integer} Available outer height */
	  __clientHeight: 0,

	  /** {Integer} Outer width of content */
	  __contentWidth: 0,

	  /** {Integer} Outer height of content */
	  __contentHeight: 0,

	  /** {Integer} Snapping width for content */
	  __snapWidth: 100,

	  /** {Integer} Snapping height for content */
	  __snapHeight: 100,

	  /** {Integer} Height to assign to refresh area */
	  __refreshHeight: null,

	  /** {Boolean} Whether the refresh process is enabled when the event is released now */
	  __refreshActive: false,

	  /** {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release */
	  __refreshActivate: null,

	  /** {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled */
	  __refreshDeactivate: null,

	  /** {Function} Callback to execute to start the actual refresh. Call {@link #refreshFinish} when done */
	  __refreshStart: null,

	  /** {Number} Zoom level */
	  __zoomLevel: 1,

	  /** {Number} Scroll position on x-axis */
	  __scrollLeft: 0,

	  /** {Number} Scroll position on y-axis */
	  __scrollTop: 0,

	  /** {Integer} Maximum allowed scroll position on x-axis */
	  __maxScrollLeft: 0,

	  /** {Integer} Maximum allowed scroll position on y-axis */
	  __maxScrollTop: 0,

	  /* {Number} Scheduled left position (final position when animating) */
	  __scheduledLeft: 0,

	  /* {Number} Scheduled top position (final position when animating) */
	  __scheduledTop: 0,

	  /* {Number} Scheduled zoom level (final scale when animating) */
	  __scheduledZoom: 0,

	  /*
	   ---------------------------------------------------------------------------
	   INTERNAL FIELDS :: LAST POSITIONS
	   ---------------------------------------------------------------------------
	   */

	  /** {Number} Left position of finger at start */
	  __lastTouchLeft: null,

	  /** {Number} Top position of finger at start */
	  __lastTouchTop: null,

	  /** {Date} Timestamp of last move of finger. Used to limit tracking range for deceleration speed. */
	  __lastTouchMove: null,

	  /** {Array} List of positions, uses three indexes for each state: left, top, timestamp */
	  __positions: null,

	  /*
	   ---------------------------------------------------------------------------
	   INTERNAL FIELDS :: DECELERATION SUPPORT
	   ---------------------------------------------------------------------------
	   */

	  /** {Integer} Minimum left scroll position during deceleration */
	  __minDecelerationScrollLeft: null,

	  /** {Integer} Minimum top scroll position during deceleration */
	  __minDecelerationScrollTop: null,

	  /** {Integer} Maximum left scroll position during deceleration */
	  __maxDecelerationScrollLeft: null,

	  /** {Integer} Maximum top scroll position during deceleration */
	  __maxDecelerationScrollTop: null,

	  /** {Number} Current factor to modify horizontal scroll position with on every step */
	  __decelerationVelocityX: null,

	  /** {Number} Current factor to modify vertical scroll position with on every step */
	  __decelerationVelocityY: null,

	  /*
	   ---------------------------------------------------------------------------
	   PUBLIC API
	   ---------------------------------------------------------------------------
	   */

	  /**
	   * Configures the dimensions of the client (outer) and content (inner) elements.
	   * Requires the available space for the outer element and the outer size of the inner element.
	   * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
	   *
	   * @param clientWidth {Integer ? null} Inner width of outer element
	   * @param clientHeight {Integer ? null} Inner height of outer element
	   * @param contentWidth {Integer ? null} Outer width of inner element
	   * @param contentHeight {Integer ? null} Outer height of inner element
	   */
	  setDimensions: function setDimensions(clientWidth, clientHeight, contentWidth, contentHeight) {

	    var self = this;

	    // Only update values which are defined
	    if (clientWidth === +clientWidth) {
	      self.__clientWidth = clientWidth;
	    }

	    if (clientHeight === +clientHeight) {
	      self.__clientHeight = clientHeight;
	    }

	    if (contentWidth === +contentWidth) {
	      self.__contentWidth = contentWidth;
	    }

	    if (contentHeight === +contentHeight) {
	      self.__contentHeight = contentHeight;
	    }

	    // Refresh maximums
	    self.__computeScrollMax();

	    // Refresh scroll position
	    self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
	  },

	  /**
	   * Sets the client coordinates in relation to the document.
	   *
	   * @param left {Integer ? 0} Left position of outer element
	   * @param top {Integer ? 0} Top position of outer element
	   */
	  setPosition: function setPosition(left, top) {

	    var self = this;

	    self.__clientLeft = left || 0;
	    self.__clientTop = top || 0;
	  },

	  /**
	   * Configures the snapping (when snapping is active)
	   *
	   * @param width {Integer} Snapping width
	   * @param height {Integer} Snapping height
	   */
	  setSnapSize: function setSnapSize(width, height) {

	    var self = this;

	    self.__snapWidth = width;
	    self.__snapHeight = height;
	  },

	  /**
	   * Activates pull-to-refresh. A special zone on the top of the list to start a list refresh whenever
	   * the user event is released during visibility of this zone. This was introduced by some apps on iOS like
	   * the official Twitter client.
	   *
	   * @param height {Integer} Height of pull-to-refresh zone on top of rendered list
	   * @param activateCallback {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release.
	   * @param deactivateCallback {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled.
	   * @param startCallback {Function} Callback to execute to start the real async refresh action. Call {@link #finishPullToRefresh} after finish of refresh.
	   */
	  activatePullToRefresh: function activatePullToRefresh(height, activateCallback, deactivateCallback, startCallback) {

	    var self = this;

	    self.__refreshHeight = height;
	    self.__refreshActivate = activateCallback;
	    self.__refreshDeactivate = deactivateCallback;
	    self.__refreshStart = startCallback;
	  },

	  /**
	   * Starts pull-to-refresh manually.
	   */
	  triggerPullToRefresh: function triggerPullToRefresh() {
	    // Use publish instead of scrollTo to allow scrolling to out of boundary position
	    // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
	    this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);

	    if (this.__refreshStart) {
	      this.__refreshStart();
	    }
	  },

	  /**
	   * Signalizes that pull-to-refresh is finished.
	   */
	  finishPullToRefresh: function finishPullToRefresh() {

	    var self = this;

	    self.__refreshActive = false;
	    if (self.__refreshDeactivate) {
	      self.__refreshDeactivate();
	    }

	    self.scrollTo(self.__scrollLeft, self.__scrollTop, true);
	  },

	  /**
	   * Returns the scroll position and zooming values
	   *
	   * @return {Map} `left` and `top` scroll position and `zoom` level
	   */
	  getValues: function getValues() {

	    var self = this;

	    return {
	      left: self.__scrollLeft,
	      top: self.__scrollTop,
	      zoom: self.__zoomLevel
	    };
	  },

	  /**
	   * Returns the maximum scroll values
	   *
	   * @return {Map} `left` and `top` maximum scroll values
	   */
	  getScrollMax: function getScrollMax() {

	    var self = this;

	    return {
	      left: self.__maxScrollLeft,
	      top: self.__maxScrollTop
	    };
	  },

	  /**
	   * Zooms to the given level. Supports optional animation. Zooms
	   * the center when no coordinates are given.
	   *
	   * @param level {Number} Level to zoom to
	   * @param animate {Boolean ? false} Whether to use animation
	   * @param originLeft {Number ? null} Zoom in at given left coordinate
	   * @param originTop {Number ? null} Zoom in at given top coordinate
	   * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
	   */
	  zoomTo: function zoomTo(level, animate, originLeft, originTop, callback) {

	    var self = this;

	    if (!self.options.zooming) {
	      throw new Error("Zooming is not enabled!");
	    }

	    // Add callback if exists
	    if (callback) {
	      self.__zoomComplete = callback;
	    }

	    // Stop deceleration
	    if (self.__isDecelerating) {
	      _Animate2["default"].stop(self.__isDecelerating);
	      self.__isDecelerating = false;
	    }

	    var oldLevel = self.__zoomLevel;

	    // Normalize input origin to center of viewport if not defined
	    if (originLeft == null) {
	      originLeft = self.__clientWidth / 2;
	    }

	    if (originTop == null) {
	      originTop = self.__clientHeight / 2;
	    }

	    // Limit level according to configuration
	    level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

	    // Recompute maximum values while temporary tweaking maximum scroll ranges
	    self.__computeScrollMax(level);

	    // Recompute left and top coordinates based on new zoom level
	    var left = (originLeft + self.__scrollLeft) * level / oldLevel - originLeft;
	    var top = (originTop + self.__scrollTop) * level / oldLevel - originTop;

	    // Limit x-axis
	    if (left > self.__maxScrollLeft) {
	      left = self.__maxScrollLeft;
	    } else if (left < 0) {
	      left = 0;
	    }

	    // Limit y-axis
	    if (top > self.__maxScrollTop) {
	      top = self.__maxScrollTop;
	    } else if (top < 0) {
	      top = 0;
	    }

	    // Push values out
	    self.__publish(left, top, level, animate);
	  },

	  /**
	   * Zooms the content by the given factor.
	   *
	   * @param factor {Number} Zoom by given factor
	   * @param animate {Boolean ? false} Whether to use animation
	   * @param originLeft {Number ? 0} Zoom in at given left coordinate
	   * @param originTop {Number ? 0} Zoom in at given top coordinate
	   * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
	   */
	  zoomBy: function zoomBy(factor, animate, originLeft, originTop, callback) {

	    var self = this;

	    self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop, callback);
	  },

	  /**
	   * Scrolls to the given position. Respect limitations and snapping automatically.
	   *
	   * @param left {Number?null} Horizontal scroll position, keeps current if value is <code>null</code>
	   * @param top {Number?null} Vertical scroll position, keeps current if value is <code>null</code>
	   * @param animate {Boolean?false} Whether the scrolling should happen using an animation
	   * @param zoom {Number?null} Zoom level to go to
	   */
	  scrollTo: function scrollTo(left, top, animate, zoom, callback) {

	    var self = this;

	    // Stop deceleration
	    if (self.__isDecelerating) {
	      _Animate2["default"].stop(self.__isDecelerating);
	      self.__isDecelerating = false;
	    }

	    // Correct coordinates based on new zoom level
	    if (zoom != null && zoom !== self.__zoomLevel) {

	      if (!self.options.zooming) {
	        throw new Error("Zooming is not enabled!");
	      }

	      left *= zoom;
	      top *= zoom;

	      // Recompute maximum values while temporary tweaking maximum scroll ranges
	      self.__computeScrollMax(zoom);
	    } else {

	      // Keep zoom when not defined
	      zoom = self.__zoomLevel;
	    }

	    if (!self.options.scrollingX) {

	      left = self.__scrollLeft;
	    } else {

	      if (self.options.paging) {
	        left = Math.round(left / self.__clientWidth) * self.__clientWidth;
	      } else if (self.options.snapping) {
	        left = Math.round(left / self.__snapWidth) * self.__snapWidth;
	      }
	    }

	    if (!self.options.scrollingY) {

	      top = self.__scrollTop;
	    } else {

	      if (self.options.paging) {
	        top = Math.round(top / self.__clientHeight) * self.__clientHeight;
	      } else if (self.options.snapping) {
	        top = Math.round(top / self.__snapHeight) * self.__snapHeight;
	      }
	    }

	    // Limit for allowed ranges
	    left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
	    top = Math.max(Math.min(self.__maxScrollTop, top), 0);

	    // Don't animate when no change detected, still call publish to make sure
	    // that rendered position is really in-sync with internal data
	    if (left === self.__scrollLeft && top === self.__scrollTop) {
	      animate = false;
	      if (callback) {
	        callback();
	      }
	    }

	    // Publish new values
	    if (!self.__isTracking) {
	      self.__publish(left, top, zoom, animate);
	    }
	  },

	  /**
	   * Scroll by the given offset
	   *
	   * @param left {Number ? 0} Scroll x-axis by given offset
	   * @param top {Number ? 0} Scroll x-axis by given offset
	   * @param animate {Boolean ? false} Whether to animate the given change
	   */
	  scrollBy: function scrollBy(left, top, animate) {

	    var self = this;

	    var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
	    var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;

	    self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);
	  },

	  /*
	   ---------------------------------------------------------------------------
	   EVENT CALLBACKS
	   ---------------------------------------------------------------------------
	   */

	  /**
	   * Mouse wheel handler for zooming support
	   */
	  doMouseZoom: function doMouseZoom(wheelDelta, timeStamp, pageX, pageY) {

	    var self = this;
	    var change = wheelDelta > 0 ? 0.97 : 1.03;

	    return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);
	  },

	  /**
	   * Touch start handler for scrolling support
	   */
	  doTouchStart: function doTouchStart(touches, timeStamp) {

	    // Array-like check is enough here
	    if (touches.length == null) {
	      throw new Error("Invalid touch list: " + touches);
	    }

	    if (timeStamp instanceof Date) {
	      timeStamp = timeStamp.valueOf();
	    }
	    if (typeof timeStamp !== "number") {
	      throw new Error("Invalid timestamp value: " + timeStamp);
	    }

	    var self = this;

	    // Reset interruptedAnimation flag
	    self.__interruptedAnimation = true;

	    // Stop deceleration
	    if (self.__isDecelerating) {
	      _Animate2["default"].stop(self.__isDecelerating);
	      self.__isDecelerating = false;
	      self.__interruptedAnimation = true;
	    }

	    // Stop animation
	    if (self.__isAnimating) {
	      _Animate2["default"].stop(self.__isAnimating);
	      self.__isAnimating = false;
	      self.__interruptedAnimation = true;
	    }

	    // Use center point when dealing with two fingers
	    var currentTouchLeft, currentTouchTop;
	    var isSingleTouch = touches.length === 1;
	    if (isSingleTouch) {
	      currentTouchLeft = touches[0].pageX;
	      currentTouchTop = touches[0].pageY;
	    } else {
	      currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
	      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
	    }

	    // Store initial positions
	    self.__initialTouchLeft = currentTouchLeft;
	    self.__initialTouchTop = currentTouchTop;

	    // Store current zoom level
	    self.__zoomLevelStart = self.__zoomLevel;

	    // Store initial touch positions
	    self.__lastTouchLeft = currentTouchLeft;
	    self.__lastTouchTop = currentTouchTop;

	    // Store initial move time stamp
	    self.__lastTouchMove = timeStamp;

	    // Reset initial scale
	    self.__lastScale = 1;

	    // Reset locking flags
	    self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
	    self.__enableScrollY = !isSingleTouch && self.options.scrollingY;

	    // Reset tracking flag
	    self.__isTracking = true;

	    // Reset deceleration complete flag
	    self.__didDecelerationComplete = false;

	    // Dragging starts directly with two fingers, otherwise lazy with an offset
	    self.__isDragging = !isSingleTouch;

	    // Some features are disabled in multi touch scenarios
	    self.__isSingleTouch = isSingleTouch;

	    // Clearing data structure
	    self.__positions = [];
	  },

	  /**
	   * Touch move handler for scrolling support
	   */
	  doTouchMove: function doTouchMove(touches, timeStamp, scale) {

	    // Array-like check is enough here
	    if (touches.length == null) {
	      throw new Error("Invalid touch list: " + touches);
	    }

	    if (timeStamp instanceof Date) {
	      timeStamp = timeStamp.valueOf();
	    }
	    if (typeof timeStamp !== "number") {
	      throw new Error("Invalid timestamp value: " + timeStamp);
	    }

	    var self = this;

	    // Ignore event when tracking is not enabled (event might be outside of element)
	    if (!self.__isTracking) {
	      return;
	    }

	    var currentTouchLeft, currentTouchTop;

	    // Compute move based around of center of fingers
	    if (touches.length === 2) {
	      currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
	      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
	    } else {
	      currentTouchLeft = touches[0].pageX;
	      currentTouchTop = touches[0].pageY;
	    }

	    var positions = self.__positions;

	    // Are we already is dragging mode?
	    if (self.__isDragging) {

	      // Compute move distance
	      var moveX = currentTouchLeft - self.__lastTouchLeft;
	      var moveY = currentTouchTop - self.__lastTouchTop;

	      // Read previous scroll position and zooming
	      var scrollLeft = self.__scrollLeft;
	      var scrollTop = self.__scrollTop;
	      var level = self.__zoomLevel;

	      // Work with scaling
	      if (scale != null && self.options.zooming) {

	        var oldLevel = level;

	        // Recompute level based on previous scale and new scale
	        level = level / self.__lastScale * scale;

	        // Limit level according to configuration
	        level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

	        // Only do further compution when change happened
	        if (oldLevel !== level) {

	          // Compute relative event position to container
	          var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
	          var currentTouchTopRel = currentTouchTop - self.__clientTop;

	          // Recompute left and top coordinates based on new zoom level
	          scrollLeft = (currentTouchLeftRel + scrollLeft) * level / oldLevel - currentTouchLeftRel;
	          scrollTop = (currentTouchTopRel + scrollTop) * level / oldLevel - currentTouchTopRel;

	          // Recompute max scroll values
	          self.__computeScrollMax(level);
	        }
	      }

	      if (self.__enableScrollX) {

	        scrollLeft -= moveX * this.options.speedMultiplier;
	        var maxScrollLeft = self.__maxScrollLeft;

	        if (scrollLeft > maxScrollLeft || scrollLeft < 0) {

	          // Slow down on the edges
	          if (self.options.bouncing) {

	            scrollLeft += moveX / 2 * this.options.speedMultiplier;
	          } else if (scrollLeft > maxScrollLeft) {

	            scrollLeft = maxScrollLeft;
	          } else {

	            scrollLeft = 0;
	          }
	        }
	      }

	      // Compute new vertical scroll position
	      if (self.__enableScrollY) {

	        scrollTop -= moveY * this.options.speedMultiplier;
	        var maxScrollTop = self.__maxScrollTop;

	        if (scrollTop > maxScrollTop || scrollTop < 0) {

	          // Slow down on the edges
	          if (self.options.bouncing) {

	            scrollTop += moveY / 2 * this.options.speedMultiplier;

	            // Support pull-to-refresh (only when only y is scrollable)
	            if (!self.__enableScrollX && self.__refreshHeight != null) {

	              if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {

	                self.__refreshActive = true;
	                if (self.__refreshActivate) {
	                  self.__refreshActivate();
	                }
	              } else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {

	                self.__refreshActive = false;
	                if (self.__refreshDeactivate) {
	                  self.__refreshDeactivate();
	                }
	              }
	            }
	          } else if (scrollTop > maxScrollTop) {

	            scrollTop = maxScrollTop;
	          } else {

	            scrollTop = 0;
	          }
	        }
	      }

	      // Keep list from growing infinitely (holding min 10, max 20 measure points)
	      if (positions.length > 60) {
	        positions.splice(0, 30);
	      }

	      // Track scroll movement for decleration
	      positions.push(scrollLeft, scrollTop, timeStamp);

	      // Sync scroll position
	      self.__publish(scrollLeft, scrollTop, level);

	      // Otherwise figure out whether we are switching into dragging mode now.
	    } else {

	      var minimumTrackingForScroll = 3;
	      var minimumTrackingForDrag = 5;

	      var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
	      var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);

	      self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
	      self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;

	      var radian = void 0;

	      if (self.options.locking && self.__enableScrollY) {
	        radian = radian || Math.atan2(distanceY, distanceX);
	        if (radian < Math.PI / 4) {
	          self.__enableScrollY = false;
	        }
	      }

	      if (self.options.locking && self.__enableScrollX) {
	        radian = radian || Math.atan2(distanceY, distanceX);
	        if (radian > Math.PI / 4) {
	          self.__enableScrollX = false;
	        }
	      }

	      positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);

	      self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
	      if (self.__isDragging) {
	        self.__interruptedAnimation = false;
	      }
	    }

	    // Update last touch positions and time stamp for next event
	    self.__lastTouchLeft = currentTouchLeft;
	    self.__lastTouchTop = currentTouchTop;
	    self.__lastTouchMove = timeStamp;
	    self.__lastScale = scale;
	  },

	  /**
	   * Touch end handler for scrolling support
	   */
	  doTouchEnd: function doTouchEnd(timeStamp) {

	    if (timeStamp instanceof Date) {
	      timeStamp = timeStamp.valueOf();
	    }
	    if (typeof timeStamp !== "number") {
	      throw new Error("Invalid timestamp value: " + timeStamp);
	    }

	    var self = this;

	    // Ignore event when tracking is not enabled (no touchstart event on element)
	    // This is required as this listener ('touchmove') sits on the document and not on the element itself.
	    if (!self.__isTracking) {
	      return;
	    }

	    // Not touching anymore (when two finger hit the screen there are two touch end events)
	    self.__isTracking = false;

	    // Be sure to reset the dragging flag now. Here we also detect whether
	    // the finger has moved fast enough to switch into a deceleration animation.
	    if (self.__isDragging) {

	      // Reset dragging flag
	      self.__isDragging = false;

	      // Start deceleration
	      // Verify that the last move detected was in some relevant time frame
	      if (self.__isSingleTouch && self.options.animating && timeStamp - self.__lastTouchMove <= 100) {

	        // Then figure out what the scroll position was about 100ms ago
	        var positions = self.__positions;
	        var endPos = positions.length - 1;
	        var startPos = endPos;

	        // Move pointer to position measured 100ms ago
	        for (var i = endPos; i > 0 && positions[i] > self.__lastTouchMove - 100; i -= 3) {
	          startPos = i;
	        }

	        // If start and stop position is identical in a 100ms timeframe,
	        // we cannot compute any useful deceleration.
	        if (startPos !== endPos) {

	          // Compute relative movement between these two points
	          var timeOffset = positions[endPos] - positions[startPos];
	          var movedLeft = self.__scrollLeft - positions[startPos - 2];
	          var movedTop = self.__scrollTop - positions[startPos - 1];

	          // Based on 50ms compute the movement to apply for each render step
	          self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
	          self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

	          // How much velocity is required to start the deceleration
	          var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1;

	          // Verify that we have enough velocity to start deceleration
	          if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {

	            // Deactivate pull-to-refresh when decelerating
	            if (!self.__refreshActive) {
	              self.__startDeceleration(timeStamp);
	            }
	          } else {
	            self.options.scrollingComplete();
	          }
	        } else {
	          self.options.scrollingComplete();
	        }
	      } else if (timeStamp - self.__lastTouchMove > 100) {
	        self.options.scrollingComplete();
	      }
	    }

	    // If this was a slower move it is per default non decelerated, but this
	    // still means that we want snap back to the bounds which is done here.
	    // This is placed outside the condition above to improve edge case stability
	    // e.g. touchend fired without enabled dragging. This should normally do not
	    // have modified the scroll positions or even showed the scrollbars though.
	    if (!self.__isDecelerating) {

	      if (self.__refreshActive && self.__refreshStart) {

	        // Use publish instead of scrollTo to allow scrolling to out of boundary position
	        // We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
	        self.__publish(self.__scrollLeft, -self.__refreshHeight, self.__zoomLevel, true);

	        if (self.__refreshStart) {
	          self.__refreshStart();
	        }
	      } else {

	        if (self.__interruptedAnimation || self.__isDragging) {
	          self.options.scrollingComplete();
	        }
	        self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel);

	        // Directly signalize deactivation (nothing todo on refresh?)
	        if (self.__refreshActive) {

	          self.__refreshActive = false;
	          if (self.__refreshDeactivate) {
	            self.__refreshDeactivate();
	          }
	        }
	      }
	    }

	    // Fully cleanup list
	    self.__positions.length = 0;
	  },

	  /*
	   ---------------------------------------------------------------------------
	   PRIVATE API
	   ---------------------------------------------------------------------------
	   */

	  /**
	   * Applies the scroll position to the content element
	   *
	   * @param left {Number} Left scroll position
	   * @param top {Number} Top scroll position
	   * @param animate {Boolean?false} Whether animation should be used to move to the new coordinates
	   */
	  __publish: function __publish(left, top, zoom, animate) {

	    var self = this;

	    // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
	    var wasAnimating = self.__isAnimating;
	    if (wasAnimating) {
	      _Animate2["default"].stop(wasAnimating);
	      self.__isAnimating = false;
	    }

	    if (animate && self.options.animating) {

	      // Keep scheduled positions for scrollBy/zoomBy functionality
	      self.__scheduledLeft = left;
	      self.__scheduledTop = top;
	      self.__scheduledZoom = zoom;

	      var oldLeft = self.__scrollLeft;
	      var oldTop = self.__scrollTop;
	      var oldZoom = self.__zoomLevel;

	      var diffLeft = left - oldLeft;
	      var diffTop = top - oldTop;
	      var diffZoom = zoom - oldZoom;

	      var step = function step(percent, now, render) {

	        if (render) {

	          self.__scrollLeft = oldLeft + diffLeft * percent;
	          self.__scrollTop = oldTop + diffTop * percent;
	          self.__zoomLevel = oldZoom + diffZoom * percent;

	          // Push values out
	          if (self.__callback) {
	            self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel);
	          }
	        }
	      };

	      var verify = function verify(id) {
	        return self.__isAnimating === id;
	      };

	      var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
	        if (animationId === self.__isAnimating) {
	          self.__isAnimating = false;
	        }

	        if (self.__didDecelerationComplete || wasFinished) {
	          self.options.scrollingComplete();
	        }

	        if (self.options.zooming) {
	          self.__computeScrollMax();
	          if (self.__zoomComplete) {
	            self.__zoomComplete();
	            self.__zoomComplete = null;
	          }
	        }
	      };

	      // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
	      self.__isAnimating = _Animate2["default"].start(step, verify, completed, self.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);
	    } else {

	      self.__scheduledLeft = self.__scrollLeft = left;
	      self.__scheduledTop = self.__scrollTop = top;
	      self.__scheduledZoom = self.__zoomLevel = zoom;

	      // Push values out
	      if (self.__callback) {
	        self.__callback(left, top, zoom);
	      }

	      // Fix max scroll ranges
	      if (self.options.zooming) {
	        self.__computeScrollMax();
	        if (self.__zoomComplete) {
	          self.__zoomComplete();
	          self.__zoomComplete = null;
	        }
	      }
	    }
	  },

	  /**
	   * Recomputes scroll minimum values based on client dimensions and content dimensions.
	   */
	  __computeScrollMax: function __computeScrollMax(zoomLevel) {

	    var self = this;

	    if (zoomLevel == null) {
	      zoomLevel = self.__zoomLevel;
	    }

	    self.__maxScrollLeft = Math.max(self.__contentWidth * zoomLevel - self.__clientWidth, 0);
	    self.__maxScrollTop = Math.max(self.__contentHeight * zoomLevel - self.__clientHeight, 0);
	  },

	  /*
	   ---------------------------------------------------------------------------
	   ANIMATION (DECELERATION) SUPPORT
	   ---------------------------------------------------------------------------
	   */

	  /**
	   * Called when a touch sequence end and the speed of the finger was high enough
	   * to switch into deceleration mode.
	   */
	  __startDeceleration: function __startDeceleration(timeStamp) {

	    var self = this;

	    if (self.options.paging) {

	      var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
	      var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
	      var clientWidth = self.__clientWidth;
	      var clientHeight = self.__clientHeight;

	      // We limit deceleration not to the min/max values of the allowed range, but to the size of the visible client area.
	      // Each page should have exactly the size of the client area.
	      self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
	      self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
	      self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
	      self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;
	    } else {

	      self.__minDecelerationScrollLeft = 0;
	      self.__minDecelerationScrollTop = 0;
	      self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
	      self.__maxDecelerationScrollTop = self.__maxScrollTop;
	    }

	    // Wrap class method
	    var step = function step(percent, now, render) {
	      self.__stepThroughDeceleration(render);
	    };

	    // How much velocity is required to keep the deceleration running
	    // added by yiminghe
	    var minVelocityToKeepDecelerating = self.options.minVelocityToKeepDecelerating;

	    if (!minVelocityToKeepDecelerating) {
	      minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.001;
	    }

	    // Detect whether it's still worth to continue animating steps
	    // If we are already slow enough to not being user perceivable anymore, we stop the whole process here.
	    var verify = function verify() {
	      var shouldContinue = Math.abs(self.__decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
	      if (!shouldContinue) {
	        self.__didDecelerationComplete = true;
	      }
	      return shouldContinue;
	    };

	    var completed = function completed(renderedFramesPerSecond, animationId, wasFinished) {
	      self.__isDecelerating = false;
	      // Animate to grid when snapping is active, otherwise just fix out-of-boundary positions
	      // fixed by yiminghe, in case call scrollingComplete twice
	      self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping, null, self.__didDecelerationComplete && self.options.scrollingComplete);
	    };

	    // Start animation and switch on flag
	    self.__isDecelerating = _Animate2["default"].start(step, verify, completed);
	  },

	  /**
	   * Called on every step of the animation
	   *
	   * @param inMemory {Boolean?false} Whether to not render the current step, but keep it in memory only. Used internally only!
	   */
	  __stepThroughDeceleration: function __stepThroughDeceleration(render) {

	    var self = this;

	    //
	    // COMPUTE NEXT SCROLL POSITION
	    //

	    // Add deceleration to scroll position
	    var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;
	    var scrollTop = self.__scrollTop + self.__decelerationVelocityY;

	    //
	    // HARD LIMIT SCROLL POSITION FOR NON BOUNCING MODE
	    //

	    if (!self.options.bouncing) {

	      var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);
	      if (scrollLeftFixed !== scrollLeft) {
	        scrollLeft = scrollLeftFixed;
	        self.__decelerationVelocityX = 0;
	      }

	      var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
	      if (scrollTopFixed !== scrollTop) {
	        scrollTop = scrollTopFixed;
	        self.__decelerationVelocityY = 0;
	      }
	    }

	    //
	    // UPDATE SCROLL POSITION
	    //

	    if (render) {

	      self.__publish(scrollLeft, scrollTop, self.__zoomLevel);
	    } else {

	      self.__scrollLeft = scrollLeft;
	      self.__scrollTop = scrollTop;
	    }

	    //
	    // SLOW DOWN
	    //

	    // Slow down velocity on every iteration
	    if (!self.options.paging) {

	      // This is the factor applied to every iteration of the animation
	      // to slow down the process. This should emulate natural behavior where
	      // objects slow down when the initiator of the movement is removed
	      var frictionFactor = 0.95;

	      self.__decelerationVelocityX *= frictionFactor;
	      self.__decelerationVelocityY *= frictionFactor;
	    }

	    //
	    // BOUNCING SUPPORT
	    //

	    if (self.options.bouncing) {

	      var scrollOutsideX = 0;
	      var scrollOutsideY = 0;

	      // This configures the amount of change applied to deceleration/acceleration when reaching boundaries
	      var penetrationDeceleration = self.options.penetrationDeceleration;
	      var penetrationAcceleration = self.options.penetrationAcceleration;

	      // Check limits
	      if (scrollLeft < self.__minDecelerationScrollLeft) {
	        scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;
	      } else if (scrollLeft > self.__maxDecelerationScrollLeft) {
	        scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;
	      }

	      if (scrollTop < self.__minDecelerationScrollTop) {
	        scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
	      } else if (scrollTop > self.__maxDecelerationScrollTop) {
	        scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
	      }

	      // Slow down until slow enough, then flip back to snap position
	      if (scrollOutsideX !== 0) {
	        if (scrollOutsideX * self.__decelerationVelocityX <= 0) {
	          self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
	        } else {
	          self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
	        }
	      }

	      if (scrollOutsideY !== 0) {
	        if (scrollOutsideY * self.__decelerationVelocityY <= 0) {
	          self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
	        } else {
	          self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
	        }
	      }
	    }
	  }
	};

	// Copy over members to prototype
	for (var key in members) {
	  Scroller.prototype[key] = members[key];
	}

	exports["default"] = Scroller;
	module.exports = exports['default'];

/***/ },

/***/ 912:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _raf = __webpack_require__(913);

	var _raf2 = _interopRequireDefault(_raf);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var desiredFrames = 60; /*
	                         * Scroller
	                         * http://github.com/zynga/scroller
	                         *
	                         * Copyright 2011, Zynga Inc.
	                         * Licensed under the MIT License.
	                         * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
	                         *
	                         * Based on the work of: Unify Project (unify-project.org)
	                         * http://unify-project.org
	                         * Copyright 2011, Deutsche Telekom AG
	                         * License: MIT + Apache (V2)
	                         */

	/**
	 * Generic animation class with support for dropped frames both optional easing and duration.
	 *
	 * Optional duration is useful when the lifetime is defined by another condition than time
	 * e.g. speed of an animating object, etc.
	 *
	 * Dropped frame logic allows to keep using the same updater logic independent from the actual
	 * rendering. This eases a lot of cases where it might be pretty complex to break down a state
	 * based on the pure time difference.
	 */

	var millisecondsPerSecond = 1000;
	var running = {};
	var counter = 1;
	var win = typeof window !== 'undefined' ? window : undefined;

	if (!win) {
	  win = typeof global !== 'undefined' ? global : {};
	}

	var Animate = {
	  /**
	   * Stops the given animation.
	   *
	   * @param id {Integer} Unique animation ID
	   * @return {Boolean} Whether the animation was stopped (aka, was running before)
	   */
	  stop: function stop(id) {
	    var cleared = running[id] != null;
	    if (cleared) {
	      running[id] = null;
	    }

	    return cleared;
	  },

	  /**
	   * Whether the given animation is still running.
	   *
	   * @param id {Integer} Unique animation ID
	   * @return {Boolean} Whether the animation is still running
	   */
	  isRunning: function isRunning(id) {
	    return running[id] != null;
	  },

	  /**
	   * Start the animation.
	   *
	   * @param stepCallback {Function} Pointer to function which is executed on every step.
	   *   Signature of the method should be `function(percent, now, virtual) { return continueWithAnimation; }`
	   * @param verifyCallback {Function} Executed before every animation step.
	   *   Signature of the method should be `function() { return continueWithAnimation; }`
	   * @param completedCallback {Function}
	   *   Signature of the method should be `function(droppedFrames, finishedAnimation) {}`
	   * @param duration {Integer} Milliseconds to run the animation
	   * @param easingMethod {Function} Pointer to easing function
	   *   Signature of the method should be `function(percent) { return modifiedValue; }`
	   * @return {Integer} Identifier of animation. Can be used to stop it any time.
	   */
	  start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod) {
	    var start = +new Date();
	    var lastFrame = start;
	    var percent = 0;
	    var dropCounter = 0;
	    var id = counter++;

	    // Compacting running db automatically every few new animations
	    if (id % 20 === 0) {
	      var newRunning = {};
	      for (var usedId in running) {
	        newRunning[usedId] = true;
	      }
	      running = newRunning;
	    }

	    // This is the internal step method which is called every few milliseconds
	    var step = function step(virtual) {
	      // Normalize virtual value
	      var render = virtual !== true;

	      // Get current time
	      var now = +new Date();

	      // Verification is executed before next animation step
	      if (!running[id] || verifyCallback && !verifyCallback(id)) {

	        running[id] = null;
	        completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
	        return;
	      }

	      // For the current rendering to apply let's update omitted steps in memory.
	      // This is important to bring internal state variables up-to-date with progress in time.
	      if (render) {

	        var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
	        for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
	          step(true);
	          dropCounter++;
	        }
	      }

	      // Compute percent value
	      if (duration) {
	        percent = (now - start) / duration;
	        if (percent > 1) {
	          percent = 1;
	        }
	      }

	      // Execute step callback, then...
	      var value = easingMethod ? easingMethod(percent) : percent;
	      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
	        running[id] = null;
	        completedCallback && completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration == null);
	      } else if (render) {
	        lastFrame = now;
	        (0, _raf2['default'])(step);
	      }
	    };

	    // Mark as running
	    running[id] = true;

	    // Init first step
	    (0, _raf2['default'])(step);

	    // Return unique animation ID
	    return id;
	  }
	};

	exports['default'] = Animate;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 913:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(914)
	  , root = typeof window === 'undefined' ? global : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix]
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix]
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}

	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(root, arguments)
	}
	module.exports.polyfill = function() {
	  root.requestAnimationFrame = raf
	  root.cancelAnimationFrame = caf
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 914:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
	(function() {
	  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - nodeLoadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    moduleLoadTime = getNanoSeconds();
	    upTime = process.uptime() * 1e9;
	    nodeLoadTime = moduleLoadTime - upTime;
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(this);

	//# sourceMappingURL=performance-now.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(300)))

/***/ },

/***/ 915:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* tslint:disable:no-console */
	exports['default'] = {
	    select: function select(value) {
	        var children = this.toChildrenArray(this.props.children);
	        for (var i = 0, len = children.length; i < len; i++) {
	            if (this.getChildMember(children[i], 'value') === value) {
	                this.selectByIndex(i);
	                return;
	            }
	        }
	        this.selectByIndex(0);
	    },
	    selectByIndex: function selectByIndex(index) {
	        if (index < 0 || index >= this.toChildrenArray(this.props.children).length || !this.itemHeight) {
	            return;
	        }
	        this.scrollTo(index * this.itemHeight);
	    },
	    doScrollingComplete: function doScrollingComplete(top) {
	        var index = top / this.itemHeight;
	        var floor = Math.floor(index);
	        if (index - floor > 0.5) {
	            index = floor + 1;
	        } else {
	            index = floor;
	        }
	        var children = this.toChildrenArray(this.props.children);
	        index = Math.min(index, children.length - 1);
	        var child = children[index];
	        if (child) {
	            this.fireValueChange(this.getChildMember(child, 'value'));
	        } else if (console.warn) {
	            console.warn('child not found', children, index);
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },

/***/ 916:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isEmptyArray = isEmptyArray;
	exports["default"] = isChildrenEqual;
	function isEmptyArray(a) {
	    return !a || !a.length;
	}
	function isChildrenEqual(c1, c2, pure) {
	    if (isEmptyArray(c1) && isEmptyArray(c2)) {
	        return true;
	    }
	    if (pure) {
	        return c1 === c2;
	    }
	    if (c1.length !== c2.length) {
	        return false;
	    }
	    var len = c1.length;
	    for (var i = 0; i < len; i++) {
	        if (c1[i].value !== c2[i].value || c1[i].label !== c2[i].label) {
	            return false;
	        }
	    }
	    return true;
	}

/***/ },

/***/ 917:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports['default'] = {
	    getDefaultProps: function getDefaultProps() {
	        return {
	            prefixCls: 'rmc-multi-picker',
	            pickerPrefixCls: 'rmc-picker',
	            onValueChange: function onValueChange() {},

	            disabled: false
	        };
	    },
	    getValue: function getValue() {
	        var _props = this.props,
	            children = _props.children,
	            selectedValue = _props.selectedValue;

	        if (selectedValue && selectedValue.length) {
	            return selectedValue;
	        } else {
	            if (!children) {
	                return [];
	            }
	            return children.map(function (c) {
	                var cc = c.props.children;
	                return cc && cc[0] && cc[0].value;
	            });
	        }
	    },
	    onValueChange: function onValueChange(i, v) {
	        var value = this.getValue().concat();
	        value[i] = v;
	        this.props.onValueChange(value, i);
	    }
	};
	module.exports = exports['default'];

/***/ },

/***/ 918:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {};
	module.exports = exports["default"];

/***/ },

/***/ 919:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports['default'] = {
	    WrapComponent: 'div',
	    transitionName: 'am-slide-up',
	    maskTransitionName: 'am-fade'
	};
	module.exports = exports['default'];

/***/ },

/***/ 920:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(780);

	__webpack_require__(921);

/***/ },

/***/ 921:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(922);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(307)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/less-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/antd-mobile/lib/list/style/index.less", function() {
			var newContent = require("!!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/css-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/less-loader/index.js!/Users/meizu/Ecofe/ecofe/flybomb-web/node_modules/antd-mobile/lib/list/style/index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 922:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(306)();
	exports.push([module.id, ".hairline-remove-right-bottom {\n  border-bottom: 0;\n}\n.hairline-remove-right-bottom:after {\n  display: none;\n}\n.hairline-remove-right-bottom-bak:after {\n  display: none;\n}\n.hairline-remove-left-top:before {\n  display: none;\n}\n.am-list-header {\n  padding: 30px 30px 18px 30px;\n  font-size: 28px;\n  color: #888888;\n  display: inline-block;\n  width: 100%;\n  box-sizing: border-box;\n}\n.am-list-footer {\n  padding: 18px 30px 30px 30px;\n  font-size: 28px;\n  color: #888888;\n}\n.am-list-body {\n  position: relative;\n  background-color: #ffffff;\n  border-top: 1 PX solid #dddddd;\n}\n.am-list-body:after {\n  display: block;\n  position: absolute;\n  content: '';\n  width: 100%;\n  border-bottom: 1 PX solid #dddddd;\n}\n.am-list-body div:not(:last-child) .am-list-line:after {\n  display: block;\n  position: absolute;\n  content: '';\n  left: 0;\n  bottom: 0;\n  right: auto;\n  top: auto;\n  width: 100%;\n  border-bottom: 1 PX solid #dddddd;\n}\n.am-list-item {\n  position: relative;\n  display: flex;\n  padding-left: 30px;\n  min-height: 88px;\n  background-color: #ffffff;\n  vertical-align: middle;\n  overflow: hidden;\n  transition: background-color 200ms;\n  align-items: center;\n  /* list左图片显示*/\n}\n.am-list-item .am-list-ripple {\n  position: absolute;\n  background: transparent;\n  display: inline-block;\n  overflow: hidden;\n  will-change: box-shadow, transform;\n  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  outline: none;\n  cursor: pointer;\n  border-radius: 100%;\n  transform: scale(0);\n}\n.am-list-item .am-list-ripple.am-list-ripple-animate {\n  background-color: rgba(158, 158, 158, 0.2);\n  animation: ripple 1s linear;\n}\n.am-list-item.am-list-item-top .am-list-line {\n  align-items: flex-start;\n}\n.am-list-item.am-list-item-top .am-list-line .am-list-arrow {\n  margin-top: 4px;\n}\n.am-list-item.am-list-item-middle .am-list-line {\n  align-items: center;\n}\n.am-list-item.am-list-item-bottom .am-list-line {\n  align-items: flex-end;\n}\n.am-list-item.am-list-item-error .am-list-line .am-list-extra {\n  color: #f50;\n}\n.am-list-item.am-list-item-error .am-list-line .am-list-extra .am-list-brief {\n  color: #f50;\n}\n.am-list-item.am-list-item-active {\n  background-color: #dddddd;\n}\n.am-list-item.am-list-item-disabled .am-list-line .am-list-content,\n.am-list-item.am-list-item-disabled .am-list-line .am-list-extra {\n  color: #bbbbbb;\n}\n.am-list-item img {\n  width: 44px;\n  height: 44px;\n  vertical-align: middle;\n}\n.am-list-item .am-list-thumb:first-child {\n  margin-right: 30px;\n}\n.am-list-item .am-list-thumb:last-child {\n  margin-left: 16px;\n}\n.am-list-item .am-list-line {\n  position: relative;\n  display: flex;\n  flex: 1;\n  align-self: stretch;\n  padding-right: 30px;\n  min-height: 88px;\n  overflow: hidden;\n  /* list左侧主内容*/\n  /* list右补充内容*/\n  /* 辅助性文字*/\n  /* list右侧箭头*/\n}\n.am-list-item .am-list-line .am-list-content {\n  flex: 1;\n  color: #000000;\n  font-size: 34px;\n  line-height: 1.5;\n  text-align: left;\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding-top: 14px;\n  padding-bottom: 14px;\n}\n.am-list-item .am-list-line .am-list-extra {\n  flex-basis: 36%;\n  color: #888888;\n  font-size: 32px;\n  line-height: 1.5;\n  text-align: right;\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding-top: 14px;\n  padding-bottom: 14px;\n}\n.am-list-item .am-list-line .am-list-title {\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.am-list-item .am-list-line .am-list-brief {\n  color: #888888;\n  font-size: 30px;\n  line-height: 1.5;\n  margin-top: 12px;\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.am-list-item .am-list-line .am-list-arrow {\n  display: block;\n  width: 30px;\n  height: 30px;\n  margin-left: 16px;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2216%22%20height%3D%2226%22%20viewBox%3D%220%200%2016%2026%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cg%20id%3D%22UI-KIT_%E5%9F%BA%E7%A1%80%E5%85%83%E4%BB%B6%22%20stroke%3D%22none%22%20stroke-width%3D%221%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20id%3D%229.9%E5%9F%BA%E7%A1%80%E5%85%83%E4%BB%B6%22%20transform%3D%22translate(-5809.000000%2C%20-8482.000000)%22%20fill%3D%22%23C7C7CC%22%3E%3Cpolygon%20id%3D%22Disclosure-Indicator%22%20points%3D%225811%208482%205809%208484%205820.5%208495%205809%208506%205811%208508%205825%208495%22%3E%3C%2Fpolygon%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n  visibility: hidden;\n}\n.am-list-item .am-list-line .am-list-arrow-horizontal {\n  visibility: visible;\n}\n.am-list-item .am-list-line .am-list-arrow-vertical {\n  visibility: visible;\n  transform: rotate(90deg);\n}\n.am-list-item .am-list-line .am-list-arrow-vertical-up {\n  visibility: visible;\n  transform: rotate(270deg);\n}\n.am-list-item .am-list-line-multiple {\n  padding: 25px 30px 25px 0;\n}\n.am-list-item .am-list-line-multiple .am-list-content {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.am-list-item .am-list-line-multiple .am-list-extra {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.am-list-item .am-list-line-wrap .am-list-content {\n  white-space: normal;\n}\n.am-list-item .am-list-line-wrap .am-list-extra {\n  white-space: normal;\n}\n.am-list-item select {\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  border: 0;\n  font-size: 34px;\n  appearance: none;\n  background-color: transparent;\n}\n@keyframes ripple {\n  100% {\n    opacity: 0;\n    transform: scale(2.5);\n  }\n}\n", ""]);

/***/ },

/***/ 923:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends2 = __webpack_require__(790);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(902);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(828);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(829);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(833);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(869);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	var _ListItem = __webpack_require__(924);

	var _ListItem2 = _interopRequireDefault(_ListItem);

	var _classnames = __webpack_require__(908);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var __rest = undefined && undefined.__rest || function (s, e) {
	    var t = {};
	    for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
	    }return t;
	};
	/* tslint:disable:jsx-no-multiline-js */

	var List = function (_React$Component) {
	    (0, _inherits3['default'])(List, _React$Component);

	    function List() {
	        (0, _classCallCheck3['default'])(this, List);
	        return (0, _possibleConstructorReturn3['default'])(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	    }

	    (0, _createClass3['default'])(List, [{
	        key: 'render',
	        value: function render() {
	            var _classNames;

	            var _a = this.props,
	                prefixCls = _a.prefixCls,
	                children = _a.children,
	                className = _a.className,
	                style = _a.style,
	                renderHeader = _a.renderHeader,
	                renderFooter = _a.renderFooter,
	                restProps = __rest(_a, ["prefixCls", "children", "className", "style", "renderHeader", "renderFooter"]);
	            var wrapCls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls, true), (0, _defineProperty3['default'])(_classNames, className, className), _classNames));
	            return _react2['default'].createElement(
	                'div',
	                (0, _extends3['default'])({ className: wrapCls, style: style }, restProps),
	                renderHeader ? _react2['default'].createElement(
	                    'div',
	                    { className: prefixCls + '-header' },
	                    typeof renderHeader === 'function' ? renderHeader() : renderHeader
	                ) : null,
	                children ? _react2['default'].createElement(
	                    'div',
	                    { className: prefixCls + '-body' },
	                    children
	                ) : null,
	                renderFooter ? _react2['default'].createElement(
	                    'div',
	                    { className: prefixCls + '-footer' },
	                    typeof renderFooter === 'function' ? renderFooter() : renderFooter
	                ) : null
	            );
	        }
	    }]);
	    return List;
	}(_react2['default'].Component);

	exports['default'] = List;

	List.Item = _ListItem2['default'];
	List.defaultProps = {
	    prefixCls: 'am-list'
	};
	module.exports = exports['default'];

/***/ },

/***/ 924:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Brief = undefined;

	var _extends2 = __webpack_require__(790);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(902);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(828);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(829);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(833);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(869);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(598);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(908);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _rcTouchable = __webpack_require__(903);

	var _rcTouchable2 = _interopRequireDefault(_rcTouchable);

	var _omit = __webpack_require__(925);

	var _omit2 = _interopRequireDefault(_omit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var __rest = undefined && undefined.__rest || function (s, e) {
	    var t = {};
	    for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
	    }return t;
	};
	/* tslint:disable:jsx-no-multiline-js */

	var Brief = exports.Brief = function (_React$Component) {
	    (0, _inherits3['default'])(Brief, _React$Component);

	    function Brief() {
	        (0, _classCallCheck3['default'])(this, Brief);
	        return (0, _possibleConstructorReturn3['default'])(this, (Brief.__proto__ || Object.getPrototypeOf(Brief)).apply(this, arguments));
	    }

	    (0, _createClass3['default'])(Brief, [{
	        key: 'render',
	        value: function render() {
	            return _react2['default'].createElement(
	                'div',
	                { className: 'am-list-brief', style: this.props.style },
	                this.props.children
	            );
	        }
	    }]);
	    return Brief;
	}(_react2['default'].Component);

	var ListItem = function (_React$Component2) {
	    (0, _inherits3['default'])(ListItem, _React$Component2);

	    function ListItem(props) {
	        (0, _classCallCheck3['default'])(this, ListItem);

	        var _this2 = (0, _possibleConstructorReturn3['default'])(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));

	        _this2.onClick = function (ev) {
	            var _this2$props = _this2.props,
	                onClick = _this2$props.onClick,
	                platform = _this2$props.platform;

	            var isAndroid = platform === 'android' || platform === 'cross' && !!navigator.userAgent.match(/Android/i);
	            if (!!onClick && isAndroid) {
	                if (_this2.debounceTimeout) {
	                    clearTimeout(_this2.debounceTimeout);
	                    _this2.debounceTimeout = null;
	                }
	                var Item = ev.currentTarget;
	                var RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
	                var ClientRect = ev.currentTarget.getBoundingClientRect();
	                var pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
	                var pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
	                var coverRippleStyle = {
	                    width: RippleWidth + 'px',
	                    height: RippleWidth + 'px',
	                    left: pointX + 'px',
	                    top: pointY + 'px'
	                };
	                _this2.setState({
	                    coverRippleStyle: coverRippleStyle,
	                    RippleClicked: true
	                }, function () {
	                    _this2.debounceTimeout = setTimeout(function () {
	                        _this2.setState({
	                            coverRippleStyle: { display: 'none' },
	                            RippleClicked: false
	                        });
	                    }, 1000);
	                });
	            }
	            if (onClick) {
	                onClick(ev);
	            }
	        };
	        _this2.state = {
	            coverRippleStyle: { display: 'none' },
	            RippleClicked: false
	        };
	        return _this2;
	    }

	    (0, _createClass3['default'])(ListItem, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            if (this.debounceTimeout) {
	                clearTimeout(this.debounceTimeout);
	                this.debounceTimeout = null;
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _wrapCls,
	                _classNames,
	                _classNames2,
	                _classNames3,
	                _this3 = this;

	            var _a = this.props,
	                prefixCls = _a.prefixCls,
	                className = _a.className,
	                activeStyle = _a.activeStyle,
	                error = _a.error,
	                align = _a.align,
	                wrap = _a.wrap,
	                disabled = _a.disabled,
	                children = _a.children,
	                multipleLine = _a.multipleLine,
	                thumb = _a.thumb,
	                extra = _a.extra,
	                arrow = _a.arrow,
	                onClick = _a.onClick,
	                restProps = __rest(_a, ["prefixCls", "className", "activeStyle", "error", "align", "wrap", "disabled", "children", "multipleLine", "thumb", "extra", "arrow", "onClick"]);var _state = this.state,
	                coverRippleStyle = _state.coverRippleStyle,
	                RippleClicked = _state.RippleClicked;

	            var wrapCls = (_wrapCls = {}, (0, _defineProperty3['default'])(_wrapCls, className, className), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-item', true), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-item-disabled', disabled), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-item-error', error), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-item-top', align === 'top'), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-item-middle', align === 'middle'), (0, _defineProperty3['default'])(_wrapCls, prefixCls + '-item-bottom', align === 'bottom'), _wrapCls);
	            var rippleCls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-ripple', true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-ripple-animate', RippleClicked), _classNames));
	            var lineCls = (0, _classnames2['default'])((_classNames2 = {}, (0, _defineProperty3['default'])(_classNames2, prefixCls + '-line', true), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-line-multiple', multipleLine), (0, _defineProperty3['default'])(_classNames2, prefixCls + '-line-wrap', wrap), _classNames2));
	            var arrowCls = (0, _classnames2['default'])((_classNames3 = {}, (0, _defineProperty3['default'])(_classNames3, prefixCls + '-arrow', true), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-arrow-horizontal', arrow === 'horizontal'), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-arrow-vertical', arrow === 'down' || arrow === 'up'), (0, _defineProperty3['default'])(_classNames3, prefixCls + '-arrow-vertical-up', arrow === 'up'), _classNames3));
	            var content = _react2['default'].createElement(
	                'div',
	                (0, _extends3['default'])({}, (0, _omit2['default'])(restProps, ['platform']), { onClick: function onClick(ev) {
	                        _this3.onClick(ev);
	                    }, className: (0, _classnames2['default'])(wrapCls) }),
	                thumb ? _react2['default'].createElement(
	                    'div',
	                    { className: prefixCls + '-thumb' },
	                    typeof thumb === 'string' ? _react2['default'].createElement('img', { src: thumb }) : thumb
	                ) : null,
	                _react2['default'].createElement(
	                    'div',
	                    { className: lineCls },
	                    children !== undefined && _react2['default'].createElement(
	                        'div',
	                        { className: prefixCls + '-content' },
	                        children
	                    ),
	                    extra !== undefined && _react2['default'].createElement(
	                        'div',
	                        { className: prefixCls + '-extra' },
	                        extra
	                    ),
	                    arrow && _react2['default'].createElement('div', { className: arrowCls, 'aria-hidden': 'true' })
	                ),
	                _react2['default'].createElement('div', { style: coverRippleStyle, className: rippleCls })
	            );
	            return _react2['default'].createElement(
	                _rcTouchable2['default'],
	                { disabled: disabled || !onClick, activeStyle: activeStyle, activeClassName: prefixCls + '-item-active' },
	                content
	            );
	        }
	    }]);
	    return ListItem;
	}(_react2['default'].Component);

	ListItem.defaultProps = {
	    prefixCls: 'am-list',
	    align: 'middle',
	    error: false,
	    multipleLine: false,
	    wrap: false,
	    platform: 'cross'
	};
	ListItem.Brief = Brief;
	exports['default'] = ListItem;

/***/ },

/***/ 925:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(790);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function omit(obj, fields) {
	  var shallowCopy = (0, _extends3["default"])({}, obj);
	  for (var i = 0; i < fields.length; i++) {
	    var key = fields[i];
	    delete shallowCopy[key];
	  }
	  return shallowCopy;
	}

	exports["default"] = omit;
	module.exports = exports['default'];

/***/ },

/***/ 926:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createForm = undefined;

	var _createForm = __webpack_require__(927);

	var _createForm2 = _interopRequireDefault(_createForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports.createForm = _createForm2['default']; // export this package's api

/***/ }

});