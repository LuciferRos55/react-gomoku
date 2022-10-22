import React from 'react';


function MoveAD(props) {
  if (props.movead === 'A'){
    return (
      <div>
        <button className="btn btn-sm btn-primary pull-xs-right"
                onClick={() => props.onClick(props.asdes)}>
          Ascending order
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button className="btn btn-sm btn-primary pull-xs-right"
                onClick={() => props.onClick(props.asdes)}>
          Descending order
        </button>
      </div>
    );
  }
}

export default MoveAD;
