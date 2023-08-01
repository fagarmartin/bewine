import Offcanvas from "react-bootstrap/Offcanvas";
import ToastMessage from "./ToastMessage";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";


function OffcanvasLoginSignup({ show, handleClose, mostrarOcultarLogin,setShow }) {
  const [key, setKey] = useState("signup"); // para controlar el cambio de tabs
  const [showToast, setShowToast] = useState(false);
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      name="end"
      backdrop={"truenpm"}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CUENTA EN IRONWINE</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="signup" title="Signup">
            <Signup setKey={setKey} show={showToast} setShow={setShowToast}/>
          </Tab>

          <Tab eventKey="login" title="Login">
            <Login mostrarOcultarLogin={mostrarOcultarLogin}  />
          </Tab>
        </Tabs>
        
        <ToastMessage setShow={setShowToast} bgColor={"green"} textColor={"white"} show={showToast} messageTitle={"Usuario Registrado."} message={"Usuario registrado. Ya puede loguearse."}/>

      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffcanvasLoginSignup;
