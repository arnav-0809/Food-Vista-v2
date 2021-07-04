import React,{useState,useEffect} from 'react';
import {IconButton,OutlinedInput,InputLabel,InputAdornment,FormControl,TextField,Button} from '@material-ui/core';
import {Visibility,VisibilityOff,AccountCircle,Lock} from '@material-ui/icons';
import {Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link,Redirect} from "react-router-dom";
import axios from "axios";

function Login(){
    const [values, setValues] = useState({
      password: '',
      showPassword: false,
    });
    
    const[email,setEmail]=useState('');
    const[login,setLogin]=useState(false);

    const body=JSON.stringify({
      username:email,
      password:values.password
    });
  
    const postItems = async ()=>{
      try{
          const res = await axios.post('http://localhost:8080/login', body, {headers:{'Content-Type':'application/json'}});
          setLogin(res.data.success);
      }
      catch(err){
          console.log("Error :", err);
      }
  }

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    if(login)
    {
      return <Redirect to="/home"/>
    }
      
return (
    <div>
        <Navbar bg="dark" variant="dark">
           <Navbar.Brand className="navHead">FoodVista</Navbar.Brand>
        </Navbar>
       <div class="login">
          <h1 className="loginHead">LogIn</h1>
          <TextField className="loginEmail" name="loginusername" value={email} onChange={(e) => setEmail(e. target. value)} id="outlined-basic" label="Email" type="email" placeholder="Email" variant="outlined" 
          InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <AccountCircle style={{"color":"rgb(21, 22, 24)"}}/>
            </InputAdornment>
          ),
          }}/>
          <FormControl className="loginPassword" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput placeholder="Password"
              id="outlined-adornment-password"
              name="loginpassword"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
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
          <Link to="/signup" className="loginLink"><p className="loginLink">Haven't signed up yet? Click here</p></Link>
          <Button onClick={postItems} variant="contained" className="loginButton">
             <span>Login</span>
          </Button>
        </div>
      </div>
    );
}

export default Login;