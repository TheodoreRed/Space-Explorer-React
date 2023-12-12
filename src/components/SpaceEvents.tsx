import SpaceEvent from "../models/SpaceEvent";
import { getAllUpcomingSpaceEvents } from "../services/theSpaceDevsApi";
import "./SpaceEvents.css";
import { useState, useEffect } from "react";

const SpaceEvents = () => {
  const [spaceEvents, setSpaceEvents] = useState<SpaceEvent[] | null>(null);

  useEffect(() => {
    getAllUpcomingSpaceEvents().then((res) => setSpaceEvents(res));
  }, []);
  return <div className="SpaceEvents">SpaceEvents works</div>;
};

export default SpaceEvents;
