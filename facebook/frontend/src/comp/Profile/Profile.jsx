import React, { PureComponent } from "react";
 import ButtonA  from "antd/lib/button/button";
// import PhotoIcon from "@material-ui/icons/Photo";
// import { makeStyles } from "@material-ui/core/styles";
import {withRouter} from 'react-router-dom'
import Fab from "@material-ui/core/Fab";
import Modal from "react-modal";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import withState from "../hoc/withState";
import SaveIcon from "@material-ui/icons/Save";
import "semantic-ui-css/semantic.min.css";
import SecondColumn from '../home/SecondColumn'
import {baseurl} from '../../redux/action/action'
import {
  Segment,
  // Header,
  Icon,
  // Statistic,
  // Label,
  TextArea,
  Form,
  Dropdown,
   Button

} from "semantic-ui-react";
import "./style.css";
import Axios from "axios";
const { State, Relationship, Language, Education } = require("./data");
class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      profileimageModel: false,
      file: null,
      cover: null,
      coverImageModal: false,
      show: false,
      language:"NA",
      bio:"NA",
      education:"NA",
      city:"NA",
      status:"NA",
      postImg:[],
      profilePic:'',
      coverImg:''
    };
  }
  handleSave = (e)=>{
    e.preventDefault()
    let {language,bio,city,status,education} =this.state
    let BIO = {
      city,
      bio,
      language,
      relationship :status,
      education
    }
    this.props.socket.emit("updateBio", {
      data: BIO,
      userid: this.props.userid,
    });
    setTimeout(()=>{this.setState({show:false})},2000)

  }
  handleDisplay = (e) => {
    e.preventDefault();
    this.setState({ show: !this.state.show });
  };
  handleCover = (e) => {
    e.preventDefault();
    this.setState({ coverImageModal: true });
  };
  handleEducation   =(e)=>{
    this.setState({education:e.target.textContent})


  }
  handleState   =(e)=>{
    this.setState({city:e.target.textContent})

  }
  handleStatus   =(e)=>{
    this.setState({status:e.target.textContent})

  }
  handleLanguage   =(e)=>{
    this.setState({language:e.target.textContent})

  }
  handleBio   =(e)=>{
    this.setState({bio:e.target.value})

  }
  getPostImage = (arr)=>{
    Axios.post(`${baseurl}/getpostimg`,{arr})
    .then(({data})=>{
      let post = []
      data.post.forEach(item=>item.data.arr.forEach(ele=>post.push(ele.data)))
      this.setState({postImg:post})
    })
  }

  componentDidUpdate(preProps){
    if(this.props.userdata===null){
      this.props.history.push("/")
    }
    if(preProps.userdata!==this.props.userdata && this.props.userdata!==null){
      this.setState({
        profilePic:this.props.userdata.profilePic,
        coverImg:this.props.userdata.coverImg
      })
      this.getPostImage(this.props.userdata.post)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.socket.emit("uploadProfile", {
      data: this.state.file,
      userid: this.props.userid,
    });
    setTimeout(() => {
      this.setState({ profileimageModel: false });
    }, 3000);
  };
  handleSubmit1 = (e) => {
    e.preventDefault();
    this.props.socket.emit("uploadCover", {
      data: this.state.cover,
      userid: this.props.userid,
    });
    setTimeout(() => {
      this.setState({ coverImageModal: false });
    }, 3000);
  };
  handleChangeFile = (event) => {
    const file = event.target.files[0];
    const data = {
      id: Math.random(),
      type: file.type,
      name: file.name,
      data: file,
    };
    this.setState({ file: data });
  };
  handleChangeFile1 = (event) => {
    const file = event.target.files[0];
    const data = {
      id: Math.random(),
      type: file.type,
      name: file.name,
      data: file,
    };
    this.setState({ cover: data });
  };

  handleFileUpload = (e) => {
    alert("file upload done");
  };
  render() { 
  if(this.props.userdata !== null){
    var {language,bio,city,relationship,education
      ,profilePic,coverImg,firstname,lastname
    } = this.props.userdata
   } 
    return (
      <>
        <div className="container row col-12 m-auto pt-0">
          <div className="col-9 row m-auto">
            <div style={{ height: "30vh" }} className="row col-12">
              <div
                className="col-12"
                style={{
                  height: "80%",
                  backgroundImage: `url(${coverImg})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize:"cover",
                  backgroundPosition:"center"
                }}
              >
                <Button style={{ marginLeft: "35rem", marginTop: "7rem" }}>
                  TimeLine
                </Button>
                <Button>TimeLine</Button>
                <div
                  style={{
                    marginTop: "-8rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {" "}
                  <div className="">
                    {this.props.userdata!==null && this.props.userdata._id===this.props.userid?
                    <ButtonA
                    style={{
                      marginTop: "0rem",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    onClick={this.handleCover}
                  >
                    Upload Cover
                  </ButtonA>:null}
                  </div>
                  <div style={{ marginTop: "-2.5rem" }}>
                    {" "}
                    <img
                      style={{
                        border: "white 4px solid",
                        zIndex: 2,
                        height: "10rem",
                        width: "10rem",
                      }}
                      src={profilePic}
                      className=" mt-5  rounded-circle"
                      alt="somthingBeautiful"
                    />
                    {this.props.userdata!==null && this.props.userdata._id===this.props.userid?
                    <Fab
                    onClick={() => {
                      this.setState({ profileimageModel: true });
                    }}
                    color="secondary"
                    aria-label="edit"
                    style={{
                      outline: "none",
                      marginTop: "8rem !important",
                      marginLeft: "-3.5rem",
                    }}
                  >
                    <EditIcon />
                  </Fab>:null}
                    
                  </div>
                </div>
              </div>
              <div
                className="col-12 mt-3 "
                style={{
                  color: "blue",
                  marginLeft: "15rem",
                  zIndex: -1,
                  height: "20%",
                  backgroundColor: "rgb(255, 255, 255)",
                }}
              >
                <Button style={{ color: "blue" }}>TimeLine</Button>
                <Button style={{ color: "blue" }}>Activity</Button>
                <Button style={{ color: "blue" }}>Friends</Button>
                <Button style={{ color: "blue" }}>Photos</Button>
                <Button style={{ color: "blue" }}> Archieves</Button>
                <Button style={{ color: "blue" }}>More...</Button>
              </div>
              <hr className="col-12 pl-0 " style={{ marginTop: "-0.1rem" }} />
            </div>
            <h1 className='text-center m-0 pt-5'>
              {firstname!==undefined && lastname!==undefined?(firstname+' '+lastname):null}
            </h1>
            <div 
            className='row m-auto col-12 text-center p-0  justify-content-center' style={{marginTop:"30px"}}>
            <div className="col-5 full p-0">
            <div className="col-12 bg-light mb-2 rounded hid text-left p-0 pt-2">
                {this.props.userdata!==null?
                this.props.userid===this.props.userdata._id?
                <Icon name="edit" onClick={this.handleDisplay} />:null:null}
                <div className="row col-12 m-auto">
                  <div className="col-6">
                    <p className="mb-4">City:</p>
                    <p className="mb-4">Status:</p>
                    <p className="mb-4">Education:</p>
                    <p className="mb-4">Language:</p>
                    <p className="mb-4">Bio:</p>
                  </div>
                  <div className="col-6">
                    {" "}
                    <div>
                      <div className="mb-4">
                      <p>{city}</p>
                        <Dropdown
                          style={{
                            display: this.state.show ? "block" : "none",
                            marginLeft: "-4rem",
                          }}
                          placeholder="City"
                          search
                          selection
                          options={State}
                          onChange={this.handleState}
                        />
                      </div>
                      <div className="mb-4">
                      <p>{relationship}</p>
                        <Dropdown
                          style={{
                            display: this.state.show ? "block" : "none",
                            marginLeft: "-4rem",
                          }}
                          placeholder="Status"
                          search
                          onChange={this.handleStatus}
                          selection
                          options={Relationship}
                        />
                      </div>
                      <div className="mb-4">
                      <p>{education}</p>
                        <Dropdown
                          style={{
                            display: this.state.show ? "block" : "none",
                            marginLeft: "-4rem",
                          }}
                          placeholder="Education"
                          search
                          selection
                          options={Education}
                          onChange={this.handleEducation}

                        />
                      </div>
                      <div className="mb-4">
                      <p>{language}</p>
                        <Dropdown
                          style={{
                            display: this.state.show ? "block" : "none",
                            marginLeft: "-4rem",
                          }}
                          placeholder="Language"
                          search
                          selection
                          options={Language}
                          onChange={this.handleLanguage}
                        />
                      </div>
                      <div className="mb-4">
                      <p>{bio}</p>
                        <TextArea
                          style={{
                            display: this.state.show ? "block" : "none",
                            marginLeft: "-4rem",
                          }}
                          placeholder="enter your bio"
                          onChange={this.handleBio}
                          value={this.state.bio}
                          name="name"
                        />
                      </div>
                      <Button
                inverted
                color="green"
                onClick={this.handleSave}
                style={{
                  
                  width: "7rem",
                  height: "3rem",
                  outline: "none",
                  display: this.state.show ? "block" : "none",
                }}
              >
                <SaveIcon />
                Save
              </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 row bg-light mb-2 rounded p-0 text-center"
                style={{ height: "auto" }}
              >
                {this.state.postImg!==null?this.state.postImg.map(item=>
                <img key={Math.random()} className="col-5 border-1 p-0 m-1" src={item} alt="dp2" />):null}
              </div>
            </div>

            <div className='col-7 p-0 text-left'>
              {
                this.props.userdata!==null?
                <SecondColumn/>
                :null
              }
            </div>
            </div>
          </div>
        </div>
        <Modal
          className="Modal"
          isOpen={this.state.profileimageModel}
        >
          <Segment placeholder className="row">
            <button
              style={{
                background: "transparent",
                width: "inherit",
                outline: "none",
                border: "none",
              }}
              onClick={() => {
                this.setState({ profileimageModel: false });
              }}
            >
              <CloseIcon
                style={{ marginLeft: "500px", marginTop: "-5rem", zIndex: "2" }}
              />{" "}
            </button>
            <div
              id="nobox"
              className="col-12 mb-5 "
              style={{ marginLeft: "35%" }}
            >
              {" "}
              Uplaod Your Profile Picture
            </div>
            <div id="nobox" className="col-12 ">
              {" "}
              <Form.Field>
                <input
                  type="file"
                  onChange={this.handleChangeFile}
                  className="mb-5"
                />
                <Button type="submit" onClick={this.handleSubmit}>
                  Upload
                </Button>
              </Form.Field>
            </div>
          </Segment>
        </Modal>
        <Modal
          className="Modal"
          isOpen={this.state.coverImageModal}
        >
          <Segment placeholder className="row">
            <button
              style={{
                background: "transparent",
                width: "inherit",
                outline: "none",
                border: "none",
              }}
              onClick={() => {
                this.setState({ coverImageModal: false });
              }}
            >
              <CloseIcon
                style={{ marginLeft: "500px", marginTop: "-5rem", zIndex: "2" }}
              />{" "}
            </button>
            <div
              id="nobox"
              className="col-12 mb-5 "
              style={{ marginLeft: "35%" }}
            >
              {" "}
              Uplaod Your cover Picture
            </div>
            <div id="nobox" className="col-12 ">
              {" "}
              <Form.Field>
                <input
                  type="file"
                  onChange={this.handleChangeFile1}
                  className="mb-5"
                />
                <Button type="submit" onClick={this.handleSubmit1}>
                  Upload
                </Button>
              </Form.Field>
            </div>
          </Segment>
        </Modal>
      </>
    );
  }
}

export default withState(withRouter(Profile));
