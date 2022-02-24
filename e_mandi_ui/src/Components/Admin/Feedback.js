import axios from "axios";
import { useState, useEffect } from "react";
import {Navigate } from 'react-router-dom';
import { Table, Button, Row, Col, Form,Alert } from "react-bootstrap";
import Navigationbar from "../../Layout/Navigationbar";
import FooterNav from "../../Layout/FooterNav";
import swal from 'sweetalert';
function Feedback() {
  const [feedbacks, setfeedbacks] = useState([]);
  const [Message, setMessage] = useState("");
  useEffect(() => {
    GetFeedback();
  }, []);
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
  const GetFeedback = () => {
    axios
      .get("https://localhost:44328/api/Feedback",config)
      .then((res) => {
        console.log(res.data);
        setfeedbacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function DeleteFeedback(feedback_id) {
    // fetch(`https://localhost:44328/api/Feedback/${feedback_id}`, {
    //   method: "DELETE",
    // }).then((result) => {
    //   result.json().then((resp) => {
    //     console.log(resp);
    //     GetFeedback();
    //   });
    // });
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this feedback data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`https://localhost:44328/api/Feedback/${feedback_id}`, {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
          }).then((result) => {
            result.json().then((resp) => {
              console.log(resp);
              swal("Feedback has been deleted!", {
                icon: "success",
              })
              GetFeedback();
            })
          });
        } else {
          swal("Feedback is not Deleted");
        }
      });
  }

  return (
    authLog?
    <>
      <Navigationbar />
      <Alert variant="success">
                <h2>Feedbacks</h2>
                <hr />
          <Col></Col>
          <Col xs={4}>
            
          </Col>
          <Col></Col>
            </Alert>
      <Table hover variant="success" responsive="sm">
        <thead>
          <th>SrNo.</th>
          <th>Name</th>
          <th>Mobile No.</th>
          <th>Rating</th>
          <th>Comment</th>
          <th>Date</th>
          <th>Action</th>
        </thead>
        <tbody>
          {feedbacks.map((item, i) => {
            return feedbacks == null ? (
              <h1>No Data</h1>
            ) : (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.Customer.c_name}</td>
                <td>{item.Customer.c_mobileno}</td>
                <td>{item.rating}</td>
                <td>{item.descriptions}</td>
                <td>{item.feedbackdateandtime}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => DeleteFeedback(item.feedback_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <FooterNav />
    </>:<Navigate to="/adminlogin" replace />
  );
}

export default Feedback;
