import { Link } from "react-router-dom";
import SpaceEvent from "../models/SpaceEvent";
import "./SingleSpaceEvent.css";

interface Props {
  oneEvent: SpaceEvent;
}

const SingleSpaceEvent = ({ oneEvent }: Props) => {
  return (
    <div className="SingleSpaceEvent">
      <h3>{oneEvent.name}</h3>
      <div className="content">
        <div className="event-content">
          <p>Event: {oneEvent.type.name}</p>
          <p>Date: {oneEvent.date.slice(0, 10)}</p>
          <p>Interested: {oneEvent.interested ?? 0}</p>
        </div>
        {oneEvent.feature_image && (
          <img
            className="feature-image"
            src={oneEvent.feature_image}
            alt={oneEvent.name}
          />
        )}
      </div>
      <Link to={`/upcoming/${encodeURIComponent(oneEvent._id)}`}>
        <button>Details</button>
      </Link>
    </div>
  );
};

export default SingleSpaceEvent;
