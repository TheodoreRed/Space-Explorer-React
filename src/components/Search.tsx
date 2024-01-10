import { useState } from "react";
import "./Search.css";
import NASAImage from "../models/NASAImage";
import { getNASAImagesBySearch } from "../services/nasaApi";
import SpaceImage from "./SpaceImage";
import SpaceArticle from "../models/SpaceArticle";
import SingleSpaceArticle from "./SingleSpaceArticle";
import { getAllArticles } from "../services/spaceFlightNewsApi";

const Search = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchNasaApi, setNasaSeachApi] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  const [NASAImages, setNASAImages] = useState<NASAImage[] | null>(null);
  const [spaceArticles, setSpaceArticles] = useState<SpaceArticle[] | null>(
    null
  );

  const [visibleCount, setVisibleCount] = useState(10);
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Load 10 more
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchNasaApi) {
      setSpaceArticles(null);

      getNASAImagesBySearch(searchText).then((res) => {
        console.log(res);
        if (res) {
          setNASAImages(res);
          setSearchActive(true);
        }
      });
    } else {
      setNASAImages(null);

      getAllArticles(searchText).then((res) => {
        if (res) {
          setSpaceArticles(res);
          setSearchActive(true);
        }
      });
    }

    setLastSearch(searchText);
    setSearchText("");
  };

  return (
    <div className={`Search ${searchActive ? "active" : ""}`}>
      <h2
        className="searchHeader"
        onClick={() => setNasaSeachApi((prev) => !prev)}
      >
        Search <span>{searchNasaApi ? `NASA Images` : "Space Articles"}</span>
      </h2>
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
        NASAImages.slice(0, visibleCount).map((image) => (
          <SpaceImage key={image.data[0].nasa_id} image={image} />
        ))}
      {spaceArticles && <p>{spaceArticles.length} matches</p>}
      {spaceArticles &&
        spaceArticles
          .slice(0, visibleCount)
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
          .map((article) => (
            <SingleSpaceArticle key={article.id} spaceArticle={article} />
          ))}
      {spaceArticles && visibleCount < spaceArticles.length && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
      {spaceArticles &&
        spaceArticles[0] &&
        visibleCount >= spaceArticles.length && (
          <button className="load-more-btn" onClick={() => setVisibleCount(0)}>
            Collapse
          </button>
        )}
      {NASAImages && visibleCount < NASAImages.length && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
      {NASAImages && NASAImages[0] && visibleCount >= NASAImages.length && (
        <button className="load-more-btn" onClick={() => setVisibleCount(0)}>
          Collapse
        </button>
      )}
    </div>
  );
};

export default Search;
