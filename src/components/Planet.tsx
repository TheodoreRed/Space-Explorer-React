import { Link } from "react-router-dom";
import { PlanetObj } from "../models/Planet";
import "./Planet.css";

interface Props {
  planet: PlanetObj;
}

const Planet = ({ planet }: Props) => {
  return (
    <div className="Planet">
      <div className="planet-left">
        <h2>{planet.name}</h2>
        <p>{planet.description}</p>
      </div>

      <div className="planet-right">
        <img
          src={planet.images[Math.floor(Math.random() * planet.images.length)]}
          alt=""
        />
        <Link to={`/planets/${encodeURIComponent(planet.name)}`}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Planet;
