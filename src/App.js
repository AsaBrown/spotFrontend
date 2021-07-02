import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import { Home } from './Home'
import { Login } from './components/Login';
import { SideBar } from './components/SideBar'
import { withStore} from 'react-context-hook'
// import { Redirect } from 'react-router-dom';
/*
function queryForSongs(e) {
  return <Redirect to='/login' />
}
*/

function App() {
  return (
    <div>
      <Router>
        <SideBar/>
        <div className='mainDiv'>
          <Switch>
            {/* <Route path=''>
              <Redirect to='/home' />
            </Route> */}
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path='/test'>
              {/* {queryForSongs()}; */}
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default withStore(App);
