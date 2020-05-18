import {reducerWithInitialState} from 'typescript-fsa-reducers'
import { AppData } from '../types/types'
import { appDataActions } from '../actions/app-data.action'

function update(state: AppData, newState: any): AppData {
  return {...state, ...newState}
}

type AppDataReducer = (state: AppData, action: any) => AppData

// Note: "as AppData" is strictly speaking a hack, but since app.tsx dispatches the update action
// before calling ReactDOM.render, this incorrectly typed state should never be visible to anyone
// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const initialState = {} as AppData

const actionReducer: AppDataReducer = reducerWithInitialState(initialState)
  .case(appDataActions.update, update)
  .build()

export default actionReducer
