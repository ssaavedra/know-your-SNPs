import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import loginReducer from './login'
import userReducer from './user'
import chatReducer from './chats'
import messageReducer from './message'

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  login: loginReducer,
  users: userReducer,
  chats: chatReducer,
  messages: messageReducer
})

export default rootReducer
