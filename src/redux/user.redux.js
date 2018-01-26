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
export const user = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, msg: '', isAuth: true, ...action.payload }
    case ERROR_MSG:
    default:
      return state
  }
}

// action creater
const errorMsg = (msg) => {
  return {
    msg,
    type: ERROR_MSG
  }
}

const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

export const register = ({ user, pwd, repeatpwd, type }) => {
  if (!user || !pwd || !type) return errorMsg('用户名密码不许输入')
  if (pwd !== repeatpwd) return errorMsg('两次输入密码不一致')
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/user/register', { user, pwd, type })
      console.log('data--->', data)
      if (data.code === 0) {
        dispatch(registerSuccess({ user, pwd, type }))
      } else {
        dispatch(errorMsg(data.msg))
      }
    } catch (err) {
      console.log(err)
    }
  }
}
