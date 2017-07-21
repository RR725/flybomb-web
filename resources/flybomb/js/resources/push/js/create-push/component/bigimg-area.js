'use strict';
import React from 'react';

import { Row, Col} from 'antd';
const BigimgArea = React.createClass({


	render() {
		let noticeExpandImgUrl=this.props.form.getFieldValue('noticeExpandImgUrl');
		return (
			<Row>

				<Col>
					{this.props.showBigImg ?
						<div>

							{noticeExpandImgUrl?

								<div className="example_default_image example_big_image">
									<img width="225" height="144" src={noticeExpandImgUrl } />
								</div>
								:
								<div className="example_default_image example_big_image">
									<div className="bg"></div>
									<div className="text">此处为图片展示区域</div>
								</div>
							}
						</div>
						:
						null
					}
				</Col>
			</Row>

		);
	}
});

module.exports = BigimgArea;
