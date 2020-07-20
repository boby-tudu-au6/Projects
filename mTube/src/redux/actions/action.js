import {gapi} from 'gapi-script'
import {cred} from '../../comp1/testApi'
import Axios from 'axios'

export const GET_TRENDING = 'GET_TRENDING'
export const GET_SEARCH = 'GET_SEARCH'
export const GET_HOME = "GET_HOME"
export const GET_LOGO = 'GET_LOGO'
export const GET_PLAYER = 'GET_PLAYER'
export const GET_RELATED = 'GET_RELATED'
export const GET_COMMENT = 'GET_COMMENT'
export const GET_REPLY = 'GET_REPLY'


export const getHome = () =>async dispatch=>{
    const {result} = await gapi.client.youtube.videos.list({
        "part": [
            "snippet","contentDetails","statistics"
          ],
          "maxResults": 15,
          "mine": true,
          home:true,
          chart:['mostPopular']
    })
    return dispatch({
        type:GET_HOME,
        payload:result.items
    })
}

export const getTrending = ()=> async dispatch=>{
    const {result} = await gapi.client.youtube.videos.list({
        "part": ["snippet","contentDetails","id",'statistics'],
        "mine": true,
        'chart':['mostPopular'],
        regionCode: 'IN',
        "maxResults": 25,
    })
    // console.log(result)
    return dispatch({
        type:GET_TRENDING,
        payload:result.items
    })
}

export const getSearch = (payload)=>async dispatch=>{
    const {result} = await gapi.client.youtube.search.list({
        part:['snippet'],
        q:payload.q,
        maxResults:10,
        order:['viewCount']
    })
    return dispatch({
        type:GET_SEARCH,
        payload:result.items
    })
}

export const getLogo = (payload)=>async dispatch=>{
    const {result} = await gapi.client.youtube.channels.list({
        part:['snippet'],
        id:[payload.id]
    })
    return dispatch({
        type:GET_LOGO,
        payload:result.items
    })
}

export const getPlayer = (payload)=>async dispatch=>{
    // console.log('getplayer-',payload)
    const {result} = await gapi.client.youtube.videos.list({
        part:['snippet'],
        id:payload.id
    })
    return dispatch({
        type:GET_PLAYER,
        payload:{items:result.items[0]}
    })
}

export const getRelated = payload => async dispatch =>{
    // console.log(payload)
    const {result} = await gapi.client.youtube.search.list({
        part:['snippet'],
        relatedToVideoId:payload.id,
        type:['video'],
        maxResults:10
    })
    return dispatch({
        type:GET_RELATED,
        payload:result.items
    })
}

export const getComment = payload =>async dispatch=>{
    const {result} = await gapi.client.youtube.commentThreads.list({
        part:['snippet'],
        videoId:payload.id,
        maxResults:10
    })
    return dispatch({
        type:GET_COMMENT,
        payload:result.items
    })
}

export const getReply = payload =>async dispatch =>{
    const {result} = await gapi.client.youtube.comments.list({
        part:['snippet'],
        parentId:payload.id,
        maxResults:5
    })
    return dispatch({
        type:GET_COMMENT,
        payload:result.items
    })
}