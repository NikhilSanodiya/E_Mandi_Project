import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Form, Table } from "react-bootstrap";
import { getValue } from "@testing-library/user-event/dist/utils";
import { Navigate, useNavigate } from "react-router-dom";

const styles = (theme) => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: "700",
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});
const config =
{
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
};

export const localData = () => {
 
  let transaction = [];
  let t_payment_mode = localStorage.getItem("payment");
  let t_total_amount = localStorage.getItem("total");
  let c_id = localStorage.getItem("c_id");
  let t_dateandtime = localStorage.getItem("date");
  let t_status = true;
  let orderS = "Processing";

  axios
    .post("https://localhost:44328/api/transaction", {
      t_dateandtime: t_dateandtime,
      t_payment_mode: t_payment_mode,
      t_total_amount: t_total_amount,
      t_status: t_status,
      c_id: c_id,
    },config)
    .then((trans) => {
      console.log("data from review : ", trans.data);

      axios
        .get(`https://localhost:44328/api/cart?c_id=${c_id}`,config)
        .then((res) => {
          res.data.map((item) => {
            return axios
              .post("https://localhost:44328/api/order", {
                v_id: item.v_id,
                cart_v_quantity: item.cart_v_quantity,
                c_id: item.c_id,
                payment_mode: t_payment_mode,
                order_status: orderS,
              },config)
              .then((cart) => {
                console.log("data from oD Post : ", cart.data);
                axios
                  .get(`https://localhost:44328/api/vegetable/${item.v_id}`)
                  .then((vres) => {
                    const updateqty = Number(
                      vres.data.v_quantity - item.cart_v_quantity
                    );
                    const vegdata = {
                      v_id: vres.data.v_id,
                      v_name: vres.data.v_name,
                      v_image: vres.data.v_image,
                      v_quantity: updateqty,
                      v_price: vres.data.v_price,
                      v_dateandtime: vres.data.v_dateandtime,
                      v_unit: vres.data.v_unit,
                      v_status: true,
                      f_id: vres.data.f_id,
                    };
                    console.log("veg data", vegdata);
                    const vid = vres.data.v_id;
                    if (vres.status === 200) {
                      console.log("Veg id", vid);
                      axios
                        .put(
                          `https://localhost:44328/api/vegetable/${vid}`,
                          vegdata
                        )
                        .then((ures) => {
                          console.log("Quantity updated suceessfully..", ures);
                          //console.log("Delete successfully1",item.cart_id);
                          if (ures.status === 204) {
                            console.log("token",localStorage.getItem('token'));
                            fetch(
                              `https://localhost:44328/api/cart/${item.cart_id}`,
                              {
                                method: "DELETE",
                                headers: {
                                  Authorization: 'Bearer ' + localStorage.getItem('token')
                              }
                              }
                            ).then((result) => {
                              result.json().then((dresp) => {
                                console.log("Delete successfully", dresp);
                                <Navigate to="/customerorders" />;
                              });
                            });
                            // axios.delete(`https://localhost:44328/api/cart?id=${item.cart_id}`)
                            // .then((dresp) => {
                            //   console.log("Delete successfully2",dresp);
                            // });
                          }
                        });
                    }
                  });
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      <Navigate to="/customerorders" />;
    });
};

var myCurrentDate = new Date();

var date =
  myCurrentDate.getFullYear() +
  "-" +
  (myCurrentDate.getMonth() + 1) +
  "-" +
  myCurrentDate.getDate() +
  " " +
  myCurrentDate.getHours() +
  ":" +
  myCurrentDate.getMinutes() +
  ":" +
  myCurrentDate.getSeconds();

localStorage.setItem("date", date);

function Review() {
  const [cartDetails, setCartDetails] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cid, setCid] = useState("");
  let pay = localStorage.getItem("payment");
  useEffect(() => {
    const c_id = localStorage.getItem("c_id");
    setCid(c_id);
    GetCartDetails(c_id);
  }, []);

  const GetCartDetails = (c_id) => {
    axios
      .get(`https://localhost:44328/api/cart?c_id=${c_id}`,config)
      .then((res) => {
        console.log(res.data);

        setCartDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const address = cartDetails.map((item) => item.Customer.c_address);
  let total = 0;
  cartDetails.map(
    (product) =>
      (total = total + product.cart_v_quantity * product.Vegetable.v_price)
  );

  localStorage.setItem("total", total);

  localStorage.setItem("newtotal", total);
  localStorage.setItem("newpay", pay);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {/* <ListItem>
       <ListItemText primary="Product Name"  />
       <ListItemText primary="Quantity"  />
       <ListItemText primary="Price" />
       </ListItem> */}
        <Table variant="light">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails.map((product, i) => (
              <tr key={i}>
                <td>{product.Vegetable.v_name}</td>
                <td>{product.cart_v_quantity}</td>
                <td>{product.Vegetable.v_price}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <hr />
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1">Rs. {total}</Typography>
        </ListItem>
      </List>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Typography gutterBottom>{address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{pay}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);
