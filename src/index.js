import React from 'react'
import ReactDom from 'react-dom'
// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/authRoute/authRoute'

// import reducers from './reducer'
import './config'
import './index.css'

// const store = createStore(reducers, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : () => {}
// ))

ReactDom.render(
  (
    <Provider>
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Route path="/login" component={ Login }></Route>
          <Route path="/register" component={ Register }></Route>
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
