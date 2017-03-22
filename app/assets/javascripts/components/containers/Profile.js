import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EditableField from '../components/EditableField'
import {updateProfile} from '../actions/index'

class Profile extends Component {
  // constructor(props){
  //   super(props)
  // }
  changeProfileField(type, text){
    this.props.updateProfile(this.props.user_id, type, text);
  }
  render() {
    return (
      <div className='container'>
        <div className="text-center margin-top-20">
          <img src="/profile_icon.png" alt=""/>
          <h3 className='grey-text'>@{this.props.username}</h3>
        </div>
        <div className="shadowed-box margin-top-20">
          <div className="row">
            <div className="col s12 m6 l3">
              <EditableField
                type="username"
                onSubmit={this.changeProfileField.bind(this)}
                value={this.props.username}
              />
            </div>
            <div className="col s12 m6 l3">
              <EditableField
                type="email"
                onSubmit={this.changeProfileField.bind(this)}
                value={this.props.email}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// <EditableField type="address" value={this.props.address} />
// <EditableField type="city" value={this.props.city} />
// <EditableField type="country" value={this.props.country} />

function mapDispatchToProps(dispatch){
  return bindActionCreators({updateProfile}, dispatch);
}

function mapStateToProps(state){
  return {
    username: state.user.username,
    email: state.user.email,
    user_id: state.user.id
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
