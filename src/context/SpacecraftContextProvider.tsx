import { ReactNode, useEffect, useState } from "react";
import SpacecraftContext from "./SpacecraftContext";
import { getAllSpacecrafts } from "../services/theSpaceDevsApi";
import Spacecraft from "../models/Spacecraft";

function SpacecraftProvider({ children }: { children: ReactNode }) {
  const [allSpacecrafts, setAllSpacecrafts] = useState<Spacecraft[] | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(10);
  const [filterSearch, setFilterSearch] = useState("");
  const [filterInSpace, setFilterInSpace] = useState(false);
  const [filterMostTimeInSpace, setFilterMostTimeInSpace] = useState(false);

  useEffect(() => {
    getAllSpacecrafts().then((res) => setAllSpacecrafts(res));
  }, []);
  return (
    <SpacecraftContext.Provider
      value={{
        allSpacecrafts,
        setAllSpacecrafts,
        visibleCount,
        setVisibleCount,
        filterSearch,
        setFilterSearch,
        filterInSpace,
        setFilterInSpace,
        filterMostTimeInSpace,
        setFilterMostTimeInSpace,
      }}
    >
      {children}
    </SpacecraftContext.Provider>
  );
}

export default SpacecraftProvider;
