import React, { Component } from 'react'
import withState from '../hoc/withState'
import CachedIcon from '@material-ui/icons/Cached';

class RefreshBtn extends Component {
    render() {
        return (
            <button 
            className='btn btn-primary btn-lg'
            onClick={()=>{
                this.props.delUnseenPost()
                this.props.getPost({userid:this.props.userid,page:1})}}
            style={{
                position:"absolute",
                bottom:"20px",
                right:"20px",
                zIndex:'100'
            }}>
                <div className='bg-danger text-light rounded pt-0 pb-0' style={{position:"absolute",top:"-5px",left:'-5px',padding:"5px",fontSize:"16px"}}>{this.props.unseenpost}</div>
                {/* <i className="fas fa-redo"></i> */}
                <CachedIcon style={{color:"white",fontSize:"40px"}}/>
            </button>
        )
    }
}

export default withState(RefreshBtn)
