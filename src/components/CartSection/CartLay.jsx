import React,{useState,useEffect} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import {Container,Row,Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";

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

  var price=0;
  var key=0;
  const[databaseOrder,setDatabaseOrder]=useState([]);
  const[place,setPlace]=useState(false);
  
  let keysToRemove=['BURGERITEM','PIZZAITEM','WAFFLEITEM','FRIESITEM','MOMOSITEM','SHAKESITEM','PASTRYITEM','PASTAITEM','ICECREAMITEM','BURGERPRICE','PIZZAPRICE','WAFFLEPRICE','FRIESPRICE','MOMOSPRICE','SHAKESPRICE','PASTRYPRICE','PASTAPRICE','ICECREAMPRICE']
  keysToRemove.forEach(k =>
  localStorage.removeItem(k))
  
  
  //deleting an item
  async function handleClick(itemId,id){
    const res=await axios.get(`/delete/${itemId}`)
    .then(
      fetchItems(),
      window.location.reload(false),
      );
  }


  const fetchItems= async ()=>{
    try{
    const res=await axios.get("/cart")
          .then(response=>setDatabaseOrder(response.data.orderDetails));
    }catch(err){
      console.log(err);
    }
  };

  const noOrder=()=>{
      toast.dark("Cart is empty", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        backgound:"rgb(52, 58, 64) !important"
        })
  }

  useEffect(()=>{
      fetchItems()
  },[]);
  
  if(place===true && databaseOrder.length!==0){
    return <Redirect to="/userdetails"/>
  }

  return (
    <div>
    <Header/>
    <ToastContainer/>
    <Container>
      <Row className="justify-content-center">
        <Col xs={11} sm={9} md={11} lg={8} className="menuHead">Order Details</Col>
      </Row>
       <Row className="justify-content-center">{databaseOrder && databaseOrder.map((i)=>
      <div className="cart">
          {i.item.map((j,index)=><div className="cartIn">
          <h1>Item Name : <p style={stylePrice}>{j.item}</p></h1>
          <h1>Item Count : <p style={stylePrice}>{j.count}</p></h1>
          <button className="cartButton" onClick={()=>handleClick(j.itemId,index)}><DeleteIcon/></button>
          <h1>Item Price : <p style={stylePrice}>Rs.{parseInt(j.price)*parseInt(j.count)}</p></h1>
          </div>
        )}
        </div>
        )}
      </Row>
      <Row className="justify-content-center">
        <div className="cart">
          <h1 style={style}>Total Price   :</h1>
          {databaseOrder && databaseOrder.map((i)=>
            {price+=i.price}
          )}
          <h1 style={stylePrice}>{price}</h1>
        </div>
      </Row>
      <Row className="justify-content-center">
          <button className="addToCart" onClickCapture={noOrder} onClick={()=>{setPlace(prev=>{return !prev})}}>Place Order</button>
      </Row>
    </Container>
  </div>
  );
}

export default Cart;

