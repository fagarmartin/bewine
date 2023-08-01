import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../context/cart.context";
import { useContext, useState } from "react";

function CardProducts(props) {
  const { name, image, price, _id } = props.cardProduct;
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { addProductCart } = useContext(GlobalContext);
  const handleAddCart = async (e) => {
    try {
      setIsAdding(true);
      await addProductCart(e.target.id);
      setIsAdding(false);
    } catch (error) {
      
      navigate("/error");
    }
  };

  return (
    <Card style={{ width: "20rem" }}>
      <Link to={`/products/${_id}/details`}>
        <Card.Img variant="top" src={image} width={40} />

        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{price} €</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}
export default CardProducts;
