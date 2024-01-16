import { createContext } from "react";
import Spacecraft from "../models/Spacecraft";

export interface SpacecraftContextModel {
  allSpacecrafts: Spacecraft[] | null;
  setAllSpacecrafts: (spacecrafts: Spacecraft[] | null) => void;
  visibleCount: number;
  setVisibleCount: (count: number) => void;
  filterSearch: string;
  setFilterSearch: (search: string) => void;
  filterInSpace: boolean;
  setFilterInSpace: (inSpace: boolean) => void;
  filterMostTimeInSpace: boolean;
  setFilterMostTimeInSpace: (mostTime: boolean) => void;
}

const defaultValues: SpacecraftContextModel = {
  allSpacecrafts: null,
  setAllSpacecrafts: () => {},
  visibleCount: 10,
  setVisibleCount: () => {},
  filterSearch: "",
  setFilterSearch: () => {},
  filterInSpace: false,
  setFilterInSpace: () => {},
  filterMostTimeInSpace: false,
  setFilterMostTimeInSpace: () => {},
};

const SpacecraftContext = createContext(defaultValues);

export default SpacecraftContext;
