import _ from 'lodash'

const initialState = []

export default function chatReducer(state = initialState, action) {
  switch(action.type) {
    case 'USER_CHATS_FETCHED':
      return _.unionBy(action.payload, state, 'id')
    default:
      return state
  }
}
