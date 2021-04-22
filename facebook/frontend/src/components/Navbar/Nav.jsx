import React, { useEffect } from 'react';
import io from 'socket.io-client'
import { baseurl } from 'actions';
import websocket from './websockets'

function Nav() {
    const [socket, setSocket] = io(baseurl);

    useEffect(() => {
        if(this.props.location.pathname==='/'){
            this.props.getPost({userid:this.props.userid,page:this.props.pageid})
        }

        // this will listen for route change and do further operation on them
        this.props.history.listen((location)=>{
            this.props.searchFriend('')
            if(location.pathname!=='/messages'){
                if(this.props.curChat!==null){
                    socket.emit("leaveroom",{room:this.props.curChat.room})
                }
            }
            if(location.pathname==='/'){
                this.props.getPost({userid:this.props.userid,page:this.props.pageid})
            }
        })
        this.props.getRequest(this.props.userid)
        
        // socket run when logged user updates his/her bio
        socket.on("updatebio",({userid})=>{
            if(this.props.userid===userid){
                this.props.getProfile(userid)
            } 
        })

        // socket run when logged user updated his/her profile
        socket.on("profiledone",({userid})=>{
            if(this.props.userid===userid){
                this.props.getProfile(userid)
            } 
        })

        // socket run when logged user updated his/her cover pic
        socket.on("coverdone",({userid})=>{
            if(this.props.userid===userid){
                this.props.getProfile(userid)
            }
        }); 
        
        // socket run when logged user's friend comes online
        socket.on('imonline',()=>{
            setTimeout(()=>this.props.getFriend(this.props.userid),2000)
        })

        // socket runs when logged user's friend goes offline
        socket.on("userDisconnected",({testuser})=>{
            if(testuser!==null){
                if(this.props.friendId.includes(testuser._id)){
                    if(this.props.curChat!==null){
                        if(testuser._id === this.props.curChat.friendid){
                            this.props.disSetChat()
                            socket.emit("leaveroom",{room:this.props.curChat.room})
                        }
                    }
                    this.props.getFriend(this.props.userid)}
                }
            })

            // socket runs when logged user's post gets any updates
        socket.on("postupdated",()=>{
            this.props.getPost({userid:this.props.userid,page:this.props.pageid})})

        // socket runs when logged user post any post
        socket.on("newpostdone",data=>{
            this.props.delFiles()
            let arr = []
            this.props.friend.forEach(item=>arr.push(item.friendId[0]._id))
            if(data.from===this.props.userid || arr.includes(data.from)){
                this.props.incUnseenPost()
            }
        })

        // socket runs when logged user's delete any friend request
        socket.on("deletedRequest",data=>{this.props.getRequest(this.props.userid)})

        // socket runs when logged user gets any friend request
        socket.on("requestCreated",data=>{
            if(data.to===this.props.userid){
                this.props.getRequest(this.props.userid)
            }})

            // socket runs on successful connection to server
        socket.on('connect',()=>{
            websocket.connect(
                socket,
                this.props.setSocket,
                this.props.userid,
                this.props.getFriend
            )
        })

        // socket runs when logged user's friend request is accepted by another peer
        socket.on("requestAccepted",data=>{
            websocket.requestAccepted(
                data,this.props.userid,
                this.props.getRequest,
                this.props.getFriend
            )
        })
        
        // socket runs when new chat comes
        socket.on("chat",data=>{
            websocket.chat(data,
                socket,
                this.props.location.pathname,
                this.props.curChat,
                this.props.userid,
                this.props.setOnlineChat,
                this.props.messages
                )
        })
    })

    return (
        <div>
            
        </div>
    )
}

export default Nav
