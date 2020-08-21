import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

// import { reqWeather } from '@src/api/index'
import { formatDate } from '@src/utils/dateUtils'
import storageUtils from '@src/utils/storageUtils'
import memoryUtils from '@src/utils/memoryUtils'
import menuList from '@src/config/menuConfig'
import './index.less'

class Header extends Component {
    state = {
        currentTime: formatDate(Date.now()),
        title: ''
    }

    getTitle() {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.path === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(child => child.path === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    logout = () => {
        Modal.confirm({
            content: '确定退出吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
        })
    }

    componentDidMount() {

    }

    componentDidUpdate() {
    }

    render() {
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{memoryUtils.user.username}</span>
                    <a href="#" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src={require("@src/assets/images/logo.jpg")} alt="" />
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)