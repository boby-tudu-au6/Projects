export const websocket = {
    connect:(
        socket,
        setSocket,
        userid,
        getFriend
    )=>{
        setSocket(socket)
        socket.emit("updatesocketid",{userid})
        getFriend(userid)
    },
    chat:(data,
        socket,
        location,
        curChat,
        userid,
        setOnlineChat,
        messages
        )=>{
            let chats = []
            let timeChat=[]
            messages.forEach(item=>{
                timeChat.push(item.time.slice(0,-4))
                chats.push(item.body.chat)
            })
            if(chats.includes(data.body.chat) && timeChat.includes(data.time.slice(0,-4))){
                return
            }else{
                if(curChat!==null && location==='/messages'){
                    if(data.to===userid){
                        socket.emit('chatRead',data)
                        return setOnlineChat({...data,unread:"false"})
                    }else if(data.from===userid){
                        setOnlineChat(data)
                    }
                }else if(curChat===null || location!=="/messages"){
                    if(data.to===userid){setOnlineChat(data)}
                }
            }
    },
    requestAccepted:(
        data,
        userid,
        getRequest,
        getFriend)=>{
            if(data.data.to===userid || data.data.from._id===userid){
                getRequest(userid)
                getFriend(userid)
            }
    }
}


// export default websocket