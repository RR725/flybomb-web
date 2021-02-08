'use strict'
import React from 'react'

import { Table } from 'antd'
import restapi from '../../lib/url-model'
import utils from '../../lib/utils'
import ajax from '../../components/ajax'

import questionType from '../question-type'
import { Link } from 'react-router'

const HomeTable = React.createClass({
    getInitialState() {
        let self = this
        console.log(this.props.tableData)
        return {
            columns: [
                {
                    title: '科目名称',
                    key: '0',
                    dataIndex: 'name',
                    className: 'td_appname ',
                },
                {
                    title: '类型',
                    className: 'ta_l',
                    key: '1',
                    dataIndex: 'real.up',
                },
                {
                    title: '标题',
                    className: 'ta_l',
                    key: '2',
                    dataIndex: 'real.price',
                },
                {
                    title: '操作',
                    className: 'ta_c',
                    key: '3',
                    render(text, record) {
                        return <a href={record.url}>修改</a>
                    },
                    dataIndex: '',
                },
            ],
            refresh: false,
        }
    },

    render() {
        return (
            <Table
                className="home_table"
                columns={this.state.columns}
                loading={this.props.tableData.loading}
                dataSource={this.props.tableData.data}
                pagination={this.props.tableData.pagination}
            />
        )
    },
})
exports.render = HomeTable
