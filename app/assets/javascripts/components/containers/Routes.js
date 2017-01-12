import React from 'react';
import {IndexRoute, Route, indexRoute} from 'react-router';
import Room from './Room';
import Prehome from '../components/Prehome';
import SideNav from '../containers/SideNav'

export default(
  <div>
    <Route path="/" component={SideNav}>
      <IndexRoute component={Prehome}/>
      // <Route path="/" component={Prehome}/>
      <Route path= "rooms/:roomId" component = {Room}/>
    </Route>
  </div>
)
