import SpaceEvent from "../models/SpaceEvent";
import "./SpaceEvents.css";
import { useState, useContext } from "react";
import SingleSpaceEvent from "./SingleSpaceEvent";
import AuthContext from "../context/AuthContext";
import LoadingGif from "./LoadingGif";
import SpaceEventsContext from "../context/SpaceEventsContext";

const SpaceEvents = () => {
  const { account } = useContext(AuthContext);
  const {
    spaceEvents,
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
  } = useContext(SpaceEventsContext);

  const [showFilterOptions, setShowFilterOptions] = useState(false);

  if (!spaceEvents) {
    return <LoadingGif />;
  }

  const filterEvents = (events: SpaceEvent[]): SpaceEvent[] => {
    let filteredEvents = events;

    if (filterSavedEvents && account) {
      filteredEvents = events.filter((e) =>
        account.savedEvents.includes(e._id)
      );
    }

    if (filterSearch) {
      filteredEvents = filteredEvents.filter(
        (e) =>
          e.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
          e.description.toLowerCase().includes(filterSearch.toLowerCase())
      );
    }
    if (filterMinYear) {
      filteredEvents = filteredEvents.filter(
        (e) => +e.date.slice(0, 4) >= +filterMinYear
      );
    }
    if (filterMaxYear) {
      filteredEvents = filteredEvents.filter(
        (e) => +e.date.slice(0, 4) <= +filterMaxYear
      );
    }
    if (filterMinMonth) {
      filteredEvents = filteredEvents.filter(
        (e) => +e.date.slice(5, 7) >= +filterMinMonth
      );
    }
    if (filterMaxMonth) {
      filteredEvents = filteredEvents.filter(
        (e) => +e.date.slice(5, 7) <= +filterMaxMonth
      );
    }

    filteredEvents = filteredEvents
      .filter((oneEvent) => {
        return new Date(oneEvent.date) > new Date();
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return filteredEvents;
  };

  return (
    <div className="SpaceEvents">
      <nav>
        <div>
          Events/<strong>Upcoming</strong>
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
            <div className="year-range-container">
              <input
                type="number"
                placeholder="Min year"
                value={filterMinYear}
                onChange={(e) => setFilterMinYear(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max year"
                value={filterMaxYear}
                onChange={(e) => setFilterMaxYear(e.target.value)}
              />
            </div>
            <div className="year-range-container">
              <input
                type="number"
                placeholder="Min month"
                value={filterMinMonth}
                onChange={(e) => setFilterMinMonth(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max month"
                value={filterMaxMonth}
                onChange={(e) => setFilterMaxMonth(e.target.value)}
              />
            </div>

            {account && (
              <div
                className="saved-events-div"
                onClick={() => setFilterSavedEvents(!filterSavedEvents)}
              >
                My Saved Events {filterSavedEvents ? "☑" : "🔲"}
              </div>
            )}
          </>
        )}
      </div>
      <ul>
        {filterEvents(spaceEvents)
          .slice(0, visibleCount)
          .map((oneEvent) => {
            return <SingleSpaceEvent key={oneEvent.id} oneEvent={oneEvent} />;
          })}
      </ul>
      <div className="btns-container-se">
        {spaceEvents && visibleCount < filterEvents(spaceEvents).length && (
          <button className="load-more-btn" onClick={loadMoreSpaceEvents}>
            Load More
          </button>
        )}
        {spaceEvents && visibleCount < filterEvents(spaceEvents).length && (
          <button
            className="load-more-btn"
            id="collapse-btn-pse"
            onClick={() => setVisibleCount(5)}
          >
            Collapse
          </button>
        )}
      </div>
    </div>
  );
};

export default SpaceEvents;
