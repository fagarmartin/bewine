import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { RingLoader } from "react-spinners";

import { useEffect } from "react";
import CardProducts from "../components/CardProducts";
import { getGamesList } from "../services/globalAPI";
import Search from "../components/Search";

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
      console.log(error);
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
      const responseGamesList = await getGamesList();
     
      setAllProducts(responseGamesList.data.results);
      setFilteredProducts(responseGamesList.data.results);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const searchWine = (search, searchDropdown) => {
    let newSearch = allProducts.filter((eachProduct) => { 
      if (
        (eachProduct.genres.filter((e) => e.name === searchDropdown).length > //searches if the array of object genres has the search in it
          0 ||
          searchDropdown === "") &&
        eachProduct.name.toLowerCase().includes(search)
      ) {
        return true;
      } else if (eachProduct.genres.includes(searchDropdown)) {
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

      <section id="products">
        <div className="grid-products">
          {filteredProducts.map((eachProduct) => {
            return (
              <div key={eachProduct.id}>
                <CardProducts cardProduct={eachProduct} />
                <div>
                  <Button
                    className="btn-añadir-home"
                    id={eachProduct.id}
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
