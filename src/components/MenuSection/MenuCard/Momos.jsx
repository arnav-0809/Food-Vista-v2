import React from "react";
import {Container,Row,Col} from "react-bootstrap";
import CardLay from "../CardLayMenu";
import momos from "../menudetails/Momos";

function Menu(){
return(
<Container>
    <Row className="justify-content-center">
        <Col xs={10} sm={9} md={11} lg={8} className="menuHead">MomosMenu</Col>
    </Row>
{/*1st row*/}
    <Row className="justify-content-center">
        {momos.slice(0,3).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
            />))}
    </Row>

{/*2nd row*/}
    <Row className="justify-content-center">
    {momos.slice(3,6).map((item)=>(
            <CardLay
                key={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
            />))}
    </Row>

{/*3rd row*/}
    <Row className="justify-content-center">
    {momos.slice(6,9).map((item)=>(
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