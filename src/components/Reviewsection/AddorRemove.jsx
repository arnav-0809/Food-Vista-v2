import React,{useState} from "react";
import Review from "./Review";
import CreateReview from "./CreateReview";

function App() {

  const[notes,setNotes]=useState([]);


  function addNote(newNote){
    setNotes(prevNotes=>{
      return[...prevNotes,newNote];
    });
    console.log(newNote);
  }

  function deleteNote(id){
    setNotes(prevNotes=>{
      return prevNotes.filter((noteItem,index)=>{
        return index!==id;
      });
    });
  }

  return (
    <div>
      <CreateReview onAdd={addNote}/>
      {
        notes.map((note,index)=>{
        return <Review
        key={index}
        id={index}
        title={note.title}
        content={note.content}
        onDelete={deleteNote}
        />
      })
      }
    </div>
  );
}

export default App;
