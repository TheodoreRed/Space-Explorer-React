import { ReactNode, useEffect, useState } from "react";
import SpaceEventsContext from "./SpaceEventsContext";
import SpaceEvent from "../models/SpaceEvent";
import { getAllSpaceEvents } from "../services/theSpaceDevsApi";

function SpaceEventProvider({ children }: { children: ReactNode }) {
  const [spaceEvents, setSpaceEvents] = useState<SpaceEvent[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [filterSearch, setFilterSearch] = useState("");
  const [filterMinYear, setFilterMinYear] = useState("");
  const [filterMaxYear, setFilterMaxYear] = useState("");
  const [filterMinMonth, setFilterMinMonth] = useState("");
  const [filterMaxMonth, setFilterMaxMonth] = useState("");
  const [filterSavedEvents, setFilterSavedEvents] = useState(false);

  useEffect(() => {
    getAllSpaceEvents().then((res) => setSpaceEvents(res));
  }, []);

  const loadMoreSpaceEvents = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const toggleFilterSavedEvents = () => {
    setFilterSavedEvents(!filterSavedEvents);
  };

  return (
    <SpaceEventsContext.Provider
      value={{
        spaceEvents,
        setSpaceEvents,
        visibleCount,
        setVisibleCount,
        loadMoreSpaceEvents,
        filterSearch,
        setFilterSearch,
        filterMinYear,
        setFilterMinYear,
        filterMaxYear,
        setFilterMaxYear,
        filterMinMonth,
        setFilterMinMonth,
        filterMaxMonth,
        setFilterMaxMonth,
        filterSavedEvents,
        setFilterSavedEvents,
        toggleFilterSavedEvents,
      }}
    >
      {children}
    </SpaceEventsContext.Provider>
  );
}
export default SpaceEventProvider;
