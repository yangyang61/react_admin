import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Button } from 'antd';

import Index from './pages/Index'
import Login from './pages/Login/login'
function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route exact path="/" component={Login} />
                </Switch>
            </Router>
        </div>
    )
}

export default App