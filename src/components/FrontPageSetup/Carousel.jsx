import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import burger from "../../images/burger.jpg";
import pizza from "../../images/pizza1.png";
import fries from "../../images/fries.jpg"

function FirstCarousel() {
    return (
      <Carousel className="change" fade>
        <Carousel.Item>
          <img className="backg" src={burger}/>
          <img
            className="w-100"
            src={burger}
            alt="Chicken Burger"
          />
          <Carousel.Caption>
            <p>Chciken Burger</p>
            <em>now with new chilly sauce</em>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="backg" src={pizza}/>
          <img
            className="w-100"
            src={pizza}
            alt="Pizza"
          />
          <Carousel.Caption>
            <p>Pepperoni pizza</p>
            <em>freshly baked and served hot</em>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item >
          <img className="backg" src={fries}/>
          <img
            className="w-100"
            src={fries}
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