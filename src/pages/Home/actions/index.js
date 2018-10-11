import { SAY_HELLO } from './actionTypes'

export default dispatch => ({
  sayHello: () => {
    console.log('hello')
    dispatch({ type: SAY_HELLO })
  },
})
