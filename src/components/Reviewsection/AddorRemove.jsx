import React,{useEffect, useState} from "react";
import Review from "./Review";
import CreateReview from "./CreateReview";
import Header from "../Header";
import axios from "axios";

function App(props) {

  const[databaseReviews,setDatabaseReviews]=useState([]);

  const postItems=async(newReview)=>{
    const res= await axios.post("http://localhost:8080/review",JSON.stringify({title:newReview.title,content:newReview.content}), {headers:{'Content-Type':'application/json'}});
  }

  const fetchData=async()=>{
    const {data,username}=await axios.get("http://localhost:8080/review");
    setDatabaseReviews(data);
  }

  function addReview(newReview){
    setDatabaseReviews(prevReviews=>{
      return[...prevReviews,newReview];
    });
  }
  const url=window.location.search;
  async function deleteReview(id,reviewid){
    // setDatabaseReviews(prevReviews=>{
    //   return prevReviews.filter((reviewItem,index)=>{
    //     return index!==id;
    //   });
    // });
    console.log(reviewid);
    try{
    const res= await axios.get(`http://localhost:8080/review/${reviewid}`)
    .then(
      fetchData(),
      window.location.reload(false),
      )
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchData();
  },[databaseReviews]);

  return (
    <div>
      <Header/>
      <CreateReview onAdd={addReview} onClick={postItems}/>
      {
        databaseReviews.map((review,index)=>{
        return <Review
        key={index}
        id={index}
        username={review.username}
        reviewid={review.reviewid}
        title={review.title}
        content={review.content}
        onDelete={deleteReview}
        />
      })
      }
    </div>
  );
}

export default App;
