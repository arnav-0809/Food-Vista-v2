import React from "react";
import {Container,Row,Col,Card} from "react-bootstrap";
import CardLay from "./CardLay";
import itemParents from "./MainpageComp";

function Menu(){
return(
<Container>
    <Row className="justify-content-center">
        <Col xs={7} sm={7} md={11} lg={8} className="menuHead">Menu</Col>
    </Row>
{/*1st row*/}
    <Row className="justify-content-center">
        {itemParents.slice(0,3).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
            />))}
    </Row>

{/*2nd row*/}
    <Row className="justify-content-center">
    {itemParents.slice(3,6).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
            />))}
    </Row>

{/*3rd row*/}
    <Row className="justify-content-center">
    {itemParents.slice(6,9).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
            />))}
    </Row>
</Container>
    );
}

export default Menu;