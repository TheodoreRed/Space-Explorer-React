import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAstronautById } from "../services/theSpaceDevsApi";
import { Astronaut } from "../models/Astronaut";
import "./AstronautDetails.css";
import RelatedArticlesAndImages from "./RelatedArticlesAndImages";

const AstronautDetails = () => {
  const [astronaut, setAstronaut] = useState<Astronaut | null>(null);
  const id: string | undefined = useParams().id;

  useEffect(() => {
    if (id) {
      getAstronautById(id).then((res) => {
        if (res) {
          setAstronaut(res);
        }
      });
    }
  }, [id]);

  if (!astronaut) {
    return <div className="AstronautDetails-loading">Loading...</div>;
  }

  return (
    <div className="AstronautDetails">
      <nav>
        <div>
          Learn/
          <Link className="nav-a" to="/astronauts">
            Astronauts
          </Link>
          /<strong>{astronaut.name}</strong>
        </div>
      </nav>
      <div className="details-header">
        <img
          src={astronaut.profile_image}
          alt={`${astronaut.name}`}
          className="details-image"
        />
        <h1 className="details-name">{astronaut.name}</h1>
      </div>
      <div className="details-body">
        <p>
          <strong>Nationality:</strong> {astronaut.nationality}
        </p>
        <p>
          <strong>Date of Birth:</strong> {astronaut.date_of_birth || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {astronaut.status.name}
        </p>
        <p>
          <strong>Agency:</strong> {astronaut.agency.name}
        </p>
        <p>
          <strong>Time in Space:</strong> {astronaut.time_in_space}
        </p>
        <p>
          <strong>Number of Flights:</strong> {astronaut.flights_count}
        </p>
        <p>
          <strong>Spacewalks:</strong> {astronaut.spacewalks_count}
        </p>
        <p>
          <strong>Biography:</strong> {astronaut.bio}
        </p>
        <div className="details-socials">
          {astronaut.twitter && (
            <a
              href={astronaut.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="details-twitter"
            >
              Twitter
            </a>
          )}
          {astronaut.instagram && (
            <a
              href={astronaut.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="details-instagram"
            >
              Instagram
            </a>
          )}
          {astronaut.wiki && (
            <a
              href={astronaut.wiki}
              target="_blank"
              rel="noopener noreferrer"
              className="details-wiki"
            >
              Wikipedia
            </a>
          )}
        </div>
      </div>
      <RelatedArticlesAndImages keywords={astronaut.keywords} />
    </div>
  );
};

export default AstronautDetails;
