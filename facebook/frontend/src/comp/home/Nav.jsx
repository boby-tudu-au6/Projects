import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {baseurl} from '../../redux/action/action'
import io from 'socket.io-client'
import {DebounceInput} from 'react-debounce-input';
import Badge from './Badge'
import {websocket} from './websockets'
import withState from '../hoc/withState'
import { Icon } from 'semantic-ui-react'
import FacebookIcon from '@material-ui/icons/Facebook';
import { 
    faUsers,
    faBell,
    faPowerOff 
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Nav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            socket : io(baseurl)
        }
    }
    componentWillUnmount(){
        this.props.checkLogin()
        this.state.socket.close()
    }
    
    // logout function
    logout = ()=>{
        this.props.socket.close()
        this.props.logout()
    }
    async componentDidMount(){
        if(this.props.location.pathname==='/'){
            this.props.getPost({userid:this.props.userid,page:this.props.pageid})
        }

        // this will listen for route change and do further operation on them
        this.props.history.listen((location)=>{
            this.props.searchFriend('')
            if(location.pathname!=='/messages'){
                if(this.props.curChat!==null){
                    this.state.socket.emit("leaveroom",{room:this.props.curChat.room})
                }
            }
            if(location.pathname==='/'){
                this.props.getPost({userid:this.props.userid,page:this.props.pageid})
            }
        })
        this.props.getRequest(this.props.userid)
        
        // socket run when logged user updates his/her bio
        this.state.socket.on("updatebio",({userid})=>{
            if(this.props.userid===userid){
                this.props.getProfile(userid)
            } 
        })

        // socket run when logged user updated his/her profile
        this.state.socket.on("profiledone",({userid})=>{
            if(this.props.userid===userid){
                this.props.getProfile(userid)
            } 
        })

        // socket run when logged user updated his/her cover pic
        this.state.socket.on("coverdone",({userid})=>{
            if(this.props.userid===userid){
                this.props.getProfile(userid)
            }
        }); 
        
        // socket run when logged user's friend comes online
        this.state.socket.on('imonline',()=>{
            setTimeout(()=>this.props.getFriend(this.props.userid),2000)
        })

        // socket runs when logged user's friend goes offline
        this.state.socket.on("userDisconnected",({testuser})=>{
            if(testuser!==null){
                if(this.props.friendId.includes(testuser._id)){
                    if(this.props.curChat!==null){
                        if(testuser._id === this.props.curChat.friendid){
                            this.props.disSetChat()
                            this.state.socket.emit("leaveroom",{room:this.props.curChat.room})
                        }
                    }
                    this.props.getFriend(this.props.userid)}
                }
            })

            // socket runs when logged user's post gets any updates
        this.state.socket.on("postupdated",()=>{
            this.props.getPost({userid:this.props.userid,page:this.props.pageid})})

        // socket runs when logged user post any post
        this.state.socket.on("newpostdone",data=>{
            this.props.delFiles()
            let arr = []
            this.props.friend.forEach(item=>arr.push(item.friendId[0]._id))
            if(data.from===this.props.userid || arr.includes(data.from)){
                this.props.incUnseenPost()
            }
        })

        // socket runs when logged user's delete any friend request
        this.state.socket.on("deletedRequest",data=>{this.props.getRequest(this.props.userid)})

        // socket runs when logged user gets any friend request
        this.state.socket.on("requestCreated",data=>{
            if(data.to===this.props.userid){
                this.props.getRequest(this.props.userid)
            }})

            // socket runs on successful connection to server
        this.state.socket.on('connect',()=>{
            websocket.connect(
                this.state.socket,
                this.props.setSocket,
                this.props.userid,
                this.props.getFriend
            )
        })

        // socket runs when logged user's friend request is accepted by another peer
        this.state.socket.on("requestAccepted",data=>{
            websocket.requestAccepted(
                data,this.props.userid,
                this.props.getRequest,
                this.props.getFriend
            )
        })
        
        // socket runs when new chat comes
        this.state.socket.on("chat",data=>{
            websocket.chat(data,
                this.state.socket,
                this.props.location.pathname,
                this.props.curChat,
                this.props.userid,
                this.props.setOnlineChat,
                this.props.messages
                )
        })
    }
    
    render() {
        let chats=0;
        if(this.props.messages.lenght!==0){
            chats = this.props.messages.filter(
                chat=>chat.unread==='true' && chat.to===this.props.userid)
        }
        return (
<div className="true" style={{minWidth:"600px"}}>
    <nav className="navbar navbar-dark navbar-expand pt-0 pb-0">
    <Link className="navbar-brand logo" to='/'>
        <FacebookIcon style={{color:"white",fontSize:'40px', marginTop:"-8px"}} />
    </Link>
    <div className='col-5 p-0'>
        <form className='form form-inline searchform rounded col-12 p-0'>
            <DebounceInput
            className='form-control border-0 col-11 pt-0 rounded-0'
            placeholder="search"
            minLength={1}
            ref='searchInput'
            debounceTimeout={1000}
            onChange={e => this.props.searchFriend(e.target.value)} />
            <button type="submit" className="btn btn-light text-secondary border-0 form-control col-1 m-0 rounded-0">
                <i className="fa fa-search"></i>
            </button>
        </form>
        <div 
        className='col-11 p-0 shadow rounded-bottom text-center justify-content-center bg-light' style={{position:"absolute",zIndex:"100",overflow:"hidden"}}>
        {
        this.props.searchResult!==null?this.props.searchResult.map(e=>{
            let friend = false
            let check = this.props.friendId.find(d=>d===e._id)
            if(check!==undefined){friend=true}
            if(e._id!==this.props.userid){
                return (
                    <div key={Math.random()} 
                    className="card bg-light text-dark text-center rounded-0 col-12 pl-4 pr-2">
                        <div className="card-body p-2 row justify-content-between col-12">
                            <p className='d-inline'>{`${e.firstname} ${e.lastname}`}</p>
                            <div className='row btn-group'>
                            {friend===false?<button 
                            className='btn btn-success btn-sm' 
                            onClick={()=>{
                                    this.props.sendRequest()
                                    this.props.socket.emit("friendRequest",{
                                    to:e._id,
                                    from:this.props.userid,
                                    time:(new Date()).toLocaleString})
                                }
                            }
                            >Send request</button>:null
                            }
                            <Link to='/profile'
                            className='btn btn-danger btn-sm'
                            onClick={()=>{
                                this.props.delProfile()
                                this.props.getProfile(e._id)
                            }} 
                            >Visit profile</Link>
                            </div>
                        </div>
                    </div>)
            }else{return null}
        }):null}
        </div>
        </div>
    <ul className="navbar-nav col-6 ml-2">
        <Link to='/profile' 
        className="nav-item col-3 p-0 d-flex" 
        title='profile' data-toggle="tooltip" onClick={()=>{
            this.props.delProfile()
            this.props.getProfile(this.props.userid)}}>
            <div className="col-4 p-1">
                <img 
                src={this.props.profilePic} alt="someimg" 
                className="rounded-circle p-0" 
                style={{width:"35px",height:"35px"}}/>
            </div>
            <div className="col-10 p-0">
                <p className="nav-link text-light" href="/g">
                    { this.props.username }
                </p>
            </div>
        </Link>
        <li 
        className="nav-item p-1 rounded navitem text-center" 
        title='friend request' data-toggle="tooltip">
            {
                this.props.friendRequest.length===0?null:
                <Badge data={this.props.friendRequest.length}/>
            }
            <Link to='/friends' className="nav-link active">
                <FontAwesomeIcon icon={faUsers} className='icon' />
            </Link>
        </li>
        <li 
        className="nav-item p-1 rounded navitem text-center" 
        title='messages' data-toggle="tooltip">
        {chats.length===0?null:<Badge data={chats.length}/>}
            <Link to='/messages' className="nav-link active">
                <Icon  name='facebook messenger' style={{fontSize:"20px",marginTop:"-8px"}} />
            </Link>
        </li>
        <li 
        className="nav-item p-1 rounded navitem text-center justify-content-center" 
        title='notification' data-toggle="tooltip">
        {this.props.unseenpost!==0?
            <Badge data={this.props.unseenpost}/>
        :null}
        
        <button className="nav-link active btn m-auto" onClick={()=>{
            this.props.getPost({userid:this.props.userid,page:this.props.pageid})
            this.props.delUnseenPost()
        }}>
            <FontAwesomeIcon icon={faBell} className='icon' />
        </button>
        </li>
        <li className="nav-item p-1 rounded navitem text-center" title='logout' data-toggle="tooltip">
            <button className="nav-link active btn" onClick={this.logout}>
                <FontAwesomeIcon icon={faPowerOff} className='icon' />
            </button>
        </li>
    </ul>
    </nav>
</div>)
    }
}
export default withState(withRouter(Nav))