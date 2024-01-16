import NASAImage from "../models/NASAImage";
import SpaceArticle from "../models/SpaceArticle";
import SearchContext from "./SearchContext";
import { ReactNode, useState } from "react";

function SearchProvider({ children }: { children: ReactNode }) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchNasaApi, setNasaSearchApi] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [NASAImages, setNASAImages] = useState<NASAImage[] | null>(null);
  const [spaceArticles, setSpaceArticles] = useState<SpaceArticle[] | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(10);
  return (
    <SearchContext.Provider
      value={{
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
