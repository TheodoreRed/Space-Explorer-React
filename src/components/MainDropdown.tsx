import { Link } from "react-router-dom";
import "./MainDropdown.css";

const MainDropdown = () => {
  return (
    <div className="MainDropdown">
      <div className="columnContainer">
        <div className="learnColumn">
          <h3>Learn</h3>
          <Link to="/spacecrafts">Spacecrafts</Link>
          <Link to="/astronauts">Astronauts</Link>
          <Link to="/planets">Planets</Link>
        </div>
        <div className="eventColumn">
          <h3>Events</h3>
          <div className="eventColumnFlex">
            <Link to="/upcoming">Upcoming</Link>
            <Link to="/past">Past</Link>
          </div>
        </div>
      </div>
      <div className="searchContainer">
        <Link to="/search">Search</Link>
      </div>
    </div>
  );
};

export default MainDropdown;
