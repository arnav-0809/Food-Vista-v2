import React from "react";
import Header from "../Header";
import Cart from "./CartLay";
import Burger from "../MenuSection/MenuCard/Burger"
import {BrowserRouter as Router,Route} from "react-router-dom";

function App(){
    return(
        <Router>
        <div>
        <Route to="/" component={Home}/>
        </div>
        </Router>
    );
}

const Home=()=> (     
    <div> 
        <Header/>
        <Cart/>
    </div> 
);

export default App;