import { Navigate } from "react-router-dom";
function ULogout() {
    if (localStorage.getItem("role") === "farmer" || localStorage.getItem("role") === "customer") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("c_id");

    }
    return (<Navigate exact to="/" replace />);
}
export default ULogout;