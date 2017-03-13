import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRoom, receiveAddedMusic, receiveUpdatedMusic, receiveDeletedMusic, receiveSortedMusics, receiveNewInvitation, receiveDeletedInvitation, connectToRoom, disconnectFromRoom, strangersNumberChanged} from '../actions/index'
import SearchGroup from './SearchGroup';
import SoundMixer from './SoundMixer';

class Room extends Component {
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
    window.onbeforeunload = () => { // run cleanup when page refreshes
      this.componentCleanup();
    }
  }
  componentDidMount(){
    this.props.connectToRoom(this.props.routeParams.roomId)
  }
  componentWillUnmount(){
    this.componentCleanup();
    window.onbeforeunload = null; // remove the event handler for normal unmounting
  }
  receiveRoomData(data){
    console.log("RECEIVED ALGO", data)
    switch(data.action) {
      case "added":
        console.log("receive added")
        this.props.receiveAddedMusic(data)
        break;
      case "updated":
        console.log("receive updated")
        this.props.receiveUpdatedMusic(data)
        break;
      case "deleted":
        console.log("receive deleted")
        this.props.receiveDeletedMusic(data)
        break;
      case "sorted":
        console.log("receive sorted")
        this.props.receiveSortedMusics(data)
        break;
      case "new invitation":
        console.log("receive new invitation")
        this.props.receiveNewInvitation(data)
        break;
      case "strangers_number_changed":
        console.log("receive strangers_number_changed")
        this.props.strangersNumberChanged(data)
        break;
      case "invitation deleted":
        console.log("receive invitation deleted")
        this.props.receiveDeletedInvitation(data)
        break;
    }
  }
  render() {
    return (
      <div className="container">
        <SoundMixer/>
        <SearchGroup/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRoom, receiveAddedMusic, receiveUpdatedMusic, receiveDeletedMusic, receiveSortedMusics, receiveNewInvitation, receiveDeletedInvitation, connectToRoom, disconnectFromRoom, strangersNumberChanged}, dispatch);
}

function mapStateToProps(state){
  return {
    room_users: state.room.users,
    username: state.user.username
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Room)
