import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Col
} from "react-bootstrap";
import React from "react";
import {NavLink} from "react-router-dom";
function NavBarHomepage() {

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Col xs={1} >
            <Navbar.Brand href="#">E-Mandi<i className="fa fa-leaf"/></Navbar.Brand>
          </Col>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Col xs={6} >
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search Products"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light"><i className="fa fa-search"/></Button>
              </Form>
            </Col>
            <Nav>
              <Col>
              <NavLink to="/userlogin" >
              <Button variant="light" >
                  Login
                </Button>
              </NavLink>
              </Col>
              <Col>
              <NavLink to="/userregistration" >
              <Button variant="light" >
                  Register
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
export default NavBarHomepage;
