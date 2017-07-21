'use strict';
import React from 'react';

import { Row, Col} from 'antd';
const BigimgArea = React.createClass({


	render() {

		return (
			<Row>
				<Col>
					<div>
						{this.props.form.getFieldValue('noticeBarImgUrl') ?
							<div className="example_default_image">
								<img width="225" height="44" src={this.props.form.getFieldValue('noticeBarImgUrl') } />
							</div>
							: <div className="example_default_image">
								<div className="bg"></div>
								<div className="text">此处为图片展示区域</div>
							</div>}
					</div>

				</Col>
			</Row>

		);
	}
});

module.exports = BigimgArea;