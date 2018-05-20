import React from 'react';

const Option = (props) => {
  return (
    <div className="option">
      <p className="option__text">{props.count}. {props.option}</p>
      <button
        className="button button--link"
        onClick={(event) => props.handleDeleteOption(props.option)}> remove
      </button>
    </div>
  );
}


export default Option;

