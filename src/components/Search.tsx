import { useState } from "react";
import "./Search.css";
import NASAImage from "../models/NASAImage";
import { getNASAImagesBySearch } from "../services/nasaApi";
import SpaceImage from "./SpaceImage";

const Search = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [NASAImages, setNASAImages] = useState<NASAImage[] | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchActive(true);
    getNASAImagesBySearch(searchText).then((res) => {
      console.log(res);
      if (res) {
        setNASAImages(res);
      }
    });

    setLastSearch(searchText);
    setSearchText("");
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
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button type="submit" className="searchBtn">
          Search
        </button>
      </form>
      {searchActive && <p>{`Showing results for: ${lastSearch}`}</p>}
      {NASAImages && <p>{NASAImages.length} matches</p>}
      {NASAImages &&
        NASAImages?.map((image) => (
          <SpaceImage key={image.data[0].nasa_id} image={image} />
        ))}
    </div>
  );
};

export default Search;
