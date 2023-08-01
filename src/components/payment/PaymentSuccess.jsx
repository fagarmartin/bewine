import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { updatePaymentIntentService } from "../../services/payment.services";
import { addHistorialService } from "../../services/historial.services";
import { GlobalContext } from "../../context/cart.context";
const PaymentSuccess = () => {
  const { emptyCart } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isFetching, setIsFetching] = useState(true);
  const addHistorial = async () => {
    try {
      await addHistorialService(); // añade las compras al historial
      await emptyCart(); // borra el carrito del usuario
    } catch (error) {
      
      navigate("/error");
    }
  };
  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    // below is a way to extract queries from the search queries.
    // unfortunately, react-router-dom doesn't come with a proper way to extract them, similar to useParams
    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    const paymentIntentId = new URLSearchParams(location.search).get(
      "payment_intent"
    );

    const paymentIntentInfo = {
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId,
    };

    try {
      await updatePaymentIntentService(paymentIntentInfo);
      setIsFetching(false);
      addHistorial();
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Gracias por confiar en nosotros</h1>
        <Link to={"/"}>Vuelve a casa</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
