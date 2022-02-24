import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./Forms/AddressForm";
import PaymentForm from "./Forms/PaymentForm";
import Review from "./Forms/Review";
import NavbarAfterLogin from "./NavbarAfterLogin";
import { NavLink } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import { localData } from "./Forms/Review";

const styles = (theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ["Shipping address", "Payment details", "Review your order"];


function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

class Checkout extends React.Component {
  state = {
    activeStep: 0,
  };

  // trans = {
  //   t_dateandtime: localStorage.getItem("date"),
  //   t_payment_mode: localStorage.getItem("newpay"),
  //   t_total_amount: localStorage.getItem("newtotal"),
  //   t_status: true,
  //   c_id: localStorage.getItem("c_id"),
  // };

  // handlePost = () => {
  //   axios
  //     .post("https://localhost:44328/api/transaction", this.trans)
  //     .then ((resp) => {
  //       console.log("data : ", resp.data);
  //     }
  //     )
  //   };

  handleNext = () => {
  console.log(this.state.activeStep);
  if(this.state.activeStep === 1)
  {  
    var valid = localStorage.getItem("payment");
    if(valid == ""){ swal({
      title: "Oops you haven't selected any payement mode ?",
      text: "Please select any one payment mode.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
       this.state.activeStep = 0;
     }
    else{
      swal("", "Payment done Successfully!", "success");
    }
  }
    this.setState((state) => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleClick = () => {};

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
  
    console.log(activeStep);

    // var myCurrentDate = new Date();

    // var date =
    //   myCurrentDate.getFullYear() +
    //   "-" +
    //   (myCurrentDate.getMonth() + 1) +
    //   "-" +
    //   myCurrentDate.getDate() +
    //   " " +
    //   myCurrentDate.getHours() +
    //   ":" +
    //   myCurrentDate.getMinutes() +
    //   ":" +
    //   myCurrentDate.getSeconds();

    // localStorage.setItem("date", date);

    
    return (
      <React.Fragment>
        <CssBaseline />
        {/* <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              E-Mandi
            </Typography>
          </Toolbar>
        </AppBar> */}
        <NavbarAfterLogin />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  
                  <NavLink to="/customerorders">
                    <Button onClick={()=>localData()}>View Orders</Button>
                  </NavLink>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      

                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkout);
