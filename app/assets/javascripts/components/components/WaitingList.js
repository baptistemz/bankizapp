import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SortableLargeListItem from './SortableLargeListItem'

export default class WaitingList extends Component{
  constructor(props){
    super(props);
    this.state = {
      draggingIndex: null,
      list: props.list
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({draggingIndex:nextProps.draggingObject.draggingIndex, list:nextProps.draggingObject.items})
  }
  componentDidMount(){
    $('.modal').modal();
  }
  updateState(obj){
    this.setState({draggingIndex:obj.draggingIndex, list: obj.items})
    this.props.changeListOrder(obj);
  }
  render(){
    const smallListItems = this.props.list.map((item) => {
      return(
        <li className="waiting-list-icon" key={item.etag}>
          <img src="/youtube_icon.png" alt="" className="circle avatar-sizing"/>
          <p className="hover-chip truncate">
            {item.snippet.title}
          </p>
        </li>
      )
    })
    const childProps = {list: this.state.list, room_id: this.props.roomId, printListOrder: this.props.printListOrder, deleteMusicFromList: this.props.deleteMusicFromList}
    const largeListItems = this.props.list.map(function(item, i) {
      return (
        <SortableLargeListItem
          key={i}
          updateState={this.updateState.bind(this)}
          items={this.props.list}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="list"
          childProps={childProps}
          >{item}</SortableLargeListItem>
      );
    }, this);
    return(
      <div className="list-container">
        <ul className="list-inline">
          <h6 className= 'margin-left-10'>Waiting list</h6>
          <div id="list-detail-gradient"></div>
          <div id="list-detail-btn">
            <div className="btn waves-effect waves-light modal-trigger" data-target="modal1"><i className="material-icons">queue_music</i> details</div>
          </div>
          <div className="truncate-list">
            <ReactCSSTransitionGroup transitionName="fade-up" transitionEnterTimeout= {500} transitionLeaveTimeout= {500}>
              {smallListItems}
            </ReactCSSTransitionGroup>
          </div>
        </ul>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <div>
              <h3>Waiting list</h3>
              <ul className="collection">
                <ReactCSSTransitionGroup transitionName="fade-right" transitionEnterTimeout= {500} transitionLeaveTimeout= {500}>
                  {largeListItems}
                </ReactCSSTransitionGroup>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
