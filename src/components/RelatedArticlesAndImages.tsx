import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NASAImage from "../models/NASAImage";
import SpaceArticle from "../models/SpaceArticle";
import { getAllArticles } from "../services/spaceFlightNewsApi";
import { getNASAImagesBySearch } from "../services/nasaApi";
import SingleSpaceArticle from "./SingleSpaceArticle";
import "./RelatedArticlesAndImages.css";

interface Props {
  keywords: string[];
}

const RelatedArticlesAndImages = ({ keywords }: Props) => {
  const [NASAImages, setNASAImages] = useState<NASAImage[] | null>(null);
  const [spaceArticles, setSpaceArticles] = useState<SpaceArticle[] | null>(
    null
  );
  const [currentKeyWord, setCurrentKeyWord] = useState<string>(keywords[0]);
  const [showRelatedArticles, setShowRelatedArticles] =
    useState<boolean>(false);
  const [displayKeyWords, setDisplayKeyWords] = useState<boolean>(false);

  useEffect(() => {
    if (currentKeyWord) {
      if (showRelatedArticles) {
        getAllArticles(currentKeyWord).then(setSpaceArticles);
      } else {
        getNASAImagesBySearch(currentKeyWord).then(setNASAImages);
      }
    }
  }, [currentKeyWord, showRelatedArticles]);

  const switchKeyword = (keyword: string) => {
    setCurrentKeyWord(keyword);
  };

  return (
    <div className="RelatedArticlesAndImages">
      <h3>
        Showing {showRelatedArticles ? "article" : "image"} results for:{" "}
        <span
          className="keyword-span"
          onClick={() => setDisplayKeyWords((prev) => !prev)}
        >
          {currentKeyWord}
          {displayKeyWords && (
            <div id="keyword-selector">
              {keywords.map((keyword, index) => (
                <button key={index} onClick={() => switchKeyword(keyword)}>
                  {keyword}
                </button>
              ))}
            </div>
          )}
        </span>
      </h3>
      <button onClick={() => setShowRelatedArticles((prev) => !prev)}>
        {showRelatedArticles ? "Search Images" : "Search Articles"} instead
      </button>
      {!showRelatedArticles && (
        <ul>
          {NASAImages &&
            NASAImages.slice(0, 5).map((nasaImage, index) => {
              const hasValidLink =
                nasaImage.links && nasaImage.links.length > 0;
              const hasImageData =
                nasaImage.data &&
                nasaImage.data.some((d) => d.media_type === "image");
              const imageTitle = hasImageData ? nasaImage.data[0].title : "";

              return hasValidLink && hasImageData ? (
                <li key={index}>
                  <img src={nasaImage.links[0].href} alt={imageTitle} />
                </li>
              ) : null;
            })}
        </ul>
      )}
      {showRelatedArticles && (
        <ul>
          {spaceArticles &&
            spaceArticles
              .slice(0, 5)
              .map((article) => (
                <SingleSpaceArticle key={article.id} spaceArticle={article} />
              ))}
        </ul>
      )}
      <Link to="/search">Search More Articles and Images</Link>
    </div>
  );
};

export default RelatedArticlesAndImages;
