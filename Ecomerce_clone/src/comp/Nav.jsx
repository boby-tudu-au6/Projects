import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../redux/action/action'

class Nav extends Component {
    render() {
        const {isLogged} = this.props.userState
        return (
            <div>
                <nav className='navbar navbar-expand-sm navbar-dark bg-dark justify-content-between'>
                    <Link className='navbar-brand' to='/'>Shoesie</Link>
            {isLogged ? <ul className='navbar-nav'>
                <li className='nav-item'><Link className='nav-link active' to='/'>Home</Link></li>
                <li className='nav-item'>
                    <Link className="btn btn-outline-light rounded-0" to='/' onClick={this.logout}>Logout</Link>
                </li>
                <li className='nav-item'>
                <Link className="btn btn-light rounded-0" to='/cart'>Cart</Link>
                </li>
            </ul>:<ul className='navbar-nav'>
                <li className='nav-item'><Link className='nav-link active' to='/'>Home</Link></li>
                <li className='nav-item'>
                    <Link className="btn btn-outline-light rounded-0" to='/login'>Login</Link>
                </li>
                <li className='nav-item'>
                <Link className="btn btn-light rounded-0" to='/register'>Register</Link>
                </li>
            </ul>}
                </nav>
            </div>
        )
    }
    logout = ()=>{
        this.props.logout()
    }
}

const mapStateToProps = state =>{return {...state}}
const mapDispatchToProps = dispatch=>{
    return {
        logout:()=>{dispatch(logout())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav)