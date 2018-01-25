import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
@withRouter

class AuthRoute extends React.Component {
  async componentDidMount() {
    const publicList = ['/login', '/register']
    const { pathname } = this.props.location
    if (publicList.indexOf(pathname) > -1) return
    // 获取用户信息
    try {
      const { data } = await axios.get('/user/info')
      console.log('res--->', data)
      if (data.code === 0) {
        // 有登录信息的
      } else {
        this.props.history.push('/login')
      }
    } catch (err) {
      console.log(err)
    }

    // 是否登录
    // 现在的url地址  Login是不需要跳转的
    // 用户的type 为boss或牛人
    // 用户是否完善信息（选择头像 个人简介）
  }
  render() {
    return null
  }
}

export default AuthRoute