import { useEffect, useState } from "react";
import Spacecraft from "../models/Spacecraft";
import "./SpacecraftDetails.css";
import { Link, useParams } from "react-router-dom";
import { getSpacecraftById } from "../services/theSpaceDevsApi";
import RelatedArticlesAndImages from "./RelatedArticlesAndImages";
import { formatTimeInSpace } from "./AstronautDetails";
import LoadingGif from "./LoadingGif";

const SpacecraftDetails = () => {
  const [craft, setCraft] = useState<Spacecraft | null>(null);
  const id: string | undefined = useParams().id;

  useEffect(() => {
    if (id) {
      getSpacecraftById(id).then((res) => {
        if (res) {
          setCraft(res);
        }
      });
    }
  }, [id]);

  if (!craft) {
    return <LoadingGif />;
  }

  return (
    <div className="SpacecraftDetails">
      <nav>
        <div>
          Learn/
          <Link className="nav-a" to="/spacecrafts">
            Spacecrafts
          </Link>
          /<strong>{craft.name}</strong>
        </div>
      </nav>
      <div className="craft-detail-container">
        <div className="spacecraft-info">
          <h3 className="spacecraft-name">{craft.name}</h3>
          <p className="spacecraft-description">{craft.description}</p>
          <p className="spacecraft-time-in-space">
            Time In Space: {formatTimeInSpace(craft.time_in_space)}
          </p>
          <p className="spacecraft-serial">
            Serial Number: {craft.serial_number || "N/A"}
          </p>
          <p className="spacecraft-status">Status: {craft.status.name}</p>
          <p className="spacecraft-agency">
            Agency: {craft.spacecraft_config.agency.name}
          </p>
          <p className="spacecraft-type">
            Type: {craft.spacecraft_config.type.name}
          </p>
        </div>
        <div className="craft-detail-right">
          <img
            src={craft.spacecraft_config.image_url}
            alt={craft.name}
            className="spacecraft-image"
          />
        </div>
      </div>

      <RelatedArticlesAndImages keywords={craft.keywords} />
    </div>
  );
};

export default SpacecraftDetails;
