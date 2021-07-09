import React,{useState,useEffect} from "react";
import {Card,Col,Row} from "react-bootstrap";
import axios from "axios";

function CardLay(props){
var[total,setValue]=useState(0);
var[items,setItems]=useState([]);

function increase(){
    setValue(prev=>{
        props.cart(props.id,props.name,props.price,prev+1);
        return prev+1;
    })    
}

//updating the count of the food items by retrieving data from database
const fetchItems= async ()=>{
    try{
        const res=await axios.get("/cart")
            .then(response=>setItems(response.data.orderDetails));
    }catch(err){
          console.log(err);
    }
};

const item4=()=>{items &&items.map((i)=>
          i.item.map((j)=>{
            //    console.log(j);
              if(j.count!==null && props.name===j.item)
              {
                  setValue(prev=>{
                      return (prev+j.count);
                    })
                    return total;
              }else
              {
                  return total;
              }
            })
        )};



useEffect(()=>{
    fetchItems();
},[]);

useEffect(()=>{
    item4();
},[items]);


function decrease(){
    if(total>0)
    setValue(prev=>{
        props.cart(props.id,props.name,props.price,prev-1);
        return prev-1;
    })
}

//rendering the page
return(
<Col xs={8} sm={7} md={4} lg={3} className="contain">
<Card className="items">
    <Card.Img className="itemsIMG" varient="top" src={props.img} alt={props.alt}/>
    <Card.Body>
    <Card.Title><em>{props.name}</em></Card.Title>
    <Card.Text className="priceText">Rs.{props.price}</Card.Text>
    </Card.Body>
</Card>
<Row className="justify-content-center addorrem">
<button className="addrem" onClick={decrease}>-</button>
<input className="inputs" value={total} size="1" readOnly/>
<button className="addrem" onClick={increase} >+</button>
</Row>
</Col>
);
}

export default CardLay;