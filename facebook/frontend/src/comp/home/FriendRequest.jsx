import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { delProfile, getProfile } from 'actions'

class FriendRequest extends Component {
    render() {
        return (
<div>
    <div className="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
        <div className='col-2 m-0 p-0'>
            <Link to='/profile' onClick={()=>{
                this.props.delProfile()
                this.props.getProfile(this.props.data.from._id)
            }}>
                <img 
                src={this.props.data.from.profilePic} 
                alt="dd" className="rounded-circle" 
                width='40px' height='40px'/>
            </Link>
        </div>
        <div className="col-9">
        <p className="text-secondary">
            {this.props.data.from.firstname}
        </p>
            <p className="text-secondary" style={{fontSize:'13px'}}>
                {this.props.data.from.city}
            </p>
        </div>
        <div className="row col-12 p-1 m-auto justify-content-between">
            <button 
            className='btn btn-primary btn-sm col-5'
            onClick={()=>this.props.socket.emit("acceptRequest",{...this.props.data})}
            >Accept</button>
            <button 
            className='btn btn-secondary btn-sm col-5'
            onClick={()=>this.props.socket.emit("deleteRequest",{...this.props.data})}
            >Delete</button>
        </div>
    </div>
        <hr/>
</div>
        )
    }
}

const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {
        delProfile:()=>dispatch(delProfile()),
        getProfile:payload=>dispatch(getProfile(payload))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FriendRequest)