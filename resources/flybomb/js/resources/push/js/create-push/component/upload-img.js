'use strict';
import React from 'react';

import { Form,  Upload, Radio, Icon, message, Button} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';

const formItemLayout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 20
	}
};



let Distinct = React.createClass({
	getInitialState() {
		return {
			listData: [],
			distinctId: {}
		};
	},

	uploadParam(type) { //上传图片的参数
		const self = this;
		let name = 'imgFile';
		let imgType = type === 'noticeBarImgUrl' ? 0 : 1;
		let textType = type === 'noticeBarImgUrl' ? 'smallImage' : 'bigImage';
		let size = type === 'noticeBarImgUrl' ? 100 : 200;
		let text = '图片';
		let errorMsgDisplay = textType + 'Display';
		let url = restapi.uploadImg;
		let showUploadList = false;
		let format = '.jpg,.jpeg,.png,.bmp';
		if (type === 'vedioUrl') {
			textType = 'vedio';
			name = textType + 'File';
			errorMsgDisplay = textType + 'Display';
			url = restapi.uploadVedio;
			size = 1024;
			text = '视频';
			showUploadList = true;
			format = '.act';
		}
		let json = {
			appId: utils.queryString('appId', window.location.href)
		};
		if (type !== 'vedioUrl') {

			json.imgType = imgType;
		}
		url = utils.makeUrl(url, json);
		const props = {
			name: name,
			data: {

			},
			accept: format,
			action: url,
			showUploadList: showUploadList,
			beforeUpload(file) {
				let json = {};
				json[type + 'loading'] = true;
				const fileName = file.name;
				let fileType = fileName.split('.');
				fileType = fileType[fileType.length - 1];
				if (file.size > 1024 * size) {
					size = type === 'vedioUrl' ? '1M' : size + 'K';
					message.error(`${text}大小不能超过${size}`);
					self.setState({
						loading: false
					});
					return false;
				}
				let isImg = type === 'vedioUrl' ? fileType.indexOf('act') >= 0 : fileType.indexOf('jpg') >= 0 || fileType.indexOf('jpeg') >= 0 || fileType.indexOf('png') >= 0 || fileType.indexOf('bmp') >= 0;
				if (!isImg) {
					message.error('请上传' + format + '后缀格式的文件');

					json[type + 'loading'] = false;
				}
				self.setState(json);
				return isImg;
			},

			onChange(info) {
				if (info.file.status === 'removed') {

					if (info.fileList.length < 1) {
						self.props.form.setFieldsValue({
							vedioUrl: undefined
						});
						window[textType + 'FilePathJson'] = {};
					}

					return;
				}
				
				if (info.file.response) {
					let json = {};
					if (info.file.response.code === '200') {
						if (info.fileList.length > 1) {
							info.fileList.shift();
						}
						json[type] = type === 'vedioUrl' ? info.file.response.value : info.file.response.value.imgUrl;
						message.success(`${info.file.name} 上传成功。`);
						self.props.form.setFieldsValue(json);
						self.setState({
							vedioDisplay: 'none',
							layerDisplay: 'none',
							[errorMsgDisplay]: 'none'
						});

					} else {
						info.fileList.pop();
						message.error(info.file.response.message);
					}

					json[type + 'loading'] = false;
					window[textType + 'FilePathJson'] = json;
					self.setState(json);

				}
			}
		};
		let vedioUrl = window[textType + 'FilePathJson'][type] || this.props.form.getFieldValue(type);
		if (type === 'vedioUrl' && vedioUrl) {
			let vedioName = vedioUrl.split('/');
			vedioName = vedioName[vedioName.length - 1];
			props.defaultFileList = [{
				name: vedioName,
				url: 'javascript:;',
				uid: -1,
				status: 'done'
			}];
		}
		return props;
	},
	closeImg(url, type) {//删掉图片
		const json = {};
		json[url] = null;
		json[type + 'layerDisplay'] = 'none';
		this.props.form.setFieldsValue(json);
		let textType = url === 'noticeBarImgUrl' ? 'smallImage' : 'bigImage';
		if (url === 'vedioUrl') {
			textType = 'vedio';
		}
		window[textType + 'FilePathJson'][url] = null;
		this.setState(json);
	},
	imgOver(type) {
		let json = {};
		json[type + 'layerDisplay'] = '';
		this.setState(json);
	},
	componentDidMount() {
		window['vedioFilePathJson'] = {};
	},
	eventPre(e) {

		e.stopPropagation();
	},
	imgOut(type) {

		let json = {};
		json[type + 'layerDisplay'] = 'none';
		this.setState(json);
	},
	uploadVedio() {
		let url = 'vedioUrl';
		const { getFieldProps } = this.props.form;
		return (this.props.form.getFieldValue('noticeExpandType') === 3) ?
			<div className="user_type notice_expand">

				<Upload {...getFieldProps('vedioUrl', {
					initialValue: window.vedioFilePathJson[url]


				}) } style={{ width: 200 }}  {...this.uploadParam(url) } >
					<Button size="large" className="btn_normal_show " type="ghost">
						ACT文件上传
						{this.state.loading ? <Icon type="loading" /> : <span></span>}
					</Button>
				</Upload>
				<span className="upload_tips vedio_upload_tips">请上传1M以内的ACT文件<span style={{ display: this.state.vedioDisplay || this.props.vedioDisplay }} className="pl10 color_error">请上传ACT文件</span></span>

				<FormItem {...formItemLayout} label="下载条件&nbsp;&nbsp;&nbsp;&nbsp;">
					<RadioGroup {...getFieldProps('onlyWifi', {
						initialValue: this.props.form.getFieldValue('onlyWifi') ? 1 : 0,
					}) }>
						<Radio name="noticeBarType" value={1}>仅WIFI</Radio>
						<Radio name="noticeBarType" value={0}>不限</Radio>

					</RadioGroup>
				</FormItem>
			</div> : null;
		// return (this.props.form.getFieldValue('noticeExpandType') === 3) ?
		// 	<div className="upload_area upload_area_big">
		// 		<Upload {...this.uploadParam(url) }>
		// 			<Button type="primary" size="large">上传文件{this.state[url + 'loading'] ? <Icon type="loading" /> : <span></span>}</Button>
		// 			<p style={{ display: this.state.vedioDisplay }} className="pl10 color_error">请上传文件</p>

		// 		</Upload>
		// 		<p>请上传1M以内的ACT文件</p>
		// 	</div>
		// 	:
		// 	null;
	},
	render() {
		let url = this.props.url;
		let type = this.props.type;
		let value = this.props.value;
		let textType = url === 'noticeBarImgUrl' ? 'smallImage' : 'bigImage';
		if (url === 'vedioUrl') {
			textType = 'vedio';
		}
		let data = {
			size: 'small',
			height: 70,
			uploadDom: <div className="upload_area">
				<Upload {...this.uploadParam(url) }>
					<Button type="primary" size="large">添加图片{this.state[url + 'loading'] ? <Icon type="loading" /> : <span></span>}</Button>


				</Upload>

				<p className="tips">
					推荐尺寸525*100，100KB以内
					<span style={{ display: this.props.smallImageDisplay }} className="pl10 color_error">请上传图片</span>
				</p>
			</div>
		};
		if (value === 2) {
			data.size = 'big';
			data.height = 182;
			data.uploadDom = <div className="upload_area upload_area_big">
				<Upload {...this.uploadParam(url) }>
					<Button type="primary" size="large">添加图片{this.state[url + 'loading'] ? <Icon type="loading" /> : <span></span>}</Button>
					<p style={{ display: this.props.bigImageDisplay }} className="pl10 color_error">请上传图片</p>

				</Upload>
				<p>Flyme5推荐尺寸700*400，200KB以内</p>
				<p>Flyme6推荐尺寸262*95，200KB以内</p>
			</div>;
		}
		let dom = (this.props.form.getFieldValue(type) === value) ?
			<div>
				<FormItem>
					<div className="upload_img">
						<div className="">
							{window[textType + 'FilePathJson'][url] || this.props.form.getFieldValue(url) ?
								<div className={data.size + '_img'}>
									<img onMouseOver={this.imgOver.bind(this, data.size)} width="300" height={data.height} src={window[textType + 'FilePathJson'][url] || this.props.form.getFieldValue(url)} />

									<div onMouseOver={this.eventPre} onMouseOut={this.imgOut.bind(this, data.size)} style={{ display: this.state[data.size + 'layerDisplay'] }} className="close_img">
										<Upload className={data.size + '_img_btn'} {...this.uploadParam(url) }>
											<Button onMouseOut={this.eventPre} onMouseOver={this.imgOver.bind(this, data.size)} type="primary" size="large">更换图片{this.state[url + 'loading'] ? <Icon type="loading" /> : <span></span>}</Button>


										</Upload>
										<div className="close_icon" onMouseOut={this.eventPre} onMouseOver={this.imgOver.bind(this, data.size)}><Icon onClick={this.closeImg.bind(this, url, data.size)} type="cross-circle" /></div>
									</div>
								</div>
								:
								data.uploadDom

							}
						</div>


					</div>
				</FormItem>

			</div>
			: null;
		if (type === 'noticeExpandType' && value === 3) {
			dom = this.uploadVedio();
		}

		return dom;
	}
});

Distinct = Form.create()(Distinct);


module.exports = Distinct;