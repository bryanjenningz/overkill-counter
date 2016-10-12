import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'

const action = (type, ...keys) => (...args) =>
  keys.reduce((action, key, i) => {
    action[key] = args[i]
    return action
  }, {type})

const increment = action('INCREMENT', 'i')
const decrement = action('DECREMENT', 'i')
const addCounter = action('ADD_COUNTER')
const removeCounter = action('REMOVE_COUNTER', 'i')

const counters = (state = [], action) => {
  switch (action.type) {
    case 'INCREMENT':
    case 'DECREMENT':
      return [
        ...state.slice(0, action.i),
        counter(state[action.i], action),
        ...state.slice(action.i + 1)
      ]
    case 'ADD_COUNTER':
      return [...state, 0]
    case 'REMOVE_COUNTER':
      return [
        ...state.slice(0, action.i),
        ...state.slice(action.i + 1)
      ]
    default:
      return state
  }
}

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

let Counter = ({count, i, increment, decrement, removeCounter}) =>
  <div>
    <button onClick={decrement.bind(null, i)}>-</button>
    {count}
    <button onClick={increment.bind(null, i)}>+</button>
    <button onClick={removeCounter.bind(null, i)}>&times;</button>
  </div>

Counter = connect(null, {increment, decrement, removeCounter})(Counter)

let App = ({state, addCounter}) =>
  <div>
    <button onClick={addCounter}>Add Counter</button>
    {state.map((count, i) => <Counter key={i} {...{count, i}} />)}
  </div>

App = connect(state => ({state}), {addCounter})(App)

const store = createStore(counters)
const root = <Provider store={store}><App /></Provider>
const rootEl = document.querySelector('#root')
const render = () => ReactDOM.render(root, rootEl)

store.subscribe(render)
render()
