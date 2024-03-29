import { useContext, useState } from "react";
import "./Astronauts.css";
import { Astronaut } from "../models/Astronaut";
import { Link } from "react-router-dom";
import backup_img_one from "../assets/backup-astronaut.png";
import LoadingGif from "./LoadingGif";
import AstronautContext from "../context/AstronautContext";

export const durationToSeconds = (duration: string) => {
  // Initialize total seconds to 0
  let totalSeconds = 0;

  // Extract days, hours, minutes, and seconds using regular expressions
  const days = duration.match(/(\d+)D/)?.[1] || "0"; // Find days
  const hours = duration.match(/(\d+)H/)?.[1] || "0"; // Find hours
  const minutes = duration.match(/(\d+)M/)?.[1] || "0"; // Find minutes
  const seconds = duration.match(/(\d+)S/)?.[1] || "0"; // Find seconds

  // Convert each component to seconds and add to total
  totalSeconds += parseInt(seconds); // Add seconds
  totalSeconds += parseInt(minutes) * 60; // Convert minutes to seconds and add
  totalSeconds += parseInt(hours) * 3600; // Convert hours to seconds and add
  totalSeconds += parseInt(days) * 86400; // Convert days to seconds and add

  return totalSeconds;
};

const Astronauts = () => {
  const {
    allAstronauts,
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
  } = useContext(AstronautContext);

  const [showFilterOptions, setShowFilterOptions] = useState(false);

  if (!allAstronauts) {
    return <LoadingGif />;
  }

  const loadMoreAstronauts = () => {
    setVisibleCount(visibleCount + 10); // Load 10 more astronauts
  };

  const filterAstronauts = (astronauts: Astronaut[]) => {
    let filteredAstronauts = [...astronauts];
    if (filterName) {
      filteredAstronauts = filteredAstronauts.filter((naut) =>
        naut.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    if (filterNationality) {
      filteredAstronauts = filteredAstronauts.filter((naut) =>
        naut.nationality.toLowerCase().includes(filterNationality.toLowerCase())
      );
    }
    if (filterInSpace) {
      filteredAstronauts = filteredAstronauts.filter((naut) => naut.in_space);
    }

    if (filterMinAge) {
      filteredAstronauts = filteredAstronauts.filter((naut) => {
        if (naut.date_of_birth) {
          return (
            (new Date().getTime() - new Date(naut.date_of_birth).getTime()) /
              31557600000 >
            +filterMinAge
          );
        }
        return naut.age && naut.age >= +filterMinAge;
      });
    }
    if (filterMaxAge) {
      filteredAstronauts = filteredAstronauts.filter((naut) => {
        if (naut.date_of_birth) {
          return (
            (new Date().getTime() - new Date(naut.date_of_birth).getTime()) /
              31557600000 <
            +filterMaxAge
          );
        }
        return naut.age && naut.age <= +filterMaxAge;
      });
    }
    if (filterMostTimeInSpace) {
      filteredAstronauts = filteredAstronauts.sort((a, b) => {
        // Compare astronauts by their time in space (in seconds)
        return (
          durationToSeconds(b.time_in_space) -
          durationToSeconds(a.time_in_space)
        );
      });
    }
    return filteredAstronauts;
  };

  return (
    <div className="Astronauts">
      <nav>
        <div>
          Learn/<strong>Astronauts</strong>
        </div>
      </nav>
      <div className="filter-container">
        <button onClick={() => setShowFilterOptions((prev) => !prev)}>
          Filter{" "}
          <span className={showFilterOptions ? "flipUpsideDown" : ""}>▼</span>
        </button>
        {showFilterOptions && (
          <>
            <input
              type="text"
              placeholder="Filter by name..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
            <div className="age-range-container">
              <input
                type="number"
                placeholder="Min age"
                value={filterMinAge}
                onChange={(e) => setFilterMinAge(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max age"
                value={filterMaxAge}
                onChange={(e) => setFilterMaxAge(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Filter by nationality..."
              value={filterNationality}
              onChange={(e) => setFilterNationality(e.target.value)}
            />
            <div
              className="in-space-div"
              onClick={() => setFilterInSpace(!filterInSpace)}
            >
              Currently In Space {filterInSpace ? "☑" : "🔲"}
            </div>

            <div
              className="most-time-in-space-div"
              onClick={() => setFilterMostTimeInSpace(!filterMostTimeInSpace)}
            >
              Most time in space {filterMostTimeInSpace ? "☑" : "🔲"}
            </div>
          </>
        )}
      </div>

      <ul>
        {filterAstronauts(shuffledAstronauts)
          .slice(0, visibleCount)
          .map((astronaut) => (
            <li key={astronaut.id} className="naut-container">
              <div className="left-side">
                <img
                  src={astronaut.profile_image ?? backup_img_one}
                  alt={astronaut.name}
                />
              </div>

              <div className="right-side">
                <h2>{astronaut.name}</h2>
                <p>{astronaut.bio}</p>
                <Link to={`/astronauts/${encodeURIComponent(astronaut._id!)}`}>
                  <button>Learn More</button>
                </Link>
              </div>
            </li>
          ))}
      </ul>
      {visibleCount < filterAstronauts(allAstronauts).length && (
        <button onClick={loadMoreAstronauts}>Load More</button>
      )}
    </div>
  );
};

export default Astronauts;
