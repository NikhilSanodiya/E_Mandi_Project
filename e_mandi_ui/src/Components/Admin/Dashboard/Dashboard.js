import { useEffect, useState } from "react";
import {Navigate } from 'react-router-dom';
import axios from "axios";
import { GiFarmer } from "react-icons/gi";
import { BiUser } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { DiCoda } from "react-icons/di";
import { Col, Container, Row, Table } from "react-bootstrap";
import Sidebar from "./Sidebar";
import FooterNav from "../../../Layout/FooterNav";
import Navigationbar from "../../../Layout/Navigationbar";
import Login from "../Login";

function Dashboard() {
  const [customer, setCustomer] = useState([]);
  const [farmer, setFarmer] = useState([]);
  const [vegetable, setVegetable] = useState([]);
 

  useEffect(() => {
    getCustomersData();
    getFarmersData();
    getVegetablesData();
  }, [" "]);

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
  async function getCustomersData() {
    try {
      const response = await axios.get("https://localhost:44328/api/customer");
      console.log(response.data);
      setCustomer(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getFarmersData() {
    try {
      const response = await axios.get("https://localhost:44328/api/farmer");
      console.log(response.data);
      setFarmer(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getVegetablesData() {
    try {
      const response = await axios.get("https://localhost:44328/api/vegetable");
      console.log(response.data);
      setVegetable(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    authLog?
    <>
      <Navigationbar />
        <div className="headingdash">Admin Dashboard</div>
      <Container fluid>
     <Row>
       <Col>
        <Sidebar />
       </Col>
        <Col className="dashitem" xs={10}>
        
      <div className="col main pt-5 mt-3" id="dashboard">
        
        <div className="row" id="dashboard-box">
          <div className="col-xl-3 col-sm-6 py-2">
            <div className="card bg-success text-white h-100">
              <div
                className="card-body bg-success"
                style={{ backgroundColor: "#57b960" }}
              >
                <div className="rotate">
                  <i className="fa-4x">
                    <BsFillPeopleFill />
                  </i>
                </div>
                <h6 className="text-uppercase">Total Users</h6>
                <h1 className="display-4">{farmer.length + customer.length}</h1>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 py-2" id="dashboard">
            <div className="card text-white bg-danger h-100">
              <div className="card-body bg-danger">
                <div className="rotate">
                  <b>
                    <i className="fa-4x">
                      <BiUser />
                    </i>
                  </b>
                </div>
                <h6 className="text-uppercase">Customer</h6>
                <h1 className="display-4">{customer.length}</h1>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 py-2" id="dashboard">
            <div className="card text-white bg-info h-100">
              <div className="card-body bg-info">
                <div className="rotate">
                  <b>
                    <i className="fa-4x">
                      <GiFarmer />
                    </i>
                  </b>
                </div>
                <h6 className="text-uppercase">Farmer</h6>
                <h1 className="display-4">{farmer.length}</h1>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 py-2" id="dashboard">
            <div className="card text-white bg-warning h-100">
              <div className="card-body">
                <div className="rotate">
                  <i className="fa-4x">
                    <DiCoda />
                  </i>
                </div>
                <h6 className="text-uppercase">Vegetables</h6>
                <h1 className="display-4">{vegetable.length}</h1>
              </div>
            </div>
          </div>
        </div>

       
       
      </div>
  
        </Col>
     </Row>
     </Container>
     <Container fluid>
     <Row>
        <Col className="dashtable">
             <p className="ptag">In-Active Farmer</p>
        <div className="col-lg-7 col-md-6 col-sm-12">
        
         <div className="table-responsive" id="table">
           <Table  hover variant="light" responsive="sm">
             <thead className="thead-light" id="th">
               <th>Sr No.</th>
               <th>Survey No.</th>
               <th>Farmer Name</th>
               <th>Aadhar No.</th>
               <th>Mobile No</th>
               <th>Status</th>
               <th>Date and Time</th>
             </thead>
             <tbody>

                 
               {farmer.map((item, i) => {
                 return (
                   item.f_status==false?
 
                   <tr key={i}>
                     <td>{item.f_id}</td>
                     <td>{item.survey_no}</td>
                     <td>{item.f_name}</td>
                     <td>{item.f_aadharno}</td>
                     <td>{item.f_mobileno}</td>
                     <td>
                       ​​​​​​{item.f_status === true ? "Active" : "Inactive"}
                     </td>
                     <td>{item.f_regdateandtime}</td>
                   </tr>
                   :<p></p>
                 );
               })}
             </tbody>
           </Table>
         </div>
       </div>
        </Col>
     </Row>
     <br />
     <br/>
     <br/>
     <FooterNav />
     </Container>
 

      {/* <FooterNav /> */}
    </>:<Navigate to="/userlogin" replace />
            
  );
}

export default Dashboard;
