import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivateAdmin(props) {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (user && user.role === "admin") {
    return props.children;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default IsPrivateAdmin;
