import React from 'react';

const MusicListItem = (props) => {
  const music = props.music
  const imgUrl = music.snippet.thumbnails.default.url
  const background = {backgroundImage:`url(${imgUrl})`}
  return(
      <li className="col s12 m6 l4">
        <div className= 'card'>
          <div className="card-image">
            <div style={background} ></div>
            <p className="card-title truncate-block">{music.snippet.title}</p>
            <p className='video-duration'>{music.duration}</p>
          </div>
          <div className="card-action">
            <a href="#" rel="no-refresh" onClick= {props.onVideoSelect}><i className="material-icons">play_arrow</i>play next</a>
            <a href="#" rel="no-refresh" onClick= {props.addVideoToList}><i className="material-icons">playlist_add</i>add to list</a>
          </div>
        </div>
      </li>
  );
};

export default MusicListItem
