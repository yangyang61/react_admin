import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import memoryUtils from '@src/utils/memoryUtils'

import '../Login/login.less'
export default class Index extends Component {
    render() {
        const user = memoryUtils.user
        if (!user._id) {
            return <Redirect to='/login' />
        }
        return (
            <div>index</div>
        )
    }
}