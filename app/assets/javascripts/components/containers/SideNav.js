import React, { Component } from 'react';
import {loginUser, signupUser} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class SideNav extends Component {
  componentDidMount(){
    console.log("didmount")
    $(".button-collapse").sideNav();
  }
  render() {
    return (
      <div>
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="userView">
              <div className="background">
                <img src="/equalizer.jpg" alt="equalizer"/>
              </div>
              <table>
                <tr>
                  <td><i className="material-icons">perm_identity</i></td>
                  <td>
                    <span className="white-text name">Joe Doe</span>
                    <span className="white-text email">jdandturk@gmail.com</span>
                  </td>
                </tr>
              </table>
            </div>
          </li>
        <li><div className="divider"></div></li>
        <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
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
  return bindActionCreators({loginUser, signupUser}, dispatch);
}
function mapStateToProps(state){
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SideNav)
