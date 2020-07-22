import {REGISTER,LOGIN,ADD_PRODUCT,LOGOUT} from '../action/action'
import {products} from './products'


const initState = {
    user:[],
    loggedUser:[],
    isLogged:false,
    products:[]
}
export function userReducer(state = initState,action){
    const {type,payload} = action
    switch(type){
        case ADD_PRODUCT:return {...state,products}
        case REGISTER:return {...state,user:[...state.user,payload]}
        case LOGIN:
            const data = state.user.find((user)=>{
                return user.email===payload.email && user.pass===payload.pass
            })
            if(data===undefined){ 
                alert("invalid credentials")
                return state
            }
            return {...state,loggedUser:[...state.loggedUser,data.id],isLogged:true}
        case LOGOUT: return {...state,isLogged:false,loggedUser:[]}
        default:return state
    }
}
