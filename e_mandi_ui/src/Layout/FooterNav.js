
import { Navbar, Nav, Container,Row,Col } from "react-bootstrap"; 

function FooterNav() {
  return (
    <>
      {/* <div className="footernav">
        <p>©2022 E-Mandi <i className="fa fa-leaf"/></p>
      </div>
      */}
      <Navbar expand="lg" bg="dark" variant="dark" fixed="bottom">
     

        <Navbar.Brand className="brnd">©2022 E-Mandi <i className="fa fa-leaf"/></Navbar.Brand>
      
      

 
     
        </Navbar>
    </>
  );
}

export default FooterNav;
