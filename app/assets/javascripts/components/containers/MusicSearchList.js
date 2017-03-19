import React, {Component} from 'react';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import slugify from '../slugify'
import {toastr} from 'react-redux-toastr';


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
  onNotifClick(){
    if(this.props.isAuthenticated){
      alert('Thank you for subscribing to this alert. We will notify you when this feature is available')
    }else{
      toastr.error('Log in or create an account to access the notification features')
      browserHistory.push('/login')
    }
  }
  playMusic(music){
    const status = !this.props.music_1 && !this.props.music_2 ? "playing" : "next"
    console.log(status)
    this.props.addMusic(this.props.room_id, music, status);
    browserHistory.push(`/rooms/${this.props.room_slug}`);
  }
  addMusicToList(music){
    let status = !this.props.music_1 && !this.props.music_2 ? "playing" : "next"
    status = !this.props.music_1 || !this.props.music_2 ? status : "waiting"
    this.props.addMusic(this.props.room_id, music, status);
    browserHistory.push(`/rooms/${this.props.room_slug}`);
  }
  render(){
    const musics = this.props.musics;
    return(
      <div>
        <div className="row">
          <ul className="tabs">
            <li className="tab col s4"><a href="#youtube">Youtube</a></li>
            <li className="tab col s4"><a href="#spotify">Spotify</a></li>
            <li className="tab col s4"><a href="#deezer">Deezer</a></li>
          </ul>
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
          <div id="spotify" className="col s12">
            <h4>The Spotify integration is coming soon !</h4>
            <a onClick={this.onNotifClick.bind(this)} className="btn"href="#">Get notified when by email</a>
            <em>Promise we won't send you tricks to earn 10,000$ in ten minutes</em>
          </div>
          <div id="deezer" className="col s12">
            <h4>The Deezer integration is coming soon !</h4>
            <a onClick={this.onNotifClick.bind(this)} className="btn"href="#">Get notified when by email</a>
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
    isAuthenticated: state.user.isAuthenticated,
    room_id: state.room.id,
    room_slug: state.room.slug,
    musics: state.music.all,
    music_1: state.music.music_1,
    music_2: state.music.music_2
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MusicSearchList)
