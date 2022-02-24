import React from 'react';
import {Link,NavLink} from 'react-router-dom';
import {BiCaretRight} from 'react-icons/bi';
import { Nav } from 'react-bootstrap';
const Sidebar = () => {
    return (
        <>
        <br />
        
         <div className="adminBox">
            <Nav>
            <ul >
               
               <li className="nav" id="adminLinks" > 
               <NavLink className="navbar__link" to="/viewallcustomers" ><BiCaretRight />All Customers</NavLink></li> 
               <li className="nav" id="adminLinks"> 
               <NavLink className="navbar__link" to="/viewallfarmers" ><BiCaretRight />All Farmers</NavLink></li>
               <li className="nav" id="adminLinks"> 
               <NavLink className="navbar__link" to="/viewallvegetables" ><BiCaretRight />Vegetables</NavLink></li>
               <li className="nav" id="adminLinks"> 
               <NavLink className="navbar__link" to="/viewallorders" ><BiCaretRight />All Orders</NavLink></li>
               <li className="nav" id="adminLinks"> 
               <NavLink className="navbar__link" to="/feedback" ><BiCaretRight />Feedback</NavLink></li>
               
               {/* <li className="nav-item mb-2"> <BiCaretRight /><Link to="/viewallcustomers"><span className="ml-3">All Customer</span></Link></li>
                <li className="nav-item mb-2"><BiCaretRight /><Link to="/viewallfarmers"><span className="ml-3">All Farmer</span></Link></li>
                <li className="nav-item mb-2"><BiCaretRight /><Link to="/viewallvegetables"><span className="ml-3">Vegetables</span></Link></li>
                <li className="nav-item mb-2"><BiCaretRight /><Link to="/viewallorders"><span className="ml-3">All Orders</span></Link></li>
                <li className="nav-item mb-2"><BiCaretRight /><Link to="/feedback"><span className="ml-3">Feedback</span></Link></li> */}
            </ul>
            </Nav>
       </div>

       </>
    )
}
 
export default Sidebar