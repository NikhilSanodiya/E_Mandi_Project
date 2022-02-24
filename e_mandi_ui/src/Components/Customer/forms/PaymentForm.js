import React,{useState} from "react";
import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from "@material-ui/core/Grid";
import Review from "./Review";
import {val} from "./Review";


function PaymentForm() {
  let [value, setVal] = useState('');

  localStorage.setItem("payment", value);
    // val(value={value});

    
    return (
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={24}>
     
      <FormLabel component="legend"></FormLabel>
          <RadioGroup
          id="payment"
            aria-label="Payment Mode"
            name="paymentmode"
          >
            <FormControlLabel value="UPI" id="upi" onChange={(e)=>setVal(e.target.value)} control={<Radio />} label="UPI" />
            <FormControlLabel value="Cash On Delivery" id="cod" onChange={(e)=>setVal(e.target.value)} control={<Radio />} label="COD" />
            <FormControlLabel value="PayTM" id="paytm" onChange={(e)=>setVal(e.target.value)} control={<Radio />} label="PayTM" />
           
          </RadioGroup>
 
       
      </Grid>
    </React.Fragment>
  );
}
 
export default PaymentForm;
