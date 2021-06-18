import React,{useState} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import {burgerOrder,burgerPrice} from "../MenuSection/MenuCard/Burger"
import {Container,Row,Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart(props) {

  // function handleClick(){
  //   props.onDelete(props.id);
  // }
  const style={
    color:"white",
  }

  var[order,setOrder]=useState(JSON.parse(localStorage.getItem('ITEM')));
  var[price,setPrice]=useState(JSON.parse(localStorage.getItem('PRICE')));

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={9} md={11} lg={8} className="menuHead">Order Details</Col>
      </Row>
      <Row className="justify-content-center">{order.map((item)=>
        <div className="cart">
        <h1>{item.item}</h1>
        <p>{item.count}</p>
        </div>
        )}
      </Row>
      <Row className="justify-content-center">
        <p style={style}>{price}</p>
      </Row>
    </Container>
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
