import React from 'react';
import {IndexRoute, Route, indexRoute} from 'react-router';
import Room from './Room';
import Prehome from '../components/Prehome';
import SideNav from '../containers/SideNav';
import Signup from '../components/Signup';
import Login from '../components/Login';

export default(
  <div>
    <Route path="/" component={SideNav} >
      <IndexRoute component={Prehome}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
      <Route path= "rooms/:roomId" component = {Room}/>
    </Route>
  </div>
)
