import React,{useEffect,useState} from "react";
import FirstCarousel from "./Carousel";
import Header from "../Header";
import Menu from "./Menu";
import Review from "../Reviewsection/AddorRemove";
import Burger from "../MenuSection/MenuCard/Burger";
import Fries from "../MenuSection/MenuCard/Fries";
import IceCream from "../MenuSection/MenuCard/IceCream";
import Momos from "../MenuSection/MenuCard/Momos";
import Pasta from "../MenuSection/MenuCard/Pasta";
import Pastry from "../MenuSection/MenuCard/Pastry";
import Pizza from "../MenuSection/MenuCard/Pizza";
import Shakes from "../MenuSection/MenuCard/Shakes";
import Waffle from "../MenuSection/MenuCard/Waffle";
import Cart from "../CartSection/CartLay";
import Login from "../SignupLogin/Login";
import Signup from "../SignupLogin/Signup";
import Details from "../DetailsSection/Details"
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios"

function App(){

    return (
        <Router>
        <div>
            <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/userreview" component={ReviewFood}/>
            <Route path="/burgermenu" component={BurgerFood}/>
            <Route path="/friesmenu" component={FriesFood}/>
            <Route path="/icecreammenu" component={IceCreamFood}/>
            <Route path="/momosmenu" component={MomosFood}/>
            <Route path="/pastamenu" component={PastaFood}/>
            <Route path="/pastrymenu" component={PastryFood}/>
            <Route path="/pizzamenu" component={PizzaFood}/>
            <Route path="/shakesmenu" component={ShakesFood}/>
            <Route path="/wafflemenu" component={WaffleFood}/>
            <Route path="/usercart" component={CartFood}/>
            <Route path="/userdetails" component={DetailsFood}/>
            </Switch>
        </div>
        </Router>
    );
}

function CheckLogin(){
const[login,setLogin]=useState(true);
    
    const fetchLogin=async()=>{
        const res=await axios.get("/user")
        .then(response=>{
            if(response.data.username.length===0)
            {
                setLogin(false);
            }
        });
    }

    useEffect(()=>{
        fetchLogin();
    },[])
  if(login){
      return true;
  }else{
      return false;
  }
}

const Home=()=> {
    const login=CheckLogin();
    
    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }
    
    return (
    <div> 
        <Header/>
        <FirstCarousel/>
        <Menu/>
    </div>
    );
 };


 const ReviewFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Review/>
     );
 }


const BurgerFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Burger/>
     );
 }
 

const FriesFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Fries/>
     );
 }


const IceCreamFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <IceCream/>
     );
 }


const MomosFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Momos/>
     );
 }


const PastaFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Pasta/>
     );
 }


const PastryFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Pastry/>
     );
 }


const PizzaFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Pizza/>
     );
 }


const ShakesFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Shakes/>
     );
 }


const WaffleFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Waffle/>
     );
 }


const CartFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Cart/>
     );
 }


 const DetailsFood=()=>{
    const login=CheckLogin();

    if(login===false)
    {
        toast.dark("Log in first", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            backgound:"rgb(52, 58, 64) !important"
    });
        
        return <Redirect to="/"/>   
    }


     return(
         <Details/>
     );
 }


export default App;