import React, { Component } from 'react'
import Input from './Input'
import {connect} from 'react-redux'
import {register} from '../redux/action/action'
import {Redirect} from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'boby',
             email:'ajabdas999@gmail.com',
             pass:'123'
        }
    }
    
    render() {
        const {name,email,pass} = this.state
        return (
            <div className='mt-3'>
                <form className='form p-3 col-6 m-auto shadow text-center justify-content-center' onSubmit={this.handleSubmit}>
                    <h2>Register</h2>
                    <Input type='text' name='name' placeholder='Enter name' handleChange={this.handleChange} value={name}/>
                    <Input type='email' name='email' placeholder='Enter email' handleChange={this.handleChange} value={email}/>
                    <Input type='password' name='pass' placeholder='Enter password' handleChange={this.handleChange} value={pass}/>

                    <div className='col-8 m-auto'>
                        <button className=' mt-3 btn btn-primary' type='submit'>Register</button>
                    </div>
                </form>
            </div>
        )
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const {email,name,pass} = e.target
        this.props.register(name.value,email.value,pass.value)
        this.props.history.push('/')
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
}

const mapStateToProps = state =>{
    return {
        user:state
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        register:(name,email,pass)=>{dispatch(register(name,email,pass))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)