import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'

@connect(
  state => state.user,
  { login }
)

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.register = this.register.bind(this)
    this.handlerLogin = this.handlerLogin.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handlerChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handlerLogin() {
    this.props.login(this.state)
  }
  render() {
    return (
      <div>
        { this.props.redirectTo ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
        <Logo></Logo>
        <h2>登录页</h2>
        <WingBlank>
          <List>
            { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }
            <InputItem
              onChange={ v => this.handlerChange('user', v) }
            >用户</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              onChange={ v => this.handlerChange('pwd', v) }
              type="password"
            >密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button
            type="primary"
            onClick={ this.handlerLogin }
          >登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={ this.register } type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
