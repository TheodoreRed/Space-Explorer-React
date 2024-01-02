import { useEffect, useState } from "react";
import "./Spacecrafts.css";
import Spacecraft from "../models/Spacecraft";
import { getAllSpacecrafts } from "../services/theSpaceDevsApi";

const Spacecrafts = () => {
  const [allSpacecrafts, setAllSpacecrafts] = useState<Spacecraft[] | null>(
    null
  );

  useEffect(() => {
    getAllSpacecrafts().then((res) => setAllSpacecrafts(res));
  }, []);
  return (
    <div className="Spacecrafts">
      {allSpacecrafts && allSpacecrafts.map((craft) => craft.name)}
    </div>
  );
};

export default Spacecrafts;
