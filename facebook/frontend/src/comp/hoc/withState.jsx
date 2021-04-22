// import React from 'react'
// import {connect} from 'react-redux'
// import { getFriend, setChat, logout, searchFriend, setSocket, getRequest, updateRequest, sendRequest, setOnlineChat, delChatId, checkLogin, startVideo,getPost, incUnseenPost, delUnseenPost, setFile, setFileSrc, delFiles, delFileItem,setPageId, disSetChat,getProfile, delProfile, closeMedia } from '../../redux/action/action'

// function withState(Component) {
//     const mapStateToProps = state =>{return {...state}}
//     const mapDispatchToProps = dispatch =>{
//         return {
//             getFriend:payload=>dispatch(getFriend(payload)),
//             setChat:payload=>dispatch(setChat(payload)),
//             searchFriend:payload=>dispatch(searchFriend(payload)),
//             setSocket:payload=>dispatch(setSocket(payload)),
//             getRequest:payload=>dispatch(getRequest(payload)),
//             updateRequest:payload=>dispatch(updateRequest(payload)),
//             setOnlineChat:payload=>dispatch(setOnlineChat(payload)),
//             delChatId:payload=>dispatch(delChatId(payload)),
//             getPost:payload=>dispatch(getPost(payload)),
//             setFile:payload=>dispatch(setFile(payload)),
//             setFileSrc:payload=>dispatch(setFileSrc(payload)),
//             delFileItem:payload=>dispatch(delFileItem(payload)),
//             setPageId:payload=>dispatch(setPageId(payload)),
//             getProfile:payload=>dispatch(getProfile(payload)),
//             checkLogin:()=>dispatch(checkLogin()),
//             sendRequest:()=>dispatch(sendRequest()),
//             logout:()=>dispatch(logout()),
//             startVideo:()=>dispatch(startVideo),
//             incUnseenPost:()=>dispatch(incUnseenPost()),
//             delUnseenPost:()=>dispatch(delUnseenPost()),
//             delFiles:()=>dispatch(delFiles()),
//             delProfile:()=>dispatch(delProfile()),
//             disSetChat:()=>dispatch(disSetChat()),
//             closeMedia:()=>dispatch(closeMedia())
//         }
//     }
//     return connect(mapStateToProps,mapDispatchToProps)(
//         class extends React.Component{
//             render(){
//                 return (
//                 <Component
//                     checkLogin={this.props.checkLogin}
//                     startVideo={this.props.startVideo}
//                     messages={this.props.messages}
//                     searchResult={this.props.searchResult}
//                     friendRequest={this.props.friendRequest}
//                     getRequest={this.props.getRequest}
//                     getFriend={this.props.getFriend}
//                     sendRequest={this.props.sendRequest}
//                     logout={this.props.logout}
//                     setChat={this.props.setChat}
//                     searchFriend={this.props.searchFriend}
//                     setSocket={this.props.setSocket}
//                     updateRequest={this.props.updateRequest}
//                     setOnlineChat={this.props.setOnlineChat}
//                     delChatId={this.props.delChatId}
//                     socket={this.props.socket}
//                     userid={this.props.userid}
//                     curChat={this.props.curChat}
//                     username={this.props.username}
//                     loggedIn={this.props.loggedIn}
//                     notification={this.props.notification}
//                     friend={this.props.friend}
//                     friendId={this.props.friendId}
//                     unreadeChat={this.props.unreadeChat}
//                     video={this.props.video}
//                     getPost={this.props.getPost}
//                     post={this.props.post}
//                     unseenpost={this.props.unseenpost}
//                     incUnseenPost={this.props.incUnseenPost}
//                     delUnseenPost={this.props.delUnseenPost}
//                     setFile={this.props.setFile}
//                     setFileSrc={this.props.setFileSrc}
//                     delFiles={this.props.delFiles}
//                     delFileItem={this.props.delFileItem}
//                     file={this.props.file}
//                     filesrc={this.props.filesrc}
//                     setPageId={this.props.setPageId}
//                     pageid={this.props.pageid}
//                     disSetChat={this.props.disSetChat}
//                     delProfile={this.props.delProfile}
//                     getProfile={this.props.getProfile}
//                     userdata={this.props.userdata}
//                     profilePic={this.props.profilePic}
//                     coverImg={this.props.coverImg}
//                     closeMedia={this.props.closeMedia}
//                 />)
//             }
//         }
//     )
// }

// export default withState
