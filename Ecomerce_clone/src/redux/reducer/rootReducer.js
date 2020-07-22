import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
import {cartReducer} from './cartReducer'

const rootReducer = combineReducers({
    userState:userReducer,
    cartState:cartReducer
})
export default rootReducer