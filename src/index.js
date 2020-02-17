import React from 'react'

import {render} from 'react-dom'

import App from './App'

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import './index.less'
import {Provider} from 'react-redux'
import { mainRouter } from './routes'

import store from './store'

render(
    
    <Provider store={store}>
    <Router>
        <Switch>
            <Route path="/admin"  component={App} />
            {
                mainRouter.map(route => {
                    return  <Route 
                                key      = {route.pathname} 
                                path     = {route.pathname} 
                                component= {route.component} 

                           />
                })
            }
            <Redirect to="/admin" from='/' exact/>
            <Redirect to="/404" />
        </Switch>
    </Router>
    </Provider>,
    document.querySelector('#root')
)