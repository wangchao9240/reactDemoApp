import React from 'react'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
  }
  handlerSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }
  render() {
    const user = this.props.match.params.user
    const Item = List.Item
    const left = (v) => (
      <List key={ v._id }>
        <Item
        >{ v.content }</Item>
      </List>
    )
    const right = (v) => (
      <List key={ v._id }>
        <Item
          className="chat-me"
          extra={ 'avatar' }
        >{ v.content }</Item>
      </List>
    )
    return (
      <div id="chat-page">
        <NavBar mode="dark">{ this.props.match.params.user }</NavBar>
        { this.props.chat.chatMsg.map(v => v.from === user ? left(v) : right(v)) }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={ this.state.text }
              onChange={ v => {
                this.setState({ text: v })
              } }
              extra={ <span onClick={ () => this.handlerSubmit() }>发送</span> }
            >信息</InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat