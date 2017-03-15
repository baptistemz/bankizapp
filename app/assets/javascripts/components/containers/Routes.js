import React from 'react';
import {IndexRoute, Route, indexRoute} from 'react-router';
import RoomHeader from './RoomHeader';
import RoomList from '../components/RoomList';
import Prehome from '../components/Prehome';
import SideNav from './SideNav';
import SoundMixer from './SoundMixer';
import SearchGroup from './SearchGroup';
import Signup from '../components/Signup';
import Login from '../components/Login';

export default(
  <div>
    <Route path="/" component={SideNav} >
      <IndexRoute component={Prehome}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/login" component={Login}/>
      <Route path= "/rooms/:roomId" component = {RoomHeader}>
        <Route path="search" component={SearchGroup}/>
      </Route>
      <Route path= "/rooms" component = {RoomList}/>
    </Route>
  </div>
)
