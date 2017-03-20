import React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'halogen/RingLoader';
import {fetchRoomList} from '../actions/index'
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }
  componentWillMount(){
    this.props.fetchRoomList()
  }
  componentWillReceiveProps(nextProps){
    this.setState({loaded: true})
  }
  render(){
    const roomListItems = this.props.room_list.map((item) => {
      return(
        <li className="collection-item avatar" key={item.id}>
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
        <li className="collection-item avatar" key={item.id}>
          <img src="/mix_table.png" alt="" className="circle avatar-sizing"/>
          <span className="title">{item.name}</span>
          <p>by @{item.dj}</p>
          <Link to={`/rooms/${item.slug}`} className="btn list-element-btn">Enter</Link>
        </li>
      )
    })
    if(this.state.loaded){
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
    }else{
      return (
        <div className="loader-container full-page-loader">
          <Loader color="#2F9EE2" size="50px" margin="4px"/>
        </div>
      )
    }
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
