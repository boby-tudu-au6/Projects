import React, { Component } from 'react'
import {UnmountClosed} from 'react-collapse';
import Axios from 'axios'
import {baseurl} from '../../redux/action/action'

export default class RegularPost extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        friends:null,
        firstname:'',
        date:'',
        likes:0,
        comments:0,
        isOpened:false,
        lastname:'',
        profilePic:''
      }
    }
    componentWillUnmount() {this.setState = (state,callback)=>{return;};}
    postComment = e =>{
      e.preventDefault()
      const {comment} = e.target
      this.props.socket.emit("postcomment",{
        _id:this.props.data._id,
        comment:comment.value,
        userid:this.props.userid
      })
    }
    getName = async(id)=>{
      const {data} = await Axios.post(`${baseurl}/getname`,{id})
      let d = new Date(this.props.data.time)
      this.setState({
        firstname:data.firstname,
        lastname:data.lastname,
        date:(d.toUTCString()).slice(0,-4),
        profilePic:data.profilePic
      })
    }
    componentDidMount(){
      if(this.props.friends!==undefined){
        this.setState({friends:this.props.friends})}
        let d = new Date(this.props.data.time)
        if(this.props.data.from===this.props.userid){
          this.setState({
            firstname:'you',
            date:(d.toUTCString()).slice(0,-4),
            profilePic:this.props.profilePic
          })
        }else{
          this.getName(this.props.data.from)
        }
    }
    render() {
        return (
            <div className="bg-light hid rounded mt-2">
              {this.props.data.data!==undefined?<>
                <div 
                  className="container-fluid 
                  border-bottom lightgray pt-1 
                  rounded-top pb-1 pl-2 row m-auto">
                  <div className='col-1 p-0 ml-3'>
                  <img className="rounded-circle" 
                  src={this.state.profilePic} alt='img' width="40px" height="40px" />
                  </div>
                  <div className="col-10 mt-1">
                    <p 
                    className="small m-0">
                      {this.state.firstname} {this.state.lastname}</p> 
                    <p 
                    className="extra_small m-0">
                      {this.state.date}</p>
                  </div>
              </div>
            <div className="col-12 border-bottom p-0">
            <p className='col-12 ml-auto mr-auto mt-2 '>{this.props.data.data.message}</p>
              {this.props.data.data.arr.length>1?<>
                <div id="demo" className="carousel slide" data-ride="carousel">

<ul className="carousel-indicators">
  {this.props.data.data.arr.map((item,index)=>{
    let className = ''
    if(index===0){
      className = `active`
    }
    return (
    <li key={Math.random()} 
    data-target="#demo" 
    className={className} 
    data-slide-to={index}></li>)
  })}
</ul>

<div className="carousel-inner">
  {this.props.data.data.arr.map((item,index)=>{
    let className='carousel-item'
    if(index===0){
      className = `${className} active`
    }
    return (
    <div className={className} key={Math.random()}>
    {
    item.type.search("image")!==-1?
    <img src={item.data} alt="img" className='col-12 m-0 p-0'/>:
    <video src={item.data} className='m-0 p-0 col-12'></video>
    }
  </div>
  )})}
</div>

<a className="carousel-control-prev" href="#demo" data-slide="prev">
  <span className="carousel-control-prev-icon"></span>
</a>
<a className="carousel-control-next" href="#demo" data-slide="next">
  <span className="carousel-control-next-icon"></span>
</a>

</div>
              </>:(
                this.props.data.data.arr[0].type.search("image")!==-1?
                <img className="col-12 m-0 p-0" src={
                  this.props.data.data.arr[0].data
                } alt='img'/>:
                <video src={this.props.data.arr[0].data}></video>
              )}
            </div>
           
            <div className="col-12 border-bottom row m-auto p-2 text-center">
              <div className="col-6">
                <p className='small'>{this.props.data.like.length} likes</p>
              </div>
              <div className="col-6"
              ><p className='small'>{this.props.data.comment.length} Comments</p>
              </div>
            </div>
              {/* like comment section */}
            <div className="col-12 p-0 border-bottom row m-auto">
              <div className="col-6 p-1 text-center">
                <button className='btn navitem' 
                onClick={()=>{
                  this.props.socket.emit("likepost",{
                    _id:this.props.data._id,userid:this.props.userid
                  })
                }}>
                <i className="fa fa-thumbs-o-up"></i>
                Like
                </button>
              </div>
              <div className="col-6 p-1 text-center">
                <label className='btn navitem' htmlFor='comment'>
                <i className="fa fa-comment-o"></i>
                comment
                </label>
              </div>
            </div>
            <div className="col-12 p-0 pb-3">
              <p className="pl-4 mb-2" onClick={()=>{
                this.setState({isOpened:!this.state.isOpened})}}>View Comment</p>
              <UnmountClosed isOpened={this.state.isOpened}>
                <ul>
                {this.props.data.comment.length!==0?
                this.props.data.comment.map(item=><li key={Math.random()}>{item.comment}</li>):null}
                </ul>
              </UnmountClosed>
              <div className="col-12 row m-auto pb-2">
                <div className='col-1 ml-3 p-0'>
                <img className="rounded-circle" src={this.props.profilePic} alt='img'
                width="40px" height="40px"/> 
                </div>
                <form className="ml-2 form form-inline lightgray col-10 round hid" onSubmit={this.postComment}>
                  <input className="form-control border-0 col-11 transparent" name='comment' placeholder="Write a comment" />
                  <button className="btn rounded-0 transparen text-primary col-1"><i className="fa fa-paper-plane"></i></button>
                </form>
              </div>
            </div>
              </>:null}
          </div>
        )
    }
}
