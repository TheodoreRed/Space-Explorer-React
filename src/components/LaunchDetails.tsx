import { Launch } from "../models/SpaceEvent";
import "./LaunchDetails.css";

interface Props {
  launch: Launch;
}

const LaunchDetails = ({ launch }: Props) => {
  return (
    <div className="LaunchDetails">
      <p className="launch-name">Launch: {launch.name}</p>
      <p className="launch-provider">
        Launch Provider: {launch.launch_service_provider.name}
      </p>
      <p className="rocket">Rocket: {launch.rocket.configuration.name}</p>
      <p className="mission">Mission: {launch.mission.name}</p>
      <p className="type">Type: {launch.mission.type}</p>
      <p className="description">Description: {launch.mission.description}</p>
      {launch.image && (
        <img src={launch.image} alt={launch.name} className="launch-image" />
      )}
      <p className="launch-pad">Launch Pad: {launch.pad.name}</p>
      <p className="location">Located: {launch.pad.location.name}</p>
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
  );
};

export default LaunchDetails;
