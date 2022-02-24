import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Table, Alert, DropdownButton, Dropdown, Container } from "react-bootstrap";
import Navigationbar from "../../Layout/Navigationbar";
import FooterNav from "../../Layout/FooterNav";
import NavbarFarmer from "./NavbarFarmer";

function View_Orders() {
  const [orders, setOrders] = useState([]);
  let [status, setStatus] = useState(1);
  const [deliverystatus, setdeliverystatus] = useState("");
  let ostatus = "Order Cancelled";

  let farmerlogin = localStorage.getItem("f_id");
  console.log("fid check",farmerlogin);
  useEffect(() => {
    getOrders();
  }, []);
  const [authLog, setAuth] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const Role = localStorage.getItem("role");
    console.log(token);
    console.log(Role);
    if (token === null && Role !== "farmer") {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);
  const config =
  {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  };
  const getOrders = () => {
    axios
      .get("https://localhost:44328/api/order",config)
      .then((response) => {
        console.log("order table", response.data);
        setOrders(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const date = localStorage.getItem("date");

  function UpdateStatus(
    order_id,
    v_id,
    cart_v_quantity,
    c_id,
    payment_mode,
    
  ) {
    if(status==1){
     status = "On The Way";
    }else if(status==2){
      status = "Delivered";
    }
    console.log(order_id, v_id, cart_v_quantity, c_id, payment_mode, status);
   
      axios
        .put(`https://localhost:44328/api/order/${order_id}`, {
          order_id: order_id,
          v_id: v_id,
          cart_v_quantity: cart_v_quantity,
          c_id: c_id,
          payment_mode: payment_mode,
          order_status: status,
        },config)
        .then((response) => {
          console.log(response);
          getOrders();
        });
    }
  

  return authLog ? (
    <>
      <NavbarFarmer />

      <br />
<Container fluid>
      <Table variant="light" responsive="sm">
        <thead>
          {/* <th style={{ padding: 10 }}>Sr No.</th> */}
          <th style={{ padding: 10 }}>Customer Name</th>
          <th style={{ padding: 10 }}>Products</th>
          <th style={{ padding: 10 }}>Price</th>

          <th style={{ padding: 10 }}>Payment Method</th>
          <th style={{ padding: 10 }}>Address</th>
          <th style={{ padding: 10 }}>Mobile No</th>
          <th style={{ padding: 10 }}>Date and Time</th>
          <th style={{ padding: 10 }}>Delivery Status</th>
          <th style={{ padding: 10 }}>Update</th>
        </thead>
        <tbody>
          {orders.map((item, i) => {
            return farmerlogin !== item.Vegetable.f_id ? (
              <>
                <tr key={i}>
                  {/* <td>{i + 1}</td> */}
                  <td style={{padding:30}}>{item.Customer.c_name}</td>
                  <td style={{padding:30}}>{item.Vegetable.v_name}</td>
                  <td style={{padding:30}}>{item.Vegetable.v_price}</td>
                  <td style={{padding:30}}>{item.payment_mode}</td>
                  <td style={{padding:30}}>{item.Customer.c_address}</td>
                  <td style={{padding:30}}>{item.Customer.c_mobileno}</td>
                  <td style={{padding:30}}>{date}</td>
                  {(item.order_status!==ostatus)?
                  <td style={{padding:30}} className="text-success">{item.order_status}</td>
                  :
                  <td style={{padding:30}} className="text-danger">{item.order_status}</td>
                }
                  <td>
                    <DropdownButton
                      title="Order Status"
                      id="dropdown-item-button"
                      variant="outline-success"
                      onSelect={(e) =>
                        UpdateStatus(
                          item.order_id,
                          item.v_id,
                          item.cart_v_quantity,
                          item.c_id,
                          item.payment_mode,
                          setStatus(e)
                        )
                      }
                    >
                      <Dropdown.Item as="button" eventKey={1}>
                        On The Way
                      </Dropdown.Item>
                      <Dropdown.Item as="button" eventKey={2}>
                        Delivered
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              </>
            ) : (
              <p>No Orders</p>
            );
          })}
        </tbody>
      </Table>
      <FooterNav />
      </Container>
    </>
  ) : (
    <Navigate to="/userlogin" replace />
  );
}

export default View_Orders;
