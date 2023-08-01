import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate(props) {
  const { user } = useContext(AuthContext);

  if (user && user.role === "user") {
    return props.children;
  } else if (user && user.role === "admin") {
    // redirige a admin si eres admin e intentas ir a una pagina de usuario
    return <Navigate to={"/admin"} />;
  } else {
    // si no estas logueado
    return <Navigate to={"/"} />;
  }
}

export default IsPrivate;
