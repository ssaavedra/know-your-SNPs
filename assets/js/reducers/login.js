
const initialState = {
  username: 'anonymous'
}

export default function loginReducer(state = initialState, action) {
  switch(action.type) {
    case 'USER_LOGGED_IN':
    console.log(action.payload)
      return Object.assign({}, state, {
        user: action.payload,
        username: action.payload.user.username,
        logged_in: true,
      })
      break

      case 'USER_LOGGED_OUT':
      case 'USER_NOT_LOGGED_IN':
      return Object.assign({}, state, {
        logged_in: false,
        username: 'anonymous',
      })

    default:
      return state
  }
}
