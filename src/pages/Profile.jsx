import { useContext, useEffect, useState } from "react";
import { getHistorialService } from "../services/historial.services";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import CardProducts from "../components/CardProducts";
import { CardGroup } from "react-bootstrap";
import { allwishListService } from "../services/wishlist.services";
import { AuthContext } from "../context/auth.context";
function Profile() {
  const [historial, setHistorial] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getHistorialService();

      setHistorial(response.data);

      const responseWL = await allwishListService();

      setWishlist(responseWL.data);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
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
      <h1>Perfil de {user.user}</h1>

      <h3>Historial de compras</h3>
      {historial.length === 0 && <h2>No has realizado ninguna compra.</h2>}
      <div className="card-container">
        {historial.length > 0 &&
          historial.map((eachCompra) => {
            return (
              <CardProducts
                key={eachCompra._id}
                cardProduct={{
                  name: eachCompra.productId.name,
                  price: eachCompra.productId.price,
                  image: eachCompra.productId.image,
                  _id: eachCompra.productId._id,
                }}
              />
            );
          })}
      </div>
      <hr />
      <h3>Lista de deseos</h3>
      {wishlist.length === 0 && <h2>Agregue productos a su lista de deseos</h2>}
      <div className="card-container">
        {wishlist.map((eachCompra) => {
          return (
            <div key={eachCompra._id}>
              <CardProducts
                cardProduct={{
                  name: eachCompra.name,
                  price: eachCompra.price,
                  image: eachCompra.image,
                  _id: eachCompra._id,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
