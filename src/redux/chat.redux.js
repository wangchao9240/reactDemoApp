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
  users: [],
  unread: 0
}

// reducer
export const chat = (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, users: action.payload.users, chatMsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length }
    case MSG_RECV:
      const n = action.payload.userid === action.payload.msg.to ? 1 : 0
      return { ...state, chatMsg: [...state.chatMsg, action.payload.msg], unread: state.unread + n }
    case MSG_READ:
      const { from, num } = action.payload
      return { ...state, chatMsg: state.chatMsg.map(v => ({ ...v, read: from === v.from ? true : v.read })), unread: state.unread - num }
    default:
      return state
  }
}

// action creater
const msgList = (msgs, users, userid) => {
  return { type: MSG_LIST, payload: { msgs, users, userid } }
}
const msgRecv = (msg, userid) => {
  return { type: MSG_RECV, payload: { msg, userid } }
}
const msgRead = ({ from, userid, num }) => {
  return { type: MSG_READ, payload: { from, userid, num } }
}

// action
export const recvMsg = () => {
  return (dispatch, getState) => {
    socket.on('recvmsg', (data) => {
      const userid = getState().user._id
      dispatch(msgRecv(data._doc, userid))
    })
  }
}

export const getMsgList = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get('/user/getmsglist')
      if (data.code === 0) {
        const userid = getState().user._id
        dispatch(msgList(data.msgs, data.users, userid))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const sendMsg = ({ from, to, msg }) => {
  return dispatch => socket.emit('sendmsg', { from, to, msg })
}

export const readMsg = (from) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post('/user/readmsg', { from })
      const userid = getState().user._id
      if (data.code !== 0) return
      dispatch(msgRead({ from, userid, num: data.num }))
    } catch (err) {
      console.log(err)
    }
  }
}
