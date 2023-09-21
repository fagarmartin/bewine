import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useEffect } from "react";
import CardProducts from "../components/CardProducts";
import {
  getGamesByGenderAndNameList,
  getGamesByGenderList,
  getGamesByName,
  getGamesList,
  getNavigationPage,
} from "../services/globalAPI";
import Search from "../components/Search";

import { GlobalContext } from "../context/cart.context";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";
import ToastMessage from "../components/ToastMessage";
import Products from "../components/Products";

function Home() {
  const [showToastCart, setShowToastCart] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addProductCart } = useContext(GlobalContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [navigationPages, setNavigationPages] = useState({
    next: "",
    previous: "",
  });
const [rawDataGames,setRawDataGames]=useState([])

  const navigate = useNavigate;
  const [allProducts, setAllProducts] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const setStateNavigationPages = (data) => {
    setNavigationPages({
      next: data.next,
      previous: data.previous,
    });
  };
  const getData = async () => {
    try {
      const responseGamesList = await getGamesList();

      setAllProducts(responseGamesList.data.results);
      setFilteredProducts(responseGamesList.data.results);
      console.log("rawDataGames",responseGamesList)
      setRawDataGames(responseGamesList.data)
      setStateNavigationPages(responseGamesList.data);

      setIsLoading(false);
    } catch (error) {
     // navigate("/error");
     console.log(error)
    }
  };
  const navigationButton = async () => {
    try {
     
      const responseGamesList = await getNavigationPage(navigationPages.next);
      const clonedList = [...allProducts];
      clonedList.push(...responseGamesList.data.results);
      console.log("clonedList,",clonedList)
      setAllProducts(clonedList);
      setFilteredProducts(clonedList);
      setStateNavigationPages(responseGamesList.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const searchGames = async (search, searchDropdown) => {
    try {
     
        const response = await getGamesByName(search); //by name
        setFilteredProducts(response.data.results);
      
    } catch (err) {
      navigate("/error");
    }
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <PuffLoader color={"#005f73"} />
      </div>
    );
  }

  return (
    <div className="container-all container-responsive">
      <div>
        <Search searchGames={searchGames} />
      </div>

   <Products filteredProducts={filteredProducts}  navigationButton={navigationButton}/>

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
