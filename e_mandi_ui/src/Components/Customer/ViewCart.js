import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import NavbarAfterLogin from "./NavbarAfterLogin";
import { NavLink } from "react-router-dom";
function ViewCart() {
  const [cart, setCart] = useState([]);
  // const [cid, setCid] = useState("");
  //const res = await instance.get(`/cart?c_id=${c_id}`);

  const c_id = localStorage.getItem("c_id");
  useEffect(() => {
    // const cid = 8;
    console.log(c_id);
    GetCart(c_id);
  }, []);
  const config =
  {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  };

  const GetCart = (c_id) => {
    axios
      .get(`https://localhost:44328/api/cart?c_id=${c_id}`,config)
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function DeleteCartItem(cart_id) {
    // alert(s_id)
    fetch(`https://localhost:44328/api/cart/${cart_id}`, {
      method: "DELETE",
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        const c_id = localStorage.getItem("c_id");
        GetCart(c_id);
      });
    });
  }
  return (
    <>
      <NavbarAfterLogin />
      <br />
      <Container>
        <Table hover variant="light">
          <thead>
            <tr>
              <th>S No.</th>
              <th>Product</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Sub Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              return (
                item.Customer.c_id !== c_id ? (
                <tr key={index}>
                  <td style={{padding:30}}>{index+1}</td>
                  <td>
                    <img
                      src={item.Vegetable.v_image}
                      alt="vimage"
                      style={{ Height: 70, width: 70 }}
                    />
                  </td>
                  <td style={{padding:30}}>{item.Vegetable.v_name}</td>
                  <td style={{padding:30}}>{item.cart_v_quantity}</td>
                  <td style={{padding:30}}>{item.Vegetable.v_price}</td>
                  <td style={{padding:30}}>{item.Vegetable.v_price * item.cart_v_quantity}</td>
                  <td style={{padding:30}}>
                    <Button variant="danger" onClick={()=>DeleteCartItem(item.cart_id)}>Delete</Button>
                  </td>
                </tr>
                ) :<p>No Items in Cart</p>
              );
            })}
          </tbody>
        </Table>
    
        {cart.length !== 0 ? (
        <NavLink to="/checkout">
          <Button className="pull-right" variant="success" size="lg">
            Proceed To Checkout
          </Button>
        </NavLink>):(
          <h1 align={"center"} style={{color: "red"}}>Cart is Empty</h1>
        )}
            <NavLink to="/">
          <Button className="pull-left" variant="success" size="lg">
            Continue Shopping
          </Button>
        </NavLink>
      </Container>
    </>
  );
}

export default ViewCart;
