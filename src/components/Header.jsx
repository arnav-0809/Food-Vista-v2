import React from "react";
import {Nav,Navbar,NavDropdown} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";

function Header(){
return(
 <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
    <Link to="/home" style={{textDecoration:"none"}}>
      <Navbar.Brand className="navHead" href="#">FoodVista</Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Link to="/home" style={{textDecoration:"none"}}>
        <Nav.Link className="navItem" href="#Home">Home</Nav.Link>
      </Link>
      <NavDropdown title="Menu" id="basic-nav-dropdown" className="navItem">
        <Link to="/burgermenu" style={{textDecoration:"none"}}>
          <NavDropdown.Item href="#action/3.1" className="navItem" >Burger Menu</NavDropdown.Item>
        </Link>
        <Link to="/pizzamenu" style={{textDecoration:"none"}}>
          <NavDropdown.Item href="#action/3.1" className="navItem" >Pizza Menu</NavDropdown.Item>
        </Link>
        <Link to="/wafflemenu" style={{textDecoration:"none"}}>
          <NavDropdown.Item href="#action/3.1" className="navItem">Waffle Menu</NavDropdown.Item>
        </Link>
        <Link to="/friesmenu" style={{textDecoration:"none"}}>
          <NavDropdown.Item href="#action/3.1" className="navItem">Fries Menu</NavDropdown.Item>
        </Link>
        <Link to="/momosmenu" style={{textDecoration:"none"}}>
          <NavDropdown.Item href="#action/3.1" className="navItem">Momos Menu</NavDropdown.Item>
        </Link>
        <Link to="/shakesmenu" style={{textDecoration:"none"}}>
          <NavDropdown.Item href="#action/3.1" className="navItem">Shake Menu</NavDropdown.Item>
        </Link>
        <Link to="/pastrymenu" style={{textDecoration:"none"}}>
          <NavDropdown.Item href="#action/3.1" className="navItem">Pastry Menu</NavDropdown.Item>
        </Link>
        <Link to="/pastamenu" style={{textDecoration:"none"}}>
          <NavDropdown.Item href="#action/3.1" className="navItem">Pasta Menu</NavDropdown.Item>
        </Link>
        <Link to="/icecreammenu" style={{textDecoration:"none"}}>
          <NavDropdown.Item href="#action/3.1" className="navItem">IceCream Menu</NavDropdown.Item>
        </Link>
      </NavDropdown>
      <Link to="/review" style={{textDecoration:"none"}}>
        <Nav.Link className="navItem" href="#reviews">Reviews</Nav.Link>
      </Link>
      <Link to="/cart" style={{textDecoration:"none"}}>
      <Nav.Link className="navItem" href="#Cart">Cart</Nav.Link>
      </Link>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Header;