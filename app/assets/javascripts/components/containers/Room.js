import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRoom, receiveAddedMusic} from '../actions/index'
import SearchBar from './SearchBar';
import SoundMixer from './SoundMixer';
import MusicSearchList from './MusicSearchList';

class Room extends Component {
  componentWillMount(){
    this.props.fetchRoom(this.props.params.roomId)
    const props = this.props
    if (typeof App !== 'undefined'){
      App.room = App.cable.subscriptions.create(
        {channel: "RoomChannel", room_slug: this.props.params.roomId}, {
        connected: function() {console.log("connected")},
        disconnected: function() {console.log("disconnected")},
        received: ((data) => this.props.receiveAddedMusic(data))
      });
    }
  }
  render() {
    return (
      <div className="container">
        <SoundMixer/>
        <SearchBar />
        <MusicSearchList/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRoom, receiveAddedMusic}, dispatch);
}

export default connect(null,mapDispatchToProps)(Room)
