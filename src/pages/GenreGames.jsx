import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGamesByGenderList, getNavigationPage } from "../services/globalAPI";
import Products from "../components/Products";

function GenreGames() {
  const params = useParams();
  const [navigationPages, setNavigationPages] = useState({
    next: "",
    previous: "",
  });
  const navigate = useNavigate();
  const [genreList, setGenreList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      console.log("params.id", params.genre);
      setIsLoading(true);
      const response = await getGamesByGenderList(params.genre.toLowerCase());
      console.log(response.data);
      setGenreList(response.data.results);
      setStateNavigationPages(response.data);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };
  const setStateNavigationPages = (data) => {
    setNavigationPages({
      next: data.next,
      previous: data.previous,
    });
  };
  const navigationButton = async () => {
    try {
      const responseGamesList = await getNavigationPage(navigationPages.next);
      const clonedList = [...genreList];
      clonedList.push(...responseGamesList.data.results);
      console.log("clonedList,", clonedList);
      setGenreList(clonedList);
      setStateNavigationPages(responseGamesList.data);
    } catch (error) {
      navigate("/error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Products
      filteredProducts={genreList}
      navigationButton={navigationButton}
    />
  );
}

export default GenreGames;
