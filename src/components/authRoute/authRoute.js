import React from 'react'
import axios from 'axios'

class AuthRoute extends React.Component {
  async componentDidMount() {
    // 获取用户信息

    // 是否登录
    // 现在的url地址  Login是不需要跳转的
    // 用户的type 为boss或牛人
    // 用户是否完善信息（选择头像 个人简介）
    try {
      const { data } = await axios.get('/user/info')
      console.log('res--->', data)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div>AuthRoute</div>
    )
  }
}

export default AuthRoute