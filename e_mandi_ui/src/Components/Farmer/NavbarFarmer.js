import React,{useEffect,useState} from 'react';
import { NavLink,Routes,Route } from "react-router-dom";
import {Navigate,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import "./Farmer.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import ViewAllFarmerOrders from "../Farmer/ViewAllFarmerOrders";
function NavbarFarmer() {
  const [authLog,setAuth]=useState(true);
  const f_id=localStorage.getItem("f_id");
  let navigate = useNavigate();
    useEffect(() => {
      const token=localStorage.getItem("token");
      const Role=localStorage.getItem("role");
      
      
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
    authLog?
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#">
            E-Mandi
            <i className="fa fa-leaf" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav>
              <NavLink className="navbar__link" to="/farmerdashboard"  style={({ isActive }) => ({
              color: isActive ? '#fff' : '#111111',
              background: isActive ? '#3bb78f' : '#fafafa',
            })}>
                Orders
              </NavLink>


              <NavLink className="navbar__link" to="/viewallproducts"  style={({ isActive }) => ({
              color: isActive ? '#fff' : '#111111',
              background: isActive ? '#3bb78f' : '#fafafa',
            })}>
                View Products
              </NavLink>

              <NavLink className="navbar__link" to="/addproduct"  style={({ isActive }) => ({
              color: isActive ? '#fff' : '#111111',
              background: isActive ? '#3bb78f' : '#fafafa',
            })}>
                Add Product
              </NavLink>

              <NavLink className="navbar__link" to="/previewhome"  style={({ isActive }) => ({
              color: isActive ? '#fff' : '#111111',
              background: isActive ? '#3bb78f' : '#fafafa',
            })}>
                Preview Home
              </NavLink>

              <NavLink className="navbar__link" to={`/updateprofile/${f_id}`}  style={({ isActive }) => ({
              color: isActive ? '#fff' : '#111111',
              background: isActive ? '#3bb78f' : '#fafafa',
            })}>
                Update Profile
              </NavLink>

              <NavLink className="logoutnavbar__link" to=""  onClick={()=> {
                swal({
                  title: "Are you sure?",
                  text: "Once Logout, you need to Login again for access dashboard!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                })
                .then((willDelete) => {
                  if (willDelete) {
        
                    swal("Logout Successfully!", {
                      icon: "success",
                    });
                    navigate("/ulogout");
                  } else {
                    navigate('/farmerdashboard');
                    //swal("Your imaginary file is safe!");
                  }
                });
              }} style={({ isActive }) => ({
              color: isActive ? '#111111' : '',
            })}>
             
                Logout
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
    </>:<Navigate to="/" replace />
  );
}
export default NavbarFarmer;
