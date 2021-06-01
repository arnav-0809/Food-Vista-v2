import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import burger from "../images/burger.jpg";
import fries from "../images/fries.jpg";
import pizza from "../images/pizza1.png";

function FirstCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel className="change" activeIndex={index} onSelect={handleSelect} fade>
        <Carousel.Item >
          <img className="backg" src={burger}/>
          <img
            className="w-100"
            src={burger}
            alt="Chicken burger"
          />
          <Carousel.Caption>
            <p>Chicken burger</p>
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