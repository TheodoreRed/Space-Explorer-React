import SpaceEvent from "../models/SpaceEvent";
import { getAllSpaceEvents } from "../services/theSpaceDevsApi";
import "./SpaceEvents.css";
import { useState, useEffect } from "react";
import SingleSpaceEvent from "./SingleSpaceEvent";

const SpaceEvents = () => {
  const [spaceEvents, setSpaceEvents] = useState<SpaceEvent[] | null>(null);

  useEffect(() => {
    getAllSpaceEvents().then((res) => setSpaceEvents(res));
  }, []);

  return (
    <div className="SpaceEvents">
      <nav>
        <div>
          Events/<strong>Upcoming</strong>
        </div>
      </nav>
      <ul>
        {spaceEvents ? (
          spaceEvents
            .filter((oneEvent) => {
              return new Date(oneEvent.date) > new Date();
            })
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((oneEvent) => {
              return <SingleSpaceEvent key={oneEvent.id} oneEvent={oneEvent} />;
            })
        ) : (
          <p>TODO: A loading Gif</p>
        )}
      </ul>
    </div>
  );
};

export default SpaceEvents;
