'use strict';
import React from 'react';

import { Form, Input, Radio, Button, Icon, Upload, Tooltip, message, Modal } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';


var userTypeJson = {};

let userFilePathJson = {};
const UserType = React.createClass({
	getInitialState() {

		return {
			userTypeGroup: [],
			userTypeTags: [],
			tags: {},
			tagIds: {},
			visible: false
		};
	},
	componentWillMount() {
		let href = location.href;
		if (href.indexOf('pushType=group') > -1) {
			userTypeJson = {};
		}
	},


	componentWillReceiveProps() {//切换了应用之后要重新拉取数据
		const self = this;
		let appId = utils.queryString('appId', window.location.href);

		if (this.props.appId && appId !== this.props.appId) {//切换了应用之后要重新拉取数据
			this.getTags(appId);
			this.getUserGroup(appId);
			const userType = this.props.userType;
			const flymeAuth = this.props.flymeAuth;
			if ((userType === 1 || userType === 3 || userType === 6) && flymeAuth) {//已经是0了就不执行下面的方法，避免死循环
				self.changeRadio({
					target: {
						name: 'userType',
						value: 2
					}
				});
			}


		}

	},
	getTags(appId) {

		const self = this;
		let tagsApi = restapi.appTag;
		let tableDataIndex = this.props.tableDataIndex;
		tagsApi = utils.makeUrl(tagsApi, {
			appId: appId
		});
		ajax.get(tagsApi, (result) => {
			let value = result.value;
			let len = value.length;
			let data = {};
			let ti = {};
			let tags = {};
			if (tableDataIndex) {//分组推送修改的时候
				let tagIds = tableDataIndex.userTypeInfo.tagIds || '';
				let arrIds = tagIds.split(',');
				let tagIdsName = [];
				for (let i = 0; i < len; i++) {
					for (let o = 0; o < arrIds.length; o++) {
						if (value[i].tagId == arrIds[o]) {
							tagIdsName.push(value[i].tagName);
							ti[value[i].tagId] = !ti[value[i].tagId];
							tags[value[i].tagName] = !tags[value[i].tagName];
						}
					}
				}
				tagIdsName = tagIdsName.join(',');
				data.tagIdsName = tagIdsName;
				data.tagIdsValue = tagIds;
			}

			self.setState({
				userTypeTags: result.value,
				tags: tags,
				tagIds: ti,
				tagIdsName: data.tagIdsName || null,
				tagIdsValue: data.tagIdsValue || null
			});
			self.props.form.setFieldsValue({
				tagIdsName: data.tagIdsName || null,
				tagIds: data.tagIdsValue || null
			});
		});
	},
	componentDidMount() {
		let appId = utils.queryString('appId', window.location.href);
		const deal = utils.queryString('deal', window.location.href);
		const groupId = utils.queryString('groupId', window.location.href);
		this.setState({
			appId: appId,
			pushType: utils.queryString('pushType', window.location.href)
		});
		if (deal || groupId || this.props.personalPush) {
			this.getUserGroup(appId);
		}
		this.getTags(appId);
		userTypeJson = {};
		userFilePathJson = {};
		if (this.props.tableDataIndex) {//分组推送修改的时候传过来的，用来回填数据
			this.getUserGroup(appId);
		}
	},
	getUserGroup(appId) {
		const self = this;
		let url = restapi.listUserGroup;
		url = utils.makeUrl(url, {
			appId: appId
		});
		ajax.get(url, (result) => {
			self.setState({
				// userTypeGroup: result.value.items,
				userTypeGroup: result.value.items,
				isDmp: result.value.isDmp,
				loadGroup: true
			});
			self.props.setUserTypeGroup(result.value);
		});
	},
	selectTags(e) {
		let tags = this.state.tags;
		let tagIds = this.state.tagIds;
		const value = e.target.getAttribute('value');
		const innerText = e.target.getAttribute('title');
		tags[innerText] = !tags[innerText];
		tagIds[value] = !tagIds[value];
		let arr = [];
		let arrValue = [];
		for (let i in tags) {
			if (tags[i]) {
				arr.push(i);
			}
		}
		for (let i in tagIds) {
			if (tagIds[i]) {
				arrValue.push(i);
			}
		}
		e.target.className = e.target.className === '' ? 'current' : '';
		this.setState({
			tags: tags,
			tagIds: tagIds,
			tagIdsName: arr.join(','),
			tagIdsValue: arrValue.join(',')
		});
		this.props.form.setFieldsValue({
			tagIdsName: arr.join(','),
			tagIds: arrValue.join(',')
		});
		this.props.changeRadio({
			target: {
				name: 'tags'
			}
		});
	},
	delUserGroup(name, value) {
		const self = this;

		this.setState({
			visible: true,
			userGroupName: name,
			delIcon: true,
			userGroupId: value
		});
		let userGroupId = self.props.form.getFieldValue('userGroupId');
		if (userGroupId != value) {//没选中的项，删除的时候不选中
			setTimeout(function () {
				self.props.form.setFieldsValue({
					userGroupId: userGroupId
				});
			}, 0);
		}
	},
	delOk() {

		const appId = utils.queryString('appId', window.location.href);
		const self = this;
		const url = restapi.delUserGroup;
		let id = this.state.userGroupId;
		let currentId = this.props.form.getFieldValue('userGroupId');
		ajax.post(url, {
			id: this.state.userGroupId
		}, () => {
			self.getUserGroup(appId);
			message.success('用户群' + this.state.userGroupName + '删除成功');
			self.props.clearUserGroup(currentId, id);
			self.setState({
				visible: false,
				delIcon: false
			});
		});
	},
	changeRadio(e) {

		const appId = utils.queryString('appId', window.location.href);
		const name = e.target.name;
		const value = e.target.value;
		if (name === 'userType') {
			this.setState({
				['target' + value]: this.props.form.getFieldValue('target' + value)
			});
			if (value === 1) {
				this.getUserGroup(appId);
			}
		}
		this.props.changeRadio(e);
	},
	delCancel() {

		this.setState({
			visible: false,
			delIcon: false
		});
	},
	validate(type) {
		const self = this;
		const userType = this.props.userType;
		let tableDataIndex = this.props.tableDataIndex;
		let name = null;
		if (!this.state.removed && this.props.userType === (tableDataIndex && tableDataIndex.userTypeInfo.userType)) {
			name = tableDataIndex.userFileName;
		}
		return this.props.getFieldProps(type, {
			onChange() {
				self.props.changeRadio({
					target: {
						name: 'changeTarget'
					}
				});
			},
			initialValue: userTypeJson['target' + userType] || name,
			validate: [{
				rules: [{
					required: (userType > 1 && userType < 5) || userType === 6 ? !this.state['targetRequired' + userType] : false,
					message: '不能为空'
				}, {
					validator: function (rule, value, callback) {

						if (value && value.match(/^\s/)) {
							callback(new Error('行首不能输入空格'));
						}
						callback();
					}
				}],
				trigger: ['onBlur', 'onChange']
			}],
			onBlur(e) {
				userTypeJson['target' + userType] = e.target.value;
			}
		});
	},
	getUserType() {
		const self = this;
		const userType = this.props.userType;
		let uploadUserFile = restapi.uploadUserFile;

		const appId = utils.queryString('appId', window.location.href);
		uploadUserFile = utils.makeUrl(uploadUserFile, {
			pushType: this.props.type === 'notice' ? 0 : 1,
			userType: userType,
			appId: appId
		});
		let size = 10;
		if (self.props.flymeAuth) {
			size = 50;
		}
		let defaultFileList = [];
		let tableDataIndex = this.props.tableDataIndex;
		let name = userTypeJson['target' + userType];
		if (!name && tableDataIndex && userType == tableDataIndex.userTypeInfo.userType) {
			name = tableDataIndex.userFileName;
		}
		let targetDisabled = false;
		if (!this.state.removed && (!this.props.clearUserFile || this.state.clearUserFile) && name && name.indexOf('.txt') > -1 && name.indexOf('.txt') === name.length - 4) {
			defaultFileList = [{
				uid: -1,
				name: name,
				status: 'done',
				url: ''
			}];
			targetDisabled = true;
		}
		const props = {
			name: 'userFile',
			data: {},
			accept: '.txt',
			action: uploadUserFile,
			defaultFileList: defaultFileList,
			beforeUpload(file) {
				self.setState({
					loading: true
				});
				const fileType = file.type;
				if (file.size > 1024 * 1024 * size) {
					message.error(`文件大小不能超过${size}M`);
					self.setState({
						loading: false
					});
					return false;
				}
				const isImg = fileType === 'text/plain';
				if (!isImg) {
					message.error('请上传txt格式的文件');
					self.setState({
						loading: false
					});
				}
				return isImg;
			},
			headers: {
				authorization: 'authorization-text',
			},
			onChange(info) {
				const userType = self.props.userType;
				if (info.file.status === 'removed') {
					self.setState({
						loading: false
					});
					if (info.fileList.length < 1) {
						self.setState({
							['targetDisabled' + userType]: false,
							removed: true,
							['targetRequired' + userType]: false
						});
						self.props.form.setFieldsValue({
							['userFilePath' + userType]: undefined,
							['target' + userType]: undefined
						});
						userTypeJson['target' + userType] = null;
					}

					self.props.changeRadio({
						target: {
							name: 'remove'
						}
					});
					return;
				}
				if ('error' === info.file.status) {
					self.setState({
						loading: false
					});
				}
				if ('done' === info.file.status) {
					self.setState({
						loading: false
					});

					if (info.file.response.code == 200) {
						if (info.fileList.length > 1) {
							info.fileList.shift();
						}
						message.success(`${info.file.name} 上传成功。`);
						self.props.form.setFieldsValue({
							['userFilePath' + userType]: info.file.response.value.userFilePath,
							['target' + userType]: info.file.name
						});
						userFilePathJson['userFilePath' + userType] = info.file.response.value.userFilePath;
						userTypeJson['target' + userType] = info.file.name;
						self.setState({
							['targetDisabled' + userType]: true,
							clearUserFile: true,
							['targetRequired' + userType]: true
						});
						if (self.state.pushType === 'group') {//分组推送，上传文件之后要重新获取用户数，隐藏推送按钮
							self.props.changeRadio({
								target: {
									name: 'upload'
								}
							});
						}

					} else {

						info.fileList.pop();
						message.error(info.file.response.message);
						self.props.form.setFieldsValue({
							// ['userFilePath' + userType]: null,
							// ['target' + userType]: null
						});
					}
				}
			}
		};

		return <div className="user_type">
			<FormItem>
				<Input
					disabled={targetDisabled || this.state['targetDisabled' + userType]}
					style={{ width: 300 }}
					placeholder="多个以;分隔"
					className="mb10"
					{...this.validate('target' + userType) } />
			</FormItem>
			<Upload {...this.props.getFieldProps('userFilePath' + userType, {
				initialValue: userFilePathJson['userFilePath' + userType]


			}) } style={{ width: 200 }} {...props} >
				<Button disabled={this.state.loading ? true : false} size="large" className="btn_normal_show " type="ghost">
					TXT文档批量导入
					{this.state.loading ? <Icon type="loading" /> : <span></span>}
				</Button>
			</Upload>
			<span className="upload_tips">最多不超过{size}M，UTF-8无BOM格式编码文件，内容以回车键进行分割</span>
		</div>;
	},
	handleSubmit(e, url) {
		this.props.handleSubmit(e, 'deal');
		window.location.hash = url;
	},
	changeUserGroupRadio(e) {

		if (this.state.delIcon) return;
		this.props.changeRadio(e, 'userGroupAuth');
	},

	getContainer() {
		return document.getElementById('userGropuList');
	},
	render() {
		const self = this;
		const userGroupRadioStyle = {
			display: 'block',
			height: 30,
			position: 'relative',
			lineHeight: 1.5
		};
		const appId = utils.queryString('appId', window.location.href);
		const timingPushType = utils.queryString('timingPushType', window.location.href);
		let usergroupUrl = '/user/group/new';
		const userGroup = this.state.userTypeGroup.map(function (data, key) {
			let permission = data.permission;
			const id = data.id;
			const name = data.name;
			let opt = {
				appId: appId,
				id: id,

				pushType: self.state.pushType
			};
			if (timingPushType) {
				opt.timingPushType = timingPushType;
			}
			let url = utils.makeUrl(usergroupUrl, opt);

			let style = { display: 'inline-block' };
			style.color = permission ? '#666' : '#f00';
			return <Radio permission={permission} expression={data.userGroupDesc} label={name} key={key} style={userGroupRadioStyle} name="userGroupId" value={String(id)}>
				<div style={style}>
					{(!permission) && <Tooltip getTooltipContainer={self.getContainer} title='该用户群有标签无权限'>
						<i className="fs14  fw_n cursor_p anticon anticon-info-circle-o permission_info"></i>
					</Tooltip>}
					<span className='ellipsis' style={{ width: 450, display: 'inline-block', verticalAlign: 'top' }} title={name}>{name}</span>
				</div>
				<div style={{ textAlign: 'right', position: 'absolute', right: '-10px', display: 'inline-block' }}>

					<Tooltip title="编辑用户群">
						<i onClick={self.handleSubmit.bind(self, window.event, url)} className="i_edit"></i>
					</Tooltip>
					<Tooltip title="删除用户群">
						<i onClick={self.delUserGroup.bind(self, name, id)} className="i_del"></i>
					</Tooltip>
				</div>
			</Radio>;


		});
		const tagList = this.state.userTypeTags.map(function (data, key) {
			return <li title={data.tagName} className={self.state.tagIds[data.tagId] ? 'current' : ''} value={data.tagId} onClick={self.selectTags} key={key}>{utils.getTextOverFlow(data.tagName, 10, true)}</li>;


		});
		let pushType = self.state.pushType;
		let data = {
			appId: appId,
			currentId: this.props.form.getFieldValue('userGroupId'),
			// id:this.props.form.getFieldValue('userGroupId'),
			pushType: pushType
		};
		let groupPush = this.props.groupPush;
		if (groupPush) {
			data.groupPush = groupPush;
		}
		if (timingPushType) {
			data.timingPushType = timingPushType;
		}
		let url = utils.makeUrl(usergroupUrl, data);


		let tagIdsName = this.state.tagIdsName;
		let tagIdsValue = this.state.tagIdsValue;
		let userType = this.props.userType;
		let groupId = utils.queryString('id', window.location.href) || utils.queryString('groupId', window.location.href);
		return (
			<FormItem {...this.props.formItemLayout} label="指定用户&nbsp;&nbsp;&nbsp;&nbsp;">
				<RadioGroup  {...this.props.getFieldProps('userType', {
					initialValue: userType,
					onChange: this.changeRadio
				}) }>
					{pushType === 'group' ? null : <Radio name="userType" value={0}>全部用户</Radio>}
					<Radio name="userType" value={1}>用户群</Radio>

					{this.props.personalPush ? null : <Radio name="userType" value={2}><span>PushId</span></Radio>}

					{this.props.personalPush ? null : this.props.flymeAuth ? <Radio name="userType" value={6}>IMEI</Radio> : null}
					{this.props.personalPush || pushType === 'group' ? null : this.props.flymeAuth ? <Radio name="userType" value={3}>Flyme账户</Radio> : null}
					{this.props.personalPush ? null : <Radio name="userType" value={4}>别名</Radio>}
					{this.props.personalPush ? null : <Radio name="userType" value={5}>标签</Radio>}
				</RadioGroup>

				{(userType === 1) ?//用户群
					<div className="user_type" id="userGropuList">
						{userGroup.length > 0 ?
							<FormItem><RadioGroup value={this.props.form.getFieldValue('userGroupId')} className="mb10" style={{ width: '100%' }}  {...this.props.getFieldProps('userGroupId', {
								initialValue: groupId,
								onChange: this.changeUserGroupRadio,
								validate: [{
									rules: [{
										required: true,
										message: '请选择用户群'
									}, {
										validator: function (rule, value, callback) {
											if (value === 'null' || value === 'undefined') {
												callback(new Error('请选择用户群'));
											}
											callback();
										}
									}]
								}]
							}) }>
								{userGroup}
							</RadioGroup></FormItem>
							: this.state.loadGroup ? <div className="color_error">无用户群</div> : <div>数据拉取中...</div>}

						<Button onClick={this.handleSubmit.bind(this, window.event, url)} className="color_bdc  " type="ghost" size="large">添加群组</Button>
					</div>
					: null}
				{(userType === 2 || userType === 3 || userType === 4 || userType === 6) ? this.getUserType() : null}


				{(userType === 5) ?//标签
					<div className="user_type" style={{ width: 600 }}>
						{tagList.length > 0 ?
							<div>
								<RadioGroup style={{ width: '100%' }}  {...this.props.getFieldProps('scope', {
									initialValue: this.props.scope,
									onChange: this.props.changeRadio
								}) }>
									<Radio name="scope" value={0}>并集</Radio>
									<Radio name="scope" value={1}>交集</Radio>
								</RadioGroup>
								<FormItem>
									<Input style={{ width: 300 }} disabled={true} title={this.props.form.getFieldValue('tagIdsName')} placeholder="选择标签" {...this.props.getFieldProps('tagIdsName', {
										initialValue: tagIdsName,
										rules: [{
											required: true,
											message: '请选择标签',
										}]
									}) } />
								</FormItem>
								<div style={{ display: 'none ' }}>
									<FormItem>
										<Input hidden style={{ width: 300, }} placeholder="选择标签" {...this.props.getFieldProps('tagIds', {
											initialValue: tagIdsValue
										}) } />
									</FormItem>
								</div>
								<ul className="tag_list">

									{tagList}
								</ul>
							</div>
							: <div className="color_error">无标签</div>
						}
					</div>



					: null}
				<Modal title="系统提示" visible={self.state.visible}
					onOk={self.delOk} onCancel={self.delCancel}>
					<p>删除用户群：{self.state.userGroupName}?</p>
				</Modal>
			</FormItem>

		);
	}
});

module.exports = UserType;
