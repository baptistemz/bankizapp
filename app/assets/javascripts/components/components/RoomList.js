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
        <li className="waiting-list-icon" key={item.id}>
          <Link to={`/rooms/${item.slug}`}>{item.name}</Link>
        </li>
      )
    })
    return(
      <div>
        <div>Room list</div>
        <ul>
          {roomListItems}
        </ul>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchRoomList}, dispatch);
}

function mapStateToProps(state){
  return {
    room_list: state.room.room_list
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RoomList)
