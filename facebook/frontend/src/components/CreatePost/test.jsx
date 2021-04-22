import React, { Component } from 'react'
import withState from '../hoc/withState'
import {withRouter} from 'react-router-dom'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CreatePost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             file:[],
             filesrc:[],
        }
    }
    handleOpen = (e)=>{
        e.preventDefault()
        document.querySelector("#file").click()
    }

    // function runs when user try to post something
    handleSubmit = (e) => { 
        e.preventDefault();
        const {message} = e.target
        this.props.socket.emit("newpost",{
            data:this.props.file,
            userid:this.props.userid,
            message:message.value
        })
    }; 
    handleChange = async (e) => {
        let newfile = e.target.files
        Object.keys(newfile).forEach(item=>{
            let id = (Math.random()).toString()
            console.log({id,img:newfile[item]})
            if((newfile[item].type).search("image")!==-1 || (newfile[item].type).search("video")!==-1){
                let fr = new FileReader()
                fr.readAsDataURL(newfile[item])

                fr.onload = () =>{
                    this.props.setFileSrc({
                        id,
                        type:newfile[item].type,
                        data:fr.result})
                    this.props.setFile({
                        id,
                        name:newfile[item].name,
                        type:newfile[item].type,
                        data:newfile[item]})
                }
            }else{
                this.props.delFiles()
                alert('invalid file type')
            }
        })
    }
    componentDidUpdate(){
        if(this.props.filesrc.length!==0)console.log(this.props.filesrc)
        if(this.props.file.length!==0)console.log(this.props.file)
    }
    removeItem = (e) =>{
        this.props.delFileItem(e.target.id)
    }
    render() {
        return (
            <div className="col-12 m-auto bg-light rounded p-0 hid">
                <div className="container-fluid border-bottom lightgray pt-1 rounded-top">
                    <h6>Create post</h6>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="row col-12 pt-2 pl-2 pb-2 bg-light m-auto border-bottom">
                        <div className='col-1 p-0 ml-3'>
                        <img src={this.props.profilePic} 
                        alt="profileImg" 
                        className="rounded-circle" width="40px" height='40px'/>
                        </div>
                        <div className="col-10">
                            <div className='form col-12 row m-auto'>
                                <input type="text" 
                                className='form-control rounded-pill col-10' 
                                placeholder="what's on your mind boby"
                                name='message'/>
                                <input 
                                type="file" 
                                name="image" 
                                id="file" 
                                onChange={this.handleChange} 
                                multiple hidden/>
                                <button className='btn btn-primary rounded-circle ml-auto'
                                type='submit'>
                                    <FontAwesomeIcon 
                                    icon={faPaperPlane} 
                                    style={{fontSize:"15px"}}/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {this.props.filesrc.length!==0?this.props.filesrc.map(img=>(
                        <div key={Math.random()} className="col-12 border-bottom p-0">
                        {img.type!=='video/mp4'?(<>
                        <img className="col-12 m-0 p-0" src={img.data} alt='img'/>
                        <button 
                        className='text-danger pl-3 pt-1 pr-3 pb-2 btn btn-lg btn-light rounded-circle' 
                        style={{position:"absolute",top:"5px",left:"15px",zIndex:'5'}}
                        id={img.id} onClick={this.removeItem}>x</button></>):<><video src={img.data} className="col-12 m-0 p-0" controls></video>
                        <button 
                        className='text-danger pl-3 pt-1 pr-3 pb-2 btn btn-lg btn-light rounded-circle' 
                        style={{position:"absolute",top:"5px",left:"15px",zIndex:'5'}}
                        id={img.id} onClick={this.removeItem}>x</button>
                        </>}
                        </div>
                    )):null}
                    <div className="col-12 row container p-1 m-auto text-center justify-content-center">
                        <button 
                        className='col-4 lightgray btn rounded-pill m-1 filebtn' 
                        onClick={this.handleOpen}>
                        <i className="fa fa-file-image-o text-danger"></i> Image/Video
                        </button>
                        <button className='btn col-4 lightgray rounded-pill m-1'>
                        <i className="fa fa-user-plus text-primary"></i> Tag Friends
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withState(withRouter(CreatePost))
