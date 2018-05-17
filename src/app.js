import React, { Component } from 'react';
import { render } from 'react-dom'
import EmailEditor from 'react-email-editor';
import uuid from 'uuid';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      title: 'React Decision',
      subtitle: 'Decide what to do with React!',
      options: ['Item one', 'Item two', 'Item four']
    }
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
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
        <AddOption />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return(
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends Component {
 
  render() {
    return(
      <div>
        <button 
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}
        >Decide what to do with React!
        </button>
      </div>
    );
  }
}

class Options extends Component {
  render() {
    return(
      <div>
        <button 
          onClick={this.props.handleDeleteOptions}
        >Remove All
        </button>
        <p>Options page</p>
        {this.props.options.map((option) => <Option key={option} option={option} />)}
      </div>
    );
  }
}

class Option extends Component {
  render() {
    return(
      <div>
        <p>{this.props.option}</p>
      </div>
    );
  }
}

class AddOption extends Component {
  handleAddOption(event) {
    event.preventDefault();
    const option = event.target.elements.option.value.trim();
    console.log(option);
  }
  render() {
    return(
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}



export default App;