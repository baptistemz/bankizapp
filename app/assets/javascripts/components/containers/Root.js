import React, { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import {Router, browserHistory} from 'react-router';
import Routes from './Routes';
import configureStore from '../store/configureStore';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={Routes}/>
      </Provider>
    );
  }
}
