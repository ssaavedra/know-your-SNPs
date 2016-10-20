
const initialState = []

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case 'USER_LIST_FETCHED':
      return action.payload

    default:
      return state
  }
}
