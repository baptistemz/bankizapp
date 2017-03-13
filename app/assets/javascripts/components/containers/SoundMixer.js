import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeBalance, playNext, startPlayer, stopPlayer, deleteMusic, changeDragOrder, printListOrder} from '../actions/index';
import React from 'react'
import VideoPlayer from '../components/VideoPlayer'
import WaitingList from '../components/WaitingList'
import VisitorUI from '../components/VisitorUI'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {toastr} from 'react-redux-toastr'


class SoundMixer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      forceFirstPlayer: false,
      forceSecondPlayer: false,
      switchCountDown1: 10,
      switchCountDown2: 10
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
    const old_music = old_player === 1 ? this.props.music_1 : this.props.music_2
    this.props.deleteMusic(old_music, this.props.room_id)
    const new_player = old_player === 1 ? 2 : 1
  }
  setPlayingAt(player, statement){
    statement ? this.props.startPlayer(player) : this.props.stopPlayer(player)
  }
  fade(){
    const balance = this.props.balance
    if (balance > -1 && balance < 100){
      this.props.changeBalance(balance+5)
      if (balance === 95){
        const old_player = this.props.mute_player === 1 ? 0 : 1
        this.switchPlayers(old_player)
      }
    }
  }
  deleteVideo(music){
    this.props.deleteMusic(music, this.props.room_id)
  }
  videoPlayer(music, num){
    const switchCountDown = num === 1 ? this.state.switchCountDown1 : this.state.switchCountDown2
    const isFirstMusic = !this.props.music_2
    const toSwitch = (this.props.mute_player!=num)
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
      alignRight={alignRight}
      switchCountDown={switchCountDown}
      deleteVideo={this.deleteVideo.bind(this)}/>
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
        this.props.mute_player === 1 ? this.setState({switchCountDown1: 10 - callCount}) : this.setState({switchCountDown1: 10 - callCount})
        this.getBalance() === '100' ? callCount += 1 : clearInterval(waitAndSwitch)
      } else {
        this.props.mute_player === 1 ? this.setState({switchCountDown1: 10}) : this.setState({switchCountDown1: 10})
        const old_player = this.props.mute_player === 1 ? 0 : 1
        this.switchPlayers(old_player)
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
  copyLink(){
    var aux = document.createElement("input");
    aux.setAttribute("value", `http://www.bankizapp.com/rooms/${this.props.room_slug}`);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    toastr.success('The room link has been copied to your clipboard', 'you can now share it with friends !')
  }
  changeListOrder(obj){
    this.props.changeDragOrder(obj)
  }
  printListOrder(name, list){
    this.props.printListOrder(name, list)
  }
  deleteFromWaitingList(music){
    this.props.deleteMusic(music, this.props.room_id)
  }
  djUi(){
    return(
      <div className="row">
        <div className="room-presentation">
          <h1 className="text-center">{this.props.room_name}</h1>
          <h3 className= "text-center grey-text"> by @{this.props.dj_name}</h3>
        </div>
        <br/>
        {this.music(this.props.music_1, 1)}
        {this.music(this.props.music_2, 2)}
        <div className="users-group col s12">
          <div className= "logged-in-state">
            <p className="underline"><big>{this.props.room_users.length + this.props.strangers_number}</big> users connected</p>
            <div className="hover-chip" id="logged-in-chip">
              {this.props.room_users.map(function(u, i){
                return(
                  <div key={i}>
                    {u.username}
                  </div>
                )
              })}
              {this.props.strangers_number > 0 ?
                <div>+{this.props.strangers_number} strangers</div>
              :
                <div></div>
              }
            </div>
          </div>
          <div className="space-around">
            <h6>Share this room : </h6>
            <div className="btn" onClick={this.copyLink.bind(this)}>Copy Link</div>
          </div>
        </div>
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
  visitorUi(){
    return(
      <div className="row">
        <div className="room-presentation">
          <h1 className="text-center">{this.props.room_name}</h1>
          <h3 className= "text-center grey-text"> by @{this.props.dj_name}</h3>
        </div>
        <VisitorUI waitingList= {this.props.waiting_list}
          reverted = {this.props.mute_player === 1}
          music1= {this.props.music_1}
          music2= {this.props.music_2} />
     </div>
   )
  }
  render(){
    if (this.props.current_username === this.props.dj_name){
      return(
        <div>
          {this.djUi()}
        </div>
      )

    }else{
      return(
        <div>
          {this.visitorUi()}
        </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeBalance, playNext, startPlayer, stopPlayer, deleteMusic, changeDragOrder, printListOrder}, dispatch);
}
function mapStateToProps(state){
  return {
    music_1: state.music.music_1,
    music_2: state.music.music_2,
    mute_player: state.music.mute_player,
    balance: state.music.balance,
    waiting_list: state.music.waiting_list,
    draggingObject: state.music.draggingObject,
    room_id: state.room.id,
    room_name: state.room.name,
    room_slug: state.room.slug,
    dj_name: state.room.dj.username,
    room_users: state.room.users,
    strangers_number: state.room.strangers_number,
    current_username : state.user.username
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SoundMixer)
