import React from 'react';
import Sign from './sign';


function Status(props) {
  if (props.draw) {
    return <div> Its a draw!</div>;
  }
  else {
    if (props.winner) {
      return <div> Winner: <Sign player={props.winner} /> </div>;
    } else {
      return <div> Player: <Sign player={props.nextPlayer} /> </div>;
    } 
  }
}

export default Status;
