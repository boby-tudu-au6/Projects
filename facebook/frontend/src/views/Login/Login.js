import React, { useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
// import { doLogin, checkLogin, doRegister } from '../../redux/action/action';
import { doLogin, checkLogin, doRegister } from 'actions';
import { baseurl } from '../../redux/action/action';
import TestForgotUser from '../../comp/forgotPassword/TestForgotUser';
import Modal from "react-modal";
import CloseIcon from "@material-ui/icons/Close";
import { TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
    return {
        input: {
            margin: 5,
            background: 'white',
            color: 'black',
            borderRadius: 4,
        },
        empty: {
            color: '#4267B2'
        }
    }
})

function Login(props) {
    const classes = useStyles()
    const [state, setState] = useState({
        firstname:"",
        lastname:'',
        phoneEmail:'',
        password:'',
        login_phoneEmail:'',
        login_password:'',
        birthday:'',
        gender:'',
        modelOpen:false
   });

    const handleLogin = async (e) =>{
        e.preventDefault()
        const {phoneEmail,password} = e.target
        props.doLogin({phoneEmail,password})
    }
    const handleRegister = async(e) => {
        e.preventDefault()
        const {firstname,lastname,birthday,phoneEmail,password,gender} = e.target
        let firstdata = 'phone'
        let secdata = 'email'
        const testdata = phoneEmail.value.search("@")
        if(testdata !==-1){
            firstdata = 'email'
            secdata = 'phone'
        }
        props.doRegister({
            [firstdata]:phoneEmail.value,
            [secdata]:"",
            firstname:firstname.value,
            lastname:lastname.value,
            password:password.value,
            birthday:birthday.value,
            gender:gender.value
        })
    }


    return (
            <>
        <div style={{backgroundColor:"#dfe3ee",height:"100vh"}}>
<nav className="navbar navbar-dark theme navbar-expand-sm justify-content-between">
    <a className="navbar-brand navBrand" href="/">facebook</a>
    <ul className="navbar-nav">
        <li className="nav-item">
        <form className='form form-inline' onSubmit={handleLogin}>
                    <div className="d-block p-0 m-0 pb-4">
                        <p className="p-0 m-0 font_sm text-light">email or phone</p>
                        <input type="text" name="phoneEmail" className="form-control form-control-md pl-3 mr-2" placeholder="email or phone" required/><br/>
                        <p className="p-0 m-0 font_sm"></p>
                    </div>
                    <div className="d-block p-0 m-0">
                        <p className="p-0 m-0 font_sm text-light">password</p>
                        <input type="password" name="password" className="form-control form-control-md pl-3 mr-2" placeholder="password" required/><br/>
                        <p className="m-0 p-0 font_sm text-light" onClick={()=>{
                            setState({ ...state, modelOpen:true })
                        }}>forgot password</p>
                    </div>
                    <button type="submit" className="btn btn-dark btn-md rounded">Login</button>
                </form>
        </li>
    </ul>
</nav>

<div className="col-12 row m-auto">
    <div className="col-7 text-right justify-content-right pt-4" style={{height:"200px"}}>
        <div className="col-9 ml-auto">
            <h5 className="text-left">Facebook helps you connect and share with the people in your life.</h5>
        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/OBaVg52wtTZ.png" alt="img" className="img-fluid"/>
        </div>
    </div>
    <div className="col-3 pt-4">
        <h4>Create an account</h4>
        <p>it's quick and easy</p>
        <form className='form col-12 p-0' onSubmit={handleRegister}>
            <div className="row justify-content-between p-0">
                <div className="pr-1 pl-0 mb-1 col-6">
                    <input type="text" name="firstname" 
                    className="form-control form-control-md col-12" 
                    placeholder="firstname" 
                    title='min 3 char is required'
                    minLength='3' required/>
                </div>
                <div className="pr-1 pl-0 mb-1 col-6">
                    <input type="text" name="lastname" 
                    className="form-control form-control-md col-12" 
                    placeholder="lastname"
                    title='min 3 char is required' minLength='3' required/>
                </div>
                <div className="pr-1 pl-0 mb-1 col-12">
                    <input type="text" name="phoneEmail" 
                    className="form-control form-control-md col-12" 
                    title='min 10 char is required'
                    placeholder="phone or email" minLength='10' required/>
                </div>
                <div className="pr-1 pl-0 mb-1 col-12">
                    <input type="password" name="password" 
                    className="form-control form-control-md col-12" 
                    title='min 3 char is required'
                    placeholder="password" minLength='3'  required/>
                </div>
                <div className="col-12 pr-1 pl-0 mb-1">
                    <input type='date' 
                    className="form-control form-control-md" 
                    id='datetimepicker4' 
                    title='this field is required'
                    placeholder="enter date" name='birthday' required  />
                </div>
                <div className='col-12 pr-1 mb-1 pl-0'>
                    <p>Gender</p>
                    <div className="form-check-inline">
                        <label className="form-check-label">
                        <input type="radio" 
                        className="form-check-input" 
                        title='this field is required'
                        name="gender" value='male' required/>Male
                        </label>
                    </div>
                    <div className="form-check-inline">
                        <label className="form-check-label">
                        <input type="radio" 
                        className="form-check-input" 
                        title='this field is required'
                        value='female' name="gender" required/>Female
                        </label>
                    </div>
                    <div className="form-check-inline disabled">
                        <label className="form-check-label">
                        <input type="radio" 
                        className="form-check-input" 
                        title='this field is required'
                        value='other' name="gender" required/>Other
                        </label>
                    </div>
                </div>
                <button type='submit' className='btn btn-success form-control'>Sign Up</button>
            </div>
        </form>
    </div>
</div>
</div>
    <Modal
    className="Modal"
    isOpen={state.modelOpen}
    ariaHideApp={false}
    >
    <button
    style={{ marginLeft: "630px", marginTop: "-1rem", zIndex: "2" }}
        onClick={() => {
            setState({ ...state, modelOpen:false })
        }}>
        <CloseIcon />{" "}
    </button>
    <TestForgotUser modelOpen={state.modelOpen} />
    </Modal>
    </>
    )
}
const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch =>{
    return {
        doLogin:payload=>dispatch(doLogin(payload)),
        doRegister:payload=>dispatch(doRegister(payload)),
        checkLogin:()=>dispatch(checkLogin())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)
