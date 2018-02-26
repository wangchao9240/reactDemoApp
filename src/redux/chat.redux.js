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
      return { ...state, chatMsg: [...state.chatMsg, action.payload], unread: state.unread + 1 }
    // case MSG_READ:
    default:
      return state
  }
}

// action creater
const msgList = (msgs, users, userid) => {
  return { type: MSG_LIST, payload: { msgs, users, userid } }
}
const msgRecv = (msg) => {
  return { type: MSG_RECV, payload: msg }
}

// action
export const recvMsg = () => {
  return dispatch => {
    socket.on('recvmsg', (data) => {
      dispatch(msgRecv(data._doc))
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
