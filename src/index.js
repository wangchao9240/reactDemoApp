import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import App from './App'
import { counter } from './index.redux'

const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => {}

const store = createStore(counter, compose(
  applyMiddleware(thunk),
  reduxDevTools
))

class Erying extends React.Component{
  render() {
    return (
      <h2>二营</h2>
    )
  }
}

class QiBingLian extends React.Component{
  render() {
    return (
      <h2>骑兵连</h2>
    )
  }
}

class Test extends React.Component{
  render() {
    return (
      <h2>测试组件</h2>
    )
  }
}

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">一营</Link>
          </li>
          <li>
            <Link to="/erying">二营</Link>
          </li>
          <li>
            <Link to="/qibinglian">骑兵连</Link>
          </li>
        </ul>
        <Switch>
          {/* 只渲染命中的第一个Route */}
          <Route path="/" exact component={ App }></Route>
          <Route path="/erying" component={ Erying }></Route>
          <Route path="/qibinglian" component={ QiBingLian }></Route>
          <Route path="/:location" component={ Test }></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>)
, document.getElementById('root'))
