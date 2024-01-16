import { createContext } from "react";
import SpaceEvent from "../models/SpaceEvent";

export interface SpaceEventsContextModel {
  spaceEvents: SpaceEvent[] | null;
  setSpaceEvents: (spaceEvents: SpaceEvent[] | null) => void;
  visibleCount: number;
  setVisibleCount: (count: number) => void;
  loadMoreSpaceEvents: () => void;
  filterSearch: string;
  setFilterSearch: (search: string) => void;
  filterMinYear: string;
  setFilterMinYear: (minYear: string) => void;
  filterMaxYear: string;
  setFilterMaxYear: (maxYear: string) => void;
  filterMinMonth: string;
  setFilterMinMonth: (minMonth: string) => void;
  filterMaxMonth: string;
  setFilterMaxMonth: (maxMonth: string) => void;
  filterSavedEvents: boolean;
  setFilterSavedEvents: (savedEvents: boolean) => void;
  toggleFilterSavedEvents: () => void;
}

const defaultValue: SpaceEventsContextModel = {
  spaceEvents: null,
  setSpaceEvents: () => {},
  visibleCount: 10,
  setVisibleCount: () => {},
  loadMoreSpaceEvents: () => {},
  filterSearch: "",
  setFilterSearch: () => {},
  filterMinYear: "",
  setFilterMinYear: () => {},
  filterMaxYear: "",
  setFilterMaxYear: () => {},
  filterMinMonth: "",
  setFilterMinMonth: () => {},
  filterMaxMonth: "",
  setFilterMaxMonth: () => {},
  filterSavedEvents: false,
  setFilterSavedEvents: () => {},
  toggleFilterSavedEvents: () => {},
};

const SpaceEventsContext = createContext(defaultValue);
export default SpaceEventsContext;
