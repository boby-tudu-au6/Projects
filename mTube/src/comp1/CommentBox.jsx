import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getReply} from '../redux/actions/action'

class CommentBox extends Component {
    componentDidMount(){
        // this.props.getReply({id:this.props.id})
        // console.log(this.props.id,'-',this.props.textOriginal)
    }
    componentDidUpdate(){
        // console.log(this.props)
        // console.log(this.props.reply)
    }
    render() {
        const {textOriginal} = this.props
        let commentText = ''
        if(textOriginal.length >20){
            commentText = textOriginal.slice(0,20)+"..."
        }else{
            commentText = textOriginal
        }
        const id = "#"+this.props.id
        return (
<div className="comment_box p-2 rounded">
    <div className="row col-12">
        <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="img" className="rounded-circle" width="45px"/>
        <p className="text-secondary ml-3 pt-2">
            {commentText}
        </p>
    </div>
    <div className="reply_box pl-2">
        {/* <button data-toggle="collapse" data-target={id} className="btn btn-outline-secondary btn-sm ml-5">Reply</button>

        <div id={this.props.id} className="collapse ml-5">
        Lorem ipsum dolor text....
        </div>  */}
    </div>
</div>
        )
    }
}

const mapStateToProps = state =>{return{...state}}
const mapDispatchToProps = dispatch =>{
    return {
        getReply:(payload)=>dispatch(getReply(payload))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CommentBox)
