import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import './index.less'
import {
    HomeOutlined,
    PieChartOutlined,
    BarChartOutlined,
    AreaChartOutlined,
    UserOutlined,
    ShoppingOutlined,
    UnorderedListOutlined,
    ToolOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import menuList from '@src/config/menuConfig'
const { SubMenu } = Menu;
class Slide extends Component {

    componentWillMount() {
        this.menuNods = this.getMenuNodes(menuList)
    }

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            } else {
                const path = this.props.location.pathname
                const cItem = item.children.find(cItem => cItem.path === path)
                if (cItem) {
                    this.openKey = item.path
                }
                return (
                    <SubMenu key={item.path} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        const path = this.props.location.pathname
        return (
            <div className="left-side">
                <header className="left-side-header">
                    <img src={require('@src/assets/images/logo.jpg')} />
                </header>
                <div>
                    <Menu
                        selectedKeys={[path]}
                        defaultOpenKeys={[this.openKey]}
                        mode="inline"
                        theme="dark"
                    // inlineCollapsed={this.state.collapsed}
                    >
                        {this.menuNods}
                    </Menu>
                </div>
            </div>
        )
    }
}

export default withRouter(Slide)