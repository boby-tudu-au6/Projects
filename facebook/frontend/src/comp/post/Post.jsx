import React, { Component } from 'react'
import './post.css'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';


export class Post extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             files:null,
             open:false
        }
    }
    handleChange = (event) => {
        // this.setState({file:event.target.files});
        console.log(event.target.files)
    };
    handleClose=()=> {
        this.setState({
            open: false
        });
        console.log(this.state.files)
    }
 
    handleSave=(files) =>{
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
        this.handleClose()
    }
 
    handleOpen=()=> {
        this.setState({
            open: true,
        });
    }
    handleSubmit = async (e) => { 
        e.preventDefault();
        console.log(this.state.files)
        // const formData = new FormData(); 
        // formData.append( 
        //     "uploadImage", 
        //     this.state.file, 
        //     this.state.file.name 
        // )
        // const {data} = await Axios.post(`http://localhost:8080/post`, formData)
        // console.log(data)
    }; 
    
    render() {
        return (
            <div className='m-auto text-center'>
                <form onSubmit={this.handleSubmit} className='form shadow p-5 col-7 m-auto rounded bg-light' 
                onDragOver={this.handleOpen}
                onDrop={this.handleClose}
                onDragLeave={this.handleSave}>
                    <label className='mr-3'>Public upload hello</label>
                  <input type="file" onChange={this.handleChange}  multiple/>
                  
                  <button className='btn btn-primary' type="submit">submit</button>
                  {/* <Button onClick={this.handleOpen.bind(this)}>
                  Add Image
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/*']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                /> */}
                </form>
            </div>
        )
    }
}

export default Post
