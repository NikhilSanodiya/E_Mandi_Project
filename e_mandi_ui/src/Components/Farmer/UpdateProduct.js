import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  let navigate = useNavigate();
  const { v_id } = useParams();
  var myCurrentDate = new Date();
  var date =
    myCurrentDate.getFullYear() +
    "-" +
    (myCurrentDate.getMonth() + 1) +
    "-" +
    myCurrentDate.getDate() +
    " " +
    myCurrentDate.getHours() +
    ":" +
    myCurrentDate.getMinutes() +
    ":" +
    myCurrentDate.getSeconds();
  const [product, setProduct] = useState({
    v_name: "",
    v_image: "",
    v_quantity: "",
    v_price: "",
    v_dateandtime: date,
    v_unit: "",
    v_status: true,
    f_id: "",
  });
  const {
    v_name,
    v_image,
    v_quantity,
    v_price,
    v_dateandtime,
    v_unit,
    v_status,
    f_id,
  } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadProduct();
  }, []);
  const [authLog, setAuth] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const Role = localStorage.getItem("role");
    console.log(token);
    console.log(Role);
    if (token === null && Role != "farmer") {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);
  const config =
  {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://localhost:44328/api/vegetable/${v_id}`, product);
    swal("", "Product Details updated Successfully!", "success");
    navigate("/viewallproducts");
  };
  const loadProduct = async () => {
    const result = await axios.get(
      `https://localhost:44328/api/vegetable/${v_id}`,
    );
    console.log(result);
    setProduct(result.data);
  };

  return authLog ? (
    <div className="limiterF">
      <div className="container-farmer100">
        <div className="wrap-farmer100">
          <div className="container">
            <div className="mx-auto shadow p-5">
              <h2 className="hdf">Update Product</h2>
              <form className="alignL" onSubmit={(e) => onSubmit(e)}>
                  <br />
                <Table>
                 
                    <tr style={{textAlign:"center"}}>
                        <img
                          src={v_image}
                          alt="product"
                          style={{Height: 80,width: 80}}
                        />
                        <br />  
                        <br />
                      <h3 style={{color:"#ffffff"}} >{v_name}</h3>

                    
                      
                      </tr>
               
                </Table>

                <div className="form-group">
                  <label className="labels">Enter Quantity of vegetable</label>
                  <input
                    type="number"
                    className="form-control form-control-xs"
                    placeholder="Quantity"
                    name="v_quantity"
                    value={v_quantity}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label className="labels">Enter Price of vegetable</label>
                  <input
                    type="number"
                    className="form-control form-control-xs"
                    placeholder="Price"
                    name="v_price"
                    value={v_price}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label className="labels">Enter Unit of vegetable</label>
                  <input
                    type="text"
                    className="form-control form-control-xs"
                    placeholder="Unit"
                    name="v_unit"
                    value={v_unit}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                                <br/>
                
                <button className="btn btn-warning btn-lg">
                  Update Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default UpdateProduct;
