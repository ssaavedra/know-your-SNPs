import _ from 'lodash'

const initialState = []

export default function messageReducer(state = initialState, action) {
  switch(action.type) {
    case 'MESSAGES_RECEIVED':
      return _.sortBy(_.unionBy(action.payload, state, 'id'), 'timestamp')
    case 'MESSAGE_RECEIVED':
      return _.sortBy(_.unionBy(state, [action.payload], 'id'), 'timestamp')
    default:
      return state
  }
}
