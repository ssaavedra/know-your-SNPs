import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

export default function configureStore (initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)

  const store = createStoreWithMiddleware(rootReducer, initialState)
  sagaMiddleware.run(rootSaga)

  return store
  // return createStore(rootReducer, initialState)
}
