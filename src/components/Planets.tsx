import { planets } from "../planetData";
import Planet from "./Planet";
import "./Planets.css";

const Planets = () => {
  return (
    <div className="Planets">
      {planets.map((planet) => (
        <Planet key={planet.name} planet={planet} />
      ))}
    </div>
  );
};

export default Planets;
