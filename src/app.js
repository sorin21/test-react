import React, { Component } from 'react';
import { render } from 'react-dom'
import ReactDOM from "react-dom";

import uuid from 'uuid';
import AddOption from './components/AddOption';
import Header from './components/Header';
import Action from './components/Action';
import Options from './components/Options';

class App extends Component {
  state = {
    id: uuid(),
    title: 'React Decision',
    subtitle: 'Decide what to do with React!',
    options: []
  }

  componentDidMount = () => {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      
      if(options) {
        this.setState(() => ({ options }))
        console.log(options);
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
      console.log('componentDidUpdate');
    }
  }
  

  handleDeleteOptions = () => {
    this.setState(() => ({ options: []}));
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      // we set the options array with its old values and filter it
      options: prevState.options.filter((option) => {
        // return true to keep the item in array or false to no keep
        return optionToRemove !== option;

      })
    }))
  }

  handlePick = () => {
    const random = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[random];
    console.log(option);
  }

  handleAddOption = (option) => {
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
        <div className="container">
          <Action 
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget" >
            <Options  
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption} 
            />
          </div>
        </div>
      </div>
    );
  }
}


export default App;