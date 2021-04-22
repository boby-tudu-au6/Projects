import { DO_LOGIN, CHECK_LOGIN, LOGOUT, SEARCH_FRIEND, SET_SOCKET, GET_REQUEST, UPDATE_REQUEST,GET_FRIEND, SEND_REQUEST, SET_CHAT, SET_ONLINE_CHAT, DEL_CHAT_ID, START_VIDEO, GET_POST, INC_UNSEEN_POST, DEL_UNSEEN_POST, SET_FILE, SET_FILESRC, DEL_FILES, DEL_FILE_ITEM, SET_PAGEID, DIS_SET_CHAT, START_AUDIO, GET_PROFILE, DEL_PROFILE, CLOSE_MEDIA } from "../action/action";

const initState = {
    profilePic:null,
    coverImg:null,
    user:null,
    userid:null,
    userdata:null,
    username:null,
    loggedIn:false,
    searchResult:null,
    socket:null,
    notification:0,
    friendRequest:[],
    friend:null,
    friendId:[],
    curChat:null,
    messages:[],
    unreadeChat:0,
    video:null,
    pageid:1,
    post:null,
    unseenpost:0,
    file:[],
    filesrc:[],
    audio:null
}
function rootReducer(state=initState,action){
    const {type,payload} = action
    switch (type) {
        case LOGOUT:return {
            ...state,
            user:null,
            loggedIn:false,
            username:null,
            userid:null,
            userdata:null
        }
        case SEARCH_FRIEND:return {...state,searchResult:payload}
        case SET_SOCKET:return {...state,socket:payload}
        case GET_REQUEST:return {...state,friendRequest:payload}
        case UPDATE_REQUEST:return {...state,friendRequest:[...state.friendRequest,payload]}
        case SEND_REQUEST:return {...state,searchResult:null}
        case SET_CHAT:return {...state,curChat:payload,messages:action.data}
        case DIS_SET_CHAT:return {...state,curChat:{...state.curChat,socketid:''}}
        case SET_ONLINE_CHAT:return {...state,messages:[...state.messages,payload]}
        case DEL_CHAT_ID:return {...state,curChat:{},messages:[]}
        case START_VIDEO:return {...state,video:state.curChat,audio:null}
        case START_AUDIO:return {...state,audio:state.curChat,video:null}
        case GET_POST:return {...state,post:payload,unseenpost:0}
        case INC_UNSEEN_POST:return {...state,unseenpost:state.unseenpost+1}
        case DEL_UNSEEN_POST:return {...state,unseenpost:0}
        case SET_FILE:return {...state,file:[...state.file,payload]}
        case SET_FILESRC:return {...state,filesrc:[...state.filesrc,payload]}
        case CLOSE_MEDIA:return {...state,audio:null,video:null}
        case DEL_FILES:return {...state,file:[],filesrc:[]}
        case SET_PAGEID:return {...state,pageid:payload}
        case GET_PROFILE:return {...state,userdata:payload}
        case DEL_PROFILE:return {...state,userdata:null}
        case GET_FRIEND:
            const friendId = (payload.friend.map(o=>o.friendId[0]._id))
            return {...state,friend:payload.friend,friendId}
        case DO_LOGIN : return {
            ...state,
            user:payload.token,
            username:payload.data.firstname,
            userid:payload.data._id,
            profilePic:payload.data.profilePic,
            coverImg:payload.data.coverImg
        }
        case CHECK_LOGIN:
            return {
                ...state,
                loggedIn:true,
                user:payload.user,
                username:payload.username,
                userid:payload.userid,
                profilePic:payload.profilePic,
                coverImg:payload.coverImg
            }
        case DEL_FILE_ITEM:return {
            ...state,
            file:state.file.filter(item=>item.id!==payload),
            filesrc:state.filesrc.filter(item=>item.id!==payload)
        }
        default : return state
    }
}

export default rootReducer