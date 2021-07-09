import React,{useState} from "react";
import Header from "../Header"
import { TextField,Button } from "@material-ui/core";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
import {Redirect} from "react-router-dom";

function Details(){
    const [name,setName]=useState('');
    const [phone,setPhone]=useState('');
    const[home,setHome]=useState(false);
    const [address,setAddress]=useState({
        address:'',
        city:'',
        state:'',
        pin:''
    });
    
    const postData= async()=>{
        if(name!=='' && address.address!=="" && address.city!=="" && address.state!=="" && address.pin!=="" && phone!==""){
            toast.dark("Your order has been placed", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                backgound:"rgb(52, 58, 64) !important"
                });
        const res= await axios.post("/details",JSON.stringify({address:address,name:name,phone:phone}),{headers:{'Content-Type':'application/json'}})
        .then(setTimeout(()=>setHome(true),3000));
        }else{
            toast.dark("Fill in all the details", {
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
    }

    const handleChange = (prop) => (event) => {
        setAddress({ ...address, [prop]: event.target.value });
      };  
    

    if(home===true){
        return <Redirect to="/home"/>
    }

    return(
        <div>
            <Header/>
            <ToastContainer/>
            <div className="detail">
            <div>
                <span className="detailInstruction"><em>Fill in all the details:</em></span>
            </div>
            <div className="detail1">
            <TextField className="detailName" value={name} onChange={(e)=>setName(e.target.value)} id="outlined-basic" label="Name" placeholder="Enter Name" variant="outlined" />
            <TextField className="detailPhone" value={phone} onChange={(e)=>setPhone(e.target.value)} id="outlined-basic" label="Phone" 
             placeholder="Enter Phone No." variant="outlined" InputProps={{ inputProps: { type:"number",min:0} }} />
            </div>
            <div className="detail2">
            <TextField className="detailAddress" value={address.address} onChange={handleChange('address')} id="outlined-basic" label="Address" placeholder="Address" variant="outlined" />
            </div>
            <div className="detail3">
            <TextField className="detailCity" value={address.city} onChange={handleChange('city')} id="outlined-basic" label="City" placeholder="City" variant="outlined" />
            <TextField className="detailCity" value={address.state} onChange={handleChange('state')} id="outlined-basic" label="State" placeholder="State" variant="outlined" />
            <TextField className="detailCity pin" value={address.pin} onChange={handleChange('pin')}  id="outlined-basic" 
            label="Pin" placeholder="Pin" variant="outlined" InputProps={{ inputProps: { type:"number",min:0}}}/>
            </div>
            </div>
            <div className="detail4">
            <Button className="detailButton" onClick={postData}>Submit Details</Button>
            </div>
        </div>
    )
}

export default Details;