import React from 'react'
import classes from './Actions.scss';

const Action = (props) => {
  return(
      <div>
        <button 
          className = {classes.bigButton}
          onClick={props.handlePick}
          disabled={!props.hasOptions}
        >Decide what to do with React!
        </button>
      </div>
    );
};

export default Action;