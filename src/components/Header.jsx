import React from "react";
import {Nav,Navbar} from "react-bootstrap";


function Header(){
return(
 <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
    <Navbar.Brand className="navHead" href="#">FoodVista</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link className="navItem" href="#home">Home</Nav.Link>
      <Nav.Link className="navItem" href="#Features">Features</Nav.Link>
      <Nav.Link className="navItem" href="#Pricing">Pricing</Nav.Link>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Header;