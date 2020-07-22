import React from 'react';
import './App.css';
import Nav from './comp/Nav'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Login from './comp/Login'
import Register from './comp/Register'
import Home from './comp/Home'
import Cart from './comp/Cart'


function App() {
  return (
    <Router>
    <div>
      <Nav/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/cart' component={Cart}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
