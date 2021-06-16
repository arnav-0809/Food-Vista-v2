import React,{useState} from "react";
import {Container,Row,Col} from "react-bootstrap";
import CardLay from "../CardLayMenu";
import burger from "../menudetails/Burger";



function Menu(){

var[items,setItems]=useState([]);
var[totalPrice,setTotalPrice]=useState(0);

function cart(item,price,count){ 
    var hello=0;
    if(items.length===0)
    {
        setItems([...items,{item,count}]);
    }
    
    for(let i=0;i<items.length;i++)
    {
        if(items[i].item===item)
        {
            let counter=0;
            counter=items[i].count;
            items[i].count=count;
            setTotalPrice(prev=>{
                if(count>counter)
                return parseInt(prev)+parseInt(price);
                else
                return parseInt(prev)-parseInt(price);
            })
            hello=1;
        }
        if(items[i].count===0)
        {
            items.splice(i,1);
        }
    }
    if(hello===0)
    {
        setItems([...items,{item,count}]);
        setTotalPrice(prev=>{
            return parseInt(prev)+parseInt(price);
        })
    }
    
}

console.log(items,totalPrice);


return(
<Container>
    <Row className="justify-content-center">
        <Col xs={12} sm={9} md={11} lg={8} className="menuHead">BurgerMenu</Col>
    </Row>
{/*1st row*/}
    <Row className="justify-content-center">
        {burger.slice(0,3).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
                price={item.price}
                cart={cart}
            />))}
    </Row>

{/*2nd row*/}
    <Row className="justify-content-center">
    {burger.slice(3,6).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
                price={item.price}
                cart={cart}
            />))}
    </Row>

{/*3rd row*/}
    <Row className="justify-content-center">
    {burger.slice(6,9).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
                price={item.price}
                cart={cart}
            />))}
    </Row>
</Container>
    );
}

export default Menu;