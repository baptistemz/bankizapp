import React from 'react';
import {IndexRoute, Route, indexRoute} from 'react-router';
import Room from './Room';
import Prehome from '../components/Prehome';

export default(
  <div>
    // <IndexRoute component={Prehome}/>
    <Route path="/" component={Prehome}/>
    <Route path= "rooms/:roomId" component = {Room}/>
  </div>
)
