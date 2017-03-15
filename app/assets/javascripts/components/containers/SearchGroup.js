import React from 'react';
import {Component} from 'react';
import SearchBar from './SearchBar';
import {Link} from 'react-router';
import MusicSearchList from './MusicSearchList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class SearchGroup extends Component {
  componentDidMount(){
    $('.modal').modal();
  }

  render() {
    return (
      <div className="text-center">
        <Link to={`/rooms/${this.props.params.roomId}/`} id="search-btn">
          <div className="btn-floating waves-effect waves-light modal-trigger" data-target="modal2"><i className="material-icons">clear</i></div>
        </Link>
        <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
          <SearchBar />
          <MusicSearchList/>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
