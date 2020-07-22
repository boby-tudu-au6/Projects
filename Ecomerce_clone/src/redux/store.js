import {REGISTER,ADD_PRODUCT} from './action/action'
import {createStore} from 'redux'
import {products} from './reducer/products'
import rootReducer from './reducer/rootReducer'


const store = createStore(rootReducer)
store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch({type:ADD_PRODUCT,products})
// store.dispatch({type:REGISTER,payload:{id:Math.random(),name:'boby',email:"ajabdas999@gmail.com",pass:'123'}})

export default store