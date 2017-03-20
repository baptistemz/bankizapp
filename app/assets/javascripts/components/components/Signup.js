import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signupUser} from '../actions/index';
import {Link} from 'react-router';

class Signup extends Component {
  onFormSubmit(event){
    event.preventDefault()
    const username = this.refs.username
    const email = this.refs.email
    const password = this.refs.password
    const password_confirmation = this.refs.password_confirmation
    const creds = { username: username.value.trim(),
                    email: email.value.trim(),
                    password: password.value.trim(),
                    password_confirmation: password_confirmation.value.trim() }
    this.props.signupUser(creds)
  }
  render() {
    const { errorMessage } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="vertical-align-container">
            <div className="col s12 l10 offset-l1">
              <div className="nice-container">
                <h4 className="text-center">Sign up</h4>
                <div className="modal-content">
                  <div className="row">
                    <form onSubmit={this.onFormSubmit.bind(this)} className="col s12">
                      <div className="row">
                        <div className="input-field col s12 m6">
                          <i className="material-icons prefix">account_circle</i>
                          <input id="icon_prefix" ref="username" type="text" className="validate"/>
                          <label htmlFor="icon_prefix">Username</label>
                        </div>
                        <div className="input-field col s12 m6">
                          <i className="material-icons prefix">email</i>
                          <input id="icon_email" ref="email" type="email" className="validate"/>
                          <label htmlFor="icon_email">Email</label>
                        </div>
                        <div className="input-field col s12">
                          <i className="material-icons prefix">lock_outline</i>
                          <input id="icon_password" ref="password" type="password" className="validate"/>
                          <label htmlFor="icon_password">Password</label>
                        </div>
                        <div className="input-field col s12">
                          <i className="material-icons prefix">lock_outline</i>
                          <input id="icon_password_confirmation" ref="password_confirmation" type="password" className="validate"/>
                          <label htmlFor="icon_password_confirmation">Password confirmation</label>
                        </div>
                      </div>
                      <button type="submit" className="btn full-width margin-top-20 margin-bottom-20">Submit</button>
                    </form>
                    {errorMessage &&
                      <p>{errorMessage}</p>
                    }
                  </div>
                </div>
              </div>
              <div className="text-center margin-top-20 margin-bottom-20 text-20">
                <Link to={'/login'}>Already have an account ? Log in !</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({signupUser}, dispatch);
}

export default connect(null,mapDispatchToProps)(Signup)
