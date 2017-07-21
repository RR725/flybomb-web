'use strict';
import React from 'react';
import { Button, Row, Col, Radio, Table, Modal, message, Icon, Form, Tag } from 'antd';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const FormItem = Form.Item;

import EchartsReact from 'echarts-for-react';
import restapi from '../../../lib/url-model';
import utils from '../../../lib/utils';
import ajax from '../../../components/ajax';


import AddAttr from './add-attr';


const formItemLayoutSmall = {
	labelCol: { span: 3 },
	wrapperCol: { span: 21 }
};



let ToolbarChart = React.createClass({
	getInitialState() {
		return {
			tags: [],
			currentSelectData: [],
			chartData: []
		};
	},

	componentDidMount() {
		let self = this;
		const appId = utils.queryString('appId', window.location.href);
		let url = restapi.listTopTagChosen;
		url = utils.makeUrl(url, {
			appId: appId
		});
		ajax.get(url, function (result) {
			self.setState({
				tags: result.value
			});
		});
	},

	handleSubmit(e) {
		const appId = utils.queryString('appId', window.location.href);
		e.preventDefault();
		let self = this;
		this.props.form.validateFields((errors, values) => {


			if (errors) {

				console.log('Errors in form!!!');
				return;
			}

			for (let i in values) {
				if (values[i] === '') {
					delete values[i];
				}

			}

			let url = restapi.appUserAnalysis;
			let data = {

				sort: values.sort,
				tagJson: JSON.stringify(this.state.tags)
			};
			if (this.props.searchType === 0) {
				url = restapi.taskUserAnalysis;
				data.taskId = this.props.tableData.data[0].taskId;
			} else {
				data.formatDay = utils.dateFormat('yyyy-MM-dd', this.props.startTime);

			}
			data.appId = appId;
			this.setState({
				loading: true
			});
			url = utils.makeUrl(url, data);
			ajax.get(url, function (result) {
				let chartData = result.value;
				self.setState({
					chartData: chartData,
					loading: false
				});

				if (!chartData.length) {
					message.error('无数据');
				}
			}, function () {
				self.setState({
					loading: false
				});
			});
			// this.props.onSearch(values);
		});
	},
	changeRadio() {

	},
	showModal() {
		this.setState({
			visible: !this.state.visible
		});
	},
	modalTableColumns() {
		return [{
			title: '属性',
			key: '0',
			className: 'ta_l',
			dataIndex: 'fname'
		}, {
			title: '点击数',
			key: '1',
			className: 'ta_r',
			dataIndex: 'clickCount'
		}, {
			title: '未点击数',
			key: '2',
			className: 'ta_r',
			dataIndex: 'showCount',
			render(text, record) {
				return record.showCount - record.clickCount;
			}
		}];
	},
	handleClose(removedTag) {
		const tags = this.state.tags.filter(tag => tag.fid !== removedTag);
		this.setState({ tags });
	},
	selectTags(tags) {
		this.setState({
			tags: tags
		});
	},
	getOptions(data) {
		let color1 = '#06799f';
		let color2 = '#ff6600';
		let xData = [];
		let result = data.result;
		let clickCount = [];
		let noClickCount = [];
		result.map(function (opt) {
			xData.push(opt.fname);
			clickCount.push(opt.clickCount);
			noClickCount.push(opt.showCount - opt.clickCount);

		});
		let option = {
			tooltip: {
				trigger: 'axis',
				formatter(params) {
					let len = params.length;
					if (len > 1) {
						let per = params[0].value / (params[0].value + params[1].value);
						per = per * 100;
						let per1 = per.toFixed(1);
						let per2 = (100 - per1).toFixed(1);
						return `<div><h3>${data.fname}-${params[0].name}</h3>
						<p>展示人数：${params[0].value + params[1].value}</p>
						<p>${params[0].seriesName}：${params[0].value}，占${per1}%</p>
						<p>${params[1].seriesName}：${params[1].value}，占${per2}%</p></div>`;
					}

				}
			},
			legend: {
				x: 'right',
				data: ['点击数', '未点击数']
			},
			title: {
				text: data.fname
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},

			xAxis: {
				type: 'category',
				data: xData
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: '点击数',
					type: 'bar',
					stack: 'sum',
					itemStyle: {
						normal: {
							color: color1,
						}
					},
					data: clickCount
				},
				{
					name: '未点击数',
					type: 'bar',
					stack: 'sum',
					itemStyle: {
						normal: {
							color: color2,
						}
					},
					data: noClickCount
				}
			]
		};
		return option;
	},
	hideModal() {
		this.setState({
			tableVisible: false
		});
	},
	allScreen(data) {

		this.setState({
			allScreen: true,
			currentSelectData: data
		});
	},
	quitAllScreen() {
		this.setState({
			allScreen: false,
			currentSelectData: null
		});
	},
	showTable(data) {
		this.setState({
			tableVisible: true,
			currentSelectData: data
		});
	},
	getChart() {
		let self = this;
		let chartData = this.state.chartData;
		let arr = [];
		chartData.map(function (data, key) {
			if (data.result) {
				arr.push(<div className="analyze_chart fl" key={key}>
					<div className="analyze_chart_tools">
						<span onClick={() => { self.showTable(data); }}>表格展示</span>
						<span className="pl10" onClick={() => { self.allScreen(data); }}>全屏</span>
					</div>
					<EchartsReact option={self.getOptions(data)} />
				</div>);
			} else {

				arr.push(<div className="analyze_chart " style={{ padding: '10px 0 10px 10px' }} key={key}>{data.fname}-无数据</div>);
			}

		});
		return arr;
	},
	render() {
		const { getFieldProps } = this.props.form;
		let tags = this.state.tags;
		let currentSelectData = this.state.currentSelectData;
		return (
			<div>
				<Form horizontal>
					<Row>
						<Col className="pl10" span="24">
							<FormItem {...formItemLayoutSmall} label="选择分析属性">
								{tags.map((tag) => {
									const tagElem = (
										<Tag key={tag.fid} closable={true} afterClose={() => this.handleClose(tag.fid)}>
											{tag.fname}
										</Tag>
									);
									return tagElem;
								})}
								<Button type="primary" className="mb5" onClick={this.showModal} size="large">添加属性</Button>
							</FormItem>
						</Col>

					</Row>
					<Row>
						<Col className="pl10 radio_btn" span="24">
							<FormItem {...formItemLayoutSmall} label="排序（从高到低）">

								<RadioGroup  {...getFieldProps('sort', {
									initialValue: 0
								}) } defaultValue="a" size="large">
									<RadioButton value={0}>展示数</RadioButton>
									<RadioButton value={1}>点击数</RadioButton>
									<RadioButton value={2}>未点击数</RadioButton>
								</RadioGroup>
							</FormItem>

						</Col>

					</Row>
					<Row>
						<Col className="pl10" span="24">

							<FormItem {...formItemLayoutSmall} label="&nbsp;">
								<Button disabled={this.state.loading ? true : false} type="primary" onClick={this.handleSubmit} size="large">
									分析查询{this.state.loading ? <Icon type="loading" /> : <span></span>}
								</Button>
							</FormItem>

						</Col>

					</Row>
				</Form>
				{this.state.allScreen && currentSelectData && <div className="analyze_all_screen">
					<div className="analyze_chart_tools">
						<span onClick={() => { this.showTable(currentSelectData); }}>表格展示</span>
						<span className="pl10" onClick={this.quitAllScreen}>退出全屏</span>

					</div>
					<EchartsReact option={this.getOptions(currentSelectData)} />
				</div>}
				<div style={{ overflow: 'hidden' }}>
					{this.getChart()}
				</div>
				<Modal
					width={1000}
					onCancel={this.hideModal}
					onOk={this.hideModal}
					title={currentSelectData && currentSelectData.fname}

					visible={this.state.tableVisible} >
					<div className="ml10 mr10">
						<Table pagination={false} columns={this.modalTableColumns()} dataSource={currentSelectData && currentSelectData.result}></Table>
					</div>
				</Modal>

				{this.state.visible && <AddAttr selectTags={this.selectTags} tags={tags} showModal={this.showModal} visible={this.state.visible}></AddAttr>}

			</div>
		);
	}
});

ToolbarChart = Form.create()(ToolbarChart);


module.exports = ToolbarChart;

