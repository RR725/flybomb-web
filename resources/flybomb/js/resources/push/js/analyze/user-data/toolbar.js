'use strict';
import React from 'react';
import { Button, Row, Col, Tabs, Form } from 'antd';


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import EchartsReact from 'echarts-for-react';

import utils from '../../../lib/utils';


import PushTime from '../../push-time';


import Table from './table';




const formItemLayoutSmall = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
};



let UserData = React.createClass({
	getInitialState() {
		return {
			initData: {},
			values: [],
			data: null,
			noticeBarType: '0',
			noticeExpandType: '0',
			pushTimeType: 0,
			errors: {}
		};
	},
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {


			if (errors) {

				console.log('Errors in form!!!');
				return;
			}

			const st = values.startTime;
			const et = values.endTime;
			if (+new Date(st) > +new Date(et)) {
				return;
			}

			values.index = 1;
			values.startTime = utils.dateFormat('yyyy-MM-dd', values.startTime);
			values.endTime = utils.dateFormat('yyyy-MM-dd', values.endTime);
			for (let i in values) {
				if (values[i] === '') {
					delete values[i];
				}

			}

			this.props.onSearch(values);
		});
	},
	render() {
		return (
			<div>
				<Form horizontal>
					<Row>
						<Col className="pl10" span="16">

							<PushTime router='analyze' type='day' form={this.props.form} />

						</Col>
						<Col span="8">

							<FormItem {...formItemLayoutSmall} label="">
								<Button type="primary" onClick={this.handleSubmit} size="large">查询</Button>
							</FormItem>

						</Col>

					</Row>
				</Form>

				<Tabs onChange={this.props.onChange} className="platform_data analyze_data">
					<TabPane tab="日增用户数" key="1">
						<EchartsReact option={this.props.getOption(2222)} />
					</TabPane>
					<TabPane tab="在线峰值用户数" key="2">
						<EchartsReact option={this.props.getOption(1111)} />
					</TabPane>
					<TabPane tab="日联网用户数" key="3">
						<EchartsReact option={this.props.getOption(555)} />
					</TabPane>
					<TabPane tab="累计注册用户数" key="4">
						<EchartsReact option={this.props.getOption(333)} />
					</TabPane>
				</Tabs>

				<Table current={this.props.current} onSearch={this.props.onSearch} refresh={this.props.refresh} tableData={this.props.tableData} />
			</div>
		);
	}
});

UserData = Form.create()(UserData);


module.exports = UserData;

