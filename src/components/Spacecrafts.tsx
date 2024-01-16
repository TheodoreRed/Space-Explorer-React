import { useContext, useState } from "react";
import "./Spacecrafts.css";
import Spacecraft from "../models/Spacecraft";
import { durationToSeconds } from "./Astronauts";
import { Link } from "react-router-dom";
import LoadingGif from "./LoadingGif";
import SpacecraftContext from "../context/SpacecraftContext";

const Spacecrafts = () => {
  const {
    allSpacecrafts,
    visibleCount,
    setVisibleCount,
    filterSearch,
    setFilterSearch,
    filterInSpace,
    setFilterInSpace,
    filterMostTimeInSpace,
    setFilterMostTimeInSpace,
  } = useContext(SpacecraftContext);

  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const loadMoreSpaceEvents = () => {
    setVisibleCount(visibleCount + 10); // Load 10 more
  };

  if (!allSpacecrafts) {
    return <LoadingGif />;
  }

  const filterSpacecrafts = (events: Spacecraft[]): Spacecraft[] => {
    let filteredSpacecrafts = events;

    if (filterSearch) {
      filteredSpacecrafts = filteredSpacecrafts.filter(
        (e) =>
          e.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
          e.description.toLowerCase().includes(filterSearch.toLowerCase())
      );
    }
    if (filterInSpace) {
      filteredSpacecrafts = filteredSpacecrafts.filter(
        (craft) => craft.in_space
      );
    }

    if (filterMostTimeInSpace) {
      filteredSpacecrafts = filteredSpacecrafts.sort((a, b) => {
        // Compare astronauts by their time in space (in seconds)
        return (
          durationToSeconds(b.time_in_space) -
          durationToSeconds(a.time_in_space)
        );
      });
    }

    return filteredSpacecrafts;
  };

  return (
    <div className="Spacecrafts">
      <nav>
        <div>
          Learn/<strong>Spacecrafts</strong>
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
              placeholder="Filter by search..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
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
        {allSpacecrafts &&
          filterSpacecrafts(allSpacecrafts)
            .slice(0, visibleCount)
            .map((craft) => (
              <li key={craft._id} className="craft-li">
                <div className="left">
                  <img
                    src={craft.spacecraft_config.image_url}
                    alt={craft.name}
                    className="craft-image"
                  />
                </div>
                <div className="right">
                  <p className="craft-name">{craft.name}</p>
                  <p className="craft-agency">
                    {craft.spacecraft_config.agency.name}
                  </p>
                  <Link to={`/spacecrafts/${craft._id}`}>
                    <button className="details-btn">Details</button>
                  </Link>
                </div>
              </li>
            ))}
      </ul>

      {allSpacecrafts &&
        visibleCount < filterSpacecrafts(allSpacecrafts).length && (
          <button className="load-more-btn" onClick={loadMoreSpaceEvents}>
            Load More
          </button>
        )}
    </div>
  );
};

export default Spacecrafts;
