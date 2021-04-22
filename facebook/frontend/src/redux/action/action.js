import Axios from "axios"

export const DO_LOGIN = 'DO_LOGIN'
export const CHECK_LOGIN = 'CHECK_LOGIN'
export const LOGOUT = 'LOGOUT'
export const SEARCH_FRIEND = 'SEARCH_FRIEND'
export const SEND_REQUEST = 'SEND_REQUEST'
export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const START_VIDEO = 'START_VIDEO'
export const START_AUDIO = 'START_AUDIO'
export const GET_REQUEST = 'GET_REQUEST'
export const GET_NOTIFICATION = 'GET_NOTIFICATION'
export const GET_FRIEND = 'GET_FRIEND'
export const GET_POST = 'GET_POST'
export const GET_PROFILE = 'GET_PROFILE'
export const SET_SOCKET = 'SET_SOCKET'
export const SET_CHAT = 'SET_CHAT'
export const SET_ONLINE_CHAT = 'SET_ONLINE_CHAT'
export const SET_UNREAD = 'SET_UNREAD'
export const SET_FILE = 'SET_FILE'
export const SET_FILESRC = 'SET_FILESRC'
export const SET_PAGEID = 'SET_PAGEID'
export const INC_UNSEEN_POST = 'INC_UNSEEN_POST'
export const DEL_UNSEEN_POST = 'DEL_UNSEEN_POST'
export const DEL_CHAT_ID = 'DEL_CHAT_ID'
export const DEL_FILES = 'DEL_FILES'
export const DEL_FILE_ITEM = 'DEL_FILE_ITEM'
export const DEL_PROFILE = 'DEL_PROFILE'
export const DIS_SET_CHAT = 'DIS_SET_CHAT'
export const CLOSE_MEDIA = 'CLOSE_MEDIA'
// export const baseurl = "https://facebook--clone.herokuapp.com"
export const baseurl = "http://localhost:8080"


// this action is used for getting user 
// profile based on id provided
// export const getProfile = payload =>async dispatch=>{
//     try{
//         const {data} = await Axios.post(`${baseurl}/getprofile`,
//         {userid:payload},{
//             headers:{
//                 token:localStorage.getItem("user"),
//                 'Content-Type': 'application/json'
//             }
//         })
//         return dispatch({
//             type:GET_PROFILE,
//             payload:data
//         })
//     }catch(err){
//         console.log('invalid token')
//     }
// }

// // this action is action for deleting current friend id 
// // saved in redux
// export const delProfile = () =>dispatch=>{
//     return dispatch({type:DEL_PROFILE})
// }

// action for login
// export const doLogin = ({phoneEmail,password}) => async dispatch =>{
//     let firstdata = 'phone';
//         const testdata = phoneEmail.value.search("@")
//         if(testdata!==-1){
//             firstdata = 'email'
//         }
//         try{
//             const {data} = await Axios.post(`${baseurl}/login`,{
//                 [firstdata]:phoneEmail.value,
//                 password:password.value
//             })
//             if(data.data!==undefined){
//                 localStorage.setItem("user",data.token)
//                 return dispatch({
//                     type:DO_LOGIN,
//                     payload:data
//                 })
//             }
//             alert("login failed")
//         }catch(err){
//             console.log("login failed")
//         }
// }

// // action for verifying user's token
// export const checkLogin =()=>async dispatch=>{
//     try{
//         const user = localStorage.getItem('user')
//         if(user){
//                 const {data} = await Axios.post(`${baseurl}/checklogin`,
//                 {user},{
//                     headers:{
//                         token:localStorage.getItem("user"),
//                         'Content-Type': 'application/json'
//                     }
//                 })
//             if(data[0]!==undefined){
//                 const username = data[0].firstname
//                 const userid = data[0]._id
//                 const profilePic = data[0].profilePic
//                 const coverImg = data[0].coverImg
//                 return dispatch({type:CHECK_LOGIN,payload:{
//                     user,username,userid,profilePic,coverImg
//                 }})
//             }else{
//                 console.log('invalid token')
//             }
//         }
//     }catch(err){
//         console.log('invalid token')
//     }
// }

// action for setting friend id as chat id
export const setChat = payload => async dispatch =>{
    try{
        const {data} = await Axios.post(`${baseurl}/getchat`,{
            userid:payload.userid,
            friendid:payload.friendid,
            curChat:payload
        },{
            headers:{
                token:localStorage.getItem("user"),
                'Content-Type': 'application/json'
            }
        })
        return dispatch({
            type:SET_CHAT,
            payload,
            data
        })
    }catch(err){
        console.log('invalid token')
    }
}

