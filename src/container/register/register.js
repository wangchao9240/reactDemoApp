import React from 'react'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genuis' // 或者boss
    }
    this.handlerRegister = this.handlerRegister.bind(this)
  }
  handlerChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handlerRegister() {
    this.props.register(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <h2>注册页</h2>
        <List>
          { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }
          <InputItem
            onChange={ text => this.handlerChange('user', text) }
          >用户</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            type="password"
            onChange={ text => this.handlerChange('pwd', text) }
          >密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            type="password"
            onChange={ text => this.handlerChange('repeatpwd', text) }
          >确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem
            onChange={ () => this.handlerChange('type', 'genuis') }
            checked={ this.state.type === 'genuis' }>牛人</RadioItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem
            onChange={ () => this.handlerChange('type', 'boss') }
            checked={ this.state.type === 'boss' }>Boss</RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button
            type="primary"
            onClick={ this.handlerRegister }
          >注册</Button>
        </List>
      </div>
    )
  }
}

export default Register