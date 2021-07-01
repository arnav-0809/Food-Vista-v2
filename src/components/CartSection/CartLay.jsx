import React,{useState,useEffect} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import {Container,Row,Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Cart() {

  const style={
    display:"inline-block",
    marginRight:"20px"
  }

  const stylePrice={
    display:"inline-block",
    fontWeight:"bold",
    color:"rgb(138, 137, 137)"
  }

  var[price,setPrice]=useState();
  var[databaseOrder,setDatabaseOrder]=useState([]);

  if(databaseOrder.length===0){
    localStorage.removeItem('ITEM');
    localStorage.removeItem('PRICE');
  }
  
  //deleting an item
  async function handleClick(itemId){
    const res=await axios.get(`http://localhost:8080/delete/${itemId}`)
    .then(
      fetchItems()
    );
  }

  const fetchItems= async ()=>{
    const {data}=await axios.get("http://localhost:8080")
    setDatabaseOrder(data);
  };

  useEffect(()=>{
      fetchItems()
  },[]);

  


  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={11} sm={9} md={11} lg={8} className="menuHead">Order Details</Col>
      </Row>
      <Row className="justify-content-center">{databaseOrder.map((i)=>
      <div className="cart">
          {i.item.map((j)=><div className="cartIn">
          <h1>Item Name : <p style={stylePrice}>{j.item}</p></h1>
          <h1>Item Count : <p style={stylePrice}>{j.count}</p></h1>
          <button className="cartButton" onClick={()=>handleClick(j.itemId)}><DeleteIcon/></button>
          <h1>Item Price : <p style={stylePrice}>Rs.{parseInt(j.price)*parseInt(j.count)}</p></h1>
          </div>
        )}
        </div>
        )}
      </Row>
      <Row className="justify-content-center">{databaseOrder.map((i)=>
        <div className="cart">
          <h1 style={style}>Total Price   :</h1>
          <h1 style={stylePrice}>{i.price?i.price:0}</h1>
        </div>
        )}
      </Row>
    </Container>
  );
}

export default Cart;

