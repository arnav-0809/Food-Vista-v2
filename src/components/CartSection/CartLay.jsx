import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import 

function Cart(props) {

  function handleClick(){
    props.onDelete(props.id);
  }


  return (
    <div className="review">
      <h1>hello</h1>
      <p>wow</p>
      <button onClick={handleClick}><DeleteIcon/></button>
    </div>
  );
}

export default Cart;
