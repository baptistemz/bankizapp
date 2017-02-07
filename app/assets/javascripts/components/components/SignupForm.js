import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';

class SignupForm extends Component {
  render(){
    const {handleSubmit, fields:{username, email, password, password_confirmation}} = this.props
    return(
      <form onSubmit={handleSubmit} className="col s12">
        <div className="row">
          <div className="input-field col s12 m6">
            <Field name='username' component={UsernameInput} {...username}/>
          </div>
          <div className="input-field col s12 m6">
            <i className="material-icons prefix">email</i>
            <input id="icon_email" type="email" name="email" className="validate" {...email}/>
            <label htmlFor="icon_email">Email</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">lock_outline</i>
            <input id="icon_password" type="password" className="validate" {...password}/>
            <label htmlFor="icon_password">Password</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">lock_outline</i>
            <input id="icon_password_confirmation" type="password" className="validate" {...password_confirmation}/>
            <label htmlFor="icon_password_confirmation">Password confirmation</label>
          </div>
        </div>
        <button type="submit" className="btn full-width margin-top-20">Submit</button>
      </form>
    )
  }
}
class UsernameInput extends Component {
  render() {
    return (
      <div>
        <i className="material-icons prefix">account_circle</i>
        <input id="icon_prefix" type="text" name= "username" className="validate"/>
        <label htmlFor="icon_prefix">Username</label>
      </div>
    )
  }
}
function validate(formProps){
  const errors = {};
  console.log(formProps)
  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'email', 'password', 'password_confirmation'],
  validate
})(SignupForm)
