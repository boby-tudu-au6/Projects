import React, { Component } from 'react'
import FriendRequest from './FriendRequest'
import OnlineFriend from './OnlineFriend'
import withState from '../hoc/withState'
import {Link} from 'react-router-dom'


class ThirdColumn extends Component {
    componentDidUpdate(){
        if(this.props.friend!==null){
            let arr = []
            this.props.friend.forEach(item=>arr.push(item.friendId[0]._id))
        }
    }
    render() {
        return (
<div className="col-3 full rounded p-1">
    <div className="container col-12 m-auto bg-light mb-2 rounded pt-2">
        <strong>
            <p className="text-secondary friend_toggle" data-toggle="collapse" data-target="#friendRequest">Friend Request</p>
        </strong><hr/>
        <div id='friendRequest'>
        {
        this.props.friendRequest.length===0?
        null:this.props.friendRequest.map(m=>
        {
            return (
            <FriendRequest key={Math.random()} data={m}/>
            )
        }
        )}
        </div>
    </div>

    <div className="container col-12 m-auto bg-light mb-2 rounded pt-2">
        <strong>
            <p className="text-secondary" data-toggle="collapse" data-target="#onlineFriend">Online Friend</p>
        </strong><hr/>
        <div id='onlineFriend'>
        {
            this.props.friend===null?null:
            this.props.friend.map(m=>
                {
                    return (
                    <Link to='/messages' key={Math.random()} onClick={
                        ()=>{
                            this.props.setChat({
                            friendid:m.friendId[0]._id,
                            friendFirstName:m.friendId[0].firstname,
                            friendLastName:m.friendId[0].lastname,
                            socketid:m.friendId[0].socketid,
                            room:m.room,
                            userid:this.props.userid,
                            profilePic:m.friendId[0].profilePic
                        })}
                    }>
                        <OnlineFriend data={m}/>
                    </Link>
            )})
        }
        </div>
    </div>
</div>
        )
    }
}
export default withState(ThirdColumn)