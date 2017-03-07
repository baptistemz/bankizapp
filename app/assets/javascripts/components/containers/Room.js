import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRoom, receiveAddedMusic, receiveUpdatedMusic, receiveDeletedMusic, receiveSortedMusics, receiveNewInvitation, receiveDeletedInvitation, connectToRoom, disconnectFromRoom, strangersNumberChanged} from '../actions/index'
import SearchGroup from './SearchGroup';
import SoundMixer from './SoundMixer';

class Room extends Component {
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
  }
  componentWillUnmount(){
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
  receiveRoomData(data){
    switch(data.action) {
      case "added":
        this.props.receiveAddedMusic(data)
        break;
      case "updated":
        console.log("channel - updated")
        this.props.receiveUpdatedMusic(data)
        break;
      case "deleted":
        console.log("channel - deleted")
        this.props.receiveDeletedMusic(data)
        break;
      case "sorted":
        this.props.receiveSortedMusics(data)
        break;
      case "new invitation":
        this.props.receiveNewInvitation(data)
        break;
      case "strangers_number_changed":
        console.log("strangers_number_changed", data)
        this.props.strangersNumberChanged(data)
        break;
      case "invitation deleted":
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
