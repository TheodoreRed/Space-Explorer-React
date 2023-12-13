import { Launch } from "../models/SpaceEvent";
import "./LaunchDetails.css";

interface Props {
  launch: Launch;
}

const LaunchDetails = ({ launch }: Props) => {
  return (
    <div className="LaunchDetails">
      <p>Launch: {launch.name}</p>
      <p>Launch Provider: {launch.launch_service_provider.name}</p>
      <p>Rocket: {launch.rocket.configuration.name}</p>
      <p>Mission: {launch.mission.name}</p>
      <p>Type: {launch.mission.type}</p>
      <p>Description: {launch.mission.description}</p>
      {launch.image && <img src={launch.image} alt={launch.name} />}
      <p>Launch Pad: {launch.pad.name}</p>
      <p>Located: {launch.pad.location.name}</p>
      <a href={launch.pad.map_url} target="_blank" rel="noopener noreferrer">
        <img
          src={launch.pad.location.map_image}
          alt={`${launch.pad.name} location`}
        />
      </a>
    </div>
  );
};

export default LaunchDetails;
