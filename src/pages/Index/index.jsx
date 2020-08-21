import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';

import memoryUtils from '@src/utils/memoryUtils'
import Header from '@src/components/header'
import Slide from '@src/components/slide'
import Home from '@src/pages/home/home'
import Product from '@src/pages/product/product'
import Pie from '@src/pages/charts/pie'
import Bar from '@src/pages/charts/bar'
import Line from '@src/pages/charts/line'
import Role from '@src/pages/role/role'
import Category from '@src/pages/category/category'
import User from '@src/pages/user/user'

const { Footer, Sider, Content } = Layout;
export default class Index extends Component {
    render() {
        const user = memoryUtils.user
        if (!user._id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <Slide />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ margin: 20, backgroundColor: '#fff' }}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/product" component={Product} />
                            <Route path="/category" component={Category} />
                            <Route path="/role" component={Role} />
                            <Route path="/user" component={User} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/charts/pie" component={Pie} />
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}