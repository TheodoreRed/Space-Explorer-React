import NASAImage from "../models/NASAImage";
import "./SpaceImage.css";

interface Props {
  image: NASAImage;
}

const SpaceImage = ({ image }: Props) => {
  return (
    <div className="SpaceImage">
      <img src={image.links[0].href} alt="" />
    </div>
  );
};

export default SpaceImage;
