import { useContext, useEffect, useState } from "react";
import "./SpaceEventDetails.css";
import SpaceEvent from "../models/SpaceEvent";
import { Link, useParams } from "react-router-dom";
import { getSpaceEventById } from "../services/theSpaceDevsApi";
import AuthContext from "../context/AuthContext";
import ProgramDetails from "./ProgramDetails";
import LaunchDetails from "./LaunchDetails";

const SpaceEventDetails = () => {
  const { account, user } = useContext(AuthContext);
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
  }, [id, account, user]);

  return (
    <>
      {spaceEvent ? (
        <div className="SpaceEventDetails">
          <nav>
            <div>
              Events/<Link to="/upcoming">Upcoming</Link>/
              <strong>{`${spaceEvent.name}`}</strong>
            </div>
          </nav>
          <h2>{spaceEvent.name}</h2>
          <p>Event: {spaceEvent.type.name}</p>
          <p>Date: {spaceEvent.date.slice(0, 10)}</p>
          <p>Interested: {spaceEvent?.interested ?? 0}</p>
          {spaceEvent.news_url && (
            <a
              href={spaceEvent.news_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>News URL: {spaceEvent.news_url}</p>
            </a>
          )}
          {account && user ? (
            <button>Save</button>
          ) : (
            <button>Login To Save</button>
          )}
          {spaceEvent.feature_image && (
            <img src={spaceEvent.feature_image} alt="" />
          )}
          <h3>Event Details</h3>
          {spaceEvent.launches[0] &&
            spaceEvent.launches.map((launch) => (
              <LaunchDetails key={launch.id} launch={launch} />
            ))}
          <p>Programs Involved</p>
          {spaceEvent.program[0] &&
            spaceEvent.program.map((program) => (
              <ProgramDetails key={program.id} program={program} />
            ))}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default SpaceEventDetails;
