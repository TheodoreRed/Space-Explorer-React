import SpaceEvent from "../models/SpaceEvent";
import { getAllSpaceEvents } from "../services/theSpaceDevsApi";
import "./PastEvents.css";
import { useState, useEffect } from "react";
import SingleSpaceEvent from "./SingleSpaceEvent";

const PastEvents = () => {
  const [pastEvents, setpastEvents] = useState<SpaceEvent[] | null>(null);

  useEffect(() => {
    getAllSpaceEvents().then((res) => setpastEvents(res));
  }, []);

  return (
    <div className="SpaceEvents">
      <nav>
        <div>
          Events/<strong>Past</strong>
        </div>
      </nav>
      <ul>
        {pastEvents ? (
          pastEvents
            .filter((oneEvent) => {
              return new Date(oneEvent.date) < new Date();
            })
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((oneEvent) => {
              return (
                <SingleSpaceEvent
                  key={oneEvent.id}
                  oneEvent={oneEvent}
                  isPast={true}
                />
              );
            })
        ) : (
          <p>TODO: A loading Gif</p>
        )}
      </ul>
    </div>
  );
};

export default PastEvents;
