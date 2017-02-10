import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRoom, receiveAddedMusic, receiveDeletedMusic, receiveSortedMusics} from '../actions/index'
import SearchGroup from './SearchGroup';
import SoundMixer from './SoundMixer';

class Room extends Component {
  componentWillMount(){
    this.props.fetchRoom(this.props.params.roomId)
    const props = this.props
    if (typeof App !== 'undefined'){
      App.room = App.cable.subscriptions.create(
        {channel: "RoomChannel", room_slug: this.props.params.roomId}, {
        connected: function() {console.log("connected")},
        disconnected: function() {console.log("disconnected")},
        received: ((data) => this.receiveRoomData(data))
      });
    }
  }
  receiveRoomData(data){
    switch(data.action) {
      case "added":
        this.props.receiveAddedMusic(data)
        break;
      case "deleted":
        this.props.receiveDeletedMusic(data)
        break;
      case "sorted":
        this.props.receiveSortedMusics(data)
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
  return bindActionCreators({fetchRoom, receiveAddedMusic, receiveDeletedMusic, receiveSortedMusics}, dispatch);
}

export default connect(null,mapDispatchToProps)(Room)
