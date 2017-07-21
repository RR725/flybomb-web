'use strict';
import React from 'react';
import { Row, Col } from 'antd';
import Table from './table';
import utils from '../../../lib/utils';
import Search from '../../Search';


let App = React.createClass({

	getInitialState() {
		return {
			data: null,
			value: '',
			searchStatus: false
		};
	},


	onSearch(value) {
		const appId = utils.queryString('appId', window.location.href);
		const param = {
			appId: appId,
			tagName: value,
			index: 1
		};
		this.props.getTableData(param);
		this.setState({
			tagName: value
		});
	},
	render() {

		return (
			<div>
				<div className="sub_toolbar config_toolbar">
					<Row>

						<div style={{ textAlign: 'right' }}>

							<Col span="20">
								&nbsp;

							</Col>
							<Col span="4">

								<Search placeholder="标签名称" onSearch={this.onSearch} />

							</Col>
						</div>

					</Row>

				</div>
				<Table current={this.props.current} tagName={this.state.tagName} getTableData={this.props.getTableData} refresh={this.props.refresh} tableData={this.props.tableData} />
			</div>
		);
	}
});


module.exports = App;