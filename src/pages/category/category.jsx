import React, { Component } from 'react'
import { Card, Button, Table, message, Modal, Form, Input, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import { reqCategories, reqAddCategory, reqUpdateCategory } from '@src/api'
import {
    ArrowRightOutlined
} from '@ant-design/icons';

const { Option } = Select
export default class Category extends Component {
    updateFomRef = React.createRef();
    addFormRef = React.createRef()
    state = {
        loading: false,
        categories: [], // 一级分类数据
        subCategories: [], // 二级分类数据
        parentId: "0", // 当前需要显示的分类的父分类ID
        parendName: "", // 当前需要显示的分类的父分类名称
        showStatus: 0, // 0-隐藏 1-添加分类 2-修改分类
        categoryId: 0, // 分类 
        updateForm: {} // 修改后的分类表单
    }
    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: '_id',
            },
            {
                title: '操作',
                width: 300,
                render: (categories) => {
                    return (
                        <>
                            {this.state.parentId === "0" ? <Button type="primary" style={{ marginRight: 10 }} onClick={() => this.showSubCategories(categories)}>查看子分类</Button> : null}
                            <Button type="danger" onClick={() => this.showUpdate(categories)}>修改分类</Button>
                        </>
                    )
                }

            }
        ];
    }

    // 获取一级/二级分类
    getCategories = async () => {
        this.setState({ loading: true });
        const res = await reqCategories(this.state.parentId)
        if (res.status === 0) {
            if (this.state.parentId === '0') {
                this.setState({
                    categories: res.data,
                    loading: false
                })
            } else {
                this.setState({
                    subCategories: res.data,
                    loading: false
                })
            }
        } else {
            message.error('获取分类列表失败')
        }
    }
    // 点击查看子分类，获取二级分类
    showSubCategories(categories) {
        this.setState({
            loading: true,
            parentId: categories._id,
            parendName: categories.name
        }, () => {
            this.getCategories()
        })
    }
    // 点击显示一级分类列表
    showCategories() {
        this.setState({
            laoding: true,
            parentId: "0",
            parendName: "",
            subCategories: []
        }, () => {
            this.getCategories()
        })
    }
    // 显示修改分类框
    showUpdate(categories) {
        this.setState({
            showStatus: 2,
            categoryId: categories._id
        })
        this.updateFomRef.current.setFieldsValue({
            categoryName: categories.name
        });
    }
    // 隐藏修弹出框
    handleCancel = e => {
        if (this.state.showStatus == 1) {
            this.addFormRef.current.resetFields()
        } else {
            this.updateFomRef.current.resetFields()
        }
        this.setState({
            showStatus: 0,
        });
    };
    // 修改分类方法
    updateCategory = async values => {
        const data = values
        data.categoryId = this.state.categoryId
        const res = await reqUpdateCategory(data)
        if (res.status === 0) {
            this.getCategories()
            message.success('修改分类成功')
            this.setState({
                showStatus: 0
            })
            this.updateFomRef.current.resetFields()
        }
    };
    // 添加分类方法
    addCategory = async values => {
        const res = await reqAddCategory(values)
        if (res.status === 0) {
            this.getCategories()
            message.success('添加分类成功')
            this.setState({
                showStatus: 0
            })
            this.addFormRef.current.resetFields()
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getCategories()
    }

    render() {
        const { loading, categories, subCategories, parentId, parendName } = this.state
        // car标题显示当前分类
        const title = parentId === "0" ? "一级分类列表" : (
            <span>
                <a href="#" onClick={this.showCategories.bind(this)}>一级分类列表</a>
                <ArrowRightOutlined style={{ marginLeft: 5, marginRight: 5 }} />
                {parendName}
            </span>
        )
        return (
            <Card title={title} extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => this.setState({ showStatus: 1 })} >添加</Button>}>
                <Table
                    loading={loading}
                    bordered
                    rowKey="_id"
                    dataSource={parentId === "0" ? categories : subCategories}
                    columns={this.columns}
                />
                <Modal
                    forceRender
                    title="添加分类"
                    visible={this.state.showStatus === 1}
                    okText="确定"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                    onOk={() => {
                        this.addFormRef.current
                            .validateFields()
                            .then(values => {
                                this.addFormRef.current.resetFields();
                                this.addCategory(values);
                            })
                            .catch(info => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        layout="vertical"
                        ref={this.addFormRef}
                    >
                        <Form.Item
                            name="parentId"
                            label="所属分类"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}
                            initialValue='0'
                        >
                            <Select>
                                <Option value="0">一级分类</Option>
                                {categories.map(category => {
                                    return (
                                        <Option key={category._id} value={category._id}>{category.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="categoryName"
                            label="分类名称"
                            rules={[
                                {
                                    required: true,
                                    message: '分类名称不能为空',
                                },
                            ]}>
                            <Input placeholder="请输入分类名称" />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    forceRender
                    visible={this.state.showStatus === 2}
                    title="修改分类"
                    okText="确定"
                    cancelText="取消"
                    onCancel={this.handleCancel}
                    onOk={() => {
                        this.updateFomRef.current
                            .validateFields()
                            .then(values => {
                                this.updateFomRef.current.resetFields();
                                this.updateCategory(values);
                            })
                            .catch(info => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        ref={this.updateFomRef}
                        layout="vertical"
                    >
                        <Form.Item
                            name="categoryName"
                            label="分类名称"
                            rules={[
                                {
                                    required: true,
                                    message: '分类名称不能为空',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Card >
        )
    }
}
