import SpaceEvent from "../models/SpaceEvent";
import { getAllUpcomingSpaceEvents } from "../services/theSpaceDevsApi";
import "./SpaceEvents.css";
import { useState, useEffect } from "react";

const SpaceEvents = () => {
  const [spaceEvents, setSpaceEvents] = useState<SpaceEvent[] | null>(null);

  useEffect(() => {
    getAllUpcomingSpaceEvents().then((res) => setSpaceEvents(res));
  }, []);
  console.log(spaceEvents);
  return (
    <div className="SpaceEvents">
      <ul>
        {spaceEvents &&
          spaceEvents.map((oneEvent) => {
            return <li key={oneEvent.id}>{oneEvent.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default SpaceEvents;
