import "./Planet.css";

interface Props {
  planet: Planet;
}

const Planet = ({ planet }: Props) => {
  return (
    <div className="Planet">
      <h2>{planet.name}</h2>
      <p>{planet.description}</p>
      <img src={planet.images[0]} alt="" />
    </div>
  );
};

export default Planet;
