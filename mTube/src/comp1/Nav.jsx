import React, { Component } from 'react'
import {GoogleLogin,GoogleLogout} from 'react-google-login'
import {cred} from './testApi'
import {connect} from 'react-redux'
import {getTrending,getSearch} from '../redux/actions/action'
import {Link,withRouter} from 'react-router-dom'
import SideNav from './SideNav'

class Nav extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             imageUrl:'https://www.w3schools.com/bootstrap4/img_avatar3.png',
             obj:''
        }
    }
    
    
    responseGoogle = (res)=>{
        const {profileObj} = res
        this.setState({imageUrl:profileObj.imageUrl,obj:res})
    }

    logout = (res)=>{
        alert("logout successfull")
        this.setState({
            imageUrl:'https://www.w3schools.com/bootstrap4/img_avatar3.png',
            obj:''
        })
    }

    handleSearch = (e) =>{
        e.preventDefault()
        const {search} = e.target
        console.log(this.props)
        this.props.history.push(`/search/${search.value}`)
    }
    render() {
        return (
            <nav className="navbar col-12 navbar-light navbar-expand-sm white justify-content-between pt-2 pb-2 pl-5 ml-auto fixed-top">
        <div className="sidebar fixed-top pt-3 text-right">
            <Link to='/' className="ml-2 mr-4 text-secondary">
                <i className="fa fa-bars" style={{fontSize:"20px"}}></i>
            </Link>
            {/* here sidenav */}
            <SideNav/>
        </div>
        <Link to='/' className="navbar-brand ml-3">
            <i className="fa fa-youtube-play text-danger"></i>
            <p className="d-inline logo ml-2">YouTube</p>
        </Link>
        <form className='form form-inline col-6 m-auto p-0 border' onSubmit={this.handleSearch}>
            <input type="text" name="search" placeholder="Search" className="form-control-sm col-10 rounded-right border-0"/>
            <button className="btn btn-light col-2 text-secondary form-control-sm btn-sm"><i className="fa fa-search"></i></button>
        </form>
        <ul className="navbar-nav col-2 text-right justify-content-right">
            <li className="nav-item ml-auto col-4">
                <a href="#fdg" className="nav-link">
                    <i className="fa fa-video-camera"></i>
                </a>
            </li>
            <li className="nav-item ml-auto col-4">
                <a href="#dfg" className="nav-link">
                    <i className="fa fa-th"></i>
                </a>
            </li>
            <li className="nav-item col-4 p-0">
                <Link to='/' className="nav-link p-0 text-center pt-1">
                    {this.state.obj === ''?
                    <GoogleLogin
                    clientId={cred.client_id}
                    render={renderProps=><img src={this.state.imageUrl} alt="img" className="p-0 m-0 col-6 rounded-circle profile_circle" onClick={renderProps.onClick}/>}
                    buttonText="Login"
                    onSuccess={this.responseGoogle} 
                    onFailure={this.responseGoogle}
                    isSignedIn={true}
                    scope='https://www.googleapis.com/auth/youtube'
                    />:
                    <GoogleLogout
                    clientId={cred.client_id}
                    render={renderProps=><img src={this.state.imageUrl} alt="img" className="p-0 m-0 col-6 rounded-circle profile_circle" onClick={renderProps.onClick}/>}
                    onLogoutSuccess={this.logout}
                  >
                  </GoogleLogout>}
                
                    
                </Link>
            </li>
        </ul>
    </nav>
        )
    }

}
const mapStateToProps = state=>{return {...state}}
const mapDispatchToProps = dispatch=>{
    return {
        getTrending:()=>dispatch(getTrending()),
        getSearch:(payload)=>dispatch(getSearch(payload))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Nav))
