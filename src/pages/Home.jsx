import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { RingLoader } from "react-spinners";
import {
  getProductsService,
  searchProductService,
} from "../services/products.services";
import { useEffect } from "react";
import CardProducts from "../components/CardProducts";
import ControlledCarousel from "../components/ControlledCarousel";
import CardGroup from "react-bootstrap/CardGroup";
import Search from "../components/Search";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GlobalContext } from "../context/cart.context";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import ToastMessage from "../components/ToastMessage";

function Home() {
  const [showToastCart, setShowToastCart] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addProductCart } = useContext(GlobalContext);
  const { isLoggedIn } = useContext(AuthContext);
  const handleAddCart = async (e) => {
    try {
      setIsAdding(true);
      await addProductCart(e.target.id);
      setShowToastCart(true);
      setIsAdding(false);
    } catch (error) {
      
      navigate("/error");
    }
  };

  const navigate = useNavigate;
  const [allProducts, setAllProducts] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getProductsService();
      setAllProducts(response.data);
      setFilteredProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const searchWine = (search, searchDropdown) => {
    let newSearch = allProducts.filter((eachProduct) => {
      if (
        eachProduct.name.toLowerCase().includes(search) &&
        (eachProduct.tipo === searchDropdown || searchDropdown === "")
      ) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredProducts(newSearch);
    return newSearch;
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }

  return (
    <div className="container-all container-responsive">
      <div>
        <Search searchWine={searchWine} />
      </div>

      <ControlledCarousel />
      <section id="products">
        <div className="grid-products">
          {filteredProducts.map((eachProduct) => {
            return (
              <div key={eachProduct._id}>
                <CardProducts cardProduct={eachProduct} />
                <div>
                  <Button
                    className="btn-añadir-home"
                    id={eachProduct._id}
                    onClick={handleAddCart}
                    disabled={isAdding || !isLoggedIn ? true : false}
                  >
                    Añadir a Carrito
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ToastMessage
        setShow={setShowToastCart}
        bgColor={"blue"}
        textColor={"white"}
        show={showToastCart}
        messageTitle={"Carrito de la compra"}
        message={"Producto añadido a su carrito"}
      />
    </div>
  );
}

export default Home;
