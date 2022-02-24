import React, { useEffect, useState } from 'react';
import {Navigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Alert,Col,Form, Container, } from 'react-bootstrap';
import Navigationbar from '../../Layout/Navigationbar';
import FooterNav from '../../Layout/FooterNav';
import { Dropdown } from 'bootstrap';

function View_Orders() {
    const [orders, setOrders] = useState([]);
    const [Trans, setTrans] = useState([]);
    const [searchText, setsearchText] = useState("");
    useEffect(() => {
        getOrders();
        getTrans();
    },[]);
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
  
    const getOrders = () => {
        axios.get("https://localhost:44328/api/Order",config).then(
            (response) => {
                console.log(response.data);
                setOrders(response.data);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const getTrans = () => {
      axios.get("https://localhost:44328/api/transaction",config).then(
          (response) => {
              console.log(response.data);
              setTrans(response.data);
          })
          .catch(err => {
              console.log(err)
          })
  };

    
  const payMode = localStorage.getItem("newpay");
  const date = localStorage.getItem("date");




    return (
        authLog?
        <>
            <Navigationbar />
            <Alert variant="success">
                <h2>All Orders</h2>
                <hr />
          <Col></Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              placeholder="Search Orders.."
              onChange={(event) => setsearchText(event.target.value)}
            />
          </Col>
          <Col></Col>
            </Alert>
            <Container fluid>
            <Table hover variant="light" responsive="sm">
        <thead>
          {/* <th style={{ padding: 10 }}>Sr No.</th> */}
          <th style={{ padding: 10 }}>Customer Name</th>
          <th style={{ padding: 10 }}>Products</th>
          <th style={{ padding: 10 }}>Price</th>
          <th style={{ padding: 10 }}>Framer Name</th>

          <th style={{ padding: 10 }}>Payment Method</th>
         
          <th style={{ padding: 10 }}>Date and Time</th>
          <th style={{ padding: 10 }}>Delivery Status</th>
    
        </thead>
        <tbody>
          {orders.map((item, i) => {
            return (
            
              <tr key={i}>
                {/* <td>{i + 1}</td> */}
                <td>{item.Customer.c_name}</td>
                <td>{item.Vegetable.v_name}</td>
                <td>{item.Vegetable.v_price}</td>
                <td>{item.Vegetable.Farmer.f_name}</td>
                <td >{item.payment_mode}</td>
                <td>{date}</td>
                <td className="text-success">{item.order_status}</td>
              </tr>
            )
            
          })}
        </tbody>
      </Table>
      </Container>
            <FooterNav />
        </>:<Navigate to="/adminlogin" replace />


    );
}

export default View_Orders;