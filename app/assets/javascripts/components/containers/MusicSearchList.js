import React, {Component} from 'react';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {playMusic, stopPlayer, addToWaitingList} from '../actions/index';
import MusicListItem from '../components/MusicListItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MusicSearchList extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  playMusic(music){
    const player = !this.props.music_1 && !this.props.music_2 ? 1 : this.props.mute_player
    this.props.playMusic(player, music);
  }
  addMusicToList(music){
    if(!this.props.music_1 || !this.props.music_2){
      this.playMusic(music)
    }
    this.props.addToWaitingList(this.props.room_id, music);
  }
  render(){
    const musics = this.props.musics;
    const add_list_disabled = !this.props.music_1
    return(
      <div>
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s4"><a href="#youtube">Youtube</a></li>
              <li className="tab col s4"><a href="#soundcloud">Soundcloud</a></li>
              <li className="tab col s4"><a href="#spotify">Spotify</a></li>
            </ul>
          </div>
          <div id="youtube" className="col s12">
            <h4>Results of your search on Youtube</h4>
            <ul>
              <div className="row">
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout= {300} transitionLeaveTimeout= {300}>
                  {musics.map((music)=>{
                    return(
                      <MusicListItem
                        onVideoSelect = {this.playMusic.bind(this, music)}
                        addVideoToList = {this.addMusicToList.bind(this, music)}
                        key={music.etag}
                        music={music}
                        add_list_disabled = {add_list_disabled}
                        />
                    )
                  })}
                </ReactCSSTransitionGroup>
              </div>
            </ul>
          </div>
          <div id="soundcloud" className="col s12">
            <h4>The Soundcould integration is coming soon !</h4>
            <a className="btn"href="#">Get notified when by email</a>
            <em>Promise we won't send you tricks to earn 10,000$ in ten minutes</em>
          </div>
          <div id="spotify" className="col s12">
            <h4>The Spotify integration is coming soon !</h4>
            <a className="btn"href="#">Get notified when by email</a>
            <em>Promise we won't send you tricks to earn 10,000$ in ten minutes</em>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({playMusic, stopPlayer, addToWaitingList}, dispatch);
}
function mapStateToProps(state){
  return {
    room_id: state.room.id,
    musics: state.music.all,
    balance: state.music.balance,
    music_1: state.music.music_1,
    music_2: state.music.music_2,
    next_player: state.music.next_player,
    mute_player: state.music.mute_player
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MusicSearchList)
