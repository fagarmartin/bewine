import { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/category.services";
function Search({ searchWine }) {
  const [searchInput, setSearchInput] = useState("");
  const [dropdownSearch, setDropDownSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchBarData, setSearchBarData] = useState([]);
  const navigate = useNavigate();

  const getSearchData = async () => {
    try {
      const response = await getCategories();     
      setSearchBarData(response.data);
    } catch (err) {
      navigate("/error");
    }
  };
  useEffect(() => {
    getSearchData();
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    searchWine(e.target.value, dropdownSearch);
  };

  const handleSearchChange = async (searchDrop) => {
    setDropDownSearch(searchDrop);
    searchWine(searchInput, searchDrop);
  };

  return (
    <div className="search-bar">
      <InputGroup className="mb-3">
        <i className="bi bi-search"></i>
        <Form.Control
          value={searchInput}
          type="text"
          onChange={handleSearch}
          placeholder="Busque el juego que desee"
        />
        <DropdownButton
          align="end"
          title={dropdownSearch === "" ? "Todas" : dropdownSearch}
          id="dropdown-menu-align-end"
          className="btn-categoria"
        >
          {searchBarData.map((eachElement) => (
            <Dropdown.Item key={eachElement._id}
              value={eachElement.name}
              onClick={() => {
                handleSearchChange(eachElement.name);
              }}
            >            
              {eachElement.name}
            </Dropdown.Item>
          ))}

          <Dropdown.Divider />
          <Dropdown.Item
            value=""
            eventKey="4"
            onClick={() => {
              handleSearchChange("");
            }}
          >
            Todas
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup>
    </div>
  );
}

export default Search;
