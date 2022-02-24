import axios from "axios";
import React, { Component } from "react";
import {Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import { Table, Button, Row, Col, Form, } from 'react-bootstrap';
import swal from 'sweetalert';
import { Container } from "react-bootstrap";
// import AddVegetables from "./AddVegetables";
import './updateprofile.css';
import { Alert } from "bootstrap";
import NavbarFarmer from "./NavbarFarmer";
import FooterNav from "../../Layout/FooterNav";
//import './addvegetabledemo.css';
const Updateprofile = () => {
    let f_id=localStorage.getItem("f_id");
    let navigate = useNavigate();
    //const { f_id } = useParams();

    const [user, setUser] = useState({

        f_id:f_id,
        f_name: "",
        f_aadharno: "",
        survey_no: "",
        f_mobileno: "",
        f_address: "",
        f_city: "",
        f_pincode: ""
    });

    const { f_name, f_aadharno, survey_no, f_mobileno, f_address, f_city, f_pincode } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        //     if (user.data.status == "200") {
        //         alert("Details Updated successfully")
        //     }

    };
    // const onChangeHandler=(fieldName,value)=>{
    //     if(fieldName==="f_name"){
    //         setName(value);
    //     }
    //     else if(fieldName==="f_mobileno"){}
    // }



    useEffect(() => {
        loadUser()
    }, []);
    const [authLog,setAuth]=useState(true);
    useEffect(() => {
      const token=localStorage.getItem("token");
      const Role=localStorage.getItem("role");
      console.log(token);
      console.log(Role);
      if(token===null && Role!="farmer")
      {
        setAuth(false);
  
      }
      else
      {
        setAuth(true);
      }
    },[]);
    const config =
    {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };
    const onSubmit = async e => {
        e.preventDefault();

        await axios.put(`https://localhost:44328/api/Farmer/${f_id}`, user);
        
        document.getElementById("updateform").reset();
        swal("", "Farmer Details Updated Successfully!", "success");
        navigate('/farmerdashboard');

    };
    const loadUser = async () => {
        const result = await axios.get(`https://localhost:44328/api/Farmer/${f_id}`);
        console.log(result);
        setUser(result.data);

        // if (result.data.status == "200") {
        //     // setShow(true);
        // //     //history.push('/Homepage') 
        // //     //console.log("check token",result.data.token);
        //     localStorage.setItem("token", result.data.token);
        //     console.log("update ok...");
        // //     // navigate("/dashboard");
        // }
        //         else {
        //             setShowerr(true);
        //             //alert('Invalid User Details');
        //         }
        //     }).catch(function (error) { console.log(error); });
        //     document.
        // };


    }
    return (
        authLog?
        <>
            <NavbarFarmer />

            <div className="limiterp">
                <div className="container-profile100">
                    {/* <div className="wrap-farmer100"></div> */}
                    <div className="container-profile200">
                        <div className=" bux mx-auto shadow p-5 " >
                            <div className="formCenter">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    onSubmit(e);
                                }} className="formFields " id="updateform">
                                    {/* <ErrorToast/>
                    <SuccessToast/> */}
                                    <div className="formField">
                                        <label className="formFieldLabel" htmlFor="f_aadharno">
                                            Aadhar No
                                        </label>
                                        <input
                                            type="text"
                                            id="f_aadharno"
                                            className="formFieldInput"
                                            placeholder="XXXX XXXX XXXX"
                                            name="f_aadharno"
                                            value={f_aadharno}
                                            disabled
                                        />
                                    </div >


                                    <div className="formField">
                                        <label className="formFieldLabel" htmlFor="survey_no">
                                            Survey Number
                                        </label>
                                        <input
                                            type="text"
                                            id="survey_no"
                                            className="formFieldInput"
                                            placeholder="XXXX XXXX XXXX"
                                            name="survey_no"
                                            value={survey_no}
                                            disabled
                                        />
                                    </div >
                                    <div className="formField" >
                                        <label className="formFieldLabel" htmlFor="f_name" >
                                            Name
                                        </label >
                                        <input
                                            type="text"
                                            id="f_name"
                                            className="formFieldInput"
                                            placeholder=""
                                            name="f_name"
                                            value={f_name}
                                            onChange={e => onInputChange(e)}
                                        />
                                        {/* {nameError?<span className="error"> Name is Required</span>:""} */}
                                        {/* <span className="text-danger">{this.state.nameError}</span> */}
                                    </div >


                                    <div className="formField" >
                                        <label className="formFieldLabel" htmlFor="f_mobileno" >
                                            Mobile No
                                        </label >
                                        <input

                                            // onKeyPress={(event) => {
                                            //     if (!/[0-9]/.test(event.key)) {
                                            //         event.preventDefault();
                                            //     }
                                            //   }}
                                            //             value={user.f_mobileno} 
                                            //               autoComplete={"off"}
                                            type="number"
                                            id="f_mobileno"
                                            className="formFieldInput"
                                            placeholder=""
                                            name="f_mobileno"
                                            value={f_mobileno}
                                            onChange={e => onInputChange(e)}

                                        />
                                    </div >


                                    <div className="formField" >
                                        <label className="formFieldLabel" htmlFor="f_address" >
                                            Address
                                        </label >
                                        <input
                                            type="text"
                                            id="f_address"
                                            className="formFieldInput"
                                            placeholder=""
                                            name="f_address"
                                            value={f_address}
                                            onChange={e => onInputChange(e)}
                                        />
                                    </div >



                                    <div className="formField" >
                                        <label className="formFieldLabel" htmlFor="f_pincode" >
                                            Pin Code
                                        </label >
                                        <input
                                            type="number"
                                            id="f_pincode"
                                            className="formFieldInput"
                                            placeholder=""
                                            name="f_pincode"
                                            value={f_pincode}
                                            onChange={e => onInputChange(e)}
                                        />
                                    </div >


                                    <div className="formField" >
                                        <label className="formFieldLabel" htmlFor="f_city" >
                                            City
                                        </label >
                                        <input
                                            type="text"
                                            id="f_city"
                                            className="formFieldInput"
                                            placeholder=""
                                            name="f_city"
                                            value={f_city}
                                            onChange={e => onInputChange(e)}
                                        />
                                    </div >







                                    <div className="formField" >

                                        <button type="submit" className="formFieldButton" >Update Profile</button > {" "}
                                    </div>

                                    {/*                               
                                        <div className="formField" >
                                            <button type="submit" className="formFieldButton" >Change Password</button > {" "}
                                        </div> */}


                                </form >
                            </div >


                        </div>
                    </div>
                </div>
            </div>
            <FooterNav />
        </>:<Navigate to="/" replace />
    );
}
export default Updateprofile;
