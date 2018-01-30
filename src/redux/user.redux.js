import axios from 'axios'
import { getRedirectPath } from '../util'

const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'ANTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

// reducer
export const user = (state=initState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
    case LOAD_DATA:
      return { ...state, ...action.payload }
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

const authSuccess = (data) => {
  return { type: AUTH_SUCCESS, payload: data }
}

const loaddata = (userinfo) => {
  return { type: LOAD_DATA, payload: userinfo }
}

// action
export const register = ({ user, pwd, repeatpwd, type }) => {
  if (!user || !pwd || !type) return errorMsg('用户名密码不能为空')
  else if (pwd !== repeatpwd) return errorMsg('两次输入密码不一致')
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/user/register', { user, pwd, type })
      if (data.code === 0) dispatch(authSuccess({ user, pwd, type }))
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
      if (data.code === 0) dispatch(authSuccess(data.data))
      else dispatch(errorMsg(data.msg))
    } catch (err) {
      return dispatch(errorMsg(`连接异常-->${err}`))
    }
  }
}

export const loadData = (userinfo) => {
  return loaddata(userinfo)
}

export const update = (dataInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/user/update', dataInfo)
      if (data.code === 0) return dispatch(authSuccess(data.data))
    } catch (err) {
      return dispatch(errorMsg(`连接异常-->${err}`))
    }
  }
}