// action for getting online chat
export const setOnlineChat = payload =>dispatch =>{
    return dispatch({
        type:SET_ONLINE_CHAT,
        payload
    })
}

// action for logout
export const logout = ()=>dispatch=>{
    localStorage.removeItem("user")
    return dispatch({type:LOGOUT})
}


// action for search user
export const searchFriend = (payload) =>async dispatch=>{
    try{
        if(payload!==""){
            const {data} = await Axios.post(`${baseurl}/search`,{q:payload},{
                headers:{
                    token:localStorage.getItem("user"),
                    'Content-Type': 'application/json'
                }
            })
            return dispatch({
                type:SEARCH_FRIEND,
                payload:data.user
            })
        }else{
            return dispatch({
                type:SEARCH_FRIEND,
                payload:null
            })
        }
    }catch(err){
        console.log('invalid token')
    }
}

// action for getting friend's socket id
export const setSocket = payload => dispatch =>{
    return dispatch({
        type:SET_SOCKET,
        payload
    })
}

// action for getting all friend request of logged user
export const getRequest = payload =>async dispatch =>{
    try{
        const {data} = await Axios.post(`${baseurl}/getrequest`,{_id:payload},{
            headers:{
                token:localStorage.getItem("user"),
                'Content-Type': 'application/json'
            }
        })
        return dispatch({
            type:GET_REQUEST,
            payload:data
        })
    }catch(err){
        console.log("invalid token")
    }
}

// action for getting live friend request
export const updateRequest = payload => dispatch =>{
    return dispatch({
        type:UPDATE_REQUEST,
        payload
    })
}

// action for getting all friend list
// of logged user
export const getFriend = userid =>async dispatch =>{
    try{
        const {data} = await Axios.post(`${baseurl}/getfriend`,
        {_id:userid},{
            headers:{
                token:localStorage.getItem("user"),
                'Content-Type': 'application/json'
            }
        })
        if(data!==null){
            return dispatch({
                type:GET_FRIEND,
                payload:data
            })
        }
    }catch(err){
        console.log("invalid token")
    }
}

// action for sending friend request
export const sendRequest = ()=>dispatch=>{
    return dispatch({
        type:SEND_REQUEST
    })
}

// action for deleting current chat id of friend
export const delChatId = (payload)=>async dispatch=>{
    try{
        await Axios.post(`${baseurl}/delchat`,
        {userid:payload},{
            headers:{
                token:localStorage.getItem("user"),
                'Content-Type': 'application/json'
            }
        })
        return dispatch({type:DEL_CHAT_ID})
    }catch(err){
        console.log("invalid token")
    }
}

// action for starting video call
export const startVideo = () => dispatch=>{
    return dispatch({type:START_VIDEO})
}

// action for start audio call
export const startAudio = () =>dispatch=>{
    return dispatch({type:START_AUDIO})
}

// // action for getting all post of his/her timeline post
// export const getPost = ({userid,page}) => async dispatch =>{
//     try{
//         const {data} = await Axios.post(`${baseurl}/getpost`,
//         {userid,page},{
//             headers:{
//                 token:localStorage.getItem("user"),
//                 'Content-Type': 'application/json'
//             }
//         })
//         return dispatch({
//             type:GET_POST,
//             payload:data
//         })
//     }catch(err){
//         console.log('invalid token')
//     }
// }

// // action for getting unseenpost
// export const incUnseenPost = () =>dispatch=>{
//     return dispatch({type:INC_UNSEEN_POST})
// }

// // action for deleting unseen post
// export const delUnseenPost = () =>dispatch=>{
//     return dispatch({type:DEL_UNSEEN_POST})
// }

// action for getting file data to be uploaded
export const setFile = payload =>dispatch =>{
    return dispatch({type:SET_FILE,payload})
}

// action for getting file dataurl to be uploaded
export const setFileSrc = payload =>dispatch =>{
    return dispatch({type:SET_FILESRC,payload})
}

// action for removing files from
// list of files to be uploaded
export const delFiles = ()=>dispatch=>{
    return dispatch({type:DEL_FILES})
}

// action for removing file's dataurl from 
// list of file to be uploaded
export const delFileItem = payload=>dispatch=>{
    return dispatch({type:DEL_FILE_ITEM,payload})
}

// action for setting page id to be loaded
// in post section 
export const setPageId = payload=>dispatch=>{
    return dispatch({type:SET_PAGEID,payload})
}

// action for dismiss chat id 
export const disSetChat = () =>dispatch=>{
    return dispatch({type:DIS_SET_CHAT})
}

// action for close any video/audio call
export const closeMedia = ()=>dispatch=>{
    return dispatch({type:CLOSE_MEDIA})
}