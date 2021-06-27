import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";


function FirstCarousel() {
    return (
      <Carousel className="change" fade>
        <Carousel.Item>
          <img className="backg" src="images/burger.jpg"/>
          <img
            className="w-100"
            src="images/burger.jpg"
            alt="Chicken Burger"
          />
          <Carousel.Caption>
            <p>Chciken Burger</p>
            <em>now with new chilly sauce</em>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="backg" src="images/pizza1.png"/>
          <img
            className="w-100"
            src="images/pizza1.png"
            alt="Pizza"
          />
          <Carousel.Caption>
            <p>Pepperoni pizza</p>
            <em>freshly baked and served hot</em>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <img className="backg" src="images/fries.jpg"/>
          <img
            className="w-100"
            src="images/fries.jpg"
            alt="Cheesy fries"
          />
  
          <Carousel.Caption>
            <p>Cheesy fries</p>
            <em>crispy and served hot</em>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
 export default FirstCarousel;