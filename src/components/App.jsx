import React from "react";
import FirstCarousel from "./Carousel";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";

function App(){
    return (
        <div>
            <Header/>
            <FirstCarousel/>
            <Menu/>
            <Footer/>
        </div>
    );
}

export default App;