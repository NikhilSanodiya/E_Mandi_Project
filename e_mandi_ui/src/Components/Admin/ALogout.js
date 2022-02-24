import { Navigate } from "react-router-dom";


function ALogout() {
    console.log(localStorage.getItem("role"));
    if(localStorage.getItem("role")==="admin") {
            localStorage.removeItem("token");
            localStorage.removeItem("role");

    }
    return (<Navigate to="/userlogin" replace />);
    
    // swal({
    //     title: "Are you sure?",
    //     text: "Once deleted, you will not be able to recover this customer data",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    // })
    //     .then((willDelete) => {
    //         if (willDelete) {
    //             console.log(localStorage.getItem("role"));
    //             if (localStorage.getItem("role") === "admin") {
    //                 localStorage.removeItem("token");
    //                 localStorage.removeItem("role");
                   
    //             }
    //         <Navigate to="/adminlogin" replace />

    //         }
    //         else {
    //             swal("Customer Data is not Deleted");
    //         }
    //     });
       
}
export default ALogout;