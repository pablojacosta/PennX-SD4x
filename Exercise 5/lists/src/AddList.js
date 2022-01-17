import React, { Component } from 'react';

class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: {
        name: ''
      }
    };
    this.inputRef = React.createRef();
  };

  handleInputChange(e) {
    this.setState({newList: {name: e.target.value}})
  }

  handleSubmit(e) {
      e.preventDefault(); // this prevents the page from reloading -- do not delete this line!
      if (this.inputRef.current.value !== "" && !this.props.lists.includes(this.inputRef.current.value)) {
        this.setState({newList: 
          {
          name: this.state.newList.name
          }
        }, function() {
          this.props.addList(this.state.newList);
        });
      } else if (this.props.lists.includes(this.inputRef.current.value)) {
        alert("That list already exists.")
      }
      
  }

  render() {
    return (
      <div id="addListDiv">
      <form onSubmit={this.handleSubmit.bind(this)}>
      <div id='addList'>
      <label>What will be on your next list?&nbsp;
      <input type='text' ref={this.inputRef} onChange={this.handleInputChange.bind(this)} id='newID'></input>
      </label>
      </div><br />
      <input type='submit' value='Create List' />
      </form>
      </div>
    );
  }
}

export default AddList;
