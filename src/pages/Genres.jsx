import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenresList } from "../services/globalAPI";
import { PuffLoader } from "react-spinners";

function Genres() {
  const navigate = useNavigate();
  const [genreList, setGenreList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getGenresList();
      //console.log(response.data.results);
      setGenreList(response.data.results);
      setIsLoading(false);
    } catch (error) {
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
   <div className="container">
    <h2>Genres</h2>
    <div className="genres-container">
       
      {genreList.map((eachElement) => {
        return (
          <div
            key={eachElement.id}
            className="genre-card"
            style={{ backgroundImage:`linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%),url(${eachElement.image_background})` }}
          >
            <h2>            
              <a href={`/genres/${eachElement.name}`}> {eachElement.name}</a>
            </h2>
            <h5>{eachElement.games_count} games</h5>
            {/* <img src={eachElement.image_background} alt={eachElement.name} /> */}
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default Genres;
