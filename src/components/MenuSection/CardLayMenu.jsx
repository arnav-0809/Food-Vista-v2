import React from "react";
import {Card,Col} from "react-bootstrap";

function CardLay(props){
return(
<Col xs={7} sm={7} md={4} lg={3} className="contain">
<Card bg="dark" className="items">
    <Card.Img className="itemsIMG" varient="top" src={props.img} alt={props.alt}/>
    <Card.Body>
    <Card.Title><em>{props.name}</em></Card.Title>
    </Card.Body>
</Card>
</Col>
);
}

export default CardLay;