import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NASAImage from "../models/NASAImage";
import SpaceArticle from "../models/SpaceArticle";
import { getAllArticles } from "../services/spaceFlightNewsApi";
import { getNASAImagesBySearch } from "../services/nasaApi";
import KeywordSelector from "./KeywordSelector";
import NASAGallery from "./NASAGallery";
import ArticlesList from "./ArticlesList";
import "./RelatedArticlesAndImages.css";

interface Props {
  keywords: string[];
}

const RelatedArticlesAndImages = ({ keywords }: Props) => {
  const [NASAImages, setNASAImages] = useState<NASAImage[] | null>(null);
  const [spaceArticles, setSpaceArticles] = useState<SpaceArticle[] | null>(
    null
  );
  const [currentKeyWord, setCurrentKeyWord] = useState<string>(
    keywords[Math.floor(Math.random() * keywords.length)]
  );
  const [showRelatedArticles, setShowRelatedArticles] =
    useState<boolean>(false);
  const [displayKeyWords, setDisplayKeyWords] = useState<boolean>(false);

  // useEffect for fetching content based on the current keyword
  useEffect(() => {
    const fetchContent = async () => {
      if (showRelatedArticles) {
        const articles = await getAllArticles(currentKeyWord);
        setSpaceArticles(articles);
      } else {
        const images = await getNASAImagesBySearch(currentKeyWord);
        setNASAImages(images);
      }
    };

    if (currentKeyWord) {
      fetchContent();
    }
  }, [currentKeyWord, showRelatedArticles]);

  const switchKeyword = (keyword: string) => {
    setCurrentKeyWord(keyword);
    setDisplayKeyWords(false);
  };

  return (
    <div className="RelatedArticlesAndImages">
      <h2 className="heading-h2">Related Images and Articles</h2>
      <h3>
        Showing {showRelatedArticles ? "article" : "image"} results for:{" "}
        <span
          className="keyword-span"
          onClick={() => setDisplayKeyWords((prev) => !prev)}
        >
          {currentKeyWord}
        </span>
      </h3>
      {displayKeyWords && (
        <KeywordSelector keywords={keywords} onKeywordSelect={switchKeyword} />
      )}
      <button
        className="toggle-search"
        onClick={() => setShowRelatedArticles((prev) => !prev)}
      >
        {showRelatedArticles ? "Search Images" : "Search Articles"} instead
      </button>
      {!showRelatedArticles ? (
        <NASAGallery images={NASAImages} />
      ) : (
        <ArticlesList articles={spaceArticles} />
      )}
      <Link className="more-link" to="/search">
        Search Other Articles and Images
      </Link>
    </div>
  );
};

export default RelatedArticlesAndImages;
