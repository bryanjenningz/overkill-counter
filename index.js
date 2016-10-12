import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'

const action = (type, ...keys) => (...args) =>
  keys.reduce((action, key, i) => {
    action[key] = args[i]
    return action
  }, {type})

const increment = action('INCREMENT')
const decrement = action('DECREMENT')

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

let App = ({state, increment, decrement}) =>
  <div>
    <button onClick={decrement}>-</button>
    {state}
    <button onClick={increment}>+</button>
  </div>

App = connect(
  state => ({state}),
  {increment, decrement}
)(App)

const store = createStore(counter)
const root =
  <Provider store={store}>
    <App />
  </Provider>
const rootEl = document.querySelector('#root')
const render = () =>
  ReactDOM.render(root, rootEl)

store.subscribe(render)
render()
