import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/auth.context";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

function Login({ mostrarOcultarLogin }) {
  //funcion para ocultar formularios
  const { authenticateUser, user } = useContext(AuthContext); // trae la funcion de context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //1. guardamos token en un lugar seguro
      const response = await loginService({
        email,
        password,
      });

      localStorage.setItem("authToken", response.data.authToken);
      //2. verificamos el token para saber quien es el usuario
      const payload = await authenticateUser();

      switch (
        payload.role // segun el rol redirige a diferente pagina home
      ) {
        case "user":
          navigate("/");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
          break;
      }

      mostrarOcultarLogin(); // cierra offcanvas de los formularios
    } catch (err) {
      if (err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  useEffect(() => {
    if (user) {
      switch (
        user.role // depende del usuario te redirige a su pagina home
      ) {
        case "user":
          navigate("/");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, []);
  return (
    <div>
      <Card className="login-form">
        <h3>Log In</h3>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
