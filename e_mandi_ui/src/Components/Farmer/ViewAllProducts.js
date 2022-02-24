import React,{useEffect,useState} from 'react';
import {Navigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {Link,useNavigate} from 'react-router-dom';
import {Table,Alert,Button, Container} from 'react-bootstrap';
import Navigationbar from '../../Layout/Navigationbar';
import FooterNav from '../../Layout/FooterNav';
import NavbarFarmer from './NavbarFarmer';

function FView_Produts() {
    const [vegetables, setVegetables] = useState([]);
    const f_id=localStorage.getItem("f_id");
    useEffect(() => {  
          getVegetables();
    },[]);
    const [authLog,setAuth]=useState(true);
    useEffect(() => {
      const token=localStorage.getItem("token");
      const Role=localStorage.getItem("role");
      
      console.log(token);
      console.log(Role);
      console.log(f_id);
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
    const getVegetables = () => {
        axios.get("https://localhost:44328/api/Vegetable")
        .then( (response) => {
                console.log(response.data);
                setVegetables(response.data.reverse());
               
            })
        .catch(err=>{
            console.log(err)
        }) 
    };
    function DeleteProduct(v_id){
        // alert(s_id)
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this product data",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch(`https://localhost:44328/api/Vegetable/${v_id}`,{
                     method:'DELETE'
                }).then((result)=>{
                result.json().then((resp)=>{
                console.log(resp);
                swal("Product has been deleted!", {
                icon: "success",
                })
                getVegetables();
             })   
            });
            } else {
              swal("Your product is not Deleted");
            }
          });
        

        // fetch(`https://localhost:44328/api/Vegetable/${v_id}`,{
        //     method:'DELETE'
        // }).then((result)=>{
        //     result.json().then((resp)=>{
        //         console.log(resp);
        //         alert("Product deleted Successfully");
        //         getVegetables();
        //     })
        // })   
    }
    

    return (
        authLog?
        <>
        <NavbarFarmer/>
         <br />
         <Container fluid>
         <Button  variant="btn btn-warning" style={{marginLeft:20}} className="d-flex justify-content-around"  >
         <Link to={`/addproduct`}> Add New Product</Link></Button>
         <br />
        <Table hover variant='light' responsive="sm">
        <thead>
               
                <th>Product Name</th>
                <th >Product Image</th>
                <th >Quantity</th>
                <th>Price</th>                
                <th>Date and Time</th>                
                <th >Unit</th>                                                          
                <th >Update</th>
                <th >Delete</th>                          
            </thead>
            <tbody>
                {
                    vegetables.map((item,i)=>{
                        return(
                            f_id!=item.f_id?
                            ""
                            :
                            <tr key={i}>
                               
                                <td style={{padding:30}}>{item.v_name}</td>
                                <td> <img style={{Height: 80,width: 80}} src={item.v_image} alt="vimage"/></td>
                                <td style={{padding:30}}>{item.v_quantity}</td>
                                <td style={{padding:30}}>{item.v_price}</td>
                                <td style={{padding:30}}>{item.v_dateandtime}</td>
                                <td style={{padding:30}}>{item.v_unit}</td>
                                <td style={{padding:30}}><Button variant="success"><Link className="lk" to={`/updateproduct/${item.v_id}`}>Edit</Link></Button></td>
                                <td style={{padding:30}}><Button variant="danger" onClick={()=>DeleteProduct(item.v_id)}>Delete</Button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <br/>
        <br/>
        <br/>
        <FooterNav />
        </Container>
      </>:<Navigate to="/" replace />
             
        
    );
}

export default FView_Produts;