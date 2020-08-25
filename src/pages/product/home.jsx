import React, { Component } from 'react'
import { Card, Button, Input, Select, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import { reqProducts, reqSearchProducts } from '@src/api'
import { PAGE_SIZE } from '@src/utils/constants'
const { Option } = Select
export default class ProductHome extends Component {
    state = {
        total: 0, // 总数
        products: [],
        loading: false,
        searchType: 'productName', // 根据哪个搜索
        searchName: '', // 搜索的关键字
    }
    renderCardTitles() {
        const { searchType, searchName } = this.state
        return (
            <>
                <Select value={searchType} style={{ width: 150 }} onChange={value => this.setState({ searchType: value })}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" value={searchName} style={{ width: 150, margin: "0 15px" }} onChange={e => this.setState({ searchName: e.target.value })} />
                <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
            </>
        )
    }
    // 获取表格数据
    initColumns() {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                render: (product) => {
                    return (
                        <span>
                            <Button type="primary">下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                // dataIndex: 'status',
                render: (product) => {
                    return (
                        <span>
                            <Button type="primary" style={{ marginBottom: 5 }}>详情</Button>
                            <Button type="danger">修改</Button>
                        </span>
                    )
                }
            }
        ];
    }

    // 获取指定页面数据5∂
    getProducts = async (pageNum) => {
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        let res
        if (searchName) {
            res = await reqSearchProducts(searchName, pageNum, PAGE_SIZE, searchType)
        } else {
            res = await reqProducts(pageNum, PAGE_SIZE)
        }
        this.setState({ loading: false })
        if (res.status === 0) {
            const { total, list } = res.data
            this.setState({
                total,
                products: list
            })
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.initColumns()
        this.getProducts(1)
    }

    render() {
        const { products, total, loading } = this.state
        return (
            <Card title={this.renderCardTitles()} extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => this.setState({ showStatus: 1 })} >添加</Button>}>
                <Table
                    rowKey="_id"
                    dataSource={products}
                    loading={loading}
                    columns={this.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: (pageNum) => this.getProducts(pageNum)
                    }}
                />
            </Card>
        )
    }
}
