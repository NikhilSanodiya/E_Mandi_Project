import React,{useEffect,useState} from 'react';
import {Navigate } from 'react-router-dom';
import axios from 'axios';
import {Table,Alert, Container} from 'react-bootstrap';
import Navigationbar from '../../Layout/Navigationbar';
import FooterNav from '../../Layout/FooterNav';

function View_Vegetables() {
    const [vegetables, setVegetables] = useState([]);
    useEffect(() => {  
          getVegetables();
    },[]);
    const [authLog,setAuth]=useState(true);
  useEffect(() => {
    const token=localStorage.getItem("token");
    const Role=localStorage.getItem("role");
    console.log(token);
    console.log(Role);
    if(token===null && Role!="admin")
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
    const getVegetables = () => {
        axios.get("https://localhost:44328/api/Vegetable")
        .then( (response) => {
                console.log(response.data);
                setVegetables(response.data);
                
            })
        .catch(err=>{
            console.log(err)
        }) 
    };
    return (
        authLog?
        <>
        <Navigationbar />
        <Container fluid>
        <Alert variant="success">
        <h2>All Vegetables</h2>
        </Alert>
        <Table hover variant="success" responsive="sm">
        <thead>
                <th>Sr No.</th>
                <th>Vegetable Name</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>                
                <th>Date and Time</th>                
                <th>Unit</th>                                                          
                <th>Status</th>                            
            </thead>
            <tbody>
                {
                    vegetables.map((item,i)=>{
                        return(
                            vegetables==null?
                            <h1>No Data</h1>
                            :
                            <tr key={i}>
                                <td style={{padding:30}}>{i+1}</td>
                                <td style={{padding:30}}>{item.v_name}</td>
                                <td> <img style={{Height: 70,width: 70}} src={item.v_image} alt="vimage"/></td>
                                <td style={{padding:30}}>{item.v_quantity}</td>
                                <td style={{padding:30}}>{item.v_price}</td>
                                <td style={{padding:30}}>{item.v_dateandtime}</td>
                                <td style={{padding:30}}>{item.v_unit}</td>
                                <td style={{padding:30}}>{item.v_status === true ? "Active" : "Inactive"}</td>
                                
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>

         <FooterNav />

         </Container>
      </>:<Navigate to="/adminlogin" replace />
             
        
    );
}



export default View_Vegetables;

