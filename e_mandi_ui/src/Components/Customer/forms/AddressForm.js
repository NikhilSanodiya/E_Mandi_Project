import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Form} from "react-bootstrap";
import axios from "axios";


function AddressForm() {
  const [vid, setVid] = useState("");
  // const [cid, setCid] = useState("");
  const [customerdetails, setCustomerDetails] = useState({
    c_id: "",
    c_name: "",
    c_aadharno: "",
    c_mobileno: "",
    c_address: "",
    c_password: "",
    c_regdateandtime: "",
    c_status: "",
    c_city: "",
    c_pincode: "",
  });
  
  const {c_id,c_name,c_aadharno,c_mobileno,c_address,c_password,c_regdateandtime,c_status,c_city,c_pincode} = customerdetails;

  useEffect(() => {
    // setCid(localStorage.getItem("c_id"));
    const c_id = localStorage.getItem("c_id");
    GetCartDetails(c_id);
    // GetCartDetails(c_id);
  }, []);

  const config =
  {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  };
  const GetCartDetails = (c_id) => {
    axios
      .get(`https://localhost:44328/api/customer/${c_id}`)
      .then((res) => {
        console.log(res.data);
        setCustomerDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onInputChange = e => {
    setCustomerDetails(e.target.value);
};
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
        <Form.Label>Full Name</Form.Label>
          <TextField
            required
            id="Name"
            name="Name"
            placeholder="Full name"
            fullWidth
            
            value={c_name}
            onChange={e => onInputChange(e)}
          />
        </Grid>

        <Grid item xs={12}>
        <Form.Label>Address</Form.Label>
          <TextField
            required
            id="address1"
            name="address1"
            placeholder="Enter Address line 1"
            fullWidth
            value={c_address}
            onChange={e => onInputChange(e)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        <Form.Label>City</Form.Label>
          <TextField
            required
            id="city"
            name="city"
            placeholder="City"
            fullWidth
            value={c_city}
            onChange={e => onInputChange(e)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        <Form.Label>Pincode</Form.Label>

          <TextField
            required
            id="zip"
            name="zip"
            placeholder="Zip / Postal code"
            fullWidth
            value={c_pincode}
            onChange={e => onInputChange(e)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;
