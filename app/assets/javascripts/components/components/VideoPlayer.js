import React from 'react';
import Youtube from 'react-youtube';
import ReactDOM from 'react-dom';


export default class VideoPlayer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      videoId : props.video.id.videoId,
      thumbnail: this.props.alignRight ? 'right' : 'left',
      player: null,
      ended: false,
      countdown: 20
    }
    this.onReady = this.onReady.bind(this)
  }
  componentDidMount(){
    this.props.alignRight ? this.align('right') : this.align('left')
  }
  componentDidUpdate(oldProps){
    if(oldProps.alignRight && !this.props.alignRight){
      this.align('left')
    }else if(!oldProps.alignRight && this.props.alignRight) {
      this.align('right')
    }
    if(this.props.switchCountDown < 10){
      document.getElementById(`delete_message_${this.props.number}`).style["display"] = 'block';
    }else{
      document.getElementById(`delete_message_${this.props.number}`).style["display"] = 'none';
    }
  }
  align(side){
    const classes= ReactDOM.findDOMNode(this).className;
    if(side==='right'){
      this.setState({thumbnail: 'right'})
      classes.indexOf(' left-thumbnail') !== -1 ? ReactDOM.findDOMNode(this).className = classes.replace(' left-thumbnail',' right-thumbnail') : ReactDOM.findDOMNode(this).className = classes.concat(" right-thumbnail");
    }else{
      this.setState({thumbnail: 'left'})
      classes.indexOf(' right-thumbnail') !== -1 ? ReactDOM.findDOMNode(this).className = classes.replace(' right-thumbnail',' left-thumbnail') : ReactDOM.findDOMNode(this).className = classes.concat(" left-thumbnail");
    }
  }
  onReady(event) {
    this.setState({
      player: event.target,
    });
    const player = this.state.player;
    if(this.props.isFirstMusic){
      player.playVideo()
    }
    this.detectEnd(player)
  }
  detectEnd(player){
    const etag = player.etag
    const updateTime = function(player){
      let videotime = 0;
      let timeupdater = null;
      let oldTime = videotime;
      if(this.state.ended||player.getCurrentTime()===player.getDuration()|| etag != player.etag){
        clearInterval(fadeLoop);
      }else{
        const transitionTime = player.getDuration()-20;
        if(player && player.getCurrentTime()) {
          videotime = player.getCurrentTime();
        }
        if(videotime !== oldTime) {
          const progress = this.onProgress(Math.trunc(videotime), Math.trunc(transitionTime));
          if(!progress){
            clearInterval(fadeLoop)
          }
        }
      }
    }
    const fadeLoop = setInterval(updateTime.bind(this, player), 1000);
  }
  onProgress(currentTime, transitionTime){
    if(currentTime >= transitionTime ) {
      // 20 seconds before the end of the video, this will be called.
      if(this.state.countdown === 0){
        return false
      }else{
        this.setState({countdown: this.state.countdown - 1})
        this.props.forceOtherPlayer(this.props.number)
        this.props.fadeOut(this.props.number)
        return true
      }
    }else{
      return true
    }
  }
  onStateChange(event) {
    switch (event.data) {
      case -1:
        break;
      case 0:
        this.setState({ended:true})
        this.props.onVideoEnd(this.props.number)
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        this.onReady(event)
        break;
    }
  }
  render(){
    if(this.props.forcePlay){
      this.state.player.playVideo()
    }
    const video = this.props.video
    const videoId = video.id.videoId;
    const message_id = `delete_message_${this.props.number}`;
    if(this.state.player){
      const player= this.state.player
      if(this.state.thumbnail === 'right'){
        player.setVolume(this.props.balance)
      }else {
        player.setVolume(100 - this.props.balance)
      }
    }
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        color: 'white',
        controls:1,
        enablejsapi: 1,
        modestbranding: 1,
        disablekb:1,
        fs: 1
      }
    };

    return(
        <div className="video-container">
          <Youtube videoId={this.props.video.id.videoId}
            onReady={this.onReady.bind(this)}
            opts={opts}
            onStateChange={this.onStateChange.bind(this)}/>
          <h5 className="music-title">{this.props.video.snippet.title}</h5>
          <div className="delete-btn" onClick={this.props.deleteVideo.bind(this, this.props.number, this.props.video)}><i className="material-icons">delete</i></div>
          <div id={message_id}>
            auto delete in <big>{this.props.switchCountDown}</big> seconds
          </div>
        </div>
    );
  }
}
