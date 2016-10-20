import { takeEvery, takeLatest, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'


function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

let csrftoken = getCookie('csrftoken')


function* userListFetch() {
  let response = yield call(fetch, '/api/user', {
    credentials: 'same-origin'
  })
  if(response.ok) {
    let body = yield response.json()

    yield put({
      type: 'USER_LIST_FETCHED',
      payload: body
    })
  }
}

function* userListRemove() {
  yield put({
    type: 'USER_LIST_FETCHED',
    payload: []
  })
}

function* userChatsFetch(action) {
  let user_id = action.payload
  let response = yield call(fetch, `/api/chats?user_id=${user_id}`, {
    credentials: 'same-origin'
  })

  if(response.ok) {
    let body = yield response.json()

    yield put({
      type: 'USER_CHATS_FETCHED',
      payload: body,
    })
  }
}

function* userChatCreate(action) {
  let user_id = action.payload.originator
  let participants = action.payload.participants.concat([user_id])

  let response = yield call(fetch, '/api/chats', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      participants: participants,
      admins: [user_id],
    })
  })

  if(response.ok) {
    let body = yield response.json()

    yield call(userChatsFetch, {payload: user_id})
  }
}

function* chatFetch(action) {
  let {user_id, chat_id} = action.payload
  yield call(userChatsFetch, {payload: user_id})

  let response = yield call(fetch, `/api/messages?chat_id=${chat_id}`, {
    credentials: 'same-origin'
  })

  if(response.ok) {
    let body = yield response.json()
    yield put({
      type: 'MESSAGES_RECEIVED',
      payload: body
    })
  }

}

function* messageSubmit(action) {
  let {text, sender, chat_id} = action.payload

  let response = yield call(fetch, `/api/messages`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      text: text,
      sender: sender,
      chat: chat_id,
    })
  })

  if(response.ok) {
    let body = yield response.json()

    yield put({
      type: 'MESSAGE_RECEIVED',
      payload: body,
    })
  }
}


export default function* conversationsSaga() {
  yield [
    takeEvery('USER_LOGGED_IN', userListFetch),
    takeEvery('USER_LOGGED_OUT', userListRemove),
    takeEvery('USER_CHATS_FETCH', userChatsFetch),
    takeEvery('CHAT_FETCH', chatFetch),
    takeEvery('CREATE_CHAT_ROOM_INTENT', userChatCreate),
    takeEvery('MESSAGE_SUBMIT', messageSubmit),
  ]
}
