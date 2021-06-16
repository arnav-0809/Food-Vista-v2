import React from "react";
import {Nav,Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";

function Header(){
return(
 <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
    <Link to="/" style={{textDecoration:"none"}}>
      <Navbar.Brand className="navHead" href="#">FoodVista</Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Link to="/" style={{textDecoration:"none"}}>
        <Nav.Link className="navItem" href="#home">Home</Nav.Link>
      </Link>
      <Link to="/review" style={{textDecoration:"none"}}>
        <Nav.Link className="navItem" href="#reviews">Reviews</Nav.Link>
      </Link>
      <Nav.Link className="navItem" href="#Pricing">Pricing</Nav.Link>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Header;