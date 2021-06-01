import React from "react";
import {Facebook,Instagram,LinkedIn,Email} from "@material-ui/icons";

function Footer(){
const color={
    color:"rgb(240, 94, 94)"
};

return(
<footer>
   <h3 style={color}>About Us</h3>
   E-mail : foodvista@gmail.com<br/>
   Phone : 981234567,0128405432<br/>
   Address : <span>Menlo park, South Street, Delhi, India</span><br/>
   Social-media handles :
   <a href="#" className="face"><Facebook/></a>
   <a href="#" className="insta"><Instagram/></a>
   <a href="#" className="linked"><LinkedIn/></a>
   <a href="#" className="email"><Email/></a>
   <br/>
   &copy;copyrights 2021 Food Vista<br/> 
 </footer>
 );
}

export default Footer;