import React from 'react';
import './App.css';
import Nav from './comp1/Nav'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Trending from './comp1/Trending'
import Home from './comp1/Home'
import Search from './comp1/Search'
import PlayerPage from './comp1/PlayerPage'



function App() {
  return (
    <Router>
    <div>
      <Nav/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/trending' component={Trending}/>
        <Route exact path='/search/:q' component={Search}/>
        <Route path='/player/:videoId' component={PlayerPage}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
