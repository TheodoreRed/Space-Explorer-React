import { Launch } from "../models/SpaceEvent";
import "./LaunchDetails.css";

interface Props {
  launch: Launch;
}

const LaunchDetails = ({ launch }: Props) => {
  return (
    <div className="LaunchDetails">
      <h3>Launch Info</h3>
      <div className="big-launch-container">
        <div className="launch-big-left">
          <p className="launch-name">
            <strong>Launch:</strong> {launch.name}
          </p>
          <p className="launch-provider">
            <strong>Launch Provider:</strong>{" "}
            {launch.launch_service_provider.name}
          </p>
          <p className="rocket">
            <strong>Rocket:</strong> {launch.rocket.configuration.name}
          </p>
          <p className="mission">
            <strong>Mission:</strong> {launch.mission.name}
          </p>
          <p className="type">
            <strong>Type:</strong> {launch.mission.type}
          </p>
          <p className="description">
            <strong>Description:</strong> {launch.mission.description}
          </p>
        </div>
        <div className="launch-big-right">
          {launch.image && (
            <img
              src={launch.image}
              alt={launch.name}
              className="launch-image"
            />
          )}
        </div>
      </div>

      <div className="big-pad-container">
        <div className="pad-big-right">
          <a
            href={launch.pad.map_url}
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            <img
              src={launch.pad.location.map_image}
              alt={`${launch.pad.name} location`}
              className="map-image"
            />
          </a>
        </div>
        <div className="pad-big-left">
          <p className="launch-pad">
            <strong>Launch Pad:</strong> {launch.pad.name}
          </p>
          <p className="location">
            <strong>Located:</strong> {launch.pad.location.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetails;
