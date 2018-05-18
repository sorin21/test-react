import React, { Component } from 'react';
import { render } from 'react-dom'
import uuid from 'uuid';
import AddOption from './components/AddOption';
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
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('option');
      const options = JSON.parse(json);
      this.setState(() => ({ options }))
    } catch (error) {
      
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
      console.log('componentDidUpdate');
    }
  }
  

  handleDeleteOptions() {
    this.setState(() => ({ options: []}));
  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      // we set the options array with its old values and filter it
      options: prevState.options.filter((option) => {
        // return true to keep the item in array or false to no keep
        return optionToRemove !== option;

      })
    }))
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
          handleDeleteOption={this.handleDeleteOption}
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
      {props.options.map((option) => (
        <Option 
          key={option} 
          option={option} 
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
    </div>
  );
}






export default App;