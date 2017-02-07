import React, { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import {Router, browserHistory} from 'react-router';
import Routes from './Routes';
import ReduxToastr from 'react-redux-toastr';
import configureStore from '../store/configureStore';


const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} routes={Routes}/>
          <ReduxToastr
            timeOut={4000}
            preventDuplicates={true}
            position="bottom-right"
            />
        </div>
      </Provider>
    );
  }
}
