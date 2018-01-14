const ADD = 'add'
const DECREASE = 'decrease'

// reducer
export const counter = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return ++state
    case DECREASE:
      return --state
    default:
      return 10
  }
}

// action creator
export const add = () => {
  return { type: ADD }
}

export const decrease = () => {
  return { type: DECREASE }
}

export const addAsync = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}