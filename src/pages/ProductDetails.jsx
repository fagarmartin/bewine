import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { detailProductService } from "../services/products.services";
import { RingLoader } from "react-spinners";
import {
  addWishListService,
  isInWishList,
  pullWishListService,
} from "../services/wishlist.services";
import { addCartService } from "../services/cart.services";
import { Button } from "react-bootstrap";
import ToastMessage from "../components/ToastMessage";
import Comentario from "../components/Comentario";
import { AuthContext } from "../context/auth.context";
import { GlobalContext } from "../context/cart.context";
import RandomCard from "../components/RandomCard";
import { getGameDetails } from "../services/globalAPI";

function ProductDetails() {
  const { addProductCart } = useContext(GlobalContext);
  const [msgToast, setMsgToast] = useState("");
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [productDetail, setProductDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isWishList, setIsWishList] = useState(false);
  //toasts
  const [showToast, setShowToast] = useState(false);
  const [showToastCart, setShowToastCart] = useState(false);

  const handleRemoveWish = async () => {
    try {
      await pullWishListService(params.id);
      setMsgToast("Producto eliminado de su lista de deseos");
      setShowToast(true);
      getIsInWishList();
    } catch (error) {
      navigate("/error");
    }
  };
  const handleAddWish = async () => {
    try {
      await addWishListService(params.id);
      setMsgToast("Producto añadido a su lista de deseos");
      setShowToast(true);
      getIsInWishList();
    } catch (error) {
      console.log(error);
      // navigate("/error");
    }
  };
  const handleAddCart = async () => {
    try {
      await addProductCart(params.id);
      setMsgToast("Producto añadido a su carrito");
      setShowToastCart(true);
    } catch (error) {
      console.log(error);
      //navigate("/error");
    }
  };

  const getIsInWishList = async () => {
    try {
      const isInWL = await isInWishList(params.id);

      if (isInWL) {
        setIsWishList(isInWL.data);
      }
    } catch (error) {
      console.log(error);
      //navigate("/error");
    }
  };

  useEffect(() => {
    getData();
    if (isLoggedIn) {
      getIsInWishList();
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    getData();
    setIsLoading(true);
  }, [location]); // cada vez que haya un cambio de url carga datos del producto, para links de debajo

  const getData = async () => {
    try {
      const response = await getGameDetails(params.id);
      setProductDetail(response.data);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // navigate("/error");
    }
  };
  if (isLoading) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }

  const { name, background_image, platforms, description_raw } = productDetail;
  return (
    <div>
      <div className="container-details">
        <h3>{name}</h3>

        <div className="img-details">
          <img src={background_image} alt="vino" />
        </div>
        <p>{description_raw}</p>
        <h4>Platforms</h4>
        <ul className="platforms-list">
          {platforms.map((eachPlatform) => {
            return <li>{eachPlatform.platform.name}</li>;
          })}
        </ul>

        <div className="btn-añadir">
          {!isWishList && isLoggedIn && user.role !== "admin" && (
            <Button onClick={handleAddWish}>Añadir a Lista de Deseos</Button>
          )}
          {isWishList && isLoggedIn && user.role !== "admin" && (
            <Button onClick={handleRemoveWish}>
              Quitar de Lista de Deseos
            </Button>
          )}
        </div>
        <hr />
        <Comentario />
        <hr />

        {/* <RandomCard /> */}
      </div>
      <ToastMessage
        setShow={setShowToast}
        bgColor={"#fff08b"}
        textColor={"black"}
        show={showToast}
        messageTitle={"Lista de deseo"}
        message={msgToast}
      />
      <ToastMessage
        setShow={setShowToastCart}
        bgColor={"blue"}
        textColor={"white"}
        show={showToastCart}
        messageTitle={"Carrito de la compra"}
        message={msgToast}
      />
    </div>
  );
}

export default ProductDetails;
