import { Program } from "../models/SpaceEvent";
import "./ProgramDetails.css";

interface Props {
  program: Program;
}

const ProgramDetails = ({ program }: Props) => {
  return (
    <div className="ProgramDetails">
      <p>
        Program:{" "}
        <a href={program.wiki_url} target="_blank" rel="noopener noreferrer">
          {program.name}
        </a>
      </p>
      <p>Program Description: {program.description}</p>
      {program.image_url && <img src={program.image_url} alt={program.name} />}
      <p></p>
    </div>
  );
};

export default ProgramDetails;
