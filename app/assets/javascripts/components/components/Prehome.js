import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createRoom} from '../actions/index';
import slugify from '../slugify';


class Prehome extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.getElementById('burger-menu').style["color"] = "white"
    window.addEventListener('scroll', this.handleScroll);
    window.scrollTo(0, 0)
  }

  componentWillUnmount() {
    document.getElementById('burger-menu').style["color"] = "black"
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    let scrollTop = event.target.scrollingElement.scrollTop,
    itemTranslate = Math.min(0, scrollTop/3 - 60);
    console.log(scrollTop)
    if(scrollTop > 200 && scrollTop < 520) {
      document.getElementById('fake-input-text').style["width"] = (scrollTop - 200)/2+"px"
    }else if(scrollTop > 520) {
      document.getElementById('fake-input-text').style["width"] = "160px"
    } else{
      document.getElementById('fake-input-text').style["width"] = "0px"
    }
    if (scrollTop > 550) {
      document.getElementById('fake-btn').classList.add("fake-clic")
    } else {
      document.getElementById('fake-btn').classList.remove("fake-clic")
    }
    if (scrollTop > window.innerWidth/10 +960 && scrollTop < 3900) {
      document.getElementById('fake-soundmixer').classList.add("fixed")
      document.getElementById('fake-soundmixer').style["opacity"] = 1;
    } else if(scrollTop > 3900) {
      document.getElementById('fake-soundmixer').classList.add("fixed")
      document.getElementById('fake-soundmixer').style["opacity"] = 0;
    } else {
      document.getElementById('fake-soundmixer').classList.remove("fixed")
      document.getElementById('fake-soundmixer').style["opacity"] = 1;
    }
    if (scrollTop > 1370) {
      document.getElementById('fake-player-1-group').style["opacity"] = 1
    } else {
      document.getElementById('fake-player-1-group').style["opacity"] = 0
    }

    // SUBTITLE 1
    if(scrollTop > 1420 && scrollTop < 1850){
      document.getElementById('subtitle-1').style["position"] = "fixed";
      document.getElementById('subtitle-1').style["opacity"] = 1;
    }else if (scrollTop > 1849){
      // document.getElementById('subtitle-1').style["position"] = "relative";
      document.getElementById('subtitle-1').style["opacity"] = 0;
    }else{
      document.getElementById('subtitle-1').style["position"] = "relative";
      document.getElementById('subtitle-1').style["opacity"] = 1;
    }
    if (scrollTop > 1530) {
      document.getElementById('fake-player-2-group').style["opacity"] = 1
    } else {
      document.getElementById('fake-player-2-group').style["opacity"] = 0
    }
    if (scrollTop > 1630) {
      document.getElementById('yt-list-element').style["opacity"] = 1
    } else {
      document.getElementById('yt-list-element').style["opacity"] = 0
    }
    if (scrollTop > 1730) {
      document.getElementById('sp-list-element').style["opacity"] = 1
    } else {
      document.getElementById('sp-list-element').style["opacity"] = 0
    }
    if (scrollTop > 1830) {
      document.getElementById('sc-list-element').style["opacity"] = 1
    } else {
      document.getElementById('sc-list-element').style["opacity"] = 0
    }

    // SUBTITLE 2
    if(scrollTop > 2018 && scrollTop < 2484){
      document.getElementById('subtitle-2').style["position"] = "fixed";
      document.getElementById('subtitle-2').style["opacity"] = 1;
    }else if (scrollTop > 1420 && scrollTop < 1850){
      document.getElementById('subtitle-2').style["opacity"] = 0;
    } else if (scrollTop > 2483){
      // document.getElementById('subtitle-2').style["position"] = "relative";
      document.getElementById('subtitle-2').style["opacity"] = 0;
    }else{
      document.getElementById('subtitle-2').style["position"] = "relative";
      document.getElementById('subtitle-2').style["opacity"] = 1;
    }
    if(scrollTop > 2100 && scrollTop< 2400){
      document.getElementById('vol-btn').style["left"] = 40 +(scrollTop/20) - 105 +"%";
    }
    if(scrollTop > 2200){
      document.getElementById('player-1-volume').getElementsByClassName('volume-2')[0].style["opacity"] = 0
      document.getElementById('player-2-volume').getElementsByClassName('volume-1')[0].style["opacity"] = 1
    } else {
      document.getElementById('player-1-volume').getElementsByClassName('volume-2')[0].style["opacity"] = 1
      document.getElementById('player-2-volume').getElementsByClassName('volume-1')[0].style["opacity"] = 0
    }
    if(scrollTop > 2300){
      document.getElementById('player-1-volume').getElementsByClassName('volume-1')[0].style["opacity"] = 0
      document.getElementById('player-2-volume').getElementsByClassName('volume-2')[0].style["opacity"] = 1
    } else {
      document.getElementById('player-1-volume').getElementsByClassName('volume-1')[0].style["opacity"] = 1
      document.getElementById('player-2-volume').getElementsByClassName('volume-2')[0].style["opacity"] = 0
    }

    // SUBTITLE 3
    if(scrollTop > 2720 && scrollTop < 3100){
      document.getElementById('subtitle-3').style["position"] = "fixed";
      document.getElementById('subtitle-3').style["opacity"] = 1;
    }else if (scrollTop > 3099){
      // document.getElementById('subtitle-3').style["position"] = "relative";
      document.getElementById('subtitle-3').style["opacity"] = 0;
    }else if(scrollTop > 1900 && scrollTop < 2484){
      document.getElementById('subtitle-3').style["opacity"] = 0;
    }else{
      document.getElementById('subtitle-3').style["position"] = "relative";
      document.getElementById('subtitle-3').style["opacity"] = 1;
    }
    if (scrollTop > 2800){
      document.getElementById('fake-invite-btn').style["opacity"] = 1
    }else{
      document.getElementById('fake-invite-btn').style["opacity"] = 0
    }
    if (scrollTop > 2650 && scrollTop < 2700){
      document.getElementById('fake-invite-btn').classList.add("fake-clic")
    }else{
      document.getElementById('fake-invite-btn').classList.remove("fake-clic")
    }
    if (scrollTop > 2800){
      document.getElementById('fake-user-1').style["right"] = "0px"
    }else{
      document.getElementById('fake-user-1').style["right"] = "2000px"
    }
    if (scrollTop > 2900){
      document.getElementById('fake-user-2').style["right"] = "68px"
    }else{
      document.getElementById('fake-user-2').style["right"] = "2068px"
    }
    if (scrollTop > 3000){
      document.getElementById('fake-user-3').style["right"] = "136px"
    }else{
      document.getElementById('fake-user-3').style["right"] = "2136px"
    }

    // SUBTITLE 4

    if(scrollTop > 3400 && scrollTop < 3900){
      document.getElementById('subtitle-4').style["position"] = "fixed";
      document.getElementById('subtitle-4').style["opacity"] = 1;
      document.getElementById('fake-soundmixer').style["opacity"] = 1;
    }else if (scrollTop > 3900 && scrollTop < 4500 ){
      document.getElementById('subtitle-4').style["position"] = "fixed";
      document.getElementById('subtitle-4').style["opacity"] = 0;
      document.getElementById('fake-soundmixer').style["opacity"] = 0;
    }else if (scrollTop > 4500){
      document.getElementById('subtitle-4').style["position"] = "relative";
      document.getElementById('subtitle-4').style["opacity"] = 0;
      document.getElementById('fake-soundmixer').style["opacity"] = 0;
    }else if(scrollTop > 2620 && scrollTop < 3100){
      document.getElementById('subtitle-4').style["opacity"] = 0;
    }else{
      document.getElementById('subtitle-4').style["position"] = "relative";
      document.getElementById('subtitle-4').style["opacity"] = 1;
      document.getElementById('fake-soundmixer').style["opacity"] = 1;
    }
    if (scrollTop > 3600) {
      document.getElementById('yt-list-element-2').style["opacity"] = 1
    } else {
      document.getElementById('yt-list-element-2').style["opacity"] = 0
    }
    if (scrollTop > 3700) {
      document.getElementById('yt-list-element-3').style["opacity"] = 1
    } else {
      document.getElementById('yt-list-element-3').style["opacity"] = 0
    }
    if (scrollTop > 3800) {
      document.getElementById('sp-list-element-2').style["opacity"] = 1
    } else {
      document.getElementById('sp-list-element-2').style["opacity"] = 0
    }
  }
  goToRoom(event) {
    event.preventDefault()
    this.props.createRoom(this.roomInput.value, slugify(this.roomInput.value))
  }

  render() {
    return (
      <div className="prehome-background">
        <div className="strip">
          <form className="connect" onSubmit={this.goToRoom.bind(this)}>
            <label htmlFor="room_input">Choose a room Name</label>
            <div className="space-around">
              <input id="room_input" type="text" required placeholder="room name" ref={(input) => {this.roomInput = input}} />
              <button type="submit" className="btn white-btn">Create</button>
            </div>
          </form>
        </div>
        <div className="prehome-content">
          <div className="cover-container">
            <div>
              <div id="prehome-logo">
                <img src="/logo1.png" alt="bankiz"/>
              </div>
              <h1>Collaborative music mix</h1>
            </div>
          </div>
          <div className="title-container">
            <h2>Create your room</h2>
            <div id="fake-form">
              <div id="fake-input">
                <p id="fake-input-text">Michel's_birthday_party</p>
                <hr/>
              </div>
              <div id="fake-btn">CREATE</div>
            </div>
          </div>
          <div className="block-500"></div>
          <div
            className="animateme scrollme"
            id="fake-soundmixer"
            data-when="enter"
            data-from="0.5"
            data-crop="false"
            data-to="0"
            data-opacity="0"
            data-scale="1.5"
            >
            <img src="fake-soundmixer.png" alt="mix"/>
            <div id="fake-player-1-group">
              <img id="fake-player-1" src="fake-player.png" alt="music player"/>
              <div id="player-1-volume" className="volume-group space-around align-items">
                <img className="volume-1" src="volume-1.png" alt="music volume transition"/>
                <img className="volume-2" src="volume-2.png" alt="music volume transition"/>
              </div>
            </div>
            <div id="fake-player-2-group">
              <img id="fake-player-2" src="fake-player.png" alt="music player"/>
              <div id="player-2-volume" className="volume-group space-around align-items">
                <img className="volume-1" src="volume-1.png" alt="music volume transition"/>
                <img className="volume-2" src="volume-2.png" alt="music volume transition"/>
              </div>
            </div>
            <img id="vol-btn" src="volume-btn.png" alt="volume equalizer"/>
            <div className="space-around fake-waiting-list">
              <img id="yt-list-element" src="yt-list-element.png" alt="youtube"/>
              <img id="sp-list-element" src="sp-list-element.png" alt="spotify"/>
              <img id="sc-list-element" src="sc-list-element.png" alt="soundcloud"/>
              <img id="yt-list-element-2" src="yt-list-element.png" alt="youtube"/>
              <img id="yt-list-element-3" src="sc-list-element.png" alt="soundcloud"/>
              <img id="sp-list-element-2" src="sp-list-element.png" alt="spotify"/>
            </div>
            <div id="fake-invite-btn">INVITE</div>
            <img className="fake-user-icon" id="fake-user-1" src="fake-user.png" alt="invited user"/>
            <img className="fake-user-icon" id="fake-user-2" src="fake-user.png" alt="invited user"/>
            <img className="fake-user-icon" id="fake-user-3" src="fake-user.png" alt="invited user"/>
          </div>
          <div className="subtitle-container" id="subtitle-1">
            <h2>Build your playlist</h2>
          </div>
          <div className="bloc-10"></div>
          <div className="subtitle-container" id="subtitle-2">
            <h2>Manage transitions</h2>
          </div>
          <div className="bloc-10"></div>
          <div className="subtitle-container" id="subtitle-3">
            <h2>Share with friends</h2>
          </div>
          <div className="subtitle-container" id="subtitle-4">
            <h4><p>They can now search musics and enqueue them to the waiting list</p></h4>
          </div>
        </div>
        <div id="footer"></div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({createRoom}, dispatch);
}
export default connect(null, mapDispatchToProps)(Prehome)
