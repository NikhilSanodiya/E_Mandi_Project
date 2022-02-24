import axios from "axios";
import Navigationbar from '../../Layout/Navigationbar';
import FooterNav from '../../Layout/FooterNav';
import { Navigate } from 'react-router-dom';
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

function ViewAllFarmers() {
  const [farmer, setFarmers] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    GetFarmer();
  }, []);
  const [authLog, setAuth] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const Role = localStorage.getItem("role");
    console.log(token);
    console.log(Role);
    if (token === null && Role != "farmer") {
      setAuth(false);
    }
    else {
      setAuth(true);
    }
  }, []);
  const config =
  {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  };
  const GetFarmer = () => {
    axios
      .get("https://localhost:44328/api/farmer")
      .then((res) => {
        console.log(res.data);
        setFarmers(res.data);
      })
      .catch(
        (err) => {
          console.log(err);
        },
        [" "]
      );
  };

  function DeleteFarmer(f_id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this farmer data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`https://localhost:44328/api/farmer/${f_id}`, {
            method: 'DELETE'
          }).then((result) => {
            result.json().then((resp) => {
              console.log(resp);
              swal("Farmer has been deleted!", {
                icon: "success",
              })
              GetFarmer();
            })
          });
        } else {
          swal("Farmer details is not Deleted");
        }
      });
    }

    function UpdateStatus(
      f_id,
      f_name,
      f_aadharno,
      survey_no,
      f_mobileno,
      f_address,
      f_password,
      f_regdateandtime,
      f_city,
      f_pincode, f_status
    ) {


      console.log(f_id,
        f_name,
        f_aadharno,
        survey_no,
        f_mobileno,
        f_address,
        f_password,
        f_regdateandtime,
        f_city,
        f_pincode, f_status, status);

      if (status == null) {

      }
      else
        axios
          .put(`https://localhost:44328/api/farmer/${f_id}`, {
            f_id: f_id,
            f_name: f_name,
            f_aadharno: f_aadharno,
            survey_no: survey_no,
            f_mobileno: f_mobileno,
            f_address: f_address,
            f_password: f_password,
            f_regdateandtime: f_regdateandtime,
            f_city: f_city,
            f_pincode: f_pincode,
            f_status: status,
          })
          .then((response) => {
            console.log(response);
            GetFarmer();
          });
    }

    return (
      authLog ?
        <>
        <Navigationbar />
          <Alert variant="success">
            <h2>All Farmers</h2>
            <hr />
            <Col></Col>
            <Col xs={4}>
              <Form.Control
                type="email"
                placeholder="Search Farmers.."
                onChange={(event) => setsearchText(event.target.value)}
              />
            </Col>
            <Col></Col>
          </Alert>
          <Container fluid>
            <Table hover striped variant="light" responsive>
              <thead>
                <th>S No.</th>
                <th>Name</th>
                <th>Aadhar No.</th>
                <th>Survey No.</th>
                <th>Mobile No.</th>
                <th>Address</th>
 
                <th>Pincode</th>
                <th>Date</th>
                <th>Status</th>
                <th>Change Status</th>
                <th>Action</th>
              </thead>
              <tbody>
                {farmer
                  .filter((value) => {
                    if (searchText === "") {
                      return value;
                    } else if (
                      value.f_name
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((item, i) => {
                    return farmer == null ? (
                      <h1>No Data</h1>
                    ) : (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.f_name}</td>
                        <td>{item.f_aadharno}</td>
                        <td>{item.survey_no}</td>
                        <td>{item.f_mobileno}</td>
                        <td>{item.f_address}</td>
 
                        <td>{item.f_pincode}</td>
                        <td>{item.f_regdateandtime}</td>
                        <td>{item.f_status === true ? "Active" : "Inactive"}</td>
 
                        <td>
                          <DropdownButton
                            title="Change Status"
                            id="dropdown-item-button"
                            variant="outline-secondary"
                            onSelect={(e) =>
                              UpdateStatus(
                                item.f_id,
                                item.f_name,
                                item.f_aadharno,
                                item.survey_no,
                                item.f_mobileno,
                                item.f_address,
                                item.f_password,
                                item.f_regdateandtime,
                                item.f_city,
                                item.f_pincode,
                                item.f_status,
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
                            onClick={() => DeleteFarmer(item.f_id)}
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

        </> : <Navigate to="/adminlogin" replace />
    );
  }
 
  export default ViewAllFarmers;