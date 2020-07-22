import React, { Component } from 'react'

export default class Input extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div className='col-8 m-auto'>
                <input type={this.props.type} className='form-control mb-3 roundInput pl-4' name={this.props.name} value={this.props.value} onChange={this.props.handleChange} placeholder={this.props.placeholder} required/>
            </div>
        )
    }
}
