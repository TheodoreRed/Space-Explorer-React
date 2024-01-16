import { createContext } from "react";
import { Astronaut } from "../models/Astronaut";

export interface AstronautContextModel {
  allAstronauts: Astronaut[] | null;
  setAllAstronauts: (astronauts: Astronaut[] | null) => void;
  visibleCount: number;
  setVisibleCount: (count: number) => void;
  filterName: string;
  setFilterName: (name: string) => void;
  filterMinAge: string;
  setFilterMinAge: (minAge: string) => void;
  filterMaxAge: string;
  setFilterMaxAge: (maxAge: string) => void;
  filterNationality: string;
  setFilterNationality: (nationality: string) => void;
  filterInSpace: boolean;
  setFilterInSpace: (inSpace: boolean) => void;
  filterMostTimeInSpace: boolean;
  setFilterMostTimeInSpace: (mostTime: boolean) => void;
  shuffledAstronauts: Astronaut[];
  setShuffledAstronauts: (astronauts: Astronaut[]) => void;
}

const defaultValues: AstronautContextModel = {
  allAstronauts: null,
  setAllAstronauts: () => {},
  visibleCount: 10,
  setVisibleCount: () => {},
  filterName: "",
  setFilterName: () => {},
  filterMinAge: "",
  setFilterMinAge: () => {},
  filterMaxAge: "",
  setFilterMaxAge: () => {},
  filterNationality: "",
  setFilterNationality: () => {},
  filterInSpace: false,
  setFilterInSpace: () => {},
  filterMostTimeInSpace: false,
  setFilterMostTimeInSpace: () => {},
  shuffledAstronauts: [],
  setShuffledAstronauts: () => {},
};

const AstronautContext = createContext(defaultValues);

export default AstronautContext;
