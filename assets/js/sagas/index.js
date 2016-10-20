import { delay, takeEvery, takeLatest } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'

import userLoginSaga from './userLogin'
import conversationsSaga from './conversations'

function* subsagas () {
  yield [
    fork(userLoginSaga),
    fork(conversationsSaga)
  ]
}

var allSagas = null

export default function* rootSaga () {
  allSagas = yield fork(subsagas)
}
