import "./Planet.css";

interface Props {
  planet: Planet;
}

const Planet = ({ planet }: Props) => {
  return (
    <div className="Planet">
      <h2>{planet.name}</h2>
      <p>{planet.description}</p>
      <p>{planet.knownFor}</p>
    </div>
  );
};

export default Planet;
