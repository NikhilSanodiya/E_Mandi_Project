import React from 'react';
import './OrderPlaced.css';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
const OrderPlaced = () => {
    return (
        <div className="limiterorder">

            <div className="container-order100">
                <div className="wrap-order100">
                    <h2 className="orderh2">
                        Your Order is Successfully Placed!
                    </h2>
                    <h6 className="orderh4">
                        Thank You For Shopping.
                    </h6>
                   
                    <Button variant="btn btn-success" className="d-flex justify-content-around"  >
                        <Link to={`/customerorders`}> View Orders</Link></Button>
                </div>
            </div>
        </div>


    );
}

export default OrderPlaced;