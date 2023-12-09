import { useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchActive(true);
    setLastSearch(searchText);
    setSearchText("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={`Search ${searchActive ? "active" : ""}`}>
      <h2 className="searchHeader">Search NASA Images</h2>
      <form onSubmit={handleSearch} className="searchForm">
        <input
          type="text"
          className="searchBar"
          placeholder="Enter keywords"
          value={searchText}
          onChange={handleInputChange}
        />
        <button type="submit" className="searchBtn">
          Search
        </button>
      </form>
      {searchActive && <p>{`Showing results for: ${lastSearch}`}</p>}
    </div>
  );
};

export default Search;
