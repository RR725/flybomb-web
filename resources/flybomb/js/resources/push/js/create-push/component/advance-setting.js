'use strict';
import React from 'react';

import { Form, Input, Radio, Icon, Checkbox, DatePicker } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

import Info from '../../info';


const AdvanceSetting = React.createClass({
	getInitialState() {
		return {
			display: 'none',
			selectBlack: [],
			errorTips: '',
			startTimeStatus: 'success',
			endTimeStatus: 'success',
			noticeImgUrl: this.props.noticeImgUrl
		};
	},
	showAdvance() {//展示高级设置
		this.props.showAdvance();
	},

	checkBoxChange(e) {
		//notificationType
		const checked = e.target.checked;
		const value = e.target.value;

		this.props.form.setFieldsValue({
			[value]: !checked ? 0 : 1
		});
		this.props.changeRadio(e);
	},
	changeStart(value) {
		this.props.form.setFieldsValue({
			fixStartDisplayTime: value
		});
	},
	changeEnd(value) {
		this.props.form.setFieldsValue({
			fixEndDisplayTime: value
		});
	},
	validateStartTime(type) {
		const self = this;
		let tableDataIndex = this.props.tableDataIndex;
		return this.props.getFieldProps(type, {
			initialValue: tableDataIndex && tableDataIndex.advanceInfo.fixStartDisplayTime ? new Date(tableDataIndex.advanceInfo.fixStartDisplayTime) : (this.props.form.getFieldValue('startTime') || new Date()),
			onChange(value) {
				const st = +new Date(value);
				const et = self.props.form.getFieldValue('fixEndDisplayTime');
				let display = 'none';
				let errorTips = '';

				let startTimeStatus = 'success';
				let endTimeStatus = 'success';
				if (st && et) {
					if (st > et) {
						errorTips = '结束时间不能早于开始时间';
						startTimeStatus = 'error';
						endTimeStatus = 'error';
						display = '';
					}
				}

				if (!st) {
					errorTips = '请选择开始时间';
					display = '';
					startTimeStatus = 'error';
				}
				if (!et) {
					errorTips = '请选择结束时间';
					display = '';
					endTimeStatus = 'error';
				}

				self.setState({
					startTimeStatus: startTimeStatus,
					endTimeStatus: endTimeStatus,
					display: display,
					errorTips: errorTips
				});
			}
		});
	},

	validateEndTime(type) {
		const self = this;

		let tableDataIndex = this.props.tableDataIndex;
		return this.props.getFieldProps(type, {
			initialValue: tableDataIndex && tableDataIndex.advanceInfo.fixEndDisplayTime ? new Date(tableDataIndex.advanceInfo.fixEndDisplayTime) : (this.props.form.getFieldValue('startTime') || new Date()),
			onChange(value) {
				const et = +new Date(value);
				const st = self.props.form.getFieldValue('fixStartDisplayTime');
				let display = 'none';
				let errorTips = '';

				let startTimeStatus = 'success';
				let endTimeStatus = 'success';
				if (st && et) {
					if (et < st) {

						errorTips = '结束时间不能早于开始时间';
						startTimeStatus = 'error';
						endTimeStatus = 'error';
						display = '';
					}
				}

				if (!st) {
					errorTips = '请选择开始时间';
					display = '';
					startTimeStatus = 'error';
				}
				if (!et) {
					errorTips = '请选择结束时间';
					display = '';
					endTimeStatus = 'error';
				}
				self.setState({
					startTimeStatus: startTimeStatus,
					endTimeStatus: endTimeStatus,
					display: display,
					errorTips: errorTips
				});
			}
		});
	},
	validateFixSpeedRate(type) {
		const self = this;
		const limitRate = self.props.limitRate;
		return this.props.getFieldProps(type, {
			validate: [{
				rules: [{
					validator: function (rule, value, callback) {
						if (!value) {
							callback(new Error('请输入推送速率'));
						} else if (value && (!String(value).match(/^[1-9]+[0-9]*$/))) {
							callback(new Error('请输入正整数'));
						} else if (value && value > limitRate) {
							callback(new Error(`推送速率被设置为不能大于${limitRate}`));
						} else {
							callback();
						}
					}
				}],
				trigger: ['onBlur', 'onChange']
			}]


		});
	},

	componentDidMount() {
		// let tableDataIndex = this.props.tableDataIndex;
		// console.log(tableDataIndex)
		// if (tableDataIndex) {

		// 	var vibrate = tableDataIndex.advanceInfo.notificationType.vibrate;
		// 	var sound = tableDataIndex.advanceInfo.notificationType.sound;
		// 	var lights = tableDataIndex.advanceInfo.notificationType.lights;
		// } else {
		// 	var vibrate = this.props.form.getFieldValue('vibrate');
		// 	var sound = this.props.form.getFieldValue('sound');
		// 	var lights = this.props.form.getFieldValue('lights');

		// }
		// console.log(vibrate)
		// console.log(sound)
		// console.log(lights)
		// this.setState({
		// 	vibrate: vibrate,
		// 	sound: sound,
		// 	lights: lights
		// });

		let tableDataIndex = this.props.tableDataIndex;
		let blackList = [];
		if (tableDataIndex) {//如果是分组推送的修改
			blackList = tableDataIndex.advanceInfo.blackId;
			blackList = blackList.split(',');

			this.setState({
				selectBlack: blackList
			});
		}


	},
	changeBlack(e, index) {
		let checked = e.target.checked;
		let selectBlack = this.state.selectBlack;
		if (checked) {
			selectBlack.push(e.target.name);
		} else {
			selectBlack = selectBlack.filter(function (data) {
				return data !== e.target.name;
			});
		}
		this.setState({
			selectBlack: selectBlack
		});
		let blackList = this.props.blackList;
		blackList.map(function (data, key) {
			if (key === index) {
				blackList[key].choose = e.target.checked;
			}
		});

		this.props.changeBlack(blackList, index);
	},
	changeRadioBlack(e) {
		let blackList = this.state.selectBlack;
		let type;
		if (blackList.length === 1 && !blackList[0]) {
			type = 'black';
		}
		this.props.changeRadio(e, type);
	},
	render() {
		const self = this;
		let listData = this.props.blackList;
		let blackList = this.state.selectBlack;

		let blackListHtml = listData.map(function (data, key) {
			let choose = data.choose;
			if (blackList.length) {

				choose = false;
				for (let i = 0; i < blackList.length; i++) {
					let id = blackList[i];
					if (id === String(data.blackId)) {
						choose = true;
					}
				}
			}
			return <FormItem className="mg0" key={key}>
				<label>
					<Checkbox data={data} name={String(data.blackId)} title={data.blackName} checked={choose} {...self.props.getFieldProps('blackId' + data.blackId, {
						initialValue: choose,
						onChange(e) {
							self.changeBlack(e, key);
						}
					}) } />
					{data.blackName}<span title={data.title} className="pl10">数量：{data.blackNum}</span>
				</label>
			</FormItem>;
		});
		if (!listData.length) {
			blackListHtml = <span className="color_error ">无黑名单</span>;
		}
		var vibrate = this.props.vibrate;
		var sound = this.props.sound;
		var lights = this.props.lights;
		const disabledDate = function (current) {
			const startTime = self.props.form.getFieldValue('startTime');
			let dateNow = Date.now();
			if (startTime) {
				dateNow = startTime;
			}
			return current && current.getTime() + 1000 * 60 * 60 * 24 <= dateNow;
		};
		// let url = restapi.uploadImg;
		// url = utils.makeUrl(url, {
		// 	imgType: 2,
		// 	appId: utils.queryString('appId', window.location.href)
		// });
		//勿删，后续还要开放出来
		// <FormItem {...this.props.formItemLayout}  label="联网方式&nbsp;&nbsp;&nbsp;&nbsp;">
		// 				        <RadioGroup  {...this.props.getFieldProps('netType', {
		// 				        	initialValue:this.props.netType ,
		// 					        onChange:this.props.changeRadio
		// 					    })}>
		// 				        	<Radio name="netType" value={0}>不限</Radio>
		// 				        	<Radio name="netType" value={1}>仅WiFi</Radio>
		// 				        </RadioGroup>

		// 			        </FormItem>
		return (
			<div>
				{!this.props.personalPush &&
					<FormItem className="border_top advance_toggle" {...this.props.formItemLayout} label="高级设置&nbsp;&nbsp;&nbsp;">
						<Icon onClick={this.showAdvance} style={{ fontSize: 12, paddingTop: 13 }} type={this.props.showAdvanceStatus ? 'cross' : 'down'} />
					</FormItem>
				}
				<div style={{ display: this.props.showAdvanceStatus ? '' : 'none' }}>

					{!this.props.personalPush &&
						<FormItem className="black_notice" {...this.props.formItemLayout} label={<Info text='定速推送　' />}>

							<RadioGroup  {...this.props.getFieldProps('fixSpeed', {
								initialValue: this.props.fixSpeed,
								onChange: this.props.changeRadio
							}) }>
								<Radio name="fixSpeed" value={0}>关闭</Radio>
								<Radio name="fixSpeed" value={1}>开启</Radio>
							</RadioGroup>
							{(this.props.fixSpeed === 1 || this.props.form.getFieldValue('fixSpeed')) ?
								<FormItem className="fix_speed_rate">
									<Input style={{ width: 100 }} {...this.validateFixSpeedRate('fixSpeedRate') }></Input><span className="pl10">条/秒</span>
								</FormItem>

								: null}


						</FormItem>
					}
					{!this.props.personalPush &&

						this.props.type === 'notice' ?//推送通知的高级设置比较多
						<div>

							<FormItem  className="black_notice" {...this.props.formItemLayout} label={<Info text='定时展示　' />} >
								<RadioGroup  {...this.props.getFieldProps('fixDisplay', {
									initialValue: this.props.fixDisplay,
									onChange: this.props.changeRadio
								}) }>
									<Radio name="fixDisplay" value={0}>关闭</Radio>
									<Radio name="fixDisplay" value={1}>开启</Radio>
								</RadioGroup>


								{(this.props.fixDisplay === 1) ?
									<div >
										<FormItem validateStatus={this.state.startTimeStatus} className="display_ib va_t mg0">
											<DatePicker
												disabledDate={disabledDate}
												onOk={this.changeStart}
												showTime
												{...this.validateStartTime('fixStartDisplayTime') }
												placeholder="开始时间"
												format="yyyy-MM-dd HH:mm:ss" />
										</FormItem>
										<span className="pl10 pr10">至</span>
										<FormItem validateStatus={this.state.endTimeStatus} className="display_ib va_t mg0">
											<DatePicker
												disabledDate={disabledDate}
												{...this.validateEndTime('fixEndDisplayTime') }
												placeholder="结束时间"
												onOk={this.changeEnd}
												showTime
												format="yyyy-MM-dd HH:mm:ss" />
										</FormItem>
										<span style={{ display: this.state.display }} className="color_error pl10">{this.state.errorTips}</span>
									</div>

									: null}
							</FormItem>


							{this.props.msgCacheStatus ?
								<FormItem {...this.props.formItemLayout} label="消息缓存&nbsp;&nbsp;&nbsp;&nbsp;">

									<RadioGroup  {...this.props.getFieldProps('msgCache', {
										initialValue: this.props.msgCache,
										onChange: this.props.changeRadio
									}) }>
										<Radio name="msgCache" value={0}>关闭</Radio>
										<Radio name="msgCache" value={1}>开启</Radio>
									</RadioGroup>
								</FormItem>
								: null}

							<FormItem {...this.props.formItemLayout} label="通知栏悬浮窗&nbsp;&nbsp;&nbsp;&nbsp;">
								<RadioGroup  {...this.props.getFieldProps('suspend', {
									initialValue: this.props.suspend,
									onChange: this.props.changeRadio
								}) }>
									<Radio name="suspend" value={1}>显示</Radio>
									<Radio name="suspend" value={0}>不显示</Radio>
								</RadioGroup>

							</FormItem>
							<FormItem {...this.props.formItemLayout} label="清除通知栏&nbsp;&nbsp;&nbsp;&nbsp;">
								<RadioGroup  {...this.props.getFieldProps('clearNoticeBar', {
									initialValue: this.props.clearNoticeBar,
									onChange: this.props.changeRadio
								}) }>
									<Radio name="clearNoticeBar" value={1}>可清除</Radio>
									<Radio name="clearNoticeBar" value={0}>不可清除</Radio>
								</RadioGroup>

							</FormItem>

							<FormItem {...this.props.formItemLayout} label="通知提醒类型&nbsp;&nbsp;&nbsp;&nbsp;">

								<label className="mr10"><Checkbox className="mr10"  {...this.props.getFieldProps('vibrate', {
									value: vibrate
								}) } value='vibrate' onChange={this.checkBoxChange} checked={vibrate ? true : false} />震动</label>
								<label className="mr10"><Checkbox className="mr10"  {...this.props.getFieldProps('lights', {
									value: lights
								}) } value='lights' onChange={this.checkBoxChange} checked={lights ? true : false} />闪灯</label>
								<label><Checkbox className="mr10" {...this.props.getFieldProps('sound', {
									value: sound
								}) } value='sound' onChange={this.checkBoxChange} checked={sound ? true : false} />声音</label>

							</FormItem>






						</div>
						: null
					}
					<FormItem className="black_notice" {...this.props.formItemLayout} label={<Info text='推送黑名单　　' />}>

						<RadioGroup  {...this.props.getFieldProps('black', {
							initialValue: this.props.black,
							onChange: this.changeRadioBlack
						}) }>
							<Radio name="black" value={1}>使用</Radio>
							<Radio name="black" value={0}>禁用</Radio>
						</RadioGroup>

					</FormItem>
					{this.props.form.getFieldValue('black') === 1 &&
						<div className="user_type user_type_black" >
							{blackListHtml}
							<span className="color_error" style={{ display: this.props.displayBlackList }}>请选择黑名单</span>
						</div>
					}
				</div>
			</div>



		);
	}
});

