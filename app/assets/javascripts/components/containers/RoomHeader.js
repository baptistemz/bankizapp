import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toastr} from 'react-redux-toastr';
import Loader from 'halogen/RingLoader';
import {fetchRoom, receiveAddedMusic, receiveUpdatedMusic, receiveDeletedMusic, receiveSortedMusics, receiveNewInvitation, receiveDeletedInvitation, connectToRoom, disconnectFromRoom, strangersNumberChanged, cleanMusic} from '../actions/index'
import SoundMixer from './SoundMixer'

class RoomHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }
  componentCleanup(){
    if (this.props.username){
      const username = this.props.username
      const invitation = this.props.room_users.filter(function(u) {
        return u.username === username ;
      });
      this.props.disconnectFromRoom(this.props.routeParams.roomId, invitation[0].id)
    }else{
      this.props.disconnectFromRoom(this.props.routeParams.roomId, null)
    }
  }
  componentWillMount(){
    this.props.fetchRoom(this.props.params.roomId)
    const props = this.props
    if (typeof App !== 'undefined'){
      App.room = App.cable.subscriptions.create(
        {channel: "RoomChannel", room_slug: this.props.params.roomId}, {
        connected: function() {console.log("channel connected")},
        disconnected: function() {console.log("channel disconnected")},
        received: ((data) => this.receiveRoomData(data))
      });
    }
  }
  componentDidMount(){
    this.props.connectToRoom(this.props.routeParams.roomId)
    window.onbeforeunload = () => { // run cleanup when page refreshes
      this.componentCleanup();
    }
  }
  componentWillUnmount(){
    this.componentCleanup();
    this.props.cleanMusic();
    window.onbeforeunload = null; // remove the event handler for normal unmounting
  }
  componentWillReceiveProps(nextProps){
    this.setState({loaded: true})
  }
  receiveRoomData(data){
    switch(data.action) {
      case "added":
        const username = data.music.username || 'stranger'
        const title = JSON.parse(data.music.json_data).snippet.title
        toastr.success(`music added by ${username}`, title)
        this.props.receiveAddedMusic(data)
        break;
      case "updated":
        this.props.receiveUpdatedMusic(data)
        break;
      case "deleted":
        this.props.receiveDeletedMusic(data)
        break;
      case "sorted":
        this.props.receiveSortedMusics(data)
        break;
      case "new invitation":
        this.props.receiveNewInvitation(data)
        break;
      case "strangers_number_changed":
        this.props.strangersNumberChanged(data)
        break;
      case "invitation deleted":
        this.props.receiveDeletedInvitation(data)
        break;
    }
  }
  copyLink(){
    var aux = document.createElement("input");
    aux.setAttribute("value", `http://www.bankizapp.com/rooms/${this.props.room_slug}`);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    toastr.success('The room link has been copied to your clipboard', 'you can now share it with friends !')
  }
  messengerShare(){
    FB.ui({
        method: 'send',
        name: 'Invitation to contribute to my player',
        link: 'http://www.bankizapp.com/rooms/${this.props.room_slug}',
    });
  }
  render() {
    if(this.state.loaded){
      return (
        <div className="container">
          <div className="room-presentation">
            <h1 className="text-center">{this.props.room_name}</h1>
            <h3 className= "text-center grey-text"> by @{this.props.dj_name}</h3>
          </div>
          <div className="row">
            <div className="users-group col s12">
              <div className= "logged-in-state">
                <p className="underline"><big>{this.props.room_users.length + this.props.strangers_number}</big>users<span className="hide-on-small-only"> connected</span></p>
                <div className="hover-chip" id="logged-in-chip">
                  {this.props.room_users.map(function(u, i){
                    return(
                      <div key={i}>
                        {u.username}
                      </div>
                    )
                  })}
                  {this.props.strangers_number > 0 ?
                    <div>+{this.props.strangers_number} strangers</div>
                    :
                    <div></div>
                  }
                </div>
              </div>
              <div className="space-around">
                <h6 className="hide-on-small-only">Share this room : </h6>
                <h6 className="hide-on-med-and-up">Share : </h6>
                <div className="btn messenger-btn" onClick={this.messengerShare.bind(this)}><img src="/messenger-icon.png" alt="messenger"/></div>
                <h6>or</h6>
                <div className="btn" onClick={this.copyLink.bind(this)}>Copy Link</div>
              </div>
            </div>
          </div>
          <SoundMixer visible={this.props.location.pathname != `/rooms/${this.props.room_slug}/search`} />
          {this.props.children}
        </div>
      );
    }else{
      return (
        <div className="loader-container full-page-loader">
          <Loader color="#2F9EE2" size="50px" margin="4px"/>
        </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRoom, receiveAddedMusic, receiveUpdatedMusic, receiveDeletedMusic, receiveSortedMusics, receiveNewInvitation, receiveDeletedInvitation, connectToRoom, disconnectFromRoom, strangersNumberChanged, cleanMusic}, dispatch);
}

function mapStateToProps(state){
  return {
    room_name: state.room.name,
    room_slug: state.room.slug,
    dj_name: state.room.dj.username,
    strangers_number: state.room.strangers_number,
    room_users: state.room.users,
    username: state.user.username
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RoomHeader)
