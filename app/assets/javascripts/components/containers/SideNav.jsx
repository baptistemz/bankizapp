import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logoutUser} from '../actions/index';
import { Link } from 'react-router';

class SideNav extends Component {
  componentDidMount(){

    $('.button-collapse').sideNav({
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      }
    );
  }
  logout(){
    this.props.logoutUser()
  }
  profile(){
    console.log(this.props.user)
    return(
      <div>
        <table>
          <tbody>
            <tr>
              <td><i className="material-icons">perm_identity</i></td>
              <td>
                <span className="white-text name">{this.props.username}</span>
                <span className="white-text email">{this.props.email}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="space-around profile-btn-group">
          <a onClick={this.logout.bind(this)}><div className="btn btn-small">Update profile</div></a>
          <a onClick={this.logout.bind(this)}><div className="btn btn-small">Log out</div></a>
        </div>
      </div>
    )
  }
  connect(){
    return(
      <div>
        <table>
          <tbody>
            <tr>
              <td><i className="material-icons">not_interested</i></td>
              <td>
                <span className="white-text name">Not connected</span>
                <span className="white-text email">Login or Sign up</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="space-around profile-btn-group">
          <Link to={'/login'}><div className="btn btn-small">Login</div></Link>
          <Link to={'/signup'}><div className="btn btn-small">Sign up</div></Link>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="userView">
              <div className="background sidenav-background">
                <img src="/equalizer.jpg" alt="equalizer"/>
              </div>
              {this.props.isAuthenticated ? this.profile() : this.connect()}
            </div>
          </li>
        <li><div className="divider"></div></li>
        <li><Link to={'/'}><i className="material-icons">home</i>Home</Link></li>
        <li><Link to={'/'}><i className="material-icons">list</i>My rooms</Link></li>
        <li><Link to={'/'}><i className="material-icons">playlist_add</i>New Room</Link></li>
        <li><a href="#!">Link</a></li>
        <li><div className="divider"></div></li>
        <li><a className="subheader">Subheader</a></li>
        <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
        {this.props.children}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({logoutUser}, dispatch);
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.username,
    email: state.user.email
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SideNav)
