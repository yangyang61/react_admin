import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Index from './pages/Index'
import Login from './pages/Login/login'
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Index} />
            </Switch>
        </Router>
    )
}

export default App