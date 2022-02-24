import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Alert, Container } from 'react-bootstrap';
import Navigationbar from '../../Layout/Navigationbar';
import FooterNav from '../../Layout/FooterNav';
import swal from 'sweetalert';
import NavbarAfterLogin from './NavbarAfterLogin';

function CustomerTransaction() {
    const [trans, setTrans] = useState([]);
    const [cartDetails, setCartDetails] = useState([]);
    
    const c_id = localStorage.getItem("c_id");
    useEffect(() => {
        getTrans();
      GetCartDetails(c_id);
    },[]);
    const config =
    {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    };

    const getTrans = () => {
        axios.get("https://localhost:44328/api/transaction",config).then(
            (response) => {
                console.log(response.data);
                setTrans(response.data);
            })
            .catch(err => {
                console.log(err)
            })
    };



    useEffect(() => {
      
    }, []);
  
    const GetCartDetails = (c_id) => {
      axios
        .get(`https://localhost:44328/api/cart?c_id=${c_id}`)
        .then((res) => {
          console.log(res.data);
  
          setCartDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  return (
      <>
      <NavbarAfterLogin/>
      <br/>
        <br/>
        <Container fluid>
      <Table  size="lg" hover variant="light" responsive="sm">
                <thead>
                    <th >S No.</th>
                    <th >Transaction Id</th>
                    <th >Date & Time</th>
                    <th >Payment Mode</th>
                    <th >Total Price</th>
                    <th >Delivery Status</th>
                </thead>
                <tbody>
                    {
                        
                        trans.map((item, i) => {
                            return (
                                c_id == item.c_id?(
                                        <tr key={i}>
                                        <td >{i + 1}</td>
                                        <td >{item.t_id}</td>
                                        <td >{item.t_dateandtime}</td>
                                        <td >{item.t_payment_mode}</td>
                                        <td >{item.t_total_amount}</td>
                                        <td className='text-success'>Processing..</td>
                                    </tr>):(<tr><td>No Orders</td></tr>)
                            )
                        })
                    }
                </tbody>
            </Table>
            </Container>
            <FooterNav />
      </>
  )
}

export default CustomerTransaction