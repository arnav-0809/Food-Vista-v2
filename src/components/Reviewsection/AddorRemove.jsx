import React,{useState} from "react";
import Review from "./Review";
import CreateReview from "./CreateReview";

function App() {

  const[reviews,setReviews]=useState([]);


  function addReview(newReview){
    setReviews(prevReviews=>{
      return[...prevReviews,newReview];
    });
    console.log(newReview);
  }

  function deleteReview(id){
    setReviews(prevReviews=>{
      return prevReviews.filter((reviewItem,index)=>{
        return index!==id;
      });
    });
  }

  return (
    <div>
      <CreateReview onAdd={addReview}/>
      {
        reviews.map((review,index)=>{
        return <Review
        key={index}
        id={index}
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
