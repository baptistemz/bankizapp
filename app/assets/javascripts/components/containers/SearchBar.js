import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchMusics} from '../actions/index';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {term: ""};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  onInputChange(event){
    const input = event.target;
    const term = event.target.value;
    this.setState({term});
    const sendIfInputHasntChanged = function(term){
      if(document.getElementById('search').value === term ){
        this.props.fetchMusics(term)
      }
    }
    setTimeout(sendIfInputHasntChanged.bind(this,term), 500)
  }
  onFormSubmit(event){
    event.preventDefault();
    this.props.fetchMusics(this.state.term);
    this.setState({term: ''});
  }

  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <form onSubmit={this.onFormSubmit} className="col s8">
            <div className="input-field search-input-field">
              <input type="search"
                required
                id="search"
                className="form-control"
                value= {this.state.term}
                onChange= {this.onInputChange}/>
              <label htmlFor="search"><i className="material-icons">search</i></label>
              <i onClick={this.onFormSubmit} className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>

    )
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchMusics}, dispatch);
}
export default connect(null,mapDispatchToProps)(SearchBar)
