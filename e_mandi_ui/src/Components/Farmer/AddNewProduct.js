import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { Container, Alert, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./Farmer.css";
import NavbarFarmer from "./NavbarFarmer";
import FooterNav from "../../Layout/FooterNav";

const AddNewProduct = () => {
  let [veggie, setVeggie] = useState("Select Product");
  let [veggiename, setveggiename] = useState("");
  let veggies = [
    {
      id: 1,
      name: "Brocolli  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg",
    },
    {
      id: 2,
      name: "Cauliflower  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg",
    },
    {
      id: 3,
      name: "Cucumber  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg",
    },
    {
      id: 4,
      name: "Beetroot  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg",
    },
    {
      id: 5,
      name: "Carrot  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/carrots.jpg",
    },
    {
      id: 6,
      name: "Tomato  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/tomato.jpg",
    },
    {
      id: 7,
      name: "Beans  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beans.jpg",
    },
    {
      id: 8,
      name: "Brinjal  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/brinjal.jpg",
    },
    {
      id: 9,
      name: "Capsicum",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/capsicum.jpg",
    },
    {
      id: 10,
      name: "Mushroom  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/button-mushroom.jpg",
    },
    {
      id: 11,
      name: "Potato  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/potato.jpg",
    },
    {
      id: 12,
      name: "Pumpkin  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/pumpkin.jpg",
    },
    {
      id: 13,
      name: "Corn  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/corn.jpg",
    },
    {
      id: 14,
      name: "Onion  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/onion.jpg",
    },
    {
      id: 15,
      name: "Apple  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg",
    },
    {
      id: 16,
      name: "Banana  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/banana.jpg",
    },
    {
      id: 17,
      name: "Grapes  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/grapes.jpg",
    },
    {
      id: 18,
      name: "Mango  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/mango.jpg",
    },
    {
      id: 19,
      name: "Musk Melon  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/musk-melon.jpg",
    },
    {
      id: 20,
      name: "Orange  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/orange.jpg",
    },
    {
      id: 21,
      name: "Pears  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/pears.jpg",
    },
    {
      id: 22,
      name: "Pomegranate  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/pomegranate.jpg",
    },
    {
      id: 23,
      name: "Raspberry",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/raspberry.jpg",
    },
    {
      id: 24,
      name: "Strawberry",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/strawberry.jpg",
    },
    {
      id: 25,
      name: "Water Melon  ",

      image:
        "https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/water-melon.jpg",
    },
  ];

  let navigate = useNavigate();
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
    v_name:"",
    v_image: "",
    v_quantity: "",
    v_price: "",
    v_dateandtime: date,
    v_unit: "",
    v_status: "",
    f_id: localStorage.getItem("f_id"),
  });
  const { v_name, v_image, v_quantity, v_price, v_unit, v_status } = product;

  let handleVegChange = (e) => {
    setVeggie(e.target.value);
    veggies.filter((veg) => {
      if (veg.image === e.target.value) {
        console.log(veg.name);
        setveggiename(veg.name);
      }
    });
    // console.log(veggie);
  };
  // product.v_image = veggie;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
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

    await axios.post(`https://localhost:44328/api/vegetable`, {
      v_name: veggiename,
      v_image: veggie,
      v_quantity: v_quantity,
      v_price: v_price,
      v_dateandtime: date,
      v_unit: v_unit,
      v_status: true,
      f_id: localStorage.getItem("f_id"),
    });
    swal("", "New Product Added Successfully!", "success");
    navigate("/viewallproducts");
  };

  return authLog ? (
    <>
      <NavbarFarmer />

      <div className="limiterF">
        <div className="container-farmer100">
          <div className="wrap-farmer100">
            <div className="container">
              <div className="mx-auto shadow p-5">
                <h2 className="hdf">Add Your Product</h2>
                <form className="alignL" onSubmit={(e) => onSubmit(e)}>
                  
                  <div className="form-group">
                    <label className="labels">Select Product</label>
                    <br />


                    <div className="dropdown">
                      <select
                        class="btn btn-light dropdown-toggle"
                        onChange={handleVegChange}
                      >
                        <option value="Select Product">
                          {" "}
                          -- Select Product --{" "}
                        </option>

                        {veggies.map((veg) => (
                          <option value={veg.image}>{veg.name}</option>
                        ))}
                      </select>
                    </div>
              
                  </div>
                  <div className="form-group">
                    <label className="labels">Enter Vegetable Name</label>
                    <input
                      type="text"
                      className="form-control form-control-xs"
                      placeholder="Enter Your Vegetable Name"
                      name="v_name"
                      value={veggiename}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="labels">
                      Enter Quantity of vegetable
                    </label>
                    <input
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
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
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
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
                      placeholder="Kg"
                      name="v_unit"
                      value={v_unit}
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <br />
                  <button className="btn btn-warning btn-lg">Add Product</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <FooterNav/>

    </>
  ) : (
    <Navigate to="/userlogin" replace />
  );
};

export default AddNewProduct;
