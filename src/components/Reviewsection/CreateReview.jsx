import React,{useState}from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom"

function CreateArea(props) {

  const[isExpanded,setExpanded]=useState(false);

  const[newNote,addNewNote]=useState({
    title:"",
    content:""
  });

  function addItem(event){
    const{name,value}=event.target;

    addNewNote(prevItems=>{
      return{
        ...prevItems,
        [name]:value
      }
    })
  }

  function submit(event){
    props.onAdd(newNote);
    addNewNote({
      title:"",
      content:""
    })

    event.preventDefault();
  }

  function expand(){
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && <input name="title" autocomplete="off" onChange={addItem} value={newNote.title} placeholder="Title"/>}
        <textarea name="content" onClick={expand} onChange={addItem} value={newNote.content} placeholder="Take a note..." rows={isExpanded?3:1} />
        <Zoom in={isExpanded}><Fab onClick={submit}><AddIcon/></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
