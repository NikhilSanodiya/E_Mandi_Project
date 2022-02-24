import "./Userreg.css";
import React from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";
import { useEffect, useState, } from "react";
import {useNavigate } from 'react-router-dom';

import swal from 'sweetalert';

function FarmerRegForm() {
  const [farmerData, setFarmerdata] = useState({
    name: "",
    mobile: "",
    password: "",
    cpassword: "",
    address: "",
    aadhar: "",
    city: "",
    zip: "",
  });
  let navigate = useNavigate();
  const [aadharErr, setAadharErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [cpasswordErr, setCPasswordErr] = useState(false);
  const [surveyNoErr, setSurveyNoErr] = useState(false);

  // const [addressErr, setAadharErr] = useState(false);
  // const [cityErr, setAadharErr] = useState(false);
  // const [zipErr, setAadharErr] = useState(false);

  const onChangeSurveyNo = (e) => {
    e.persist();
    var chk = e.target.value;

    if (chk.length > 10) {
      setSurveyNoErr(true);
    } else if (chk.length === 10) {
      setSurveyNoErr(false);
    } else {
      setSurveyNoErr(false);
    }
    console.log("aadhar", e.target.value);
    setFarmerdata({ ...farmerData, [e.target.name]: e.target.value });
  };
  const [showErr, setShowerr] = useState(false);
  const [show, setShow] = useState(false);

  //Mobile validation
  const onChangeMobile = (e) => {
    e.persist();
    var chk = e.target.value;

    if (chk.length < 10 && chk.length > 0) {
      setMobileErr(true);
    } else if (chk.length == 10) {
      setMobileErr(false);
    } else {
      setMobileErr(true);
    }
    console.log("mobile", e.target.value);
    setFarmerdata({ ...farmerData, [e.target.name]: e.target.value });
  };
  //Name validation
  const onChangeName = (e) => {
    e.persist();
    var chk = e.target.value;

    if (chk.length > 0) {
      setNameErr(false);
    } else {
      setNameErr(true);
    }
    console.log("name", e.target.value);
    setFarmerdata({ ...farmerData, [e.target.name]: e.target.value });
  };
  //Aadhar validation
  const onChangeAadhar = (e) => {
    e.persist();
    var chk = e.target.value;

    if (chk.length < 12 && chk.length > 0) {
      setAadharErr(true);
    } else if (chk.length == 12) {
      setAadharErr(false);
    } else {
      setAadharErr(true);
    }
    console.log("aadhar", e.target.value);
    setFarmerdata({ ...farmerData, [e.target.name]: e.target.value });
  };
  //Password validation
  const onChangePass = (e) => {
    e.persist();
    var chkpass = e.target.value;

    if (chkpass.length <= 12 && chkpass.length >= 8) {
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
    console.log("password", e.target.value);
    setFarmerdata({ ...farmerData, [e.target.name]: e.target.value });
  };
  //Confirm Password Validation
  const onChangeCPass = (e) => {
    e.persist();
    var chkpass = e.target.value;
    var pass = farmerData.password;
    if (chkpass === pass) {
      setCPasswordErr(false);
    } else {
      setCPasswordErr(true);
    }
    console.log("cpassword", e.target.value);
    setFarmerdata({ ...farmerData, [e.target.name]: e.target.value });
  };

  // function ErrorToast() {
  //   return (
  //     <Toast
  //       onClose={() => setShowerr(false)}
  //       show={showErr}
  //       bg={"danger"}
  //       position={"bottom-end"}
  //       delay={5000}
  //       autohide
  //     >
  //       <Toast.Header>
  //         <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
  //         <strong className="me-auto"></strong>
  //       </Toast.Header>
  //       <Toast.Body className="text-white">
  //         <b>Invalid Credential's</b>
  //       </Toast.Body>
  //     </Toast>
  //   );
  // }
  // function SuccessToast() {
  //   return (
  //     <Toast
  //       onClose={() => setShow(false)}
  //       show={show}
  //       bg={"success"}
  //       delay={5000}
  //       autohide
  //     >
  //       <Toast.Header>
  //         <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
  //         <strong className="me-auto"></strong>
  //       </Toast.Header>
  //       <Toast.Body className="text-white">
  //         <b>Registered Successfully</b>
  //       </Toast.Body>
  //     </Toast>
  //   );
  // }
  const [farmer, setFarmer] = useState([]);

  const submit = (e) => {
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
    console.log(date);

    axios
      .post("https://localhost:44328/api/farmer", {
        f_name: farmer.name,
        f_aadharno: farmer.aadhar,
        survey_no: farmer.surveyNumber,
        f_mobileno: farmer.mobile,
        f_address: farmer.address,
        f_password: farmer.password,
        f_regdateandtime: date,
        f_status: false,
        f_city: farmer.city,
        f_pincode: farmer.zip,
      })
      .then(function (response) {
        console.log(response.data);
        setFarmer(response.data);
        if (response.status == "201") {
          swal("", "Farmer Registered Successfully!", "success");
          navigate("/userlogin");
        } else {
         // setShowerr(true);
         swal("", "Something Went Wrong!Please Try Again", "warning");
         navigate("/userregistration");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    document.getElementById("farmerForm").reset();
  };

  useEffect(() => {}, [" "]);

  return (
    <div className="formCenter">
      <h3 style={{ color: "#fff" }}>Farmer Registration</h3>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(e);
        }}
        className="formFields"
      >
        <div className="formField" id="farmerForm">
          <label className="formFieldLabel" htmlFor="surveyNumber">
            Survey No.
          </label>
          <input
            value={farmerData.surveyNumber}
            onChange={onChangeSurveyNo}
            autoComplete={"off"}
            type="text"
            id="surveyNumber"
            className="formFieldInput"
            placeholder="Enter your Survey No."
            name="surveyNumber"
            
          />
          <br></br>
          {surveyNoErr ? (
            <span className="error">Please Enter Valid Survey No.</span>
          ) : (
            ""
          )}
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            Full Name
          </label>
          <input
            value={farmerData.name}
            onChange={onChangeName}
            autoComplete={"off"}
            type="text"
            id="name"
            className="formFieldInput"
            placeholder="Enter your full name"
            name="name"
          />
          <br />
          {nameErr ? (
            <span className="error">Name field is required.</span>
          ) : (
            ""
          )}
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
            value={farmerData.mobile}
            onChange={onChangeMobile}
            autoComplete={"off"}
            type="text"
            id="mobile"
            className="formFieldInput"
            placeholder="Enter your Mobile Number"
            name="mobile"
            maxLength={10}
          />
          <br />
          {mobileErr ? (
            <span className="error">Please enter valid mobile no.</span>
          ) : (
            ""
          )}
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
            value={farmerData.aadhar}
            onChange={onChangeAadhar}
            autoComplete={"off"}
            type="text"
            id="aadhar"
            className="formFieldInput"
            placeholder="Enter your Aadhar Number"
            name="aadhar"
            maxLength={12}
          />
          <br />
          {aadharErr ? (
            <span className="error">Please check aadhar no</span>
          ) : (
            ""
          )}
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            value={farmerData.password}
            onChange={onChangePass}
            maxLength={12}
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
          />
          <br />
          {passwordErr ? (
            <span className="error">Enter Valid Password Min 8 and Max 12</span>
          ) : (
            ""
          )}
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            value={farmerData.cpassword}
            onChange={onChangeCPass}
            type="password"
            id="cpassword"
            className="formFieldInput"
            placeholder="Enter your password again"
            name="cpassword"
            maxLength={12}
          />
          <br />
          {cpasswordErr ? (
            <span className="error">Password doesn't match...</span>
          ) : (
            ""
          )}
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
            name="name"
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
          <button type="submit" className="formFieldButton">
            Sign Up
          </button>{" "}
        </div>
      </form>
    </div>
  );
}

export default FarmerRegForm;
