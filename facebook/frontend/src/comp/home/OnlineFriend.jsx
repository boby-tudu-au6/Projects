import React, { Component } from 'react'

class OnlineFriend extends Component {
    render() {
        const red = {boxShadow:"1px 1px 15px red",backgroundColor:"red"}
        const green = {boxShadow:"1px 1px 15px green",backgroundColor:"green"}
        return (
<div>
    <div className="row col-12 pt-2 pl-2 pb-2 bg-light m-auto">
        <div className='col-2 p-0'>
        <img src={this.props.data.friendId[0].profilePic} 
        className='rounded-circle'
        width="100%" alt='profilePic'/>
        </div>
        <div className="col-8">
        <p className="text-secondary">{this.props.data.friendId[0].firstname}</p>
            <p className="text-secondary" style={{fontSize:'13px'}}>
                {this.props.data.friendId[0].city}
            </p>
        </div>
        <div className='col-1 pt-2'>
            <div style={this.props.data.friendId[0].socketid===""?red:green} 
            className='p-2 m-0 rounded-circle'></div>
        </div>
    </div>
        <hr/>
</div>
        )
    }
}

export default OnlineFriend