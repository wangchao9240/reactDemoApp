import React from 'react'
import { connect } from 'react-redux'

@connect(
  state => state
)

class Msg extends React.Component {
  render() {
    let msgGroup = {}
    this.props.chat.chatMsg.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || []
      msgGroup[v.chatId].push(v)
    })
    console.log(msgGroup)
    // 按照聊天用户分组，根据chatid
    return (
      <div>
        <h2>消息列表111</h2>
      </div>
    )
  }
}

export default Msg
