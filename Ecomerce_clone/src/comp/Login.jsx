import React, { Component } from 'react'
import {Redirect} from 'react-router'
import Input from './Input'
import {connect} from 'react-redux'
import {login} from '../redux/action/action'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'ajabdas999@gmail.com',
             pass:'123'
        }
    }
    
    render() {
        const {email,pass} = this.state
        return (
            <div className='mt-3'>
            {this.props.userState.loggedUser.length !==0 ? <Redirect to='/'/>:null}
                <form className='form p-3 col-6 m-auto shadow text-center justify-content-center' onSubmit={this.formSubmit}>
                    <h2>Login</h2>
                    <Input type='email' name='email' placeholder='Enter email' handleChange={this.handleChange} value={email}/>
                    <Input type='password' name='pass' placeholder='Enter password' handleChange={this.handleChange} value={pass}/>
                    <div className='col-8 m-auto'>
                        <button className=' mt-3 btn btn-primary' type='submit'>LogIn</button>
                    </div>
                </form>
            </div>
        )
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    formSubmit = (e) =>{
        e.preventDefault()
        const {email,pass} = e.target
        this.props.login(email.value,pass.value)
    }
}
const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch=>{
    return {
        login:(email,pass)=>{dispatch(login(email,pass))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)