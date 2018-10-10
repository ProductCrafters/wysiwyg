import { combineReducers } from 'redux'

const START_LOADING = 'START_LOADING'
const STOP_LOADING = 'STOP_LOADING'

const ui = (state = {}, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case STOP_LOADING:
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default combineReducers({
  ui,
})
