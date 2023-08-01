import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
function Signup({ setKey, setShow }) {
  // seleccionar login al haberte logueado

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const resetInputs = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };
  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const user = { username, email, password };
      await signupService(user);
      resetInputs(); // limpia todos los campos
      setKey("login");
      setShow(true);
      navigate("/");
    } catch (err) {
      if (err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <Card className="signup-form">
      <h3>Sign Up</h3>
      <Card.Body>
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />

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
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Text muted>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </Form.Text>
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Signup
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Signup;
