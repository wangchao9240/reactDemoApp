import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

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
    if (this.props.chat.chatMsg.length) return
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
    const userid = this.props.match.params.user
    const Item = List.Item
    const { users } = this.props.chat
    const chatId = getChatId(userid, this.props.user._id)
    const chatMsgs = this.props.chat.chatMsg.filter(v => v.chatId === chatId)
    const left = (v) => (
      <List key={ v._id }>
        <Item
          thumb={ require(`../img/${users[v.from].avatar}.png`) }
        >{ v.content }</Item>
      </List>
    )
    const right = (v) => (
      <List key={ v._id }>
        <Item
          className="chat-me"
          extra={ <img src={ require(`../img/${users[v.from].avatar}.png`) } alt=""/> }
        >{ v.content }</Item>
      </List>
    )
    if (!users[userid]) return null
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={ <Icon type="left"></Icon> }
          onLeftClick={ () => this.props.history.goBack() }
        >{ users[userid].name }</NavBar>
        { chatMsgs.map(v => v.from === userid ? left(v) : right(v)) }
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
