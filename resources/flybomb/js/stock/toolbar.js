'use strict'
import React from 'react'
import { Form, Select, Button, message, Row, Icon, Col } from 'antd'
const Option = Select.Option
const FormItem = Form.Item
import restapi from '../../lib/url-model'
import utils from '../../lib/utils'
import ajax from '../../components/ajax'
import Table from './table'
let _currentApp = {}

let App = React.createClass({
    getInitialState() {
        return {}
    },

    componentDidMount() {
        let searchParam = {
            pageNum: 1,
            level: 8,
        }

        this.props.getTableData(searchParam)
    },
    add(url) {
        ajax.post(restapi.stockList, {}, () => {
            message.success('新建成功')
        })

        return
        window.location.hash = url
    },
    render() {
        return (
            <div>
                <Form layout="horizontal">
                    <div className="home_toolbar">
                        <Row>
                            <Col span="4">
                                <div className="title">
                                    <span className="border"></span>列表
                                </div>
                            </Col>
                            <Col span="10">&nbsp;</Col>
                            <Col span="10">
                                <div style={{ textAlign: 'right' }}>
                                    <Col span="3">&nbsp;</Col>
                                    <Col span="21">
                                        <Button
                                            onClick={this.add.bind(this, '/stock/add')}
                                            type="primary"
                                            size="large"
                                        >
                                            新建
                                        </Button>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>

                <Table.render refresh={this.props.refresh} tableData={this.props.tableData} />
            </div>
        )
    },
})

App = Form.create()(App)
module.exports = App
