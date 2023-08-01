import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../context/cart.context";

function CartProducts(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addProductCart, removeProductCart } = useContext(GlobalContext);
  const [productsDetails, setProductDetail] = useState({
    _id: props.cardProduct.productId._id,
    name: props.cardProduct.productId.name,
    image: props.cardProduct.productId.image,
    price: props.cardProduct.productId.price,
    quantity: props.cardProduct.quantity,
  });

  const handleRestarProducts = async () => {
    try {
      setIsLoading(true);
      const response = await removeProductCart(props.cardProduct.productId._id); //! devuelve los datos en un array

      if (response.data) {
        // si no ha sido borrado
        setProductDetail({
          _id: response.data.productId._id,
          name: response.data.productId.name,
          image: response.data.productId.image,
          price: response.data.productId.price,
          quantity: response.data.quantity,
        });
        setIsLoading(false);
      } else {
        setProductDetail(null);
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSumarProducts = async () => {
    try {
      setIsLoading(true);
      const response = await addProductCart(props.cardProduct.productId._id); //! devuelve los datos en un array

      setProductDetail({
        _id: response.data.productId._id,
        name: response.data.productId.name,
        image: response.data.productId.image,
        price: response.data.productId.price,
        quantity: response.data.quantity,
      });
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <>
      {/* solo se renderizara si existe, para que cuando se borre desaparezca */}
      {productsDetails && (
        <Card className="cart-carrito" style={{ marginTop: "80px" }}>
          <div>
            <Card.Img variant="top" src={productsDetails.image} width={40} />
          </div>

          <Card.Body>
            <div className="cart-text-carro">
              <Card.Title>{productsDetails.name} </Card.Title>
              <Card.Text>Precio : {productsDetails.price} €</Card.Text>
              <Card.Text>Cantidad :{productsDetails.quantity} </Card.Text>

              <Button
                className="btn-cart"
                onClick={handleRestarProducts}
                disabled={isLoading}
              >
                -
              </Button>
              <Button
                className="btn-cart"
                onClick={handleSumarProducts}
                disabled={isLoading}
              >
                +
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
export default CartProducts;
