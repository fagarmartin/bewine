import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router";

const AuthContext = createContext();

function AuthWrapper(props) {
  // 1. los estados o funciones a exportar
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const response = await verifyService();

      setIsLoggedIn(true);
      setUser(response.data.payload);
      setIsLoading(false);
      return response.data.payload;
    } catch (error) {
      console.log("token invalido o no hay token", error);
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }

  // la renderización de la App con el contexto
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
