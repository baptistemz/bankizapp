import React, {Component} from 'react';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import slugify from '../slugify'
import {addMusic} from '../actions/index';
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
    $('#modal2').modal('close');
    const status = !this.props.music_1 && !this.props.music_2 ? "playing" : "next"
    this.props.addMusic(this.props.room_id, music, status);
  }
  addMusicToList(music){
    $('#modal2').modal('close');
    let status = !this.props.music_1 && !this.props.music_2 ? "playing" : "next"
    status = !this.props.music_1 || !this.props.music_2 ? status : "waiting"
    this.props.addMusic(this.props.room_id, music, status);
  }
  render(){
    const musics = this.props.musics;
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
  return bindActionCreators({addMusic}, dispatch);
}
function mapStateToProps(state){
  return {
    room_id: state.room.id,
    musics: state.music.all,
    music_1: state.music.music_1,
    music_2: state.music.music_2
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MusicSearchList)
