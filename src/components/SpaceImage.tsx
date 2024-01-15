import { Link } from "react-router-dom";
import NASAImage from "../models/NASAImage";
import "./SpaceImage.css";

interface Props {
  image: NASAImage;
}

const SpaceImage = ({ image }: Props) => {
  // Check if image.links is defined and has at least one element
  const imageUrl = image.links && image.links[0] ? image.links[0].href : "";
  const title = image.data && image.data[0] ? image.data[0].title : "";

  return (
    <li className="SpaceImage">
      {title && <h3>{title}</h3>}
      {imageUrl && (
        <Link to={`/search/images/${image.data[0].nasa_id}`}>
          <img src={imageUrl} alt={title} />
        </Link>
      )}
    </li>
  );
};

export default SpaceImage;
