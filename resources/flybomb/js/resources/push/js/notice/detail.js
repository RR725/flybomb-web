/*
 * @Author: ecofe 
 * @Date: 2017-02-17 11:26:58 
 * @Last Modified by: ecofe
 * @Last Modified time: 2017-03-31 09:14:08
 */
'use strict';
import React from 'react';
import restapi from '../../lib/url-model';
import ajax from '../../components/ajax';
// import Editor from './editor';




let NoticeDetail = React.createClass({
	getInitialState(){
		return {
			result:null
		};
	},
	componentDidMount() {
		let data={
			noticeId:this.props.params.id
		};
		ajax.post(restapi.getNotice,data,(result)=>{
			this.setState({
				result:result.value
			});
		}
			
		);
	},
	
	render() {
		if(!this.state.result) return null;

		return <div className="notice-detail">
			<h2 className="tit">{this.state.result.title}</h2>
			<p className="time">{this.state.result.releaseTime}</p>
			<div className="con break_word" dangerouslySetInnerHTML={{__html: this.state.result.content}}></div>
		</div>;
	}

});



module.exports = NoticeDetail;