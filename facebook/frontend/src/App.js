import React from 'react';
import './App.css';
import Nav from 'components/Navbar'
// import Home from './comp/home/Home'
import {BrowserRouter as Router, Switch,Route,Redirect} from 'react-router-dom'
// import Chat from './comp/friend/Chat';
// import Login from 'comp/login/Login'
import Login from 'views/Login'
import { connect } from 'react-redux';
// import {checkLogin} from './redux/action/action'
import { checkLogin } from 'actions'
// import Profile from './comp/Profile/Profile'
// import Profile from 'views/Profile'

import '../node_modules/antd/dist/antd.css'
// import withState from './comp/hoc/withState';

function App(props) {
  checkLogin()
  return (
    <Router>
    <div className='true' style={{minWidth:"600px"}}>
      {props.username!==null?<Nav/>:<Login/>}
      {/* <Switch>
      <Route exact path='/' component={Home}/>
        <Route exact path='/messages' component={Chat}/>
        {props.userid!==null?
        <Route exact path='/profile' component={Profile}/>:<Redirect to='/'/>}
      </Switch> */}
    </div>
    </Router>
  );
}

const mapStateToProps = state =>{return {...state}}

export default connect(mapStateToProps)((App));
