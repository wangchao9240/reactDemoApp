import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  { update }
)

class Geniusinfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      avatar: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  selectAvatar(text) {
    this.setState({
      avatar: text
    })
  }
  render() {
    return (
      <div>
        { this.props.redirectTo && this.props.redirectTo !== this.props.location.pathname ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
        <NavBar mode="dark" >牛人完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={text => this.selectAvatar(text)}
        ></AvatarSelector>
        <InputItem
          onChange={v => this.onChange('title', v)}
        >
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title="个人简介"
        >
        </TextareaItem>
        <Button
          onClick={() => {
            this.props.update(this.state)
          }}
          type="primary"
        >保存</Button>
      </div>
    )
  }
}

export default Geniusinfo
