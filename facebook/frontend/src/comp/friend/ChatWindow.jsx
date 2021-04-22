import React, { Component } from 'react'
import ChatLeft from './ChatLeft'
import ChatRight from './ChatRight'
import Videoapp from '../video/Video'
import Audioapp from '../audio/Auido'
import {connect} from 'react-redux'
import { startVideo,startAudio } from '../../redux/action/action'
import { 
    faVideo,
    faPhone,
    faSmile
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ChatWindow extends Component {
    componentDidUpdate(){
        if(this.props.video!==null){
            this.props.socket.emit('videostarted')
        }
        if(this.props.audio!==null){
            this.props.socket.emit("audiostarted")
        }
    }
    sendMessage = async (e) =>{
        e.preventDefault()
        const {chat} = e.target
        this.props.socket.emit("chat",{
            from:this.props.userid,
            to:this.props.curChat.friendid,
            body:{
                type:"text",
                chat:chat.value
            }
        })
    }
    render() {
        return (
            <div className='col-8 p-0 full'>
            <div className='row col-12 m-auto bg-light pt-2 pb-1 pl-3 justify-content-between pr-4'
            style={{height:"20vh",minHeight:"70px",maxHeight:"70px"}}>
                <div className='col-6 text-left row'>
                    <img src={this.props.curChat.profilePic} 
                    alt="img" 
                    className="rounded-circle" 
                    width='50px' height='50px'/>
                <div className='col-9 pt-2 text-left'>
                    <h3 
                    className='lightfont'>
                        {this.props.curChat.friendFirstName+' '+this.props.curChat.friendLastName}
                    </h3>
                </div>
                </div>
                <div className='row col-2 text-right p-0' style={{height:'50px'}}>
                    <div className='navitem p-3 rounded col-6 text-center' data-toggle="tooltip" title='video call' onClick={this.props.startVideo}>
                        <FontAwesomeIcon icon={faVideo} className='icon' />
                    </div>
                    <div 
                    className='navitem p-3 rounded col-6 text-center' 
                    data-toggle="tooltip" title='audio call' 
                    onClick={this.props.startAudio}>
                        <FontAwesomeIcon icon={faPhone} className='icon' />
                    </div>
                </div>
            </div>
            <div className='container col-12 pl-3 pr-3 pt-3 messageBox'>
                {this.props.video===null && this.props.audio===null?
                <>{this.props.messages.length===0?null:
                this.props.messages.map(box=>{
                    if(box.from===this.props.userid){
                        return <ChatRight key={Math.random()} data={box}/>
                    }
                    return <ChatLeft key={Math.random()} data={box}/>
                })}</>:
                this.props.video!==null?<Videoapp/>:
                <Audioapp/>}
            </div>
            {this.props.video===null && this.props.audio===null?
            <form onSubmit={this.sendMessage}
            className='form form-inline col-12 pl-1 pr-1 pt-2 pb-2 darkgray'>
                <div className='col-1 p-0 pt-2 pb-2 rounded emoji_box'>
                    <FontAwesomeIcon icon={faSmile} className='icon' />
                </div>
                <input type="text" 
                name="chat" 
                className='form-control col-10 rounded-pill border-0' 
                placeholder='enter message'/>
            </form>:null}
        </div>
        )
    }
}
const mapStateToProp = state =>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {
        startVideo:()=>dispatch(startVideo()),
        startAudio:()=>dispatch(startAudio())
    }
}
export default connect(mapStateToProp,mapDispatchToProps)(ChatWindow)