module.exports = AdvanceSetting;



		// const props = {
		// 	name: 'imgFile',
		// 	action: url,
		// 	accept: '.jpg,.jpeg,.png,.bmp',
		// 	headers: {
		// 		authorization: 'authorization-text',
		// 	},
		// 	data: {

		// 	},
		// 	showUploadList: false,
		// 	beforeUpload(file) {
		// 		self.setState({
		// 			loading: true
		// 		});
		// 		const fileType = file.type;

		// 		if (file.size > 1024 * 500) {
		// 			message.error('图片大小不能超过500K');
		// 			self.setState({
		// 				loading: false
		// 			});
		// 			return false;
		// 		}

		// 		const isImg = fileType.indexOf('image') >= 0;
		// 		if (!isImg) {
		// 			message.error('请上传图片格式的文件');
		// 			self.setState({
		// 				loading: false
		// 			});
		// 		}
		// 		return isImg;
		// 	},
		// 	onChange(info) {
		// 		if (info.file.status !== 'uploading') {
		// 			console.log(info.file, info.fileList);
		// 		}
		// 		if (info.file.response) {
		// 			if (info.file.response.code === '200') {
		// 				const noticeImgUrl = info.file.response.value.imgUrl;
		// 				message.success(`${info.file.name} 上传成功。`);
		// 				self.props.form.setFieldsValue({
		// 					noticeImgUrl: noticeImgUrl
		// 				});
		// 				self.setState({
		// 					noticeImgUrl: noticeImgUrl
		// 				});
		// 				self.props.changeIcon(noticeImgUrl);

		// 			} else {
		// 				message.error(info.file.response.message);
		// 			}

		// 			self.setState({
		// 				loading: false
		// 			});
		// 		}
		// 	}
		// };







	// <FormItem {...this.props.formItemLayout}  label="自定义图标&nbsp;&nbsp;&nbsp;&nbsp;">

	// 							<Upload {...this.props.getFieldProps('noticeImgUrl') } style={{ width: 200 }}  {...props}  >
	// 								<Button size="large" className="btn_normal_show " type="ghost">
	// 									更换图片
	// 									{this.state.loading ? <Icon type="loading" /> : <span></span>}
	// 								</Button>

	// 							</Upload>
	// 							<span className="upload_tips">尺寸为480*480，500KB以内</span>
	// 							<div className="img_review"><img width="160" height="160" src={this.props.form.getFieldValue('noticeImgUrl') || this.state.noticeImgUrl || this.props.noticeImgUrl} /></div>

	// 						</FormItem>