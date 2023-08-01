import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ironWineImg from "../assets/ironwine.png";
import { GlobalContext } from "../context/cart.context";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function NavbarRes({ mostrarOcultarLogin }) {
  // pasamos funcion de mostrar/ocultar login
  const { totalProductsCart } = useContext(GlobalContext);

  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser, user } = useContext(AuthContext);
  const [linkHome, setLinkHome] = useState("/"); // depende del rol la pagina home

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };
  const handleLogin = () => {
    mostrarOcultarLogin();
  };

  const setHome = () => {
    if (user) {
      switch (
        user.role // depende del usuario te redirige a su pagina home
      ) {
        case "user":
          setLinkHome("/");
          break;
        case "admin":
          setLinkHome("/admin");
          break;
        default:
          navigate("/");
          break;
      }
    }
  };
  useEffect(() => {
    setHome();
  }, []);

  useEffect(() => {
    setHome();
  }, [isLoggedIn]);

  return (
    <>
      <Navbar key={"md"} expand={"md"}>
        <Container fluid>
          <Navbar.Brand href={linkHome}>
            <img
              src={ironWineImg}
              alt="logo"
              width={60}
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Brand href={linkHome}>IRONWINE</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                IronWine
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {((isLoggedIn && user.role !== "admin") || !isLoggedIn) && (
                  <Nav.Link as={Link} to={linkHome}>
                    Home
                  </Nav.Link>
                )}
                {!isLoggedIn && (
                  <Nav.Link as={Link}>
                    <Button onClick={handleLogin} variant="outline-warning">
                      Login/Signup
                    </Button>
                  </Nav.Link>
                )}
                {isLoggedIn && user.role === "admin" && (
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                )}
                {isLoggedIn && user.role === "user" && (
                  <Nav.Link as={Link} to={"/profile"}>
                    Perfil
                  </Nav.Link>
                )}
                {isLoggedIn && user.role === "user" && (
                  <Nav.Link as={Link} to={"/cart"}>
                    <i className="bi bi-cart4" /> Carrito
                    <span
                      style={{
                        backgroundColor: "#56492c",
                        color: "white",
                        borderRadius: "20px",
                        padding: "3px",
                      }}
                    >
                      {totalProductsCart}
                    </span>
                  </Nav.Link>
                )}
               
              </Nav>

              {isLoggedIn && (
                <Nav.Link as={Link}>
                  <Button onClick={handleLogout} variant="outline-warning">
                    Cerrar sesion
                  </Button>
                </Nav.Link>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarRes;
