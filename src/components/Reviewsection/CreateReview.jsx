import React,{useState,useRef}from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom"
import {Overlay,Tooltip} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateArea(props) {

  const[isExpanded,setExpanded]=useState(false);
  const[show,setShow]=useState(false);
  const target = useRef(null);
  const[newReview,addNewReview]=useState({
    title:"",
    content:""
  });

  function addItem(event){
    const{name,value}=event.target;

    addNewReview(prevItems=>{
      return{
        ...prevItems,
        [name]:value
      }
    })
  }

  function submit(event){
    if(newReview.title!=="" && newReview.content!==""){
      props.onAdd(newReview);
      props.onClick(newReview);
      setExpanded(false);
      setShow(false);
    }
    else{
      setShow(true);
      setTimeout(()=>setShow(false),3000);
    }
    addNewReview({
      title:"",
      content:""
    });

    event.preventDefault();
  }

  function expand(){
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-review">
        {isExpanded && <input name="title" autoComplete="off" onChange={addItem} value={newReview.title} placeholder="Title" autoFocus/>}
        <textarea name="content" onClick={expand} onChange={addItem} value={newReview.content} placeholder="Write us a review..." rows={isExpanded?3:1} />
        <Zoom in={isExpanded}><Fab ref={target} onClick={submit}><AddIcon/></Fab></Zoom>
        {show && <Overlay target={target.current} show={show} placement="left">
           {(props) => (
              <Tooltip {...props}>
                 <span className="missingText">Fill in the missing details</span>
                 <button onClick={()=>setShow(false)} className="missingButton">x</button>
              </Tooltip>
            )}
        </Overlay>}
      </form>
    </div>
  );
}

export default CreateArea;
