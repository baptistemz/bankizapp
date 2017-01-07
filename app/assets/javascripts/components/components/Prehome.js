import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createRoom} from '../actions/index';
import slugify from '../slugify'

class Prehome extends Component {
  goToRoom(event) {
    event.preventDefault()
    this.props.createRoom(slugify(this.roomInput.value))
    // this.context.router.push(`/room/${this.roomInput.value}`)
  }

  render() {
    return (
      <form className="connect" onSubmit={this.goToRoom.bind(this)}>
        <label htmlFor="">Room Name</label>
        <input type="text" required placeholder="room" ref={(input) => {this.roomInput = input}} />
        <button type="submit">Connect</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({createRoom}, dispatch);
}
export default connect(null, mapDispatchToProps)(Prehome)
