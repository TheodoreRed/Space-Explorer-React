import SpaceEvent from "../models/SpaceEvent";
import { getAllSpaceEvents } from "../services/theSpaceDevsApi";
import "./PastEvents.css";
import { useState, useEffect, useContext } from "react";
import SingleSpaceEvent from "./SingleSpaceEvent";
import AuthContext from "../context/AuthContext";
import LoadingGif from "./LoadingGif";

const PastEvents = () => {
  const { account } = useContext(AuthContext);

  const [pastEvents, setpastEvents] = useState<SpaceEvent[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const [filterSearch, setFilterSearch] = useState("");

  const [filterMinYear, setFilterMinYear] = useState("");
  const [filterMaxYear, setFilterMaxYear] = useState("");

  const [filterMinMonth, setFilterMinMonth] = useState("");
  const [filterMaxMonth, setFilterMaxMonth] = useState("");

  const [filterSavedEvents, setFilterSavedEvents] = useState(false);

  const loadMoreSpaceEvents = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Load 10 more
  };

  useEffect(() => {
    getAllSpaceEvents().then((res) => setpastEvents(res));
  }, []);

  if (!pastEvents) {
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
        return new Date(oneEvent.date) < new Date();
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return filteredEvents;
  };

  return (
    <div className="PastEvents">
      <nav>
        <div>
          Events/<strong>Past</strong>
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
                onClick={() => setFilterSavedEvents((prev) => !prev)}
              >
                My Saved Events {filterSavedEvents ? "☑" : "🔲"}
              </div>
            )}
          </>
        )}
      </div>
      <ul>
        {filterEvents(pastEvents)
          .slice(0, visibleCount)
          .map((oneEvent) => {
            return (
              <SingleSpaceEvent
                key={oneEvent.id}
                oneEvent={oneEvent}
                isPast={true}
              />
            );
          })}
      </ul>
      {pastEvents && visibleCount < filterEvents(pastEvents).length && (
        <button className="load-more-btn" onClick={loadMoreSpaceEvents}>
          Load More
        </button>
      )}
    </div>
  );
};

export default PastEvents;
