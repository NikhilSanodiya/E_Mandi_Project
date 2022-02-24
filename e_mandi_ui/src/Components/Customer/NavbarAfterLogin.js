import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import React, { useState } from "react";
import swal from 'sweetalert';
import {useNavigate } from 'react-router-dom';
import { NavLink, Link } from "react-router-dom";
import ProductCard from "../../Layout/HomePageLayout/ProductCard";
import axios from "axios";
function NavbarAfterLogin() {
  const [customers, setCustomers] = useState([]);
  const CustomerSessionName=localStorage.getItem("c_name");
  const c_id=localStorage.getItem("c_id");
  const GetCustomer = () => {
    axios
      .get("https://localhost:44328/api/customer")
      .then((res) => {
        console.log(res.data);
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  let navigate = useNavigate();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            
            E-Mandi
            <i className="fa fa-leaf" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            
           
            <Nav>

              <NavLink className="navbar__link" to="/"  style={({ isActive }) => ({
              color: isActive ? '#3bb78f' : '',
           
            })}>
                <b>Welcome, {CustomerSessionName}</b>
              </NavLink>
              
           
              <Col>
                <DropdownButton
                  title="My Account"
                  id="dropdown-item-button"
                  variant="outline-success"
                >
                  <Dropdown.Item as="button" className="dropitem" eventKey="updateprofile">
                    <Link to={`/cupdateprofile/${c_id}`}>Update Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="button" className="dropitem" eventKey="logout">
                    <Link to="/customerorders">My Orders</Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="button" className="dropitem" eventKey="logout">
                    <Link to="/cfeedback">Feedback</Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="button" className="dropitem" eventKey="logout">
                    <Link to="/ulogout"
                    onClick={()=> {
                swal({
                  title: "Are you sure?",
                  text: "Once Logout, you need to Login again for access yours orders!",
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
              }}>
                      Logout</Link>
                  </Dropdown.Item>
                </DropdownButton>
              </Col>

              <Col>
                <NavLink to="/viewcart">
                  <Button className="bag">
                    <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                  </Button>
                </NavLink>
              </Col>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavbarAfterLogin;
