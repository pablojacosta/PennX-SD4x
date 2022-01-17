import React, { Component } from 'react';

class AddItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.idName,
      newItem:{}
    }
    this.inputRef = React.createRef();
  }

  handleInputChange(e) {
    this.setState({newItem: e.target.value})
  }

  handleSubmit(e) {
      e.preventDefault(); // this prevents the page from reloading -- do not delete this line!
      console.log("handleSubmit ~ this.inputRef.current.value", this.inputRef.current.value)
      console.log(this.props.items)
      console.log(this.props.items.some(item => item.name === this.inputRef.current.value))

      if (this.inputRef.current.value !== "" && !this.props.items.some(item => item.name === this.inputRef.current.value)) {
        this.setState(
          {
          name: this.state.name,
          newItem: this.state.newItem
          }, function() {
          this.props.addItem(this.state)
          console.log("handleSubmit ~ this.state", this.state)
        })
      } else if (this.props.items.some(item => item.name === this.inputRef.current.value)) {
        alert("That item already exists.")
      }

      
      
  }
    

  render() {
    var divName = 'add' + this.props.idName;
    return (
      <div className='addItemDiv'>
      <h4>Add {this.props.idName}</h4>
      <form ref='form' onSubmit={this.handleSubmit.bind(this)}>
      <div id={divName} ref={divName}>
        <label>Name</label><br />
        <input type='text' ref={this.inputRef} onChange={this.handleInputChange.bind(this)} />
        </div>
        <br />
        <input type='submit' value='Submit' />
        <br />
      </form>
      </div>
    );
  }

}

export default AddItem;
