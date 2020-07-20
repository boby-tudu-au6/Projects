import {GET_TRENDING,GET_SEARCH,GET_HOME,GET_LOGO,GET_PLAYER,GET_RELATED, GET_COMMENT, GET_REPLY} from '../actions/action'

const initState = {
    data:[],
    home:[],
    logo:[],
    player:'',
    related:[],
    searchData:[],
    comment:[],
    reply:[]
}

export function videoReducer(state = initState,action){
    const {type,payload} = action
    switch(type){
        case GET_HOME:return {...state,home:[...state.home,...payload]}
        case GET_TRENDING:return {...state,data:[...state.data,...payload]}
        case GET_SEARCH:return {...state,searchData:payload}
        case GET_LOGO:return {...state,logo:payload[0]}
        case GET_PLAYER:return {...state,player:payload.items}
        case GET_RELATED:return {...state,related:payload}
        case GET_COMMENT:return {...state,comment:payload}
        case GET_REPLY:return {...state,reply:payload}
        default:return state
    }
}