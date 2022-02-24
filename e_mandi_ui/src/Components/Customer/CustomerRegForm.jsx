import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Toast } from 'react-bootstrap';
import swal from 'react-bootstrap-sweetalert';

function CustomerRegForm()
{
  //const navigate = useNavigate();
  const [customerData, setCustomerdata] = useState({ name: '', mobile: '', password: '', cpassword: '', address: '', aadhar: '', city: '', zip: '' });
  const [aadharErr, setAadharErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [cpasswordErr, setCPasswordErr] = useState(false);
  // const [addressErr, setAadharErr] = useState(false);
  // const [cityErr, setAadharErr] = useState(false);
  // const [zipErr, setAadharErr] = useState(false);
  

  const [showErr, setShowerr] = useState(false);
  const [show, setShow] = useState(false);

  //Mobile validation
  const onChangeMobile = (e) => {
    e.persist();
    var chk = e.target.value;

    if (chk.length < 10 && chk.length > 0) {
        setMobileErr(true);
    }
    else if(chk.length == 10){
        setMobileErr(false);
    }
    else{
      setMobileErr(true);
    }
    console.log("mobile", e.target.value)
    setCustomerdata({ ...customerData, [e.target.name]: e.target.value });
}
//Name validation 
const onChangeName = (e) => {
  e.persist();
  var chk = e.target.value;

  if (chk.length > 0) {
    setNameErr(false);
  }
  else {
    setNameErr(true);
  }
  console.log("name", e.target.value)
  setCustomerdata({ ...customerData, [e.target.name]: e.target.value });
}
  //Aadhar validation
  const onChangeAadhar = (e) => {
      e.persist();
      var chk = e.target.value;

      if (chk.length < 12 && chk.length > 0) {
          setAadharErr(true);
      }
      else if(chk.length == 12){
        setAadharErr(false);
      }
      else {
          setAadharErr(true);
      }
      console.log("aadhar", e.target.value)
      setCustomerdata({ ...customerData, [e.target.name]: e.target.value });
  }
  //Password validation
  const onChangePass = (e) => {
      e.persist();
      var chkpass = e.target.value;

      if (chkpass.length <= 12 && chkpass.length >= 8) {
          setPasswordErr(false);
      }
      else {
          setPasswordErr(true);
      }
      console.log("password", e.target.value)
      setCustomerdata({ ...customerData, [e.target.name]: e.target.value });
  }
//Confirm Password Validation
  const onChangeCPass = (e) => {
    e.persist();
    var chkpass = e.target.value;
    var pass = customerData.password;
    if (chkpass === pass) {
        setCPasswordErr(false);
    }
    else {
        setCPasswordErr(true);
    }
    console.log("cpassword", e.target.value)
    setCustomerdata({ ...customerData, [e.target.name]: e.target.value });
}

  function ErrorToast() {
      return (
          <Toast onClose={() => setShowerr(false)} show={showErr} bg={'danger'} position={'bottom-end'} delay={5000} autohide>
              <Toast.Header>
                  <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                  />
                  <strong className="me-auto"></strong>
              </Toast.Header>
              <Toast.Body className="text-white"><b>Invalid Credential's</b></Toast.Body>
          </Toast>
      );
  }
  function SuccessToast() {
      return (
          <Toast onClose={() => setShow(false)} show={show} bg={'success'} delay={5000} autohide>
              <Toast.Header>
                  <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                  />
                  <strong className="me-auto"></strong>
              </Toast.Header>
              <Toast.Body className="text-white"><b>Registered Successfully</b></Toast.Body>
          </Toast>
      );
  }
  const [customer, setCustomer] = useState([]);
  
  const submit = e => {
      let name = e.target[0].value;
      let mobile = e.target[1].value;
      let aadhar = e.target[2].value;
      let password = e.target[3].value;
      let cpassword = e.target[4].value;
      let address = e.target[5].value;
      let city = e.target[6].value;
      let zip = e.target[7].value;
      
      customer.name = name;
      customer.mobile = mobile;
      customer.aadhar = aadhar;
      customer.password = password;
      customer.cpassword = cpassword;
      customer.address = address;
      customer.city = city;
      customer.zip = zip;
      
      console.log(customer);

      var myCurrentDate = new Date();
      var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds();
  
      axios
    .post('https://localhost:44328/api/customer', {c_name: customer.name,c_aadharno: customer.aadhar,c_mobileno: customer.mobile,
    c_address: customer.address,c_status: true,c_password: customer.password,c_regdateandtime: date,
     c_city: customer.city,c_pincode: customer.zip})
    .then(function (response) {
      console.log(response.data);
      setCustomer(response.data);
    
     
     if (response.data.status == "201") {
      //setShow(true);
      
      //localStorage.setItem("token", response.data.token);
      console.log("Registration ok...");
      //navigate("/dashboard");
    }
  else {
 //        setShowerr(true);
        //alert('Invalid User Details');
       }
    }).catch(function (error) {console.log(error);});
    document.getElementById("customerForm").reset();
  };

  useEffect(() => {
  }, [" "]);
  

      return (
       
        <div className="formCenter">
          <h2>Customer  Registration</h2>
          <form onSubmit={e => {
              e.preventDefault();
              submit(e);
          }} className="formFields" id="customerForm">

            {/* <ErrorToast /> */}
            {/* <SuccessToast /> */}
            
            <div className="formField">
              <label className="formFieldLabel" htmlFor="name">
                Full Name
              </label>
              <input
                value={customerData.name} onChange={onChangeName}
                autoComplete={"off"}
                type="text"
                id="name"
                className="formFieldInput"
                placeholder="Enter your full name"
                name="name"
              />
              <br />
             {nameErr?<span className="error">Name field is required.</span> : ""}
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="mobile">
                Mobile No.
              </label>
              <input
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }
              }}
                value={customerData.mobile} onChange={onChangeMobile}
                autoComplete={"off"}
                type="text"
                id="mobile"
                className="formFieldInput"
                placeholder="Enter your Mobile Number"
                name="mobile"
              />
              <br />
             {mobileErr?<span className="error">Please enter valid mobile no.</span> : ""}
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="aadhar">
                Aadhar Card No.
              </label>
              <input
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }
            }}
                value={customerData.aadhar} onChange={onChangeAadhar}
                autoComplete={"off"}
                type="text"
                id="aadhar"
                className="formFieldInput"
                placeholder="Enter your Aadhar Number"
                name="aadhar"
              />
              <br />
             {aadharErr?<span className="error">Please check aadhar no</span> : ""}
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                value={customerData.password}  onChange={onChangePass}  maxLength={12}
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
              />
              <br />
             {passwordErr?<span className="error">Enter Valid Password Min 8 and Max 12</span> : ""}
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="cpassword">
                Confirm Password
              </label>
              <input
                value={customerData.cpassword}
                onChange={onChangeCPass}
                type="password"
                id="cpassword"
                className="formFieldInput"
                placeholder="Enter your password again"
                name="cpassword"
              />
              <br />
             {cpasswordErr?<span className="error">Password doesn't match...</span> : ""}
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="address">
                Address
              </label>
              <input
                autoComplete={"off"}
                type="text"
                id="address"
                className="formFieldInput"
                placeholder="Enter your Address"
                name="address"
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="city">
                City
              </label>
              <input
                autoComplete={"off"}
                type="text"
                id="city"
                className="formFieldInput"
                placeholder="Enter your City Name"
                name="city"
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="zip">
                Zip Code
              </label>
              <input
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                }
              }}
                autoComplete={"off"}
                type="text"
                id="zip"
                className="formFieldInput"
                placeholder="Enter your Zip Code"
                name="zip"
              />
            </div>
  
            <div className="formField">
              <button type="submit" className="formFieldButton">Sign Up</button>{" "}
            </div>
          </form>
        </div>
      );
  }

export default CustomerRegForm
