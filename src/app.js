import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './components/authRoute/authRoute'
import Dashboard from './components/dashboard/dashboard'
import Chat from './components/chat/chat'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  componentDidCatch(err, info) {
    console.log(err, info)
    this.setState({
      hasError: true
    })
  }
  render() {
    return (
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/geniusinfo" component={ Geniusinfo }></Route>
          <Route path="/bossinfo" component={ BossInfo }></Route>
          <Route path="/login" component={ Login }></Route>
          <Route path="/register" component={ Register }></Route>
          <Route path="/chat/:user" component={ Chat }></Route>
          <Route component={ Dashboard }></Route>
        </Switch>
      </div>
    )
  }
}

export default App
