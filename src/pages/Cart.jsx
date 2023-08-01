import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { RingLoader } from "react-spinners";
import { GlobalContext } from "../context/cart.context.js";
import CartProduct from "../components/CartProduct";
import { Button } from "react-bootstrap";
import ModalPago from "../components/payment/ModalPago";
import ModalMessage from "../components/modal/ModalMessage.jsx";

function Cart() {
  //mensaje emergente
  const [modalShowMsg, setModalShowMsg] = useState(false);
  //cart context
  const handleClose = () => setModalShowMsg(false);

  const { productsCart, emptyCart, getCartProducts, totalPrice } =
    useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true); // comienza cargado de context
  const navigate = useNavigate();
  //pasarela
  const [modalShow, setModalShow] = useState(false); // mostrar pasarela

  const handleVaciarCarrito = async () => {
    try {
      setIsLoading(true);
      await emptyCart(); // borrar todos los productos del carrito del usuario
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      await getCartProducts();
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };
  useEffect(() => {
    // descomentar si da errores del map
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }

  return (
    <div className="container-responsive">
      <ModalMessage
        show={modalShowMsg}
        handleClose={handleClose}
        acceptBtn={handleVaciarCarrito}
        modalTitle={"Vaciar Carrito"}
        modalBody={"¿Desea vaciar el carrito?"}
      />
      <h3>Carro de la compra</h3>
      <div className="grid-products">
        {productsCart.map((eachProduct, index) => {
          return <CartProduct key={index} cardProduct={eachProduct} />;
        })}
      </div>

      {/* solo se muestran si existen productos en el carrito */}

      {productsCart.length > 0 ? (
        <div>
          <div className="btn-vaciar">
            <Button
              className="color-vaciar"
              onClick={() => setModalShowMsg(true)}
            >
              Vaciar Carrito
            </Button>
            <Button
              className="color-pagar"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              Pagar ahora
            </Button>
            <ModalPago
              price={totalPrice}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
          <div className="input-price">
            <p>Total a pagar</p>
            <input
              style={{ textAlign: "center", width: "100px" }}
              name="total"
              value={totalPrice}
              disabled
            />
            <p>€</p>
          </div>
        </div>
      ) : (
        <h4>El carrito está vacío</h4>
      )}
    </div>
  );
}

export default Cart;
