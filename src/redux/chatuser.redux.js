import axios from 'axios'

const USER_LIST = 'USER_LIST'
const initState = {
  userlist: []
}

// action creator
const userList = (data) => {
  return { type: USER_LIST, payload: data }
}

// reducer
export const chatuser = (state = initState, action) => {
  switch (action.type) {
    case USER_LIST:
      return { ...state, userlist:  action.payload }
    default:
      return state
  }
}

export const getUserList = (type) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/user/list?type=${type}`)
      if (data.code === 0) dispatch(userList(data.data))
    } catch (err) {
      console.log('err-->', err)
    }
  }
}