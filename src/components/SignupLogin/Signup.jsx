import React,{useState} from 'react';
import {IconButton,OutlinedInput,InputLabel,InputAdornment,FormControl,TextField,Button} from '@material-ui/core';
import {Visibility,VisibilityOff,AccountCircle,Lock} from '@material-ui/icons';
import {Navbar} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';


function Signup(){
    const [values, setValues] = useState({
      password: '',
      showPassword: false,
    });
    let isValid=false;
    const[email,setEmail]=useState('');
    const[passwordMatch,setPasswordMatch]=useState(false);
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(!pattern.test(email))
    {
      isValid=false;
    }
    else
    {
      isValid=true;
    }

    const body=JSON.stringify({
      username:email,
      password:values.password
    });
  
    const postItems= async()=>{
    try{
      if(values.password===revalues.password && values.password!=='' && isValid)
      {
       const request=await axios.post("http://localhost:8080/register",body,{
         headers: {'Content-Type': 'application/json' }
       });
      setPasswordMatch(true);
      }
    else if(!isValid)
     {
      toast.dark("Enter a valid email", {
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
    else if(values.password==='')
    {
      toast.dark("Please enter the passowrd", {
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
    else if(!passwordMatch)
    {
      toast.dark("Passwords don't match!", {
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
   catch(err){
   }}
    
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [revalues, setReValues] = useState({
      password: '',
      showPassword: false,
    });
    
    const reHandleChange = (prop) => (event) => {
      setReValues({ ...revalues, [prop]: event.target.value });
    };
    
    const reHandleClickShowPassword = () => {
      setReValues({ ...revalues, showPassword: !revalues.showPassword });
    };
    
    const reHandleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    if(passwordMatch)
    {
      return <Redirect to="/home"/>
    }
      
return (
    <div>
        <Navbar bg="dark" variant="dark">
           <Navbar.Brand className="navHead">FoodVista</Navbar.Brand>
        </Navbar>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
       <div className="signup">
          <h1 className="signUpHead">SignUp</h1>
          <TextField className="signupEmail" value={email} onChange={(e) => setEmail(e. target. value)} id="outlined-basic" label="E-mail" placeholder="Email" variant="outlined" InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <AccountCircle style={{"color":"rgb(21, 22, 24)"}}/>
            </InputAdornment>
          ),
          }}/>
          <FormControl className="signupPassword" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput placeholder="Password"
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onChange={handleChange('password')}
              startAdornment={
                <InputAdornment position="start">
              <Lock style={{"color":"rgb(21, 22, 24)"}}/>
            </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl className="signupPassword" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Re-enter password</InputLabel>
            <OutlinedInput placeholder="Re-enter password"
              id="outlined-adornment-password"
              type={revalues.showPassword ? 'text' : 'password'}
              value={revalues.password}
              onChange={reHandleChange('password')}
              startAdornment={
                <InputAdornment position="start">
              <Lock style={{"color":"rgb(21, 22, 24)"}}/>
            </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={reHandleClickShowPassword}
                    onMouseDown={reHandleMouseDownPassword}
                    edge="end"
                  >
                    {revalues.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={135}
            />
          </FormControl>
          <Link to="/" className="signupLink"><p className="signupLink">Already signed up ? Click to login</p></Link>
          <Button onClick={postItems} variant="contained" className="signupButton">
            <span>Signup</span>
          </Button>
          </div>
        </div>
    );
}

export default Signup;