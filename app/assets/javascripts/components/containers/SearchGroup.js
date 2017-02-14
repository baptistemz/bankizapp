import React from 'react';
import {Component} from 'react';
import SearchBar from './SearchBar';
import MusicSearchList from './MusicSearchList';

export default class SearchGroup extends Component {
  componentWillMount(){
    $('.modal').modal();
  }

  render() {
    return (
      <div className="text-center">
        <div id="search-btn">
          <div className="btn waves-effect waves-light modal-trigger" data-target="modal2">Hello</div>
        </div>
        <div id="modal2" className="modal">
          <div className="modal-content">
            <SearchBar />
            <MusicSearchList/>
          </div>
        </div>
      </div>
    );
  }
}