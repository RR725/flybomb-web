'use strict';
import React from 'react';

import { Tooltip } from 'antd';
const App = React.createClass({

	getNumber(str) {
		const arr = str.toString().split(',');
		const num = parseInt(arr.join(''));
		return num;
	},
	getGroupPushChart() {
		let self = this;
		const options = this.props.options;
		const pushTasks = options.pushTasks;
		const len = options.data.length;
		let data = options.data;
		let arr = [];
		data.sort(function (a, b) {

			let numA = a.replace('%', '');
			numA = Number(numA);
			let numB = b.replace('%', '');
			numB = Number(numB);
			return numB - numA;
		});
		pushTasks.sort(function (a, b) {
			let numA = a.taskStatics.clickRate;
			let numB = b.taskStatics.clickRate;

			numA = numA.replace('%', '');
			numA = Number(numA);
			numB = numB.replace('%', '');
			numB = Number(numB);
			return numB - numA;
		});
		data.map(function (key) {
			let num = key.replace('%', '');
			arr.push(Number(num));
		});
		arr.sort(function (a, b) {
			return b - a;
		});
		let max = arr[0];
		const bar = data.map(function (key, i) {
			let num = key.replace('%', '');
			let per = max ? max : 100;
			const height = num * options.height / per;
			const opacity = height / 300;
			const style = {
				background: options.bgcolor,
				opacity: opacity < 0.2 ? 0.2 : opacity,
				height: height
			};
			const groupStyle = {
				marginLeft: (10 / len) * 32,
				marginTop: options.height - height
			};
			if (len > 10) {
				groupStyle.width = 10 / len * 60;
			}

			const title = (
				<div className="chart_tips" style={{ padding: 10 }}>
					<h3>任务ID：{pushTasks[i].taskId}</h3>
					<h3>标题/备注：{pushTasks[i].title}</h3>
					<h3>内容：{pushTasks[i].content}</h3>
					{pushTasks[i].pushTypeInfo ? <h3>目标用户：{self.props.getUserInfo(pushTasks[i])}</h3> : null}
					<h3>推送状态：{pushTasks[i].status}</h3>
					<h3>推送用户数：{pushTasks[i].taskStatics.pushedNo}</h3>

				</div>
			);
			return (

				<Tooltip placement="right" key={i} title={title}>

					<div style={groupStyle} key={i} className="bar_li bar_li_group">
						<div className="bar" style={style}></div>
						<div style={{ top: - 26 }} className="text_num"><p className="num">{key}</p></div>
					</div>

				</Tooltip>
			);
		});
		return (
			<div className="data_bar">
				<style>{`
							.ant-tooltip-placement-right .ant-tooltip-inner{
								background-color:#fff;
								word-break:break-all;
							}
						`}</style>
				<div className="bar_con" style={{ position: 'relative', height: options.height, marginTop: 70, borderLeft: '1px solid #ccc' }}>
					{bar}<span style={{ position: 'absolute', left: 0, bottom: -30 }}>点击率</span>
				</div>
			</div>
		);
	},
	render() {
		if (this.props.type === 'groupPush') {
			return this.getGroupPushChart();
		}
		const self = this;
		const data = this.props.chartData;
		const targetNo = this.getNumber(data.targetNo);


		const options = this.props.options;

		const len = options.data.length;
		const bar = options.data.map(function (key, i) {

			const height = (self.getNumber(key) / targetNo) * options.height;

			const style = {
				background: options.bgcolor,
				opacity: (i / len) + 0.2,
				height: height,
				marginTop: options.height - height
			};

			const title = (
				<div className="chart_tips">
					<h2>{options.x[i]}</h2>
					<p>{options.data[i]}</p>
					{options.x[i - 1] ?
						<span>
							<h2>转化率<span className="info">{options.x[i]}/{options.x[i - 1]}</span></h2>
							<p>{options.rate[i]}</p>
						</span> : null
					}
				</div>
			);
			return (
				<Tooltip placement="right" key={i} title={title}>


					<div className="bar_li">
						<div className="bar" style={style}></div>
						<div style={{ top: options.height - height - 46 }} className="text_num"><p className="text">{options.x[i]}</p><p className="num">{key}</p></div>
					</div>
				</Tooltip>
			);
		});
		if (!targetNo) { return null; }
		return (
			<div className="data_bar">
				<style>{`
							.ant-tooltip-inner{
								background-color:#fff;
							}
						`}</style>
				<div className="bar_con" style={{ height: options.height }}>{bar}</div>
			</div>
		);
	}
});

module.exports = App;





