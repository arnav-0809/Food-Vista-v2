import React,{useState} from 'react';
import {IconButton,OutlinedInput,InputLabel,InputAdornment,FormControl,TextField,Button} from '@material-ui/core';
import {Visibility,VisibilityOff,AccountCircle,Lock} from '@material-ui/icons';
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function Signup(){
    const [values, setValues] = useState({
      password: '',
      showPassword: false,
    });

    const[passwordMatch,setPasswordMatch]=useState(false);


    const wrongPassword=()=>{
      if(!passwordMatch)
      {
        alert("passwords don't match");
      }
      else if(values.password==='' || revalues.password==='')
      {
        alert("please enter the password");
      }
    }

    const passwordCheck=()=>{
      if(values.password===revalues.password && values.password!=='')
      setPasswordMatch(true);
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
      
return (
    <div>
        <Navbar bg="dark" variant="dark">
           <Navbar.Brand className="navHead">FoodVista</Navbar.Brand>
        </Navbar>
       <div className="signup">
          <h1 className="signUpHead">SignUp</h1>
          <TextField className="signupEmail" id="outlined-basic" label="E-mail" type="email" placeholder="Email" variant="outlined" InputProps={{
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
          <Button onMouseEnter={passwordCheck} onClick={wrongPassword} variant="contained" className="signupButton">
            {passwordMatch?<Link to="/home" style={{textDecoration:"none",color:"rgb(52, 58, 64)"}}>Signup </Link>:<span>Signup</span>}
          </Button>
          </div>
        </div>
    );
}

export default Signup;