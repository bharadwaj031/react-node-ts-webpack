import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
import Store from './types/store'
import { initializeStore } from './store'
import { appDataActions } from './actions/app-data.action'
import { AppData } from './types/types'

let store: Store

window.onDataReceived = async (data: AppData) => {
  console.log(data)
  store = await initializeStore()
  store.dispatch(appDataActions.update({...data}))

  ReactDOM.render(
    <App store={store}/>,
    document.querySelector('#app') as HTMLElement
    )
  }
