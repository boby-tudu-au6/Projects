import React, { Component } from 'react'
import CreatePost from './CreatePost'
import RegularPost from './RegularPost'
import withState from '../hoc/withState'
import {withRouter} from 'react-router-dom'

import Pagination from 'react-responsive-pagination';


class SecondColumn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             current:1
        }
    }
    componentDidMount(){
        if(this.props.location.pathname==='/profile'){
            this.props.getPost({userid:this.props.userdata._id,page:this.props.pageid})
        }
        if(this.props.location.pathname==='/'){
            this.props.getPost({userid:this.props.userid,pageid:this.props.pageid})
        }
    }

    handleChange=(e)=>{
        this.props.setPageId(e)
        if(this.props.location.pathname==='/'){
            this.props.getPost({userid:this.props.userid,page:e})
        }
        else if(this.props.location.pathname==='/profile'){
            this.props.getPost({userid:this.props.userdetails,page:e})
        }
        this.setState({current:e})
    }
    render() {
        let totalPages=0
        if(this.props.post!==null){
            let pol = this.props.post.length
            if(pol%5!==0){
                totalPages=parseInt((pol/5)+1)
            }else{
                totalPages=parseInt(pol/5)
            }
        }
        let friends = [];
        if(this.props.friend!==null){
            this.props.friend.forEach(item=>friends.push(item.friendId))
        }
        return (
            <div className='col-12 p-0'>
                <div className="col-12 secCol m-0 p-0">
                {this.props.location.pathname!=='/profile'?<CreatePost/>:null}
                {this.props.post!==null && this.props.post.length!==0?this.props.post.data.map(item=>
                <RegularPost 
                key={Math.random()} 
                data={item} 
                userid={this.props.userid}
                friends={friends} 
                socket={this.props.socket}
                profilePic={this.props.profilePic}
                />)
                :<h2 className='col-12 text-center pt-5 text-secondary'>Nothing here</h2>}
            </div>
            <div className='m-2'></div>
            <Pagination
            current={this.state.current}
            total={totalPages}
            onPageChange={(e)=>{this.handleChange(e)}}/>
            </div>
        )
    }
}

export default withState(withRouter(SecondColumn))
