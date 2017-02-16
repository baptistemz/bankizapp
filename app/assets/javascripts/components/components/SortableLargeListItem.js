import React, {Component} from 'react';
import { sortable } from 'react-sortable';

class LargeListItem extends React.Component{

  deleteFromList(music){
    this.props.deleteMusicFromList(music)
  }
  onDrop(){
    this.props.printListOrder(this.props.room_id, this.props.list)
  }
  render() {
    const childProps = this.props.children
    const {room_id, printListOrder, deleteMusicFromList, ...otherProps} = this.props;
    return (
      <li {...otherProps} onDrop={this.onDrop.bind(this)} className="collection-item movable avatar" key={childProps.etag}>
        <img src="/youtube_icon.png" alt="" className="circle avatar-sizing"/>
        <span className="title">{childProps.snippet.title}</span>
        <p>youtube</p>
        <a href="#" className="secondary-content" onClick={this.deleteFromList.bind(this, childProps)}><i className="material-icons">delete</i></a>
      </li>
    )
  }
}
export default sortable(LargeListItem)
