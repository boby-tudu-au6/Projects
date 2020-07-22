import {ADD_CART,UPDATE_CART,DELETE_CART, CHECKOUT} from '../action/action'


const initState={
    cart:[]
}

export function cartReducer(state = initState,action){
    const {type,payload} = action
    switch(type){
        case ADD_CART:{
            console.log("add cart fired")
            return {...state,cart:[...state.cart,payload]}}
        case UPDATE_CART:
            const testData = [...state.cart]
            const data = state.cart.findIndex((p)=>{
                return p.id === parseInt(payload.id) && p.userid === payload.userid
            })

            testData[data] = {...payload}
            console.log(payload)
            console.log(testData)
            return {...state,cart:testData}

        case DELETE_CART:
            console.log('delete fired')
            const delCart = state.cart.filter((p)=>{
                return p.id !== payload.id
            })
            console.log(payload)
            console.log(delCart)
            return {...state,cart:delCart}
        case CHECKOUT:
            return {...state,cart:[]}
        default:return state
    }
}