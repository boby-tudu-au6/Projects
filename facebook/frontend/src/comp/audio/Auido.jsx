import React, { useEffect,  useRef } from 'react';
import {connect} from 'react-redux';
import Peer from "simple-peer";
import styled from "styled-components";
import {delChatId,closeMedia} from '../../redux/action/action'
import { useStateIfMounted } from "use-state-if-mounted";
import { 
  faPhone,
  faPhoneSlash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  height: auto;
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
`;

const Video = styled.video`
  
`;
function Audioapp(props){
  const [yourID, setYourID] = useStateIfMounted("");
  const [users, setUsers] = useStateIfMounted({});
  const [stream, setStream] = useStateIfMounted();
  const [receivingCall, setReceivingCall] = useStateIfMounted(false);
  const [caller, setCaller] = useStateIfMounted("");
  const [callerSignal, setCallerSignal] = useStateIfMounted();
  const [socketid, setSocket] = useStateIfMounted('');
  const [callAccepted, setCallAccepted] = useStateIfMounted(false)

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = props.socket
    try{
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      })
    }catch(err){
      console.log("audio not found")
      console.log(err.message)
    }

    if(socket.current!==null){
      
        socket.current.on("audio_yourID", (id) => {
            setYourID(id);
          })
          socket.current.on("audio_allUsers", ({users}) => {
            setUsers(users);
          })
          socket.current.on("useroffline",({userid})=>{
            setCallAccepted(false)
            setCaller("")
            setCallerSignal(null)
            setReceivingCall(false)
          })
      
          socket.current.on("audio_hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
          })
          
          if(props.curChat.socketid!==''){
            setSocket(props.curChat.socketid)
          }
    }
  }, [props.socket,users,props.curChat,setCallAccepted, setCaller, setCallerSignal, setReceivingCall, setSocket, setStream, setUsers, setYourID]);


  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {

        iceServers: [
            {
                urls: "stun:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683"
            },
            {
                urls: "turn:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683"
            }
        ]
    },
      stream: stream,
    });

    peer.on("signal", data => {
      socket.current.emit("audio_callUser", { userToCall: id, signalData: data, from: yourID })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("audio_callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.current.emit("audio_acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.on("close",()=>{
      props.delChatId()
      setCallAccepted(false)
    })

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <div>
        <Video className='col-3 d-none' playsInline muted ref={userVideo} autoPlay />
      </div> 
    );
  }
  let btnclass = 'btn rounded-circle btn-success'
  let onclickfunc = ()=>callPeer(props.curChat.socketid)
  let incomingCall=null;
  if (receivingCall===true && callAccepted===false) {
    btnclass = `${btnclass} box bounce-1`
    onclickfunc = acceptCall
  }
  let PartnerVideo=<div style={{
      position:"absolute",
      left:"0px",
      width:"600px",
      height:"350px",
      backgroundColor:"black"
    }}>
    {socketid!==''?<button className={btnclass}
    style={{marginTop:"300px"}} onClick={onclickfunc}>
      <FontAwesomeIcon icon={faPhone} className='icon' />
      </button>:null}
  </div>;
  if (callAccepted===true) {
    PartnerVideo = (
      <div style={{
        position:"absolute",
        left:"0px",
        width:"600px",
        height:"350px",
        backgroundColor:"black"
      }}>
        <Video className='remoteVideo' playsInline ref={partnerVideo} autoPlay />
        <div className='controls row col-12 justify-content-center m-auto'>
          <button className='btn btn-danger rounded-circle m-auto'
          onClick={()=>{
            props.socket.emit("leaveroom",{room:props.curChat.room})
            props.delChatId(props.userid)
            }}>
            <FontAwesomeIcon icon={faPhoneSlash} className='icon' />
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <Container>
      <Row>
      <button 
        className='btn btn-danger'
        style={{
          position:"absolute",
          right:"10px",
          top:'0px',
          padding:'10px',
          paddingRight:"15px",
          paddingLeft:"15px",
          borderRadius:"7px"
        }}
        onClick={()=>{
          props.closeMedia()
          props.socket.emit("leaveroom",{room:props.curChat.room})
          props.delChatId(props.userid)
          }}>X</button>
        {UserVideo}
        {PartnerVideo}
      </Row>
      <Row>
        {callAccepted===false && receivingCall===false?Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          if(key === props.curChat.socketid){
            return (
              <button key={Math.random()} onClick={() => callPeer(key)}>Call {key}</button>
            );
          }
          return null
        }):null}
      </Row>
      <Row>
        {incomingCall}
      </Row>
    </Container>
  );
}
const mapStateToProps = state=>{return {...state}}
const mapDispatchToProps = dispatch =>{
  return {
    delChatId:payload=>dispatch(delChatId(payload)),
    closeMedia:()=>dispatch(closeMedia())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Audioapp)
