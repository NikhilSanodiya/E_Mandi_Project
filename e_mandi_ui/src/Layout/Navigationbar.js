import { Navbar, Container,Nav} from "react-bootstrap";
import {NavLink,useNavigate} from "react-router-dom";

import {useState} from 'react';
import swal from 'sweetalert';
function Navigationbar() {
  let [role, setRole] = useState("Admin");
  let navigate = useNavigate();
  let arr=[1,2,3,4,5,6,7];
  return (
    <>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#">E-Mandi<i className="fa fa-leaf"/></Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as : Admin
      </Navbar.Text>
      <NavLink to="/dashboard" onClick={()=> {
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
            navigate('/alogout');
          } else {
            navigate('/dashboard');
            //swal("Your imaginary file is safe!");
          }
        });
      }}>Logout</NavLink>
    </Navbar.Collapse>
    </Container>
    </Navbar>
        </>
    
  );
}
export default Navigationbar;