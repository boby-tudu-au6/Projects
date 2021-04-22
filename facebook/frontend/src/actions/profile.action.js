import { Axios, baseurl, GET_PROFILE, DEL_PROFILE } from 'actions';

export const getProfile = payload =>async dispatch=>{
    try{
        const {data} = await Axios.post(`${baseurl}/getprofile`,
        {userid:payload},{
            headers:{
                token:localStorage.getItem("user"),
                'Content-Type': 'application/json'
            }
        })
        return dispatch({
            type:GET_PROFILE,
            payload:data
        })
    }catch(err){
        console.log('invalid token')
    }
}

// this action is action for deleting current friend id 
// saved in redux
export const delProfile = () =>dispatch=>{
    return dispatch({type:DEL_PROFILE})
}