import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {fetchRoomList} from '../actions/index'
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

class RoomList extends Component {
  componentWillMount(){
    this.props.fetchRoomList()
  }
  render(){
    const roomListItems = this.props.room_list.map((item) => {
      return(
        <li className="collection-item movable avatar" key={item.id}>
          <img src="/mix_table.png" alt="" className="circle avatar-sizing"/>
          <span className="title">{item.name}</span>
          <p>by @{item.dj}</p>
          <Link to={`/rooms/${item.slug}`} className="btn list-element-btn">Enter</Link>
          <a href="#" className="secondary-content"><i className="material-icons">delete</i></a>
        </li>
      )
    })
    const contributionListItems = this.props.contribution_list.map((item) => {
      return(
        <li className="collection-item movable avatar" key={item.id}>
          <img src="/mix_table.png" alt="" className="circle avatar-sizing"/>
          <span className="title">{item.name}</span>
          <p>by @{item.dj}</p>
          <Link to={`/rooms/${item.slug}`} className="btn list-element-btn">Enter</Link>
        </li>
      )
    })
    return(
      <div className="room-list-page">
        <div className="header">
          <h1>Rooms</h1>
        </div>
        <div className="container">
          <h2>The rooms you created</h2>
          <ul className="collection">
            {roomListItems}
          </ul>
        </div>
        <div className="container">
          <h2>The rooms you visited/contributed to</h2>
          <ul className="collection">
            {contributionListItems}
          </ul>
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRoomList}, dispatch);
}

function mapStateToProps(state){
  return {
    room_list: state.room.room_list,
    contribution_list: state.room.contribution_list
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RoomList)
