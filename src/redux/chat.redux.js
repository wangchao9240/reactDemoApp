import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatMsg: [],
  unread: 0
}

// reducer
export const chat = (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, chatMsg: action.payload, unread: action.payload.filter(v => !v.read).length }
    // case MSG_RECV:
    // case MSG_READ:
    default:
      return state
  }
}

// action creater
const msgList = (msgs) => {
  return { type: MSG_LIST, payload: msgs }
}

// action
export const getMsgList = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/user/getmsglist')
      if (data.code === 0) dispatch(msgList(data.msgs))
    } catch (err) {
      console.log(err)
    }
  }
}