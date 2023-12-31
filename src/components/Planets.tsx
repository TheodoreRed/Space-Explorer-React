import { planets } from "../planetData";
import Planet from "./Planet";
import "./Planets.css";

const Planets = () => {
  return (
    <div className="Planets">
      <nav>
        <div>
          Learn/<strong>Planets</strong>
        </div>
      </nav>
      {planets.map((planet) => (
        <Planet key={planet.name} planet={planet} />
      ))}
    </div>
  );
};

export default Planets;
