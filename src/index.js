import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './components/authRoute/authRoute'
import Dashboard from './components/dashboard/dashboard'

import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDom.render(
  (
    <Provider store={ store }>
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Route path="/geniusinfo" component={ Geniusinfo }></Route>
          <Route path="/bossinfo" component={ BossInfo }></Route>
          <Route path="/login" component={ Login }></Route>
          <Route path="/register" component={ Register }></Route>
          <Route component={ Dashboard }></Route>
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
