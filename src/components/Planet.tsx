import { Link } from "react-router-dom";
import { PlanetObj } from "../models/Planet";
import "./Planet.css";

interface Props {
  planet: PlanetObj;
}

const Planet = ({ planet }: Props) => {
  return (
    <div className="Planet">
      <h2>{planet.name}</h2>
      <p>{planet.description}</p>
      <img src={planet.images[0]} alt="" />
      <Link to={`/planets/${encodeURIComponent(planet.name)}`}>
        <button>Details</button>
      </Link>
    </div>
  );
};

export default Planet;
