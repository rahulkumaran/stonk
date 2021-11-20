import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'
import blockchainReducer from './blockchain/blockchainReducer'
import dataReducer from './data/dataReducer'

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer
})

let composeEnhancers

const middleware = [thunk]

if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose(applyMiddleware(...middleware))
} else {
  composeEnhancers = composeWithDevTools(applyMiddleware(...middleware))
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers)
}

const store = configureStore()

export default store
