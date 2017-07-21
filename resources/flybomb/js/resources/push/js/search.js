'use strict';
import React from 'react';
import { Input, Icon, Form} from 'antd';

const FormItem = Form.Item;

let Search = React.createClass({
	getInitialState() {
		return {

		};
	},

	onSearch() {
		let value = this.props.form.getFieldValue('value');
		value = value && value !== '' ? value.trim() : value ? value : '';
		this.props.onSearch(value);
	},
	render() {
		const { getFieldProps } = this.props.form;
		return <Form horizontal>
			<div className="search_area">
				<FormItem>
					<Input placeholder={this.props.placeholder} {...getFieldProps('value') } />
					<Icon className="icon" onClick={this.onSearch} type="search" />
				</FormItem>
			</div>
		</Form>;
	}
});

Search = Form.create()(Search);
module.exports = Search;