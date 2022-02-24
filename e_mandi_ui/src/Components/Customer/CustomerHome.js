import React, { useEffect, useState } from "react"
import { Navigate } from 'react-router-dom';
import NavBarHomepage from "../../Layout/HomePageLayout/NavBarHomepage";
import ProductCard from '../../Layout/HomePageLayout/ProductCard';
import NavbarAfterLogin from './NavbarAfterLogin';


function CustomerHome() {
  const [authLog,setAuth]=useState(true);
  const token=localStorage.getItem("token");
  const Role=localStorage.getItem("role");
  useEffect(() => {
    console.log(token);
    console.log(Role);
    if(token===null && Role!="farmer")
    {
      setAuth(false);
    }
    else
    {
      setAuth(true);
    }
  },[]);
  return (
  
    authLog?<>
    <NavbarAfterLogin/>
    <ProductCard/>
    </>:<><NavBarHomepage/> <ProductCard/></>
  );
}
export default CustomerHome;