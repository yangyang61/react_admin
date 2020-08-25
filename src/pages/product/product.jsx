import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductHome from './home'
import ProductAdd from './add_product'
import ProductUpdate from './update_product'

export default class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/product" component={ProductHome} />
                    <Route path="/product/update" component={ProductUpdate} />
                    <Route path="/product/add" component={ProductAdd} />
                    <Route to="/product" />
                </Switch>
            </div>
        )
    }
}
