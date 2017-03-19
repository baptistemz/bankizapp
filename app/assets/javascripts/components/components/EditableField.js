import React, { Component } from 'react';

class EditableField extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: this.props.value,
      editMode: false
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({text: nextProps.value})
  }
  edit(){
    this.setState({ editMode: true })
  }
  freeze(){
    this.setState({text: this.props.value, editMode: false})
  }
  onInputChange(event){
    const text = event.target.value;
    this.setState({ text });
  }
  onFormSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.props.type, this.state.text);
    this.freeze()
  }

  renderParagraph(){
    return(
      <div className='frozen-field space-around align-items'>
        <p>{this.props.value}</p>
        <i className="material-icons" onClick={this.edit.bind(this)}>edit</i>
      </div>
    )
  }
  renderInput(){
    return(
      <div >
        <form onSubmit={this.onFormSubmit.bind(this)} className='edit-field space-around align-items'>
          <input type="text" value={this.state.text} onChange={this.onInputChange.bind(this)}/>
          <i className="material-icons" onClick={this.onFormSubmit.bind(this)}>done</i>
          <i className="material-icons" onClick={this.freeze.bind(this)}>clear</i>
        </form>
      </div>
    )
  }
  render(){
    return(
      <div>
        {this.state.editMode ? this.renderInput() : this.renderParagraph()}
      </div>
    );
  }
};

export default EditableField
