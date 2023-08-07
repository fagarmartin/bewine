import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";
import NavbarRes from "./components/NavbarRes";
import IsPrivate from "./components/auth/IsPrivate";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AdminHome from "./pages/admin/AdminHome";
import AdminEdit from "./pages/admin/AdminEdit";
import AdminCreate from "./pages/admin/AdminCreate";
import { useState } from "react";
import IsPrivateAdmin from "./components/auth/IsPrivateAdmin";
import PaymentSuccess from "./components/payment/PaymentSuccess";
import OffcanvasLoginSignup from "./components/OffcanvasLoginSignup";
import Footer from "./components/Footer";
import Genres from "./pages/Genres";



function App() {
  //for Offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => {
   
    setShow(false);
  }
 
  const mostrarOcultarLogin = () => setShow(!show);

  return (
    <div className="App">
       <NavbarRes mostrarOcultarLogin={mostrarOcultarLogin} /> 
    
      <Routes>       
        <Route
          path="/profile"
          element={
            <IsPrivate>
              {" "}
              <Profile />{" "}
            </IsPrivate>
          }
        />
        <Route path="/" element={<Home />} />

        {/* cart */}
        <Route path="/genres" element={<Genres/>} />
        <Route path="/genres/:genre" element={<Genres/>} />
        <Route path="/products/:id/details" element={<ProductDetails />} />

        {/* admin */}
        <Route path="/admin" element={<IsPrivateAdmin><AdminHome /></IsPrivateAdmin>} />
        <Route path="/admin/:id/edit" element={<IsPrivateAdmin><AdminEdit /></IsPrivateAdmin>} />
        <Route path="/admin/create" element={<IsPrivateAdmin><AdminCreate /></IsPrivateAdmin>} />
        <Route path="/payment-success" element={ <PaymentSuccess/> }/>
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <OffcanvasLoginSignup show={show} handleClose={handleClose} mostrarOcultarLogin={mostrarOcultarLogin}/>

      <Footer/>
    </div>
  );
}

export default App;
