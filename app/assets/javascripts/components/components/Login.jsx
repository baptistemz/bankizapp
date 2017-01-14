import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loginUser} from '../actions/index';
import {Link} from 'react-router';

class Login extends Component {
  onFormSubmit(event){
    event.preventDefault()
    const email = this.refs.email
    const password = this.refs.password
    const creds = { email: email.value.trim(), password: password.value.trim() }
    this.props.loginUser(creds)
  }
  render() {
    const { errorMessage } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="vertical-align-container">
            <div className="col s12 l10 offset-l1">
              <div className="nice-container">
                <h4 className="text-center">Log in</h4>
                <br/>
                <div className="row">
                  <form onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="input-field">
                      <i className="material-icons prefix">email</i>
                      <input id="icon_email" ref="email" type="email" className="validate"/>
                      <label htmlFor="icon_email">Email</label>
                    </div>
                    <div className="input-field">
                      <i className="material-icons prefix">lock_outline</i>
                      <input id="icon_password" ref="password" type="password" className="validate"/>
                      <label htmlFor="icon_password">Password</label>
                    </div>
                    <button type="submit" className="btn full-width">Submit</button>
                  </form>
                  {errorMessage &&
                    <p>{errorMessage}</p>
                  }
                </div>
              </div>
              <div className="text-center margin-top-20">
                <Link to={'/signup'}>No account yet ? Create one !</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({loginUser}, dispatch);
}

export default connect(null,mapDispatchToProps)(Login)
