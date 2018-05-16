import React, { Component } from 'react';
import { render } from 'react-dom'
import EmailEditor from 'react-email-editor';
import uuid from 'uuid';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Test React',
      subtitle: 'Learn React by testing it.',
      options: ['Item one', 'Item two'],
      // name: 'Andrei',
      age: 17,
      count: 0,
      id: uuid()
    }
    this.getLocation = this.getLocation.bind(this);
    this.exportHTML = this.exportHTML.bind(this);
    this.addOne = this.addOne.bind(this);
    this.minusOne = this.minusOne.bind(this);
    this.resetCount = this.resetCount.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.editor = React.createRef();
  }

  getLocation(location) {
    if(location) {
      return <p>Location: {location}</p>
    }
  }

  addOne() {
    this.setState(() => ({
      count: this.state.count + 1
    }))
  }

  minusOne() {
    this.setState(() => ({
      count: this.state.count - 1
    }))
  }

  resetCount() {
    this.setState(() => ({
      count: 0
    }))
  }

  onInputChange(event) {

  }

  onFormSubmit(event) {
    event.preventDefault();
    const option = event.target.elements.option.value;
    const newArray = this.state.options.push(option);
    this.setState(() => ({
      options: newArray
    }))
  }


  exportHTML() {
    this.editor.exportHTML((data) => {
      const {design, html} = data;
      console.log('exportHMLT', html);
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.subtitle}</p>
        
        <hr />

        <h3>{this.state.name? this.state.name : 'Anonymous'}</h3>
        {this.state.age > 18 && <p>User Age: {this.state.age} </p>}
        {this.getLocation(this.state.location)}

        {this.state.options.length > 0 ? 'Here are your options' : 'No options'}
        <p>Options length: {this.state.options.length}</p>
        <ul>
          {this.state.options.map((option) => {
            return
            <li key={option}>{option}</li>
          })}
        </ul>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" name="option" onChange={this.onInputChange} />
          <button>Add Option</button>
        </form>
        
        <TemplateTwo 
          count={this.state.count}
          addOne={this.addOne}
          minusOne={this.minusOne}
          resetCount={this.resetCount}
        />

        {/* <h1>react email editor Demo</h1>

        <div>
          <button onClick={this.exportHTML}>Export HTML</button>
        </div>
        <EmailEditor 
          ref={editor => this.editor = editor}
        /> */}
      </div>
    );
  }
}

const TemplateTwo = (props) => (
  <div>
    <h1>Count: {props.count}</h1>
    <button onClick={props.addOne}>+1</button>
    <button onClick={props.minusOne}>-1</button>
    <button onClick={props.resetCount}>Reset Count</button>
  </div>
)



export default App;