import {createStore,applyMiddleware} from 'redux'
import {videoReducer} from './reducers/videoReducer'
import thunk from 'redux-thunk'
import { version } from 'react'

const store = createStore(videoReducer,applyMiddleware(thunk))
// store.subscribe(()=>console.log('store subscribed',store.getState()))

export default store