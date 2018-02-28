import React from 'react'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'

@connect(
  state => state
)

class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    if (!this.props.chat.chatMsg.length) return null
    const Item = List.Item
    const Brief = Item.Brief

    const userid = this.props.user._id
    let msgGroup = {}
    this.props.chat.chatMsg.forEach(v => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || []
      msgGroup[v.chatId].push(v)
    })
    const chatList = Object.values(msgGroup)
    // 按照聊天用户分组，根据chatid
    return (
      <div>
          { chatList.map(v => {
            console.log(v)
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            return targetId ? (
              <List key={ lastItem._id }>
                <Item
                  thumb={ require(`../img/${this.props.chat.users[targetId].avatar}.png`) }
                >
                  { lastItem.content }
                  <Brief>{ this.props.chat.users[targetId].name }</Brief>
                </Item>
              </List>
            ) : null
          }) }
      </div>
    )
  }
}

export default Msg
