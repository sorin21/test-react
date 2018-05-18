import React from 'react';

const Option = (props) => {
  return (
    <div>
      {props.option}
      <button onClick={(event) => {
        props.handleDeleteOption(props.option)
      }}>RemoveK
      </button>
    </div>
  );
}