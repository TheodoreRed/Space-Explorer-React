import { createContext } from "react";
import NASAImage from "../models/NASAImage";
import SpaceArticle from "../models/SpaceArticle";

export interface SearchContextModel {
  searchActive: boolean;
  setSearchActive: (active: boolean) => void;
  searchNasaApi: boolean;
  setNasaSearchApi: (nasaApi: boolean) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  lastSearch: string;
  setLastSearch: (search: string) => void;
  NASAImages: NASAImage[] | null;
  setNASAImages: (images: NASAImage[] | null) => void;
  spaceArticles: SpaceArticle[] | null;
  setSpaceArticles: (articles: SpaceArticle[] | null) => void;
  visibleCount: number;
  setVisibleCount: (count: number) => void;
}

const defaultValues: SearchContextModel = {
  searchActive: false,
  setSearchActive: () => {},
  searchNasaApi: false,
  setNasaSearchApi: () => {},
  searchText: "",
  setSearchText: () => {},
  lastSearch: "",
  setLastSearch: () => {},
  NASAImages: null,
  setNASAImages: () => {},
  spaceArticles: null,
  setSpaceArticles: () => {},
  visibleCount: 10,
  setVisibleCount: () => {},
};

const SearchContext = createContext(defaultValues);

export default SearchContext;
