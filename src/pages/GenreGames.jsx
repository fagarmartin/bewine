import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGamesByGenderList } from "../services/globalAPI";
import Products from "../components/Products";

function GenreGames() {
  const params = useParams();
  const navigate = useNavigate();
  const [genreList, setGenreList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      console.log("params.id", params.genre);
      setIsLoading(true);
      const response = await getGamesByGenderList(params.genre.toLowerCase());
      setGenreList(response.data.results);
      setIsLoading(false);
    } catch (err) {
      navigate("/error");
    }
  };

  const handleNavigationButton = async()=>{
  

  }
  useEffect(() => {
    getData();
  }, []);
  return <Products filteredProducts={genreList} />;
}

export default GenreGames;
