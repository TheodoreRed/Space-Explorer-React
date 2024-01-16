import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAstronautById } from "../services/theSpaceDevsApi";
import { Astronaut } from "../models/Astronaut";
import "./AstronautDetails.css";
import RelatedArticlesAndImages from "./RelatedArticlesAndImages";
import LoadingGif from "./LoadingGif";

export const formatTimeInSpace = (duration: string) => {
  const match = duration.match(/P(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) {
    return "";
  }
  const days = match[1] ? parseInt(match[1]) : 0;
  const hours = match[2] ? parseInt(match[2]) : 0;
  const minutes = match[3] ? parseInt(match[3]) : 0;
  const seconds = match[4] ? parseInt(match[4]) : 0;

  let formattedDuration = "";
  if (days > 0) formattedDuration += `${days} days, `;
  if (hours > 0) formattedDuration += `${hours} hours, `;
  if (minutes > 0) formattedDuration += `${minutes} minutes, `;
  if (seconds > 0) formattedDuration += `${seconds} seconds`;

  // Remove trailing comma and space if they exist
  return formattedDuration.replace(/, $/, "");
};

const AstronautDetails = () => {
  const [astronaut, setAstronaut] = useState<Astronaut | null>(null);
  const [showDetailedBio, setShowDetailedBio] = useState(false);

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
    return <LoadingGif />;
  }

  const toggleDetailedBio = () => {
    setShowDetailedBio(!showDetailedBio);
  };

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
      <div className="big-container">
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
            <strong>Number of Flights:</strong> {astronaut.flights_count}
          </p>
          <p>
            <strong>Time in Space:</strong>{" "}
            {formatTimeInSpace(astronaut.time_in_space)}
          </p>

          <p>
            <strong>Spacewalks:</strong> {astronaut.spacewalks_count}
          </p>
          <p>
            <strong>Time Space Walking:</strong>{" "}
            {formatTimeInSpace(astronaut.eva_time)}
          </p>

          <p>
            <strong
              id={showDetailedBio ? "strong-detailed-bio" : "strong-bio"}
              onClick={toggleDetailedBio}
            >
              Biography
            </strong>{" "}
            {showDetailedBio ? astronaut.detailedInfo : astronaut.bio}
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
      </div>

      <RelatedArticlesAndImages keywords={astronaut.keywords} />
    </div>
  );
};

export default AstronautDetails;
