import SpaceArticle from "../models/SpaceArticle";
import "./SingleSpaceArticle.css";

interface Props {
  spaceArticle: SpaceArticle;
}

const SingleSpaceArticle = ({ spaceArticle }: Props) => {
  return (
    <li className="SpaceArticle">
      <h3>{spaceArticle.title}</h3>
      <p>{spaceArticle.summary}</p>
      {spaceArticle.image_url && (
        <img src={spaceArticle.image_url} alt={spaceArticle.title} />
      )}
      <a href={spaceArticle.url} target="_blank" rel="noopener noreferrer">
        View Article
      </a>
    </li>
  );
};

export default SingleSpaceArticle;
