import React,{useState} from "react";
import {Container,Row,Col} from "react-bootstrap";
import CardLay from "../CardLayMenu";
import pasta from "../menudetails/Pasta";

function Menu(){

var[items,setItems]=useState([]);

function cart(item,count){ 
    var hello=0;
    if(items.length===0)
    {
        setItems([...items,{item,count}]);
    }
    
    for(let i=0;i<items.length;i++)
    {
        if(items[i].item===item)
        {
            items[i].count=count;
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
    }
}

console.log(items);

return(
<Container>
    <Row className="justify-content-center">
        <Col xs={10} sm={9} md={11} lg={8} className="menuHead">PastaMenu</Col>
    </Row>
{/*1st row*/}
    <Row className="justify-content-center">
        {pasta.slice(0,3).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
                cart={cart}
            />))}
    </Row>

{/*2nd row*/}
    <Row className="justify-content-center">
    {pasta.slice(3,6).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
                cart={cart}
            />))}
    </Row>

{/*3rd row*/}
    <Row className="justify-content-center">
    {pasta.slice(6,9).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
                cart={cart}
            />))}
    </Row>
</Container>
    );
}

export default Menu;