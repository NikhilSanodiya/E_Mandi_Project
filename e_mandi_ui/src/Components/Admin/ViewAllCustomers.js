 
import axios from "axios";
import {Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import swal from 'sweetalert';
import {
  Table,
  Button,
  Alert,
  Form,
  Col,
  Container,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import Navigationbar from "../../Layout/Navigationbar";
import FooterNav from "../../Layout/FooterNav";
 
function ViewAllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(true);
 
  useEffect(() => {
    GetCustomer();
  }, []);
 
  const [authLog,setAuth]=useState(true);
  useEffect(() => {
    const token=localStorage.getItem("token");
    const Role=localStorage.getItem("role");
    console.log(token);
    console.log(Role);
    if(token===null && Role!="admin")
    {
      setAuth(false);
 
    }
    else
    {
      setAuth(true);
    }
  },[]);
  const config =
  {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  };
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
 
  function DeleteCustomer(c_id) {
    // alert(s_id)
    // fetch(`https://localhost:44328/api/customer/${c_id}`, {
    //   method: "DELETE",
    // }).then((result) => {
    //   result.json().then((resp) => {
    //     console.log(resp);
    //     GetCustomer();
    //   });
    // });
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this customer data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`https://localhost:44328/api/customer/${c_id}`, {
            method: 'DELETE'
          }).then((result) => {
            result.json().then((resp) => {
              console.log(resp);
              swal("Customer has been deleted!", {
                icon: "success",
              })
              GetCustomer();
            })
          });
        } else {
          swal("Customer Data is not Deleted");
        }
      });
  }
 
  function UpdateStatus(
    c_id,
    c_name,
    c_aadharno,
    c_mobileno,
    c_address,
    c_pincode,
    c_regdateandtime,
    c_city,
    c_password
  ) {
    console.log(
      c_id,
      c_name,
      c_aadharno,
      c_mobileno,
      c_address,
      c_pincode,
      c_regdateandtime,
      c_city,
      c_password,
      status
    );
    if (status === null) {
    } else {
      axios
        .put(`https://localhost:44328/api/customer/${c_id}`, {
          c_id: c_id,
          c_name: c_name,
          c_aadharno: c_aadharno,
          c_mobileno: c_mobileno,
          c_address: c_address,
          c_pincode: c_pincode,
          c_regdateandtime: c_regdateandtime,
          c_password: c_password,
          c_city: c_city,
          c_status: status,
        })
        .then((response) => {
          console.log(response);
          GetCustomer();
     
        });
         
    }
  }
 
  return (
    authLog?
    <>
    <Navigationbar />
      <Alert variant="success">
        <h2>All Customers</h2>
        <hr />
        <Col></Col>
        <Col xs={4}>
          <Form.Control
            type="email"
            placeholder="Search Customer.."
            onChange={(event) => setsearchText(event.target.value)}
          />
        </Col>
        <Col></Col>
      </Alert>
      <Container fluid>
        <Table hover striped variant="light" responsive>
          <thead >
            <th>S No.</th>
            <th>Name</th>
            <th>Aadhar No.</th>
            <th>Mobile No.</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Date</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Action</th>
          </thead>
          <tbody>
            {customers
              .filter((value) => {
                if (searchText == "") {
                  return value;
                } else if (
                  value.c_name.toLowerCase().includes(searchText.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((item, i) => {
                return customers == null ? (
                  <h1>No Data</h1>
                ) : (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.c_name}</td>
                    <td>{item.c_aadharno}</td>
                    <td>{item.c_mobileno}</td>
                    <td>{item.c_address}</td>
                    <td>{item.c_pincode}</td>
                    <td>{item.c_regdateandtime}</td>
                    <td>{item.c_status === true ? "Active" : "Inactive"}</td>
                    <td>
                      <DropdownButton
                        title="Change Status"
                        id="dropdown-item-button"
                        variant="outline-secondary"
                        onSelect={(e) =>
                          UpdateStatus(
                            item.c_id,
                            item.c_name,
                            item.c_aadharno,
                            item.c_mobileno,
                            item.c_address,
                            item.c_pincode,
                            item.c_regdateandtime,
                            item.c_city,
                            item.c_password,
                            setStatus(e)
                          )
                        }
                      >
                        <Dropdown.Item as="button" eventKey={true}>
                          Active
                        </Dropdown.Item>
                        <Dropdown.Item as="button" eventKey={false}>
                          Inactive
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => DeleteCustomer(item.c_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <FooterNav />
      </Container>
    </>:<Navigate to="/adminlogin" replace />
  );
}
 
export default ViewAllCustomers;
 
