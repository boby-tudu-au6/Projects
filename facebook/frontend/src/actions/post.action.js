import { Axios, GET_POST, DEL_UNSEEN_POST, INC_UNSEEN_POST, baseurl } from 'actions';

// action for getting all post of his/her timeline post
export const getPost = ({userid,page}) => async dispatch =>{
    try{
        const {data} = await Axios.post(`${baseurl}/getpost`,
        {userid,page},{
            headers:{
                token:localStorage.getItem("user"),
                'Content-Type': 'application/json'
            }
        })
        return dispatch({
            type:GET_POST,
            payload:data
        })
    }catch(err){
        console.log('invalid token')
    }
}

// action for getting unseenpost
export const incUnseenPost = () =>dispatch=>{
    return dispatch({type:INC_UNSEEN_POST})
}

// action for deleting unseen post
export const delUnseenPost = () =>dispatch=>{
    return dispatch({type:DEL_UNSEEN_POST})
}