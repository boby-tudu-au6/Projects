import React, { Component } from 'react'
import  ChatWindow  from './ChatWindow'
import withState from '../hoc/withState'
import { 
    faMehRollingEyes
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Chat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             message:""
        }
    }
    componentDidMount(){
        this.props.getFriend(this.props.userid)
    }
    render() {
        document.title = 'Chat|Apne'
        return (
<div className='bg-light'>
    {this.props.userid!==null?(
        <div className='row container p-0 m-auto col-12 text-center justify-content-center'>
        <div className='col-4 full pt-3 scroll' style={{height:"78vh"}}>
            <div style={{
                position:"absolute",
                zIndex:"100",
                height:"87vh"
            }}></div>
            {this.props.friend===null?null:
            this.props.friend.map(friend=>(
            <div key={Math.random()} className='card pt-0 pb-0 pl-3 pr-3 mb-2' onClick={()=>{
                if(this.props.curChat!==null){
                    this.props.socket.emit("leaveroom",{room:this.props.curChat.room})
                }
                this.props.socket.emit("joinroom",{room:friend.room})
                    this.props.setChat({
                        friendid:friend.friendId[0]._id,
                        friendFirstName:friend.friendId[0].firstname,
                        friendLastName:friend.friendId[0].lastname,
                        socketid:friend.friendId[0].socketid,
                        room:friend.room,
                        userid:this.props.userid,
                        profilePic:friend.friendId[0].profilePic
                    })
            }}>
                <div className='row'>
                    <div className='col-2 p-0'>
                    <img 
                    src={friend.friendId[0].profilePic} 
                    alt="img" className="rounded-circle p-2" width="100%"/>
                    </div>
                    <div className='col-9 p-4 text-left'>
                    <h3 className='lightfont'>
                        {friend.friendId[0].firstname} {friend.friendId[0].lastname}
                    </h3>
                    </div>
                </div>
            </div>
            ))}
        </div>

        {/* chat window */}
{this.props.curChat===null?
<div className='col-8 full' style={{
    background:"white",
    color:"lightgray",
    paddingTop:"20vh"
    }}>
    <FontAwesomeIcon icon={faMehRollingEyes} style={{fontSize:"60px"}}/>
    <h1 className='text-center col-12 text-secondary'>
        select friend to start conversation
        </h1>
</div>:
<ChatWindow/>
}
</div>
    ):null}
</div>
        )
    }
}

export default withState(Chat)
