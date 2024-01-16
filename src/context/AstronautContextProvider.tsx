import { ReactNode, useEffect, useState } from "react";
import AstronautContext from "./AstronautContext";
import { Astronaut } from "../models/Astronaut";
import { getAllAstronauts } from "../services/theSpaceDevsApi";
import { shuffleArray } from "../utilities/utils";

function AstronautProvider({ children }: { children: ReactNode }) {
  const [allAstronauts, setAllAstronauts] = useState<Astronaut[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [filterName, setFilterName] = useState("");
  const [filterMinAge, setFilterMinAge] = useState("");
  const [filterMaxAge, setFilterMaxAge] = useState("");
  const [filterNationality, setFilterNationality] = useState("");
  const [filterInSpace, setFilterInSpace] = useState(false);
  const [filterMostTimeInSpace, setFilterMostTimeInSpace] = useState(false);
  const [shuffledAstronauts, setShuffledAstronauts] = useState<Astronaut[]>([]);

  useEffect(() => {
    getAllAstronauts().then((res) => {
      setAllAstronauts(res);
      const shuffled = [...res];
      shuffleArray(shuffled);
      setShuffledAstronauts(shuffled);
    });
  }, []);

  return (
    <AstronautContext.Provider
      value={{
        allAstronauts,
        setAllAstronauts,
        visibleCount,
        setVisibleCount,
        filterName,
        setFilterName,
        filterMinAge,
        setFilterMinAge,
        filterMaxAge,
        setFilterMaxAge,
        filterNationality,
        setFilterNationality,
        filterInSpace,
        setFilterInSpace,
        filterMostTimeInSpace,
        setFilterMostTimeInSpace,
        shuffledAstronauts,
        setShuffledAstronauts,
      }}
    >
      {children}
    </AstronautContext.Provider>
  );
}

export default AstronautProvider;
