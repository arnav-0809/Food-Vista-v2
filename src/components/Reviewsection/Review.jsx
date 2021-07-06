import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function Review(props) {

  function handleClick(){
    props.onDelete(props.id,props.reviewid);
  }


  return (
    <div className="review">
      <h1>{props.username}</h1>
      <h3><em>{props.title}</em></h3>
      <p>{props.content}</p>
      <button onClick={handleClick}><DeleteIcon/></button>
    </div>
  );
}

export default Review;
