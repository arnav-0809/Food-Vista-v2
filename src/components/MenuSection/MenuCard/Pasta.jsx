import React,{useState,useEffect} from "react";
import {Container,Row,Col} from "react-bootstrap";
import CardLay from "../CardLayMenu";
import pasta from "../menudetails/Pasta";
import Header from "../../Header";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

function Menu(){

var[items,setItems]=useState([]);
var[totalPrice,setTotalPrice]=useState(0);
var[databaseOrder,setDatabaseOrder]=useState([]);
  

//posting data to database
  const body=JSON.stringify({
    id:8,
    item:items,
    price:totalPrice
  });


  const postItems= async()=>{
    if(items.length!==0)
    {
      toast.dark("Order has been placed to cart", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          backgound:"rgb(52, 58, 64) !important"
          });
    }else{
      toast.dark("No food items selected", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          backgound:"rgb(52, 58, 64) !important"
          });

    }
     const request=await axios.post("http://localhost:8080",body,{
    headers: {'Content-Type': 'application/json' }
  });
 }

//Cart fuctioning and adding items and price to local storage
function cart(itemId,item,price,count){ 
    var hello=0;
    if(items.length===0)
    {
            setItems([...items,{itemId,item,count,price}]);
            localStorage.setItem('PASTAITEM',JSON.stringify([...items,{itemId,item,count,price}]));
    }
    
    for(let i=0;i<items.length;i++)
    {
        if(items[i].item===item)
        {
            let counter=0;
            counter=items[i].count;
            items[i].count=count;
            setTotalPrice(prev=>{
                if(count>counter)
                {
                    localStorage.setItem('PASTAPRICE',JSON.stringify(parseInt(prev)+parseInt(price)));
                    return parseInt(prev)+parseInt(price);
                }
                else{
                    localStorage.setItem('PASTAPRICE',JSON.stringify(parseInt(prev)-parseInt(price)));
                    return parseInt(prev)-parseInt(price);
                }
            })
            
            hello=1;
        }
        if(items[i].count===0)
        {
            items.splice(i,1);
        }
        localStorage.setItem('PASTAITEM',JSON.stringify([...items]));

    }
    if(hello===0)
    {

        setItems([...items,{itemId,item,count,price}]);
        localStorage.setItem('PASTAITEM',JSON.stringify([...items,{itemId,item,count,price}]));

        setTotalPrice(prev=>{
            localStorage.setItem('PASTAPRICE',JSON.stringify(parseInt(prev)+parseInt(price)));
            return parseInt(prev)+parseInt(price);
        })
    }
}

// console.log(items,totalPrice);

//updating the local storage on refreshing by retrieving data from database
const fetchData= async ()=>{
    try{
        const res=await axios.get("http://localhost:8080/cart")
              .then(response=>setDatabaseOrder(response.data.orderDetails));
        }catch(err){
          console.log(err);
        }
 
};

const item2=()=>{databaseOrder && databaseOrder.map((i)=>{
    if(parseInt(i.id)===8){
    i.item.map((j)=>{
        // console.log(j);
         setItems(prev=>{
            localStorage.setItem('PASTAITEM',JSON.stringify([...prev,j])); 
            return [...prev,j]
        });
      });
    setTotalPrice(prev=>{
            localStorage.setItem('PASTAPRICE',JSON.stringify(prev+i.price));
            return prev+i.price;
        })
   } })
};

useEffect(()=>{
    fetchData();
},[]);


useEffect(()=>{
item2();
},[databaseOrder]);


//rendering the page
return(
<div>
<Header/>
<ToastContainer/>
<Container>
    <Row className="justify-content-center">
        <Col xs={10} sm={9} md={11} lg={8} className="menuHead">PastaMenu</Col>
    </Row>
{/*1st row*/}
    <Row className="justify-content-center">
        {pasta.slice(0,3).map((item)=>(
            <CardLay
                key={item.id}
                id={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
                price={item.price}
                cart={cart}
            />))}
    </Row>

{/*2nd row*/}
    <Row className="justify-content-center">
    {pasta.slice(3,6).map((item)=>(
            <CardLay
                key={item.id}
                id={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
                price={item.price}
                cart={cart}
            />))}
    </Row>

{/*3rd row*/}
    <Row className="justify-content-center">
    {pasta.slice(6,9).map((item)=>(
            <CardLay
                key={item.id}
                id={item.id}
                name={item.name}
                img={item.imgURL}
                alt={item.alt}
                price={item.price}
                cart={cart}
            />))}
    </Row>

{/* 4th row */}
    <Row className="justify-content-center">
          <button className="addToCart" onClick={postItems}>Add to Cart</button>
    </Row>
</Container>
</div>
    );
}

export default Menu;