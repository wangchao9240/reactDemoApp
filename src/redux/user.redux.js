import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  msg: '',
  isAuth: false,
  user: '',
  pwd: '',
  type: ''
}

// reducer
export const user = (state=initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {  ...state, isAuth: true, ...action.payload }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    default:
      return state
  }
}

// action creater
const errorMsg = (msg) => {
  return { type: ERROR_MSG, msg }
}

const registerSuccess = (data) => {
  return { type: REGISTER_SUCCESS, payload: data }
}

// action
export const register = ({ user, pwd, repeatpwd, type }) => {
  if (!user || !pwd || !type) return errorMsg('用户名密码不能为空')
  else if (pwd !== repeatpwd) return errorMsg('两次输入密码不一致')
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/user/register', { user, pwd, type })
      if (data.code === 0) dispatch(registerSuccess({ user, pwd, type }))
      else dispatch(errorMsg(data.msg))
    } catch (err) {
      console.log(err)
    }
  }
}