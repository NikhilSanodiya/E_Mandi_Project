import './Userreg.css';
import React from "react";
import { BrowserRouter as Router, Route, NavLink,Routes } from "react-router-dom";
import  CustomerRegForm  from './CustomerRegForm';
import FarmerRegForm from './FarmerRegForm';


function Userregistration()
{
    return (
        
        <div className="routeComponent">
          <div className="appForm">
            <div className="pageSwitcher">
            <NavLink
                to="*"
               
                className="pageSwitcherItem"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : '#111111',
                 
                })}>
              
                Customer
              </NavLink>
              <NavLink
                to="*/farmersignup"
              
                className="pageSwitcherItem"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : '#111111',
                })}>
            
                Farmer
              </NavLink>
             
            </div>
         
            <Routes>
            <Route  path="*" element={<CustomerRegForm/>} />
            <Route  path="*/farmersignup" element={<FarmerRegForm/>} />
           </Routes> 
        </div>
        </div>

      
    
  );
}

export default Userregistration;
