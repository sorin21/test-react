import React, { Component } from 'react';
import { render } from 'react-dom'
// import EmailEditor from 'react-email-editor';
import uuid from 'uuid';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      title: 'React Decision',
      subtitle: 'Decide what to do with React!',
      options: props.options
    }
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      }
    })
  }

  handlePick() {
    const random = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[random];
    console.log(option);
  }

  handleAddOption(option) {
    // if there is an empty string
    if(!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      // if we found a mach, our option already exists
      return 'This option already exists';
    } 

    this.setState((prevState) => {
      return {
        options: prevState.options.concat(option)
      }
    })
  }

  render() {
    return (
      <div>
        <Header 
          title={this.state.title}
          subtitle={this.state.subtitle}
        />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options  
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
        />
        <AddOption
          handleAddOption={this.handleAddOption} 
        />
      </div>
    );
  }
}

App.defaultProps = {
  options: []
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

Header.defaultProps = {
  title: 'some default'
}

const Action = (props) => {
  return(
      <div>
        <button 
          onClick={props.handlePick}
          disabled={!props.hasOptions}
        >Decide what to do with React!
        </button>
      </div>
    );
};



const Options = (props) => {
  return(
    <div>
      <button 
        onClick={props.handleDeleteOptions}
      >Remove All
      </button>
      <p>Options page</p>
      {props.options.map((option) => <Option key={option} option={option} />)}
    </div>
  );
}

const Option = (props) => {
  return(
    <div>
      <p>{props.option}</p>
    </div>
  );
}

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

    this.setState(() => {
      return {
        error: error
      }
    })
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


export default App;