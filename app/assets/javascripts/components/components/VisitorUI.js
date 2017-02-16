import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class VisitorUI extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const animation = document.getElementsByClassName('equalizer')[0];
    function onAnimation( evt ) {
      evt.stopPropagation();
    }
    animation.addEventListener('webkitAnimationStart', onAnimation, false);
    animation.addEventListener('webkitAnimationIteration', onAnimation, false);
    animation.addEventListener('animationStart', onAnimation, false);
    animation.addEventListener('animationIteration', onAnimation, false);
  }
  render(){
    const music_1 = this.props.music1
    const music_2 = this.props.music2
    const waiting_list = this.props.waitingList
    const items = waiting_list.map(function(item,i){
      return(
        <li className="collection-item avatar" key={i}>
          <img src="/youtube_icon.png" alt="" className="circle avatar-sizing"/>
          <span className="title">{item.snippet.title}</span>
          <p>youtube</p>
        </li>
      )
    })
    return(
      <div>
        <div className="visitor-player">
          <div className="raw">
            <div className="col s6 no-padding">
              <p>Playing</p>
              <hr/>
              <div className="equalizer-and-play">
                <div id="blink" className="circle-play-pause absolute">
                  <i className="material-icons">play_arrow</i>
                </div>
                <div id="equalizer-container">
                  <div className="equalizer"></div>
                </div>
              </div>
              <h6>{this.props.reverted ? (music_2 ? music_2.snippet.title : "...") : (music_1 ? music_1.snippet.title : "...") }</h6>
            </div>
            <div className="col s6 no-padding">
              <p>Next</p>
              <hr/>
              <div className="circle-play-pause">
                <i className="material-icons">stop</i>
              </div>
              <h6>{this.props.reverted ? (music_1 ? music_1.snippet.title : "...") : (music_2 ? music_2.snippet.title : "...")}</h6>
            </div>
          </div>
        </div>
        <ul className="collection">
          <ReactCSSTransitionGroup transitionName="fade-right" transitionEnterTimeout= {500} transitionLeaveTimeout= {500}>
            {items}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
};
