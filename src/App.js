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
import { Redirect } from 'react-router-dom';
import { UserContext } from './hooks/UserContext';
import useFindUser from './hooks/useFindUser';
import PrivateRoute from './components/PrivateRoute';
import { Plaid } from './Plaid';
/*
function queryForSongs(e) {
  return <Redirect to='/login' />
}
*/

function App() {

  const {user, setUser, isLoading} = useFindUser();

  return (
    <div>
        <Router>
          <UserContext.Provider value={{ user, setUser, isLoading }}>
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
                <PrivateRoute path="/home2" component={Home}/>
                <Route path='/bank'>
                  <Plaid />
                </Route>
              </Switch>
            </div>
            </UserContext.Provider>
        </Router>
    </div>
  );
}

export default withStore(App);
