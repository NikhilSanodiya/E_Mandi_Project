import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Alert, Button } from "react-bootstrap";
import Navigationbar from "../../Layout/Navigationbar";
import FooterNav from "../../Layout/FooterNav";
import swal from "sweetalert";
import { Navigate } from "react-router-dom";
import NavbarAfterLogin from "./NavbarAfterLogin";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [eqcid, seteqcid] = useState("");
  const c_id = localStorage.getItem("c_id");
  const [authLog, setAuth] = useState(true);
  let status = "Order Cancelled";


  useEffect(() => {
    const token = localStorage.getItem("token");
    const Role = localStorage.getItem("role");
    getOrders();
    console.log(token);
    console.log(Role);
    if (token === null && Role !== "customer") {
      setAuth(false);
    } else {
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

  function CancleOrder (
    order_id,
    v_id,
    cart_v_quantity,
    c_id,
    payment_mode,
    
  ) {
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
      <NavbarAfterLogin />

      <br />
      <Container>
        <Table variant="light" responsive="sm">
          <thead>
          <th style={{ padding: 10 }}>Farmer Name</th>
            <th style={{ padding: 10 }}>Products</th>
            <th style={{ padding: 10 }}>Image</th>
            <th style={{ padding: 10 }}>Quantity</th>
            <th style={{ padding: 10 }}>Price</th>

            <th style={{ padding: 10 }}>Payment Method</th>

            <th style={{ padding: 10 }}>Date and Time</th>
            <th style={{ padding: 10 }}>Delivery Status</th>
            
            <th style={{ padding: 10 }}>Action</th>
          </thead>
          <tbody>
          {orders.map((item, index) => {
              return (
               ((item.c_id)==c_id)?(
                <tr key={index}>
                  <td style={{padding:30}}>{item.Vegetable.Farmer.f_name}</td>
                  <td style={{padding:30}}>{item.Vegetable.v_name}</td>
                  <td >
                    <img
                      src={item.Vegetable.v_image}
                      alt="vimage"
                      style={{ Height: 70, width: 70 }}
                    />
                  </td>
                  <td style={{padding:30}}>{item.cart_v_quantity}</td>
                  <td style={{padding:30}}>{item.Vegetable.v_price}</td>
                  <td style={{padding:30}} >{item.payment_mode}</td>
                  <td style={{padding:30}}>{date}</td>
                  {(item.order_status!==status)?
                  <td style={{padding:30}} className="text-success">{item.order_status}</td>
                  :
                  <td style={{padding:30}} className="text-danger">{item.order_status}</td>
                }
                {(item.order_status=="Processing")?
                <>
                  <td style={{padding:20}}>
                      <Button
                        variant="outline-danger"
                        onClick={() => CancleOrder(
                          item.order_id,
                          item.v_id,
                          item.cart_v_quantity,
                          item.c_id,
                          item.payment_mode,)}
                      >
                        Cancel Order
                      </Button>
                    </td>
                    </>:<td style={{padding:20}}><Button
                        variant="outline-danger"
                        disabled
                      >
                        Cancel Order
                      </Button></td>}
          
                </tr>):<p></p>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <FooterNav />
    </>
  ) : (
    <Navigate to="/userlogin" replace />
  );
}

export default CustomerOrders;
