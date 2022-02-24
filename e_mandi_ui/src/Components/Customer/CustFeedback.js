import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "bootstrap";
import './custfeedback.css';
const CustFeedback = () => {
    const custfeed = localStorage.getItem("c_id");
    let navigate = useNavigate();
    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth() + 1) + '-' + myCurrentDate.getDate()
        + ' ' + myCurrentDate.getHours() + ':' + myCurrentDate.getMinutes() + ':' + myCurrentDate.getSeconds();
    // const { c_id } = useParams();
    const [tripType, setTripType] = useState("");
    const [customer, setCustomer] = useState({
        c_id: custfeed,
        rating: "",
        descriptions: "",
        feedbackdateandtime: date
    });
    const config =
    {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };
    const { c_id, rating, descriptions } = customer;
    const onInputChange = e => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };
    const onSubmit = async e => {
        e.preventDefault();
        await axios.post(`https://localhost:44328/api/feedback`, customer,config);
        swal("", "Feedback Submited Successfully!", "success");
        navigate('/');
        //         navigate('/viewallproducts');
    };
    
    return (
       
        <div className="limiteru">
            <div className="container-feedback100">
                <div className="wrap-feedback100">
                    <div className="main-container">
                        <form className="alignM" onSubmit={e => onSubmit(e)}>
                            <div className="mx-auto shadow p-5" >
                                <div className="App-left ">
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '0vh' }}>
                                        <h1 className="feedback-title">Feedback Form</h1>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '0vh' }}>
                                        <h3 className="Feedback-Ttitle">Please provide your feedback below:</h3>
                                    </div>
                                    <br />
                                    <br />
                                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '0vh' }}>
                                        <h5 className="eedback-TTtitle">How do you rate your overall experience</h5>
                                    </div>
                                    <br />
                                    {/* <br /> */}
                                    <div className="radio-btn-container">
                                        <div
                                            className="radio-btn"
                                        >
                                            <input
                                                type="radio"
                                                value="bad"
                                                name="rating"
                                                onChange={e => onInputChange(e)}
                                            />
                                            Bad
                                        </div>
                                        <div
                                            className="radio-btn"
                                        >
                                            <input
                                                type="radio"
                                                value="average"
                                                name="rating"
                                                onChange={e => onInputChange(e)}
                                            />
                                            Average
                                        </div>
                                        <div
                                            className="radio-btn"
                                        >
                                            <input
                                                type="radio"
                                                value="Good"
                                                name="rating"
                                                onChange={e => onInputChange(e)}
                                            />
                                            Good
                                        </div>
                                        <br />
                                        <div className="form-group ">
                                            <label className="FormControlTextarea1">Feedback Description</label>
                                            <textarea className="form-control" id="FormControlTextarea1"
                                                rows="3" name="descriptions" value={descriptions} onChange={e => onInputChange(e)}></textarea>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col">
                                                <label className="Name">Name</label>
                                                <input type="text" className="form-control" placeholder=""
                                                    name="c_name"

                                                    onChange={e => onInputChange(e)}
                                                />
                                            </div>
                                            <div className="col">
                                                <label className="Name">Mobile No.</label>
                                                <input type="text" className="form-control" placeholder=""
                                                    name="c_mobileno"
                                                    onChange={e => onInputChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <div className="formField" >
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '0vh' }}>
                                                <button type="submit" className="XformFieldButton" >Post</button > {" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )

}
export default CustFeedback;