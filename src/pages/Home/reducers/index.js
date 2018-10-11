import { SAY_HELLO } from '../actions/actionTypes'

const initialState = {
  hello: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAY_HELLO:
      return { ...state, hello: true }

    default:
      return state
  }
}

export default reducer
