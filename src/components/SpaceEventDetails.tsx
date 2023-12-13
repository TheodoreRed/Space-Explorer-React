import { useContext, useEffect, useState } from "react";
import "./SpaceEventDetails.css";
import SpaceEvent from "../models/SpaceEvent";
import { Link, useParams } from "react-router-dom";
import { getSpaceEventById } from "../services/theSpaceDevsApi";
import AuthContext from "../context/AuthContext";

const SpaceEventDetails = () => {
  const { account } = useContext(AuthContext);
  const [spaceEvent, setSpaceEvent] = useState<SpaceEvent | null>(null);
  const id: string | undefined = useParams().id;

  useEffect(() => {
    if (id) {
      getSpaceEventById(id).then((res) => {
        if (res) {
          setSpaceEvent(res);
        }
      });
      setSpaceEvent(spaceEvent);
    }
  }, [id]);

  return (
    <>
      {spaceEvent ? (
        <div className="SpaceEventDetails">
          <nav>
            Events/<Link to="/upcoming">Upcoming</Link>/{`${spaceEvent.name}`}
          </nav>
          <h2>{spaceEvent.name}</h2>
          <p>Event: {spaceEvent.type.name}</p>
          <p>Date: {spaceEvent.date.slice(0, 10)}</p>
          <p>Interested: {spaceEvent?.interested ?? 0}</p>
          {account ? <button>Save</button> : <button>Login To Save</button>}
          {spaceEvent.feature_image && (
            <img src={spaceEvent.feature_image} alt="" />
          )}
          <h3>Event Details</h3>
          <h4>Launches</h4>
          {spaceEvent.launches[0] &&
            spaceEvent.launches.map((launch) => (
              <>
                <p>Launch: {launch.name}</p>
                <p>Launch Provider: {launch.launch_service_provider.name}</p>
                <p>Rocket: {launch.rocket.configuration.name}</p>
                <p>Mission: {launch.mission.name}</p>
                <p>Type: {launch.mission.type}</p>
                <p>Description: {launch.mission.description}</p>
                {launch.image && <img src={launch.image} alt="" />}

                <p>Launch Pad: {launch.pad.name}</p>
                <p>Located: {launch.pad.location.name}</p>
                <img src={launch.pad.location.map_image} alt="" />
              </>
            ))}
          <p>Programs Involved</p>
          {spaceEvent.program[0] &&
            spaceEvent.program.map((program) => (
              <>
                <p>Program: {program.name}</p>
                <p>Program Description: {program.description}</p>
                <img src={program.image_url} alt="" />
                <p>
                  <a href={program.wiki_url}>Wiki Page</a>
                </p>
              </>
            ))}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default SpaceEventDetails;
