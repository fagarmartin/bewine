import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../context/cart.context";
import { useContext, useState } from "react";
import StarRatings from "react-star-ratings";

function CardProducts(props) {
  const { name, background_image, rating, id } = props.cardProduct;
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { addProductCart } = useContext(GlobalContext);
  


  return (
    <Card style={{ width: "20rem" }}>
      <Link to={`/products/${id}/details`}>
        <Card.Img variant="top" src={background_image} />

        <Card.Body>
          <Card.Title>{name}</Card.Title>
        
          <StarRatings
          rating={rating}
          starRatedColor="#f5d742"
          starDimension="20px"
          starSpacing="5px"
          numberOfStars={5}
          name='rating'
          
        />
        </Card.Body>
      </Link>
    </Card>
  );
}
export default CardProducts;
