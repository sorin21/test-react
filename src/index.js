import React from 'react';
import ReactDOM from "react-dom";
import classes from "./index.css";
const App = () => {
  return <div className={classes.App}> Hello Test React!!</div>
}

ReactDOM.render(<App />, document.getElementById('app'))