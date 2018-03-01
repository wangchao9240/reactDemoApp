import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount() {
    if (this.props.chat.chatMsg.length) return
    this.props.getMsgList()
    this.props.recvMsg()
  }
  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  handlerSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
  render() {
    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 ☠️ 👻 👽 👾 🤖 💩'
                  .split(' ')
                  .filter(v => v)
                  .map(v => ({
                    text: v
                  }))
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
              extra={
                <div>
                  <span
                    role="img"
                    aria-label="toggleEmoji"
                    style={ { marginRight: 15 } }
                    onClick={ () => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    } }
                  >🙂</span>
                  <span onClick={ () => this.handlerSubmit() }>发送</span>
                </div>
              }
            >信息</InputItem>
          </List>
          { this.state.showEmoji ? <Grid
            data={ emoji }
            columnNum={ 9 }
            carouselMaxRow={ 4 }
            isCarousel
            onClick={el => {
              this.setState({
                text: `${this.state.text}${el.text}`
              })
            }}
          ></Grid> : null }
        </div>
      </div>
    )
  }
}

export default Chat
