'use strict';
import React from 'react';
import Index from '../push-data';
const DetailList = React.createClass({
	
	componentDidMount() {
	},
	render() {
		return (
			<div>
				<Index type='platform' />
			</div>
		);
	}
});

module.exports = DetailList;