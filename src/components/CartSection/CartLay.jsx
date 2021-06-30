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

  var[price,setPrice]=useState(JSON.parse(localStorage.getItem('PRICE')));
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
        <Col xs={12} sm={9} md={11} lg={8} className="menuHead">Order Details</Col>
      </Row>
      <Row className="justify-content-center">{databaseOrder.map((i)=>
      <div className="cart">
          {i.item.map((j)=><div>
          <h1>{j.item}</h1>
          <p>{j.count}</p>
          <button onClick={()=>handleClick(j.itemId)}><DeleteIcon/></button>
          </div>
        )}
        </div>
        )}
      </Row>
      <Row className="justify-content-center">
        <div className="cart">
          <h1 style={style}>Total Price   :</h1>
          <h1 style={stylePrice}>{price?price:0}</h1>
        </div>
      </Row>
    </Container>
  );
}

export default Cart;

