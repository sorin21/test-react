import React from 'react';
import ReactDOM from "react-dom";
import App from "./app";
// import classes from "./index.css";
import 'normalize.css/normalize.css';
import './styles/styles.scss';


// const App = () => {
//   return <div className={classes.App}> Hello Test React!!</div>
// }

ReactDOM.render(<App />, document.getElementById('app'))