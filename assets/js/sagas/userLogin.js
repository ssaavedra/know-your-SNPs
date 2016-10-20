import { takeEvery, takeLatest, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

function* userLoginIntent() {
  let win = window.location.replace('/login/google-oauth2/')
}

function* userLogoutIntent() {
  let response = yield call(fetch, '/api/user/logout', {
    credentials: 'same-origin'
  })
  if(response.ok) {
    // I'm logged out
    yield put({
      type: 'USER_LOGGED_OUT'
    })
  }
}

function* userLoginRequestStatus(dispatch) {
  yield put({
    type: 'USER_LOGIN_FETCHING_STATUS'
  })

  let response = yield call(fetch, '/api/user/self', {
    credentials: 'same-origin'
  })

  if(response.ok) {
    let body = yield call(response.json.bind(response))
    yield put({
      type: 'USER_LOGGED_IN',
      payload: body
    })
  } else {
    yield put({
      type: 'USER_NOT_LOGGED_IN'
    })
  }
}

export default function* userLoginSaga() {
  console.log("I'm running the saga")
  yield [
    takeLatest('USER_LOGIN_REQUEST_STATUS', userLoginRequestStatus),
    takeLatest('USER_LOGIN_INTENT', userLoginIntent),
    takeLatest('USER_LOGOUT_INTENT', userLogoutIntent),
  ]
}
