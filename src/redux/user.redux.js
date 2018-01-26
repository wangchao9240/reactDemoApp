import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const initState = {
  redirectTo: '',
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
      return { ...state, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
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

const loginSuccess = (data) => {
  return { type: LOGIN_SUCCESS, payload: data }
}

// action
export const register = ({ user, pwd, repeatpwd, type }) => {
  if (!user || !pwd || !type) return errorMsg('用户名密码不能为空')
  else if (pwd !== repeatpwd) return errorMsg('两次输入密码不一致')
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/user/register', { user, pwd, type })
      if (data.code === 0) dispatch(registerSuccess(data))
      else dispatch(errorMsg(data.msg))
    } catch (err) {
      dispatch(errorMsg(`连接异常-->${err}`))
    }
  }
}

export const login = ({ user, pwd }) => {
  if (!user || !pwd) return errorMsg('用户名密码为必填项')
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/user/login', { user, pwd })
      if (data.code === 0) dispatch(loginSuccess({ user, pwd }))
      else dispatch(errorMsg(data.msg))
    } catch (err) {
      return dispatch(errorMsg(`连接异常-->${err}`))
    }
  }
}
