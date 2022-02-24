import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, {useState,useEffect } from 'react';
import Login from './Components/Admin/Login';
import Homepage from './Components/Admin/Homepage';
import { Navbar } from 'react-bootstrap';
import Navigationbar from './Layout/Navigationbar';
import FooterNav from './Layout/FooterNav';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import ViewAllCustomers from './Components/Admin/ViewAllCustomers';
import ViewAllFarmers from './Components/Admin/ViewAllFarmers';
import ViewAllVegetables from './Components/Admin/ViewAllVegetables';
import ViewAllOrders from './Components/Admin/ViewAllOrders';
import ProductCard from './Layout/HomePageLayout/ProductCard';
import NavbarFarmer from './Components/Farmer/NavbarFarmer';
import ProceedToCheckout from './Components/Customer/ProceedToCheckout';
import NavBarHomepage from './Layout/HomePageLayout/NavBarHomepage';
import Userlogin from './Components/Userlogin/Userlogin';
import Feedback from './Components/Admin/Feedback';
import ViewAllFarmerOrders from "./Components/Farmer/ViewAllFarmerOrders";
import ViewAllProducts from "./Components/Farmer/ViewAllProducts";
import UpdateProduct from "./Components/Farmer/UpdateProduct";
import AddNewProduct from './Components/Farmer/AddNewProduct';
import Updateprofile from './Components/Farmer/Updateprofile';
import Userregistration from './Components/Userregister/Userregistration';
import CustomerRegForm from './Components/Userregister/CustomerRegForm';
import FarmerRegForm from './Components/Userregister/FarmerRegForm';
import Logout from './Components/Admin/ALogout';
import ALogout from './Components/Admin/ALogout';
import ULogout from './Components/Userlogin/ULogout';
import NavbarAfterLogin from './Components/Customer/NavbarAfterLogin';
import CustomerHome from './Components/Customer/CustomerHome';
import ViewCart from './Components/Customer/ViewCart';
import CustomerOrders from './Components/Customer/CustomerOrders';
import CUpdateprofile from './Components/Customer/CUpdateprofile';
import CustFeedback from './Components/Customer/CustFeedback';
import CustomerTransaction from './Components/Customer/CustomerTransaction';
import PreviewHome from './Components/Farmer/PreviewHome';
// import {Route,Routes} from 'react-router-dom';
// import ViewAllCustomers from './Components/Admin/ViewAllCustomers';
// import ViewAllOrders from './Components/Admin/ViewAllOrders';
// import ViewVegetables from './Components/Admin/ViewVegetables';



function App() {
  //const navigate = useNavigate();

  

  return (
    <div className="App">
      <Routes>
        {/* Admin */}
        <Route path="/alogout" exact element={<ALogout/>} />
        </Routes>
  
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/homepage" element={<Homepage />} /> */}
        <Route path="/viewallcustomers" element={<ViewAllCustomers />} />
        <Route path="/viewallfarmers" element={<ViewAllFarmers />} />
        <Route path="/viewallorders" element={<ViewAllOrders />} />
        <Route path="/viewallvegetables" element={<ViewAllVegetables />} />
        <Route path="/feedback" element={<Feedback />} />
        </Routes>
        {/* <Navigate to="/adminlogin" replace /> */}
        <Routes>
        {/* Both user */}
        <Route path="/" exact element={<CustomerHome/>} />
        <Route path="/userlogin" element={<Userlogin />} />
        <Route path="/userregistration/*" element={<Userregistration/>} /> 
        <Route path="/ulogout" exact element={<ULogout/>} />

        {/* Farmer */}
        <Route path="/farmerdashboard" element={< ViewAllFarmerOrders/>} />
        {/* <Route path="/orders" element={<ViewAllFarmerOrders/>} />  */}
        <Route path="/viewallproducts" element={<ViewAllProducts/>} />        
        
        <Route path="/updateproduct/:v_id" element={<UpdateProduct/>} />        
        <Route path="/updateprofile/:f_id" element={<Updateprofile/>} />        
        <Route path="/addproduct" element={<AddNewProduct/>} />     
        <Route exact path="/viewcart" element={<ViewCart/>} />     
        <Route exact path="/checkout" element={<ProceedToCheckout/>} />     
        <Route exact path="/customerorders" element={<CustomerOrders/>} />     
        <Route exact path="/previewhome" element={<PreviewHome/>} />     

        {/* Customer */}
        <Route path="/cupdateprofile/:c_id" element={<CUpdateprofile/>} /> 
        <Route path="/cfeedback" element={<CustFeedback/>} /> 
      </Routes>  
    </div>
  );
}

export default App;
