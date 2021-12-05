import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'

import './sass/index.scss'

render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>    
    </React.StrictMode>,
    document.querySelector('.root')
)

