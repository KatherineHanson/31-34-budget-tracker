import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import App from './component/app'
import categoriesReducer from './reducer/categories.js'

let store = createStore(categoriesReducer)

store.subscribe(() => {
  console.log('__STATE__', store.getState())
})

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
container)
