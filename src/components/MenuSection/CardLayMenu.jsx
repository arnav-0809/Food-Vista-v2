import React,{useState} from "react";
import {Card,Col,Row} from "react-bootstrap";

function CardLay(props){
var[total,setValue]=useState(0);
var[items,addItems]=useState({
    name:"",
    total:total
})

function increase(event){
    event.preventDefault();
    setValue(prev=>{
        props.cart(props.name,prev+1);
        return prev+1;
    })
    
}

function decrease(event){
    if(total>0)
    setValue(prev=>{
        props.cart(props.name,prev-1);
        return prev-1;
    })
}

return(
<Col xs={7} sm={7} md={4} lg={3} className="contain">
<Card bg="dark" className="items">
    <Card.Img className="itemsIMG" varient="top" src={props.img} alt={props.alt}/>
    <Card.Body>
    <Card.Title><em>{props.name}</em></Card.Title>
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