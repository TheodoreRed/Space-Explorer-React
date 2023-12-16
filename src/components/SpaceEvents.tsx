import SpaceEvent from "../models/SpaceEvent";
import { getAllUpcomingSpaceEvents } from "../services/theSpaceDevsApi";
import "./SpaceEvents.css";
import { useState, useEffect } from "react";
import SingleSpaceEvent from "./SingleSpaceEvent";

const SpaceEvents = () => {
  const [spaceEvents, setSpaceEvents] = useState<SpaceEvent[] | null>(null);

  useEffect(() => {
    getAllUpcomingSpaceEvents().then((res) => setSpaceEvents(res));
  }, []);
  console.log(spaceEvents);
  return (
    <div className="SpaceEvents">
      <nav>
        <div>
          Events/<strong>Upcoming</strong>
        </div>
      </nav>
      <ul>
        {spaceEvents &&
          spaceEvents.map((oneEvent) => {
            return <SingleSpaceEvent key={oneEvent.id} oneEvent={oneEvent} />;
          })}
      </ul>
    </div>
  );
};

export default SpaceEvents;
