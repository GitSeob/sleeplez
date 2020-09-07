import { combineReducers } from 'redux';
import set from './set';
import login from './login';
import statistic from './statistic'


const rootReducer = combineReducers({
  set: set,
  login: login,
  statistic: statistic,
})
export default  rootReducer
