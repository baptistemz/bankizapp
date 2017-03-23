import React, { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import {Router, browserHistory} from 'react-router';
import Routes from './Routes';
import ReduxToastr from 'react-redux-toastr';
import configureStore from '../store/configureStore';
import ReactGA from 'react-ga';


const store = configureStore();
// ReactGA.initialize('UA-000000-01');

export default class Root extends Component {
  render() {
    if(process.env.NODE_ENV = "production"){
      console.log('dotenv', process.env)
    }
    console.log('process', process)
    function fireTracking() {
      console.log('fire')
      // ReactGA.pageview(window.location.pathname);
    }

    return (
      <Provider store={store}>
        <div>
          <Router onUpdate={fireTracking} history={browserHistory} routes={Routes}/>
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
