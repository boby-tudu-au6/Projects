export const REGISTER = 'REGISTER'
export const LOGIN = 'LOGIN'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const LOGOUT = 'LOGOUT'
export const ADD_CART = 'ADD_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const DELETE_CART = 'DELETE_CART'
export const CHECKOUT = 'CHECKOUT'

export const register =(name,email,pass)=>{
    return {
        type:REGISTER,
        payload:{id:Math.random(),name,email,pass}
    }
}
export const login = (email,pass)=>{
    return {
        type:LOGIN,
        payload:{email,pass}
    }
}
export const logout = ()=>{
    return {
        type:LOGOUT
    }
}
export const addCart = payload=>{
    return {
        type:ADD_CART,
        payload
    }
}
export const updateCart = payload=>{
    return {
        type:UPDATE_CART,
        payload
    }
}
export const deleteCart = payload=>{
    return {
        type:DELETE_CART,
        payload
    }
}