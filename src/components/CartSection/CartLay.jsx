import React,{useState,useEffect} from "react";
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
  const[databaseOrder,setDatabaseOrder]=useState([]);
  

  localStorage.removeItem('ITEM');
  localStorage.removeItem('PRICE');

  async function postData(){
     if(order!==null)
     {
       const request= await fetch("http://localhost:8080",{
         method:'POST',
         body:JSON.stringify({
           item:order,
           price:price
         }),
         headers:{"Content-Type":"application/json"}
     })
     .then(function(request){
         return request.json()
       })
     .then(function(body){
         console.log(body);
       });
   }
  }
  useEffect(()=>{postData()},[]); 

  async function getData(){
    const response= await fetch("http://localhost:8080");
    const data=await response.json();
    
    // console.log(data);
    return data;
  }
  useEffect(()=>{
    getData()
    .then(res=>setDatabaseOrder(res))
  },[]);

  

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={9} md={11} lg={8} className="menuHead">Order Details</Col>
      </Row>
      <Row className="justify-content-center">{databaseOrder.map((i)=>
        <div className="cart">
        {i.item && <h1>{i.item[0].item}</h1>}
        {i.item &&<p>{i.item[0].count}</p>}
        {i.item &&<p>{i.price}</p>}
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
