// PlanetDetails.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { planets } from "../planetData";
import "./PlanetDetails.css";
import { PlanetObj } from "../models/Planet";

const PlanetDetails = () => {
  const planetName = useParams().planetName;
  const [currentPlanet, setCurrentPlanet] = useState<PlanetObj | null>(null);

  useEffect(() => {
    if (planetName) {
      const foundPlanet = planets.find(
        (planet) => planet.name.toLowerCase() === planetName.toLowerCase()
      );
      setCurrentPlanet(foundPlanet ?? null);
    }
  }, [planetName]);

  if (!currentPlanet) {
    return <div className="PlanetDetails">Planet not found</div>;
  }

  return (
    <div className="PlanetDetails">
      <section className="hero">
        {currentPlanet.images?.[0] && (
          <img
            src={currentPlanet.images[0]}
            alt={`Image of ${currentPlanet.name}`}
            className="planet-hero-image"
          />
        )}
        <h1 className="planet-name">{currentPlanet.name}</h1>
      </section>

      <section className="stats">
        <h2>Statistics</h2>
        <table className="stats-table">
          <tbody>
            <tr>
              <th>Diameter:</th>
              <td>{currentPlanet.diameter} km</td>
            </tr>
            <tr>
              <th>Mass:</th>
              <td>{currentPlanet.mass} kg</td>
            </tr>
            <tr>
              <th>Density:</th>
              <td>{currentPlanet.density} kg/m³</td>
            </tr>
            <tr>
              <th>Gravity:</th>
              <td>{currentPlanet.gravity} m/s²</td>
            </tr>
            <tr>
              <th>Rotation Period:</th>
              <td>{currentPlanet.rotationPeriod} hours</td>
            </tr>
            <tr>
              <th>Length of Day:</th>
              <td>{currentPlanet.lengthOfDay} hours</td>
            </tr>
            <tr>
              <th>Distance from Sun:</th>
              <td>{currentPlanet.distanceFromSun} km</td>
            </tr>
            <tr>
              <th>Orbital Period:</th>
              <td>{currentPlanet.orbitalPeriod} days</td>
            </tr>
            <tr>
              <th>Average Temperature:</th>
              <td>{currentPlanet.averageTemperature} °C</td>
            </tr>
            <tr>
              <th>Number of Moons:</th>
              <td>{currentPlanet.numberOfMoons}</td>
            </tr>
            <tr>
              <th>Has Magnetic Field:</th>
              <td>{currentPlanet.hasMagneticField ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th>Discovered By:</th>
              <td>{currentPlanet.discoveredBy}</td>
            </tr>
            <tr>
              <th>Discovery Year:</th>
              <td>{currentPlanet.discoveryYear}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="description">
        <h2>Description</h2>
        <p>{currentPlanet.description}</p>
      </section>

      <section className="gallery">
        <h2>Image Gallery</h2>
        <div className="image-gallery">
          {currentPlanet.images?.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image of ${currentPlanet.name}`}
            />
          ))}
        </div>
      </section>

      <section className="known-for">
        <h2>Known For</h2>
        <ul>
          {currentPlanet.knownFor.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PlanetDetails;
