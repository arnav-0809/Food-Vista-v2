import React, { useState,useEffect } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

function Review(props) {
   
   const[sameUser,setSameUser]=useState(false);
   const fetchData=async()=>{
     const res=await axios.get("/reviewdelete")
     .then((response)=>{
       if(response.data.username===props.username)
       {
         setSameUser(true);
       }
     });
   }

  function handleClick(){
    props.onDelete(props.id,props.reviewid);
  }
  
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="review">
      <h1>{props.username}</h1>
      <h3><em>{props.title}</em></h3>
      <p>{props.content}</p>
      {sameUser &&<button onClick={handleClick}><DeleteIcon/></button>}
    </div>
  );
}

export default Review;
