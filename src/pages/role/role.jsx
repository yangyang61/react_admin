import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, message, Tree } from 'antd'

import { PAGE_SIZE } from '@src/utils/constants'
import { reqRoles, reqAddRoles, reqUpdateRoles } from '@src/api'

import menuConfig from '@src/config/menuConfig'
const menuList = [...menuConfig]
export default class Role extends Component {
    constructor(props) {
        super(props)
        this.addFormRef = React.createRef();
        this.authFormRef = React.createRef()
        this.state = {
            loading: false,
            roles: [{
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/category"
                ],
                "_id": "5ca9eaa1b49ef916541160d3",
                "name": "测试",
                "create_time": 1554639521749,
                "__v": 0,
                "auth_time": 1558679920395,
                "auth_name": "test007"
            },
            {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/charts/line",
                    "/category",
                    "/product",
                    "/products"
                ],
                "_id": "5ca9eab0b49ef916541160d4",
                "name": "经理",
                "create_time": 1554639536419,
                "__v": 0,
                "auth_time": 1558506990798,
                "auth_name": "test008"
            }], // 所有角色列表
            role: {}, //选中的角色
            isShowAdd: false, // 是否显示添加弹窗
            isShowAuth: false, // 是否显示设置角色权限弹窗
            checkedKeys: [], // 选中的节点
        }
    }
    // 初始化表头
    initColumns = () => {
        this.columns = [
            {
                title: "角色名称",
                dataIndex: "name"
            },
            {
                title: "创建时间",
                dataIndex: "create_time"
            },
            {
                title: "授权时间",
                dataIndex: "auth_time"
            },
            {
                title: "授权人",
                dataIndex: "auth_anme"
            },
        ]
    }
    // 初始化treeData
    initTreeData(menuList) {
        menuList.forEach((item, index) => {
            item.key = item.path
            if (item.children) {
                this.initTreeData(item.children)
            }
        })
    }
    // 获取所有角色列表
    getRoles = async () => {
        this.setState({ loading: true })
        const res = await reqRoles()
        this.setState({ loading: false })
        if (res.status === 0) {
            this.setState({ roles: res.data })
        }
    }
    // 点击表格行选中当前行
    onRow = (role) => {
        return {
            onClick: e => { // 点击行
                this.setState({ role })
            }
        }

    }
    // 点击创建角色按钮
    addRole = async (values) => {
        const res = await reqAddRoles(values)
        console.log(res)
        if (res.status === 0) {
            this.setState({
                isShowAdd: false
            })
            this.getRoles()
            message.success("添加角色成功")
        }
    }
    // 显示添加角色弹窗
    showAddRole = () => {
        this.addFormRef.current.resetFields()
        this.setState({ isShowAdd: true })
    }
    // 显示设置角色权限弹窗
    showAuthRole = () => {
        const { role } = this.state
        this.authFormRef.current.resetFields()
        this.setState({
            checkedKeys: role.menus,
            isShowAuth: true
        })
        console.log(this.state.checkedKeys)
    }
    // 设置角色权限
    updateRole = async () => {
        const { role } = this.state
        let data = { ...role }
        data.menus = [...this.state.checkedKeys]
        data.auth_name = 'admin'
        const res = await reqUpdateRoles(data)
        if (res.status === 0) {
            message.success("更新角色成功")
            this.setState({
                isShowAuth: false,
                checkedKeys: []
            })
        } else {
            message.error(res.msg)
        }
    }
    onCheck = checkedKeys => {
        this.setState({ checkedKeys });
        console.log('onCheck', checkedKeys, this.state, checkedKeys);
    };

    componentWillMount() {
        this.initColumns()
        this.initTreeData(menuList)
    }
    componentDidMount() {
        this.getRoles()
    }
    render() {
        const { roles, loading, role, isShowAdd, isShowAuth, checkedKeys } = this.state
        const title = (
            <span>
                <Button type="primary" onClick={this.showAddRole}>创建角色</Button> &nbsp;&nbsp;
                <Button type="primary" disabled={!role._id} onClick={this.showAuthRole}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    loading={loading}
                    bordered
                    rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
                    rowKey="_id"
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                    onRow={this.onRow}
                />
                <Modal
                    forceRender
                    visible={isShowAdd}
                    title="添加角色"
                    okText="确定"
                    cancelText="取消"
                    onCancel={() => this.setState({ isShowAdd: false })}
                    onOk={() => {
                        this.addFormRef.current
                            .validateFields()
                            .then(values => {
                                this.addFormRef.current.resetFields();
                                this.addRole(values);
                            })
                            .catch(info => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        ref={this.addFormRef}
                    >
                        <Form.Item
                            name="roleName"
                            label="角色名称"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入角色名称',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    forceRender
                    visible={isShowAuth}
                    title="设置角色权限"
                    okText="确定"
                    cancelText="取消"
                    onCancel={() => this.setState({ isShowAuth: false })}
                    onOk={() => {
                        this.authFormRef.current
                            .validateFields()
                            .then(values => {
                                this.authFormRef.current.resetFields();
                                this.updateRole()
                            })
                            .catch(info => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        ref={this.authFormRef}
                    >
                        <Form.Item
                            label="角色名称"
                        >
                            <Input value={role.name} disabled />
                        </Form.Item>
                        <Form.Item>
                            <Tree
                                checkable
                                defaultExpandAll={true}
                                onCheck={this.onCheck}
                                checkedKeys={checkedKeys}
                                treeData={menuList}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
}
