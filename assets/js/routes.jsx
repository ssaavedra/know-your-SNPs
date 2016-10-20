import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import AboutPage from './components/info/AboutPage'
import NotFoundPage from './components/info/NotFoundPage'
import UserList from './components/UserList'
import ConversationsForUser from './components/ConversationsForUser'
import ChatPage from './components/ChatPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UserList} />
    <Route path="about" component={AboutPage} />
    <Route path=":userId" component={ConversationsForUser} />
    <Route path=":userId/:chatId" component={ChatPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)
