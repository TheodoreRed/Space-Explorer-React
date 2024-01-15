import { Program } from "../models/SpaceEvent";
import "./ProgramDetails.css";

interface Props {
  program: Program;
}

const ProgramDetails = ({ program }: Props) => {
  return (
    <div className="ProgramDetails">
      {program.image_url && (
        <div className="program-details-left">
          {program.image_url && (
            <img src={program.image_url} alt={program.name} />
          )}
        </div>
      )}
      <div className="program-details-right">
        <p>
          <strong>Program:</strong>{" "}
          <a href={program.wiki_url} target="_blank" rel="noopener noreferrer">
            {program.name}
          </a>
        </p>
        <p>
          <strong>Program Description:</strong> {program.description}
        </p>
      </div>
    </div>
  );
};

export default ProgramDetails;
