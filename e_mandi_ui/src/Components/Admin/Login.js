import React, { useState, } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toast, ToastContainer} from 'react-bootstrap';
import axios from 'axios';
import './login.css';


function Login() {
    const navigate = useNavigate();
    const [adminData, setAdmindata] = useState({ Aadharno: '', Password: '' });
    const [aadharErr, setAadharErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [showErr, setShowerr] = useState(false);
    const [show, setShow] = useState(false);
    const apiUrl = "https://localhost:44328/api/admin/login";
    const Login = (e) => {
        e.preventDefault();
        //debugger;   
        const data = { Aadharno: adminData.Aadharno, Password: adminData.Password };
        axios.post(apiUrl, data)
            .then((result) => {
                //debugger;  
                console.log(result.data);
                //const serializedState = JSON.stringify(result.data.UserDetails);  
                //var a= localStorage.setItem('myData', serializedState);   
                //console.log("A:",a)  
                
                console.log(result.data.message);

                if (result.data.status == "200") {
                    setShow(true);
                    //history.push('/Homepage') 
                    //console.log("check token",result.data.token);
                    localStorage.setItem("token", result.data.token);
                    const role = result.data.role;
                    localStorage.setItem("role",role);
                    //localStorage.setItem("setAuth",true);
                    console.log("Login ok...",role);
                    navigate("/dashboard");
                }
                else {
                    setShowerr(true);
                    //alert('Invalid User Details');
                }
            }).catch(function (error) { console.log(error); });
    };
    //Aadhar validation
    const onChangeAadhar = (e) => {
        e.persist();
        //debugger;  
        var chk = e.target.value;

        if (chk.length <12 && chk.length > 0) {
            setAadharErr(true);
        }
        else {
            setAadharErr(false);
        }
        console.log("Chekc", e.target.value)
        setAdmindata({ ...adminData, [e.target.name]: e.target.value });
    }
    //Password validation
    const onChangePass = (e) => {
        e.persist();
        //debugger;  
        var chkpass = e.target.value;

        if (chkpass.length <= 12 && chkpass.length >= 8) {
            setPasswordErr(false);
        }
        else {
            setPasswordErr(true);
        }
        console.log("Chekc", e.target.value)
        setAdmindata({ ...adminData, [e.target.name]: e.target.value });
    }
    function ErrorToast() {
        return (
            <ToastContainer position={'top-center'}  >
            <Toast onClose={() => setShowerr(false)} show={showErr} bg={'danger'} position={'bottom-end'} delay={3000} autohide>
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
            </ToastContainer>
        );
    }
    function SuccessToast() {
        return (
            <Toast onClose={() => setShow(false)} show={show} bg={'success'} delay={3000} autohide>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto"></strong>
                </Toast.Header>
                <Toast.Body className="text-white"><b>Login Successfully</b></Toast.Body>
            </Toast>
        );
    }
    return (
        <div className="limiter">
          
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGmOYXmoZrp0a9LOyRxxqhlfHJcNtpLt5wZw&usqp=CAU" alt="IMG" />
                    </div>
                    <form onSubmit={Login} className="login100-form validate-form">
                    <ErrorToast />
                  <SuccessToast />
                  <div className="colForm">
                        <span className="login100-form-title">
                            Hello, Admin
                        </span>
                        <div className="wrap-input100 validate-input" data-validate="Valid aadhar number is required">
                            <input className="input100" value={adminData.Aadharno} onChange={onChangeAadhar} type="text" autoComplete={"off"} maxLength={12} onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }} name="Aadharno" placeholder="Aadhar Number" />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                            {aadharErr?<span className="error">Please check aadhar no</span> : ""}
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input className="input100" type="password" value={adminData.Password} name="Password" onChange={onChangePass}  maxLength={12}  placeholder="Password" />
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                            {passwordErr?<span className="error">Enter Valid Password Min 8 and Max 12</span> : ""}
                        </div>
                        </div>
                        <div className="container-login100-form-btn">
                            <button type="submit" className="login100-form-btn">
                                Login
                            </button>
                            <br />
                            <br />
                            {/* <div className="text-center p-t-12">
                                <span className="txt1">
                                    Forgot
                                </span>
                                <a className="txt2" href="#">
                                    Aadhar Number / Password?
                                </a>
                            </div> */}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;