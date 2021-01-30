import counterReducer from './counterReducer';
import { combineReducers } from 'redux';
import userReducer from './userReducer'

const allReducers = combineReducers({
    counterReducer,
    userReducer
})

export default allReducers;