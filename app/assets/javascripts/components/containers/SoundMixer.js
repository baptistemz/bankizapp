import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeBalance, playNext, startPlayer, stopPlayer, switchPlayers, deleteFromWaitingList, changeDragOrder, printListOrder} from '../actions/index';
import React from 'react'
import VideoPlayer from '../components/VideoPlayer'
import WaitingList from '../components/WaitingList'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class SoundMixer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      to_switch: 1,
      forceFirstPlayer: false,
      forceSecondPlayer: false
    }
  }
  forcePlayer(origin_player){
    if (origin_player===2){
      this.setState({forceFirstPlayer: true});
      this.setState({forceFirstPlayer: false});
    }else{
      this.setState({forceSecondPlayer: true});
      this.setState({forceSecondPlayer: false});
    }
  }
  switchPlayers(old_player){
    if(this.props.music_1 && this.props.music_2){
      this.props.switchPlayers(old_player)
      const new_player = old_player === 1 ? 2 : 1
      this.setState({to_switch: new_player})
      this.props.playNext(old_player)
    }
  }
  setPlayingAt(player, statement){
    statement ? this.props.startPlayer(player) : this.props.stopPlayer(player)
  }
  fade(){
    const balance = this.props.balance
    if (balance > -1 && balance < 101){
      this.props.changeBalance(balance+5)
    }
  }
  videoPlayer(music, num){
    const isFirstMusic = !this.props.music_2
    const toSwitch = (this.state.to_switch===num)
    const alignRight = (!isFirstMusic && !toSwitch)
    return <VideoPlayer video={music}
      balance={Number(this.props.balance)}
      number={num}
      fadeOut={this.fade.bind(this)}
      onVideoEnd={this.switchPlayers.bind(this)}
      forceOtherPlayer={this.forcePlayer.bind(this)}
      forcePlay={num === 1 ? this.state.forceFirstPlayer : this.state.forceSecondPlayer}
      setPlayingAt={this.setPlayingAt.bind(this)}
      isFirstMusic={isFirstMusic}
      alignRight={alignRight}/>
  }
  onBalanceChange(balance){
    if(balance === '100'){
      this.autoSwitch()
    }
    this.props.changeBalance(balance)
  }
  getBalance(){
    return this.props.balance
  }
  autoSwitch(){
    let callCount = 1;
    var waitAndSee =function () {
      if (callCount < 10) {
        this.getBalance() === '100' ? callCount += 1 : clearInterval(waitAndSwitch)
      } else {
        this.switchPlayers(this.state.to_switch)
        clearInterval(waitAndSwitch);
      }
    };
    const waitAndSwitch = setInterval(waitAndSee.bind(this), 1000);
  }
  music(music, num){
    if(music){
      return this.videoPlayer(music, num)
    }
  }
  changeListOrder(obj){
    this.props.changeDragOrder(obj)
  }
  printListOrder(name, list){
    this.props.printListOrder(name, list)
  }
  deleteFromWaitingList(music){
    this.props.deleteFromWaitingList(this.props.room_id, music)
  }
  render(){
    console.log("from soundmixer")
    return(
      <div className="row">
        {this.music(this.props.music_1, 1)}
        {this.music(this.props.music_2, 2)}
        <div className="col s12 m5">
          <div className="player-background right-background z-depth-1">
            <h5>track 1</h5>
            <div className="play-pause">
              <img src="/play_pause.png" alt="play/pause"/>
            </div>
          </div>
        </div>
        <div className="col s12 m2">
          <div id="logo-sound-group">
            <div id="left-sound-link" className="hide-on-med-and-up"></div>
            <div id="right-sound-link" className="hide-on-med-and-up"></div>
            <img  className="hide-on-small-only" src="/logo1.png" id="logo" alt="penguin"/>
            <form action="#">
              <input type="range" value={this.props.balance} min="0" max="100"
                onChange = {event => this.onBalanceChange(event.target.value)}/>
            </form>
          </div>
        </div>
        <div className="col s12 m5">
          <div className="player-background left-background z-depth-1">
            <h5>track 2</h5>
            <div className="play-pause">
              <img src="/play_pause.png" alt="play/pause"/>
            </div>
          </div>
        </div>
        <div className="col s12">
          <WaitingList deleteMusicFromList = {this.deleteFromWaitingList.bind(this)}
            changeListOrder={this.changeListOrder.bind(this)}
            list={this.props.waiting_list}
            roomId={this.props.room_id}
            draggingObject={this.props.draggingObject}
            printListOrder={this.printListOrder.bind(this)} />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeBalance, playNext, startPlayer, stopPlayer, switchPlayers, deleteFromWaitingList, changeDragOrder, printListOrder}, dispatch);
}
function mapStateToProps(state){
  return {
    music_1: state.music.music_1,
    music_2: state.music.music_2,
    balance: state.music.balance,
    music_1_playing: state.music.music_1_playing,
    music_2_playing: state.music.music_2_playing,
    waiting_list: state.music.waiting_list,
    draggingObject: state.music.draggingObject,
    room_id: state.room.id,
    room_name: state.room.name,
    dj_name: state.room.dj.username
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SoundMixer)
