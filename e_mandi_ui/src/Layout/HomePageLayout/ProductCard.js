import {
  Button,
  CardImg,
  Form,
  Col,
  Row,
  InputGroup,
  FormControl,
  Card,
  Placeholder,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import NavBarHomepage from "./NavBarHomepage";
import FooterNav from "../FooterNav";
import "./home.css";
import { Navigate } from "react-router-dom";
import NavbarAfterLogin from "../../Components/Customer/NavbarAfterLogin";
import Review from "../../Components/Customer/Forms/Review";
function ProductCard(props) {
  let navigate = useNavigate();
  const [vegetables, setVegetables] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setcartData] = useState(1);
  const [vid, setVid] = useState("");
  const [cid, setCid] = useState("");
  const [cartid, setCartid] = useState("");
  const [bgimg, setBgimg] = useState("");
  const [cartDetails, setCartDetails] = useState([]);
  const [Cpincode, setCPincode] = useState("");
  const [Fpincode, setFPincode] = useState("");
  const [FData, setFData] = useState([]);
  const [CData, setCData] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [udata, setUdata] = useState({
    cart_id: "",
    cart_v_quantity: "",
    c_id: "",
    v_id: "",
  });

  useEffect(() => {
    // setBgimg("assets/img/vegBg.jpg");
    // setCid(localStorage.getItem("c_id"));
    const c_id = localStorage.getItem("c_id");
    setCid(c_id);
    getVegetables();
    GetCartDetails(c_id);
  }, []);
  const config =
  {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  };
  const getVegetables = () => {
    axios
      .get("https://localhost:44328/api/Vegetable")
      .then((response) => {
        console.log(response.data);
        setVegetables(response.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetCartDetails = (c_id) => {
    axios
      .get(`https://localhost:44328/api/cart?c_id=${c_id}`,config)
      .then((res) => {
        console.log("cart details", res.data);

        setCartDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function getcartlog() {
    cartDetails.map((item) => {
      setCartid(item.cart_id);
    });
  }

  // let isFlag;
  const AddCart = (e) => {
    e.preventDefault();
    var flag = false;
    if (cartDetails.length == null) {
      flag = false;
    } else {
      flag = true;
    }

    for (var i = 0; i < cartDetails.length; i++) {
      // console.log("cart od",item.v_id,item.c_id);
      console.log("check log");
      if (cartDetails[i].v_id == vid && cartDetails[i].c_id == cid) {
        console.log("cheeekkkkkk i value", i);
        var cartId = Number(cartDetails[i].cart_id);
        var a = Number(cartDetails[i].cart_v_quantity);
        var b = Number(quantity);
        const upqty = Number(a + b);
        console.log("update", upqty);
        const dd = {
          cart_id: cartId,
          cart_v_quantity: upqty,
          c_id: cid,
          v_id: vid,
        };
        PutMethod(cartId, dd);
        flag = false;
        break;
      } else {
        flag = true;
        //break;
      }
    }
    if (flag == true) {
      const alldata = { cart_v_quantity: quantity, c_id: cid, v_id: vid };
      console.log("insert part");
      PostMethod(alldata);
      flag = false;
    }
  };

  const PutMethod = async (cartid, data) => {
    console.log("inside Put", data);
    await axios
      .put(`https://localhost:44328/api/cart/${cartid}`, data,config)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        swal("", "Product Updated Successfully!", "success");
        navigate("/viewcart");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostMethod = (alldata) => {
    console.log("inside Post", alldata);
    axios
      .post("https://localhost:44328/api/cart", alldata,config)
      .then((res) => {
        console.log(res.data);
        setIsAdded(true);
        swal("", "New Product Added Successfully!", "success");
        navigate("/viewcart");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onInputChange = (e) => {
    setcartData(e.target.value);
  };
  const Setid = (vid) => {
    setVid(vid);
  };

  const [authLog, setAuth] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const Role = localStorage.getItem("role");
    console.log(token);
    console.log(Role);
    if (token === null && Role != "customer") {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  

  return (
    <>
      <div className="hero">
        <div className="container-fluid">
          <div className="hero__item set-bg">
            <div className="hero__text">
              <span>FRESH VEGGIES</span>
              <h2>
                From Farm <br />
                To Your Doorstep
              </h2>
              <p>Free Pickup and Delivery Available</p>
              <div className="d-grid gap-2 ">
                <Button variant="success" size="lg">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Featured Product</h2>
              </div>
            </div>
          </div>

          <FormControl
            aria-describedby="basic-addon2"
            type="text"
            className="me-2"
            placeholder="Search Products"
            style={{ borderColor: "#3bb78f"}}
            onChange={(event) => setsearchText(event.target.value)}

          />

          <br />

          <form onSubmit={AddCart}>
            <div className="row featured__filter">
              {vegetables
                .filter((value) => {
                  if (searchText == "") {
                    return value;
                  } else if (
                    value.v_name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((veg, i) => {
                  return (
                    <div
                      key={i}
                      className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                    >
                      <div className="cardbg">
                        <div className="featured__item">
                          <img
                            src={veg.v_image}
                            className="featured__item__pic set-bg"
                            alt="img"
                          ></img>
                        </div>
                        <div className="featured__item__text">
                          <div className="d-grid gap-2 ">
                            <Row>
                              <Col>
                                <h5>{veg.v_name}</h5>
                              </Col>
                              <Col>
                                <h5>Rs. {veg.v_price}</h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <input
                                  placeholder="1 Kg"
                                  type="number"
                                  name="cart_v_quantity"
                                  value={quantity.cart_v_quantity}
                                  onChange={(e) => onInputChange(e)}
                                  min="1"
                                  max="50"
                                />{" "}
                                <label>Qty</label>
                              </Col>
                            </Row>
                            {authLog ? (
                              <>
                                {localStorage.getItem("role") == "farmer" ? (
                                  veg.v_quantity!==0?
                                  <Button
                                    type="submit"
                                    variant="outline-success"
                                    onClick={() => {
                                      swal(
                                        "Farmer",
                                        "You can view only!",
                                        "warning"
                                      );
                                    }}
                                  >
                                    <i className="fa fa-shopping-cart"></i> Add
                                    to Cart
                                  </Button>:<img id="sold_img" src="../assets/img/sold_out.gif" />
                                ) : (
                                  veg.v_quantity!==0?
                                  <Button
                                    type="submit"
                                    variant="outline-success"
                                    onClick={() => {
                                      Setid(veg.v_id);
                                    }}
                                  >
                                    <i className="fa fa-shopping-cart"></i> Add
                                    to Cart
                                  </Button>:<img id="sold_img" src="../assets/img/sold_out.gif" />
                                )}
                              </>
                            ) : (
                              veg.v_quantity!==0?
                              <Button
                                type="submit"
                                variant="outline-success"
                                onClick={() => {
                                  swal({
                                    title: "You need to Login First",
                                    text: "Once Register, you will get access for dashboard!",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                  }).then((willDelete) => {
                                    if (willDelete) {
                                      navigate("/alogout");
                                    } else {
                                      navigate("/");
                                      //swal("Your imaginary file is safe!");
                                    }
                                  });
                                }}
                              >
                                <i className="fa fa-shopping-cart"></i> Add to
                                cart
                              </Button>
                              :<img id="sold_img" src="../assets/img/sold_out.gif" />
                            )}
                          </div>
                        </div>
                      </div>
                      <br />
                    </div>
                  );
                })}
            </div>
          </form>
        </div>
      </section>
      <FooterNav />
    </>
  );
}

export default ProductCard;
