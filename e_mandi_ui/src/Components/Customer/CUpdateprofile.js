import axios from "axios";
import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import { Table, Button, Row, Col, Form, } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import swal from "sweetalert";
import './cupdateprofile.css';
import { Alert } from "bootstrap";
import NavbarAfterLogin from "./NavbarAfterLogin";
import FooterNav from "../../Layout/FooterNav";
const CUpdateprofile = () => {
    let custid=localStorage.getItem("c_id");
    let navigate = useNavigate();
    //const { c_id } = useParams();
    const [user, setUser] = useState({
        c_id:custid,
        c_name: "",
        c_aadharno: "",
        c_mobileno: "",
        c_address: "",
        c_city: "",
        c_pincode: ""
    });

    const { c_name, c_aadharno, c_mobileno, c_address, c_city, c_pincode } = user;

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
    const config =
    {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };
    const onSubmit = async e => {
        e.preventDefault();

        await axios.put(`https://localhost:44328/api/Customer/${custid}`, user);
        //  navigate('/viewallproducts');
        document.getElementById("updateform").reset();
        swal("", "Customer Details Updated Successfully!", "success");
        navigate('/');


    };
    const loadUser = async () => {
        const result = await axios.get(`https://localhost:44328/api/Customer/${custid}`);
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
        <>
        <NavbarAfterLogin/>
        <div className="limiterp">
            <div className="container-profile10">
                {/* <div className="wrap-farmer100"></div> */}
                <div className="container-profile20">
                    <div className=" abc mx-auto shadow p-5 " >
                        <div className="formCenter">
                            <form onSubmit={e => {
                                e.preventDefault();
                                onSubmit(e);
                            }} className="formFields " id="updateform">
                                {/* <ErrorToast/>
                    <SuccessToast/> */}
                                <div className="formField">
                                    <label className="formFieldLabel" htmlFor="c_aadharno">
                                        Aadhar No
                                    </label>
                                    <input
                                        type="text"
                                        id="c_aadharno"
                                        className="formFieldInput"
                                        placeholder="XXXX XXXX XXXX"
                                        name="c_aadharno"
                                        value={c_aadharno}
                                        disabled
                                    />
                                </div >



                                <div className="formField" >
                                    <label className="formFieldLabel" htmlFor="c_name" >
                                        Name
                                    </label >
                                    <input
                                        type="text"
                                        id="c_name"
                                        className="formFieldInput"
                                        placeholder=""
                                        name="c_name"
                                        value={c_name}
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
                                        id="c_mobileno"
                                        className="formFieldInput"
                                        placeholder=""
                                        name="c_mobileno"
                                        value={c_mobileno}
                                        onChange={e => onInputChange(e)}

                                    />
                                </div >


                                <div className="formField" >
                                    <label className="formFieldLabel" htmlFor="c_address" >
                                        Address
                                    </label >
                                    <input
                                        type="text"
                                        id="c_address"
                                        className="formFieldInput"
                                        placeholder=""
                                        name="c_address"
                                        value={c_address}
                                        onChange={e => onInputChange(e)}
                                    />
                                </div >



                                <div className="formField" >
                                    <label className="formFieldLabel" htmlFor="c_pincode" >
                                        Pin Code
                                    </label >
                                    <input
                                        type="number"
                                        id="c_pincode"
                                        className="formFieldInput"
                                        placeholder=""
                                        name="c_pincode"
                                        value={c_pincode}
                                        onChange={e => onInputChange(e)}
                                    />
                                </div >


                                <div className="formField" >
                                    <label className="formFieldLabel" htmlFor="c_city" >
                                        City
                                    </label >
                                    <input
                                        type="text"
                                        id="c_city"
                                        className="formFieldInput"
                                        placeholder=""
                                        name="c_city"
                                        value={c_city}
                                        onChange={e => onInputChange(e)}
                                    />
                                </div >


                                {/* <Row> */}



                                {/* <Col> */}
                                <div className="formField" >

                                    <button type="submit" className="formFieldButton" >UpdateProfile</button > {" "}
                                </div>
                                {/* </Col> */}
                                {/* <Col>
                                        <div className="formField" >
                                            <button type="submit" className="formFieldButton" >Change Password</button > {" "}
                                        </div>
                                    </Col> */}
                                {/* </Row> */}
                            </form >
                        </div >


                    </div>
                </div>
            </div>
        </div>
        <br></br><br></br>  
        <FooterNav/>
        </>
    );
}
export default CUpdateprofile;
