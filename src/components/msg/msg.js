import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

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
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aLast = this.getLast(a).createTime
      const bLast = this.getLast(b).createTime
      return bLast - aLast
    })

    // 按照聊天用户分组，根据chatid
    // 1. eslint代码校验工具
    // 2. react16特有的错误处理机制
    // 3. react性能优化
    return (
      <div>
          { chatList.map(v => {
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const unread = v.filter(v => !v.read && v.to === userid).length
            return targetId ? (
              <List key={ lastItem._id }>
                <Item
                  extra={ <Badge text={ unread }></Badge> }
                  thumb={ require(`../img/${this.props.chat.users[targetId].avatar}.png`) }
                  arrow="horizontal"
                  onClick={ () => {
                    this.props.history.push(`/chat/${targetId}`)
                  } }
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
