import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk, {ThunkMiddleware} from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'
import {asyncSessionStorage} from 'redux-persist/storages'
import Store from './types/store'
import State from './types/state'
import appDataReducer from './reducers/app-data.reducer'
import { appVersion } from '../../common/app-version'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export function initializeStore(): Promise<Store> {
  const reducers = {
    appData: appDataReducer
  }
  const combineReducer = combineReducers(reducers)
  
  const store: Store = createStore(
    combineReducer,
    {},
    composeEnhancers(
      autoRehydrate(),
      applyMiddleware(thunk as ThunkMiddleware<State, any, string>)
    )
  ) as Store

  // Ensure cached state is used for max. 1 day, and with the same appVersion
  const keyPrefix = `reduxPersist/${appVersion}/${new Date().toISOString().substr(0, 10)}:`
  return new Promise(resolve => {
    persistStore(store, {storage: asyncSessionStorage, keyPrefix}, () => {
      // eslint-disable-next-line no-console
      console.log('Rehydration complete', keyPrefix)
      // console.log('Rehydrated state', store.getState())
      resolve(store)
    })
  })
}
