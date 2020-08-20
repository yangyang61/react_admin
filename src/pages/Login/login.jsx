import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { reqLogin } from '@src/api'
import memoryUtils from '@src/utils/memoryUtils'
import store from '@src/utils/storageUtils'

import './login.less'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }
    // 登陆
    onFinish = async values => {
        this.setState({ isLoading: true });
        const res = await reqLogin(values)
        this.setState({ isLoading: false })
        if (res.status === 0) {
            memoryUtils.user = res.data
            store.saveUser(res.data)
            this.props.history.replace('/')
        } else {
            message.error(res.msg)
        }
    };
    render() {
        if (memoryUtils.user && memoryUtils.user._id) {
            return <Redirect to='/' />
        }
        return (
            <div className="login-div">
                <Spin tip="Loading..." spinning={this.state.isLoading}>
                    <Card title="后台管理系统" bordered={true} style={{ width: 400 }}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" size="large" htmlType="submit" className="login-form-button">登录</Button>
                            </Form.Item>
                        </Form>
                        {/* <Input id="username" name="username" size="large" placeholder="用户名" onChange={this.handleChangeInput} />
                        <br /><br />
                        <Input.Password id="password" name="password" size="large" placeholder="密码" onChange={this.handleChangeInput} />
                        <br /><br /> */}
                        {/* <Button type="primary" size="large" block onClick={this.onFinish}>登录</Button> */}
                    </Card>
                </Spin>
            </div>
        )
    }
}