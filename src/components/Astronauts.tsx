import { useEffect, useState } from "react";
import "./Astronauts.css";
import { getAllAstronauts } from "../services/theSpaceDevsApi";
import { Astronaut } from "../models/Astronaut";
import { Link } from "react-router-dom";

const Astronauts = () => {
  const [allAstronauts, setAllAstronauts] = useState<Astronaut[] | null>(null);

  useEffect(() => {
    getAllAstronauts().then((res) => setAllAstronauts(res));
  }, []);

  return (
    <div className="Astronauts">
      <nav>
        <div>
          Learn/<strong>Astronauts</strong>
        </div>
      </nav>
      {allAstronauts ? (
        <ul>
          {allAstronauts.map((astronaut) => (
            <li className="naut-container">
              <div className="left-side">
                <img src={astronaut.profile_image} alt={astronaut.name} />
              </div>

              <div className="right-side">
                <h2>{astronaut.name}</h2>
                <p>{astronaut.bio}</p>
                <Link to={`/astronauts/${encodeURIComponent(astronaut.id)}`}>
                  <button>Learn More</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Astronauts;
