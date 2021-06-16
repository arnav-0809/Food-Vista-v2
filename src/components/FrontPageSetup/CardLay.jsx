import React from "react";
import {Card,Col} from "react-bootstrap";
import {Link} from "react-router-dom"

function CardLay(props){
const address=props.alt+"menu";
return(
<Col xs={7} sm={7} md={4} lg={3} className="contain">
<Card bg="dark" className="items">
    <Card.Img className="itemsIMG" varient="top" src={props.img} alt={props.alt}/>
    <Card.Body>
    <Card.Title><em>{props.name}</em></Card.Title>
    </Card.Body>
</Card>

{/* overlay effect */}
<Link to={address}><div className="overlay">
    <p className="overlayText">Click to Order on {props.name} now!!</p>
</div></Link>
</Col>
);
}

export default CardLay;
