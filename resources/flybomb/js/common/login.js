'use strict'
import React from 'react'
import {
    Button,
    Row,
    Col,
    message,
    Checkbox,
    Radio,
    Select,
    Tooltip,
    Modal,
    Icon,
    Form,
    Input,
} from 'antd'
const RadioGroup = Radio.Group

const FormItem = Form.Item
import restapi from '../../lib/url-model'
import utils from '../../lib/utils'
import ajax from '../../components/ajax'
const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
}

let Login = React.createClass({
    getInitialState() {
        return {}
    },
    componentDidMount() {
        ajax.post(restapi.checkLogin, function () {
            message.success('新建成功')
        })
    },
    handleSubmit() {
        let type = this.props.form.getFieldValue('type')
        this.props.form.validateFields((errors, values) => {
            console.log(values)

            if (errors) {
                console.log('Errors in form!!!')
                return
            }
            const data = {
                name: values.name,
                password: values.password,
            }
            ajax.post(restapi.login, data, function () {
                message.success('登录成功')
                window.location.hash = '/'
            })
        })
    },

    render() {
        let type = this.props.form.getFieldValue('type')

        const { getFieldDecorator } = this.props.form
        var self = this

        return (
            <div>
                <Form style={{ paddingTop: 20 }} layout="horizontal">
                    <Row className="add_app">
                        <Col span="18">
                            <FormItem {...formItemLayout} label="用户名">
                                {getFieldDecorator('name', {
                                    validate: [
                                        {
                                            rules: [
                                                {
                                                    whitespace: true,
                                                    required: true,
                                                    message: '请填写用户名',
                                                },
                                            ],
                                            trigger: ['onBlur', 'onChange'],
                                        },
                                    ],
                                })(<Input />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="密码">
                                {getFieldDecorator('password', {
                                    validate: [
                                        {
                                            rules: [
                                                {
                                                    whitespace: true,
                                                    required: true,
                                                    message: '请填写密码',
                                                },
                                            ],
                                            trigger: ['onBlur', 'onChange'],
                                        },
                                    ],
                                })(<Input type="password" />)}
                            </FormItem>

                            <FormItem className="create_app" {...formItemLayout} label="&nbsp;">
                                <Button
                                    type="primary"
                                    className="btn_normal_show color_bg"
                                    onClick={this.handleSubmit}
                                    size="large"
                                >
                                    登录
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    },
})
Login = Form.create()(Login)

module.exports = Login
