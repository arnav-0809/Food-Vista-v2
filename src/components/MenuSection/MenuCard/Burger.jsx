import React,{useState,useEffect} from "react";
import {Container,Row,Col} from "react-bootstrap";
import CardLay from "../CardLayMenu";
import burger from "../menudetails/Burger";
import axios from "axios";



function Menu(){

var[items,setItems]=useState([]);
var[totalPrice,setTotalPrice]=useState(0);
var[databaseOrder,setDatabaseOrder]=useState([]);
  

//posting data to database
  const body=JSON.stringify({
    id:1,
    item:items,
    price:totalPrice
  });


  const postItems= async()=>{
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
            localStorage.setItem('ITEM',JSON.stringify([...items,{itemId,item,count,price}]));
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
                    localStorage.setItem('PRICE',JSON.stringify(parseInt(prev)+parseInt(price)));
                    return parseInt(prev)+parseInt(price);
                }
                else{
                    localStorage.setItem('PRICE',JSON.stringify(parseInt(prev)-parseInt(price)));
                    return parseInt(prev)-parseInt(price);
                }
            })
            
            hello=1;
        }
        if(items[i].count===0)
        {
            items.splice(i,1);
        }
        localStorage.setItem('ITEM',JSON.stringify([...items]));

    }
    if(hello===0)
    {

        setItems([...items,{itemId,item,count,price}]);
        localStorage.setItem('ITEM',JSON.stringify([...items,{itemId,item,count,price}]));

        setTotalPrice(prev=>{
            localStorage.setItem('PRICE',JSON.stringify(parseInt(prev)+parseInt(price)));
            return parseInt(prev)+parseInt(price);
        })
    }
}

// console.log(items,totalPrice);

//updating the local storage on refreshing by retrieving data from database
const fetchData= async ()=>{
    const{data}=await axios.get("http://localhost:8080")
    setDatabaseOrder(data);
 
};

const item2=()=>{databaseOrder && databaseOrder.map((i)=>{
    i.item.map((j)=>{
        // console.log(j);
         setItems(prev=>{
            localStorage.setItem('ITEM',JSON.stringify([...prev,j])); 
            return [...prev,j]
        });
      });
    setTotalPrice(prev=>{
            localStorage.setItem('PRICE',JSON.stringify(prev+i.price));
            return prev+i.price;
        })
    })
};

useEffect(()=>{
    fetchData();
},[]);


useEffect(()=>{
item2();
},[databaseOrder]);


//rendering the page 
return(
<Container>
    <Row className="justify-content-center">
        <Col xs={12} sm={9} md={11} lg={8} className="menuHead">BurgerMenu</Col>
    </Row>
{/*1st row*/}
    <Row className="justify-content-center">
        {burger.slice(0,3).map((item)=>(
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
    {burger.slice(3,6).map((item)=>(
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
    {burger.slice(6,9).map((item)=>(
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
    );
}

export default Menu;