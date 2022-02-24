import React, { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import {
  Toast,
  DropdownButton,
  ToastContainer,
  Dropdown,
  Alert,
} from "react-bootstrap";
import axios from "axios";

import "./userlogin.css";

function Login() {
  const navigate = useNavigate();
  const [userData, setUserdata] = useState({
    Aadharno: "",
    Password: "",
    Role: "",
  });
  const [aadharErr, setAadharErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [showErr, setShowerr] = useState(false);
  const [show, setShow] = useState(false);
  const [roleErr, setRoleErr] = useState(false);
  const [showAlrt, setAlert] = useState(false);
  const apiUrl = "https://localhost:44328/api/user/login";
  const Login = (e) => {
    e.preventDefault();
    //debugger;
    const data = {
      Aadharno: userData.Aadharno,
      Password: userData.Password,
      Role: userData.Role,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        //debugger;
        console.log(result.data);
        //const serializedState = JSON.stringify(result.data.UserDetails);
        //var a= localStorage.setItem('myData', serializedState);
        //console.log("A:",a)
        var user = result.data.userDetails;
        console.log(result.data.message);
        console.log("Userd", user);
        if(result.data.status == "200") {
          //history.push('/Homepage')
          //console.log("check token",result.data.token);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("role", result.data.role);
          console.log("chekkkkkkk rolll",localStorage.getItem("role"));
          if (localStorage.getItem("role") === "admin") {
            console.log("Admin Login...")
            navigate("/dashboard");
          }else{
            console.log("check log");
          if(user.f_status == false || user.c_status == false) {
              console.log("chekc alert");
            setShow(true);
          }
          else {
            if(localStorage.getItem("role") == "customer") {
              localStorage.setItem("c_id", user.c_id);
              localStorage.setItem("c_name", user.c_name);
              console.log(localStorage.getItem("c_id"));
              navigate("/");

            }
            if (localStorage.getItem("role") == "farmer") {
              localStorage.setItem("f_id", user.f_id);
              navigate("/farmerdashboard");
            }
         
          }
        }

        } else {
          setShowerr(true);
          //alert('Invalid User Details');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //Aadhar validation
  const onChangeAadhar = (e) => {
    e.persist();
    //debugger;
    var chk = e.target.value;

    if (chk.length < 12 && chk.length > 0) {
      setAadharErr(true);
    } else {
      setAadharErr(false);
    }
    console.log("Chekc", e.target.value);
    setUserdata({ ...userData, [e.target.name]: e.target.value });
  };
  //Password validation
  const onChangePass = (e) => {
    e.persist();
    //debugger;
    var chkpass = e.target.value;

    if (chkpass.length <= 12 && chkpass.length >= 8) {
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
    console.log("Chekc", e.target.value);
    setUserdata({ ...userData, [e.target.name]: e.target.value });
  };
  function WarnToast() {
    return (
      <ToastContainer position={"top-center"}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          bg={"warning"}
          position={"bottom-end"}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto"></strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            <b>You are an Inactive User Please wait for Activation</b>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }
  function ErrorToast() {
    return (
      <ToastContainer position={"top-center"} transition={"zoom"}>
        <Toast
          onClose={() => setShowerr(false)}
          show={showErr}
          bg={"danger"}
          position={"bottom-end"}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto"></strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            <b>Invalid Credential's</b>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }

  function changeRole(e) {
    //console.log({value: e.target.value});
    e.persist();
    //debugger;
    var chk = e.target.value;

    if (chk === "farmer" || chk === "customer" || chk === "admin") {
      setRoleErr(false);
      console.log("Chekc", chk);
    } else {
      setRoleErr(true);
    }
    console.log("Chekc", chk);
    setUserdata({ ...userData, [e.target.name]: e.target.value });
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <h1 className="title-emandi">E-Mandi</h1>
          <ErrorToast />
          <WarnToast />
          <form onSubmit={Login}>
            <div className="login100-pic js-tilt" data-tilt>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <select
                  className="selectdropdown"
                  onChange={changeRole}
                  value={userData.Role}
                  name="Role"
                >
                  <option defaultValue={"Select Role"}>Select Role</option>
                  <option value="admin">admin</option>
                  <option value="farmer">farmer</option>
                  <option value="customer">customer</option>
                </select>
                {roleErr ? (
                  <span className="error">Please Select Role</span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="From">
              <div className="colForm">
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid aadhar number is required"
                >
                  <input
                    className="input100"
                    value={userData.Aadharno}
                    onChange={onChangeAadhar}
                    type="text"
                    autoComplete={"off"}
                    maxLength={12}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    name="Aadharno"
                    placeholder="Aadhar Number"
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  {aadharErr ? (
                    <span className="error">Please check aadhar no</span>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <input
                    className="input100"
                    type="password"
                    value={userData.Password}
                    name="Password"
                    onChange={onChangePass}
                    maxLength={12}
                    placeholder="Password"
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                  {passwordErr ? (
                    <span className="error">
                      Enter Valid Password Min 8 and Max 12
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Login
                </button>
                <br />
                <br />
                <div className="text-center p-t-12">
                  <Link to="/userregistration" style={{ color: "gray" }}>
                    Register Here
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
