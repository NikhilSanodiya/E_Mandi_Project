import axios from "axios";
import React, { useState, useEffect } from 'react';
import {Routes, Route,useNavigate } from 'react-router-dom';


function Homepage() {
    const [isloggedIn, setisloggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        
        const config =
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        };

        const apiUrl = "https://localhost:44328/api/admin";
        axios.get(apiUrl, config).then((result) => {
            console.log(result.data);
            setisloggedIn(true);
            localStorage.setItem("isLogin",true);
        }).catch(function (error) {
            console.log(error);
            setisloggedIn(false);
        });

    }, []);

    function Logout() {
        localStorage.removeItem("token");
        setisloggedIn(false);
        navigate("/login");
    }
    return (
        <div>
            {isloggedIn?<h1>Welcome to homepage</h1>:<h1>Your not Logged In</h1>}

            <button onClick={Logout}>Logout</button></div>);
}
export default Homepage;