import * as React from 'react'
import Store from '../types/store'
import {Provider} from 'react-redux'

interface AppProps {
    store: Store
}
class App extends React.Component<AppProps, {}> {
    
    render() {
        const {store} = this.props
        return (
            <Provider store={store}>
                <div> Welcome to React App</div>
            </Provider>
        )
    }
}

export default App