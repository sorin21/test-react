import React, { Component } from 'react';
import { render } from 'react-dom'
class AddOption extends Component {
  constructor(props) {
    super();
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddOption(event) {
    event.preventDefault();
    const option = event.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error: error}))

    if(!error) {
      event.target.elements.option.value = '';
    }
  }
  render() {
    return(
      <div>
        <p>{this.state.error}</p>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

export default AddOption;