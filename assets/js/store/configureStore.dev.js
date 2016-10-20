// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import SagaManager from '../sagas/SagaManager'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const nextReducer = require('../reducers').default

export default function configureStore (initialState) {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(rootReducer, initialState, compose(
    // Add other middleware on this line...
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    // add support for Redux dev tools
    )
  )

  // run sagas
  SagaManager.startSagas(sagaMiddleware);

  // enable hot module reloading for sagas
  if (module.hot) {
      module.hot.accept('../sagas', () => {
          SagaManager.cancelSagas(store);
          require('../sagas/SagaManager').default.startSagas(sagaMiddleware);
      });
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
       // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
