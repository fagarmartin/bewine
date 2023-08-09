import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { getGenresList } from "../services/globalAPI";
function Search({ searchGames }) {
  const [searchInput, setSearchInput] = useState("");
  const [dropdownSearch, setDropDownSearch] = useState("");
  const [searchBarData, setSearchBarData] = useState([]);
  const navigate = useNavigate();
  const getSearchData = async () => {
    try {
      const responseGenreList = await getGenresList();
      setSearchBarData(responseGenreList.data.results);
    } catch (err) {
      navigate("/error");
    }
  };
  useEffect(() => {
    getSearchData();
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    searchGames(e.target.value, dropdownSearch);
  };

  const handleSearchChange = async (searchDrop) => {
    setDropDownSearch(searchDrop);
    searchGames(searchInput, searchDrop);
  };

  return (
    <div className="search-bar">
      <InputGroup className="mb-3">
        <i className="bi bi-search"></i>
        <Form.Control
          value={searchInput}
          type="text"
          onChange={handleSearch}
          placeholder="Search games"
        />
        
      </InputGroup>
    </div>
  );
}

export default Search;
