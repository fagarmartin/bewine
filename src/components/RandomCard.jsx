import { RingLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsService } from "../services/products.services";
import CardProducts from "./CardProducts";

function RandomCard() {
  const [allProducts, setAllProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getProductsService();

      const randomWine = [
        Math.floor(Math.random() * response.data.length),
        Math.floor(Math.random() * response.data.length),
        Math.floor(Math.random() * response.data.length),
      ];
      const randomProduct = [
        response.data[randomWine[0]],
        response.data[randomWine[1]],
        response.data[randomWine[2]],
      ];

      setAllProducts(randomProduct);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }
  return (
    <div className="container-random">
      <h3>También te puede interesar</h3>
      <div className="card-random">
        {allProducts.map((eachProduct, index) => {
          return (
            <div key={`${eachProduct._id}${index}`}>
              <CardProducts cardProduct={eachProduct} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RandomCard;
