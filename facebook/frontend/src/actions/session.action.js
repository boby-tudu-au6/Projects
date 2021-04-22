import { Axios, baseurl, CHECK_LOGIN, DO_LOGIN } from 'actions';

// action for login
export const doLogin = ({phoneEmail,password}) => async dispatch =>{
    let firstdata = 'phone';
        const testdata = phoneEmail.value.search("@")
        if(testdata!==-1){
            firstdata = 'email'
        }
        try{
            const {data} = await Axios.post(`${baseurl}/login`,{
                [firstdata]:phoneEmail.value,
                password:password.value
            })
            if(data.data!==undefined){
                localStorage.setItem("user",data.token)
                return dispatch({
                    type:DO_LOGIN,
                    payload:data
                })
            }
            alert("login failed")
        }catch(err){
            console.log("login failed")
        }
}

export const doRegister = (data) => async dispatch => {
    try{
        await Axios.post(`${baseurl}/register`,data)
        alert("register done")
    }catch(err){
        alert("registration failed, check values provided")
    }
}

// action for verifying user's token
export const checkLogin =()=>async dispatch=>{
    try{
        const user = localStorage.getItem('user')
        if(user){
                const {data} = await Axios.post(`${baseurl}/checklogin`,
                {user},{
                    headers:{
                        token:localStorage.getItem("user"),
                        'Content-Type': 'application/json'
                    }
                })
            if(data[0]!==undefined){
                const username = data[0].firstname
                const userid = data[0]._id
                const profilePic = data[0].profilePic
                const coverImg = data[0].coverImg
                return dispatch({type:CHECK_LOGIN,payload:{
                    user,username,userid,profilePic,coverImg
                }})
            }else{
                console.log('invalid token')
            }
        }
    }catch(err){
        console.log('invalid token')
    }
}