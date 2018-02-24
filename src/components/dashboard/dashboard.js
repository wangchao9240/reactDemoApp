import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLink from '../navlink/navlink'
import { Switch, Route } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'

const Msg = () => {
  return <h2>消息列表</h2>
}

@connect(
  state => state
)

class Dashboard extends React.Component {
  render() {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    const navBarCom = (item) => (
      <NavBar className="fixd-header" mode="dark">{ item.title }</NavBar>
    )
    return (
      <div>
        { navList.find(v => v.path === pathname) ? navBarCom(navList.find(v => v.path === pathname)) : null }
        <div style={ { marginTop: 45 } }>
          <Switch>
            {navList.map(v => (
              <Route key={ v.path } path={ v.path } component={ v.component }></Route>
            ))}
          </Switch>
        </div>
        <NavLink data={ navList }></NavLink>
      </div>
    )
  }
}

export default Dashboard
