import React from 'react'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import imoocForm from '../../components/imooc-form/imooc-form'

@connect(
  state => state.user,
  { register }
)
@imoocForm

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handlerRegister = this.handlerRegister.bind(this)
  }
  componentDidMount() {
    this.props.handlerChange('type', 'genius')
  }
  handlerRegister() {
    this.props.register(this.props.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        { this.props.redirectTo ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
        <Logo></Logo>
        <h2>注册页</h2>
        <List>
          { this.props.msg ? <p className="error-msg">{ this.props.msg }</p> : null }
          <InputItem
            onChange={ text => this.props.handlerChange('user', text) }
          >用户</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            type="password"
            onChange={ text => this.props.handlerChange('pwd', text) }
          >密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            type="password"
            onChange={ text => this.props.handlerChange('repeatpwd', text) }
          >确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem
            onChange={ () => this.props.handlerChange('type', 'genius') }
            checked={ this.props.state.type === 'genius' }>牛人</RadioItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem
            onChange={ () => this.props.handlerChange('type', 'boss') }
            checked={ this.props.state.type === 'boss' }>Boss</RadioItem>
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
