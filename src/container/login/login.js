import React from 'react'
import Logo from '../../components/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import imoocForm from '../../components/imooc-form/imooc-form'

@connect(
  state => state.user,
  { login }
)
@imoocForm

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handlerLogin = this.handlerLogin.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handlerLogin() {
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div>
        { this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
        <Logo></Logo>
        <h2>登录页</h2>
        <WingBlank>
          <List>
            { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }
            <InputItem
              onChange={ v => this.props.handlerChange('user', v) }
            >用户</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              onChange={ v => this.props.handlerChange('pwd', v) }
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
