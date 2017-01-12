import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRoom} from '../actions/index'
import SearchBar from './SearchBar';
import SoundMixer from './SoundMixer';
import MusicSearchList from './MusicSearchList';


class Room extends Component {
  componentWillMount(){
    this.props.fetchRoom(this.props.params.roomId)
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
  return bindActionCreators({fetchRoom}, dispatch);
}
export default connect(null,mapDispatchToProps)(Room)
