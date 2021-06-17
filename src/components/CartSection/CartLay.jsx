import React,{useState} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import {burgerOrder,burgerPrice} from "../MenuSection/MenuCard/Burger"


function Cart(props) {

  // function handleClick(){
  //   props.onDelete(props.id);
  // }
  const style={
    color:"white"
  }

  var[order,setOrder]=useState(JSON.parse(localStorage.getItem('ITEM')));
  var[price,setPrice]=useState(JSON.parse(localStorage.getItem('PRICE')));

  return (
    <div>
      {order.map((item)=>
      <div>
      <h1 style={style}>{item.item}</h1>
      <p style={style}>{item.count}</p>
      </div>
      )}
      <p style={style}>{price}</p>
    </div>
    // wow.map((item)=>
    // <div className="review">
    //   <h1>{item.item}</h1>
    //   <p>{item.count}</p>
    //   <button onClick={handleClick}><DeleteIcon/></button>
    // </div>
    // )
  );
}

export default Cart;
