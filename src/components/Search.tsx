import { useContext } from "react";
import "./Search.css";
import { getNASAImagesBySearch } from "../services/nasaApi";
import SpaceImage from "./SpaceImage";
import SingleSpaceArticle from "./SingleSpaceArticle";
import { getAllArticles } from "../services/spaceFlightNewsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SearchContext from "../context/SearchContext";

const Search = () => {
  const {
    searchActive,
    setSearchActive,
    searchNasaApi,
    setNasaSearchApi,
    searchText,
    setSearchText,
    lastSearch,
    setLastSearch,
    NASAImages,
    setNASAImages,
    spaceArticles,
    setSpaceArticles,
    visibleCount,
    setVisibleCount,
  } = useContext(SearchContext);

  const loadMore = () => {
    setVisibleCount(visibleCount + 10); // Load 10 more
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
        onClick={() => setNasaSearchApi(!searchNasaApi)}
      >
        <FontAwesomeIcon
          style={{
            paddingRight: "10px",
            paddingBottom: "2px",
            fontSize: "1rem",
          }}
          icon={faArrowRightArrowLeft}
        />
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
      <ul className="space-images-ul">
        {NASAImages &&
          NASAImages.sort(
            (a, b) =>
              new Date(b.data[0].date_created).getTime() -
              new Date(a.data[0].date_created).getTime()
          )
            .slice(0, visibleCount)
            .map((image) => (
              <SpaceImage key={image.data[0].nasa_id} image={image} />
            ))}
      </ul>

      {spaceArticles && <p>{spaceArticles.length} matches</p>}
      <ul className="space-articles-ul">
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
      </ul>

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
