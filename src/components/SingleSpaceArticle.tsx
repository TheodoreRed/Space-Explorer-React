import { useContext } from "react";
import SpaceArticle from "../models/SpaceArticle";
import "./SingleSpaceArticle.css";
import AuthContext from "../context/AuthContext";
import {
  getAccountById,
  toggleSpaceArticleInterest,
} from "../services/accountApi";

interface Props {
  spaceArticle: SpaceArticle;
}

const SingleSpaceArticle = ({ spaceArticle }: Props) => {
  const { account, setAccount } = useContext(AuthContext);

  const isSaved = (): boolean => {
    if (account) {
      return account?.savedArticles.some((x) => x.id === spaceArticle.id);
    } else return false;
  };

  const handleSaveArticleBtn = async () => {
    if (account && account.uid) {
      await toggleSpaceArticleInterest(spaceArticle, account._id!);
      let temp = await getAccountById(account.uid);
      if (temp) {
        setAccount(temp);
      }
    }
  };

  return (
    <li className="SingleSpaceArticle">
      {account && (
        <button
          className={`save-btn ${isSaved() ? "saved" : ""}`}
          onClick={() => handleSaveArticleBtn()}
        >
          {isSaved() ? "Saved" : "Save"}
        </button>
      )}
      <h3>{spaceArticle.title}</h3>
      <p>{spaceArticle.summary}</p>
      {spaceArticle.image_url && (
        <img src={spaceArticle.image_url} alt={spaceArticle.title} />
      )}
      <p>Published by: {spaceArticle.news_site}</p>
      <p>
        Published on: {new Date(spaceArticle.published_at).toLocaleDateString()}
      </p>
      {spaceArticle.updated_at && (
        <p>
          Updated on: {new Date(spaceArticle.updated_at).toLocaleDateString()}
        </p>
      )}
      <div></div>
      <a href={spaceArticle.url} target="_blank" rel="noopener noreferrer">
        View Article
      </a>
    </li>
  );
};

export default SingleSpaceArticle;
