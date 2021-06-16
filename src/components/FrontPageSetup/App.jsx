import React from "react";
import FirstCarousel from "./Carousel";
import Header from "../Header";
import Menu from "./Menu";
import Review from "../Reviewsection/AddorRemove"
import Burger from "../MenuSection/MenuCard/Burger"
import Fries from "../MenuSection/MenuCard/Fries"
import IceCream from "../MenuSection/MenuCard/IceCream"
import Momos from "../MenuSection/MenuCard/Momos"
import Pasta from "../MenuSection/MenuCard/Pasta"
import Pastry from "../MenuSection/MenuCard/Pastry"
import Pizza from "../MenuSection/MenuCard/Pizza"
import Shakes from "../MenuSection/MenuCard/Shakes"
import Waffle from "../MenuSection/MenuCard/Waffle"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App(){
    return (
        <Router>
        <div>
            <Header/>
            <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/review" component={Review}/>
            <Route path="/burgermenu" component={Burger}/>
            <Route path="/friesmenu" component={Fries}/>
            <Route path="/icecreammenu" component={IceCream}/>
            <Route path="/momosmenu" component={Momos}/>
            <Route path="/pastamenu" component={Pasta}/>
            <Route path="/pastrymenu" component={Pastry}/>
            <Route path="/pizzamenu" component={Pizza}/>
            <Route path="/shakesmenu" component={Shakes}/>
            <Route path="/wafflemenu" component={Waffle}/>
            </Switch>
        </div>
        </Router>
    );
}

const Home=()=> (     
    <div> 
        <FirstCarousel/>
        <Menu/>
    </div> 
);

export default App;