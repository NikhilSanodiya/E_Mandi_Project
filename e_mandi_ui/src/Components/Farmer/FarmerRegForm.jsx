import React from "react";
import axios from 'axios';
import { Toast } from 'react-bootstrap';
import './Userreg.css';

import swal from 'sweetalert';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function FarmerRegForm() {

  const [farmer, setFarmer] = useState([]);
  let navigate = useNavigate();
  let surveyNumber = e.target[0].value;
  let name = e.target[1].value;
  let mobile = e.target[2].value;
  let aadhar = e.target[3].value;
  let password = e.target[4].value;
  let cpassword = e.target[5].value;
  let address = e.target[6].value;
  let city = e.target[7].value;
  let zip = e.target[8].value;

  farmer.surveyNumber = surveyNumber;
  farmer.name = name;
  farmer.mobile = mobile;
  farmer.aadhar = aadhar;
  farmer.password = password;
  farmer.cpassword = cpassword;
  farmer.address = address;
  farmer.city = city;
  farmer.zip = zip;
  console.log(farmer);
  var myCurrentDate = new Date();
  var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth() + 1) + '-' + myCurrentDate.getDate() + ' ' + myCurrentDate.getHours() + ':' + myCurrentDate.getMinutes() + ':' + myCurrentDate.getSeconds();
  console.log(date);
  axios
  .post('https://localhost:44328/api/farmer', {f_name: farmer.name,f_aadharno: farmer.aadhar,survey_no: farmer.surveyNumber,f_mobileno: farmer.mobile,
  f_address: farmer.address,f_password: farmer.password, f_regdateandtime: date, f_status: false,f_city: farmer.city,f_pincode: farmer.zip})
  .then(function (response) {
    console.log(response);
    swal("", "Farmer Registerd Successfully!", "success");
    navigate('/userlogin');
    setFarmer(response.data);
  //   if (response.data.status == "201") {
  //     setShow(true);
  //     localStorage.setItem("token", response.data.token);
  //     console.log("Registration ok...");
  //     //navigate("/dashboard");
  //   }
  // else {
  //       setShowerr(true);
  //       alert('Invalid User Details');
  //      }
})
  .catch(function (error) {console.log(error);});
     //document.getElementById("farmerForm").reset();
  const submit = e => {
    axios
      .post('https://localhost:44328/api/farmer', {
        f_name: farmer.name, f_aadharno: farmer.aadhar, survey_no: farmer.surveyNumber, f_mobileno: farmer.mobile,
        f_address: farmer.address, f_password: farmer.password, f_regdateandtime: date, f_status: false, f_city: farmer.city, f_pincode: farmer.zip
      }).then(function (response)
      {
        if(response.status==201)
        {
          swal("", "New Farmer Added Successfully!", "success");
          navigate("/userlogin");
        }
        else{
          swal("","Oops Sorryyy!","warning");
        }
      })
      

  };



  return (
    <div className="formCenter">
      <h2>Farmer  Registration</h2>
      <form onSubmit={e => {
        e.preventDefault();
        submit(e);
      }} className="formFields">
        <div className="formField" id="farmerForm">
          <label className="formFieldLabel" htmlFor="surveyNumber">
            Survey No.
          </label>
          <input
            type="text"
            id="surveyNumber"
            className="formFieldInput"
            placeholder="Enter your Survey No."
            name="surveyNumber"
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="formFieldInput"
            placeholder="Enter your full name"
            name="name"
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="mobile">
            Mobile No.
          </label>
          <input
            type="text"
            id="mobile"
            className="formFieldInput"
            placeholder="Enter your Mobile Number"
            name="mobile"
          />
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
            type="text"
            id="aadhar"
            className="formFieldInput"
            placeholder="Enter your Aadhar Number"
            name="aadhar"
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="cpassword"
            className="formFieldInput"
            placeholder="Enter your password again"
            name="cpassword"
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="address">
            Address
          </label>
          <input
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
            type="text"
            id="city"
            className="formFieldInput"
            placeholder="Enter your City Name"
            name="name"
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="zip">
            Zip Code
          </label>
          <input
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


export default FarmerRegForm;
