import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
// import statisticMiddleware from '../middleware/statisticMiddleware'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const logger = createLogger()

const store = createStore(rootReducer, applyMiddleware(logger))

export default store
