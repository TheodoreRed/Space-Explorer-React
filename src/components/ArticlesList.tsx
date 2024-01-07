import { useEffect, useState } from "react";
import SpaceArticle from "../models/SpaceArticle";
import "./ArticlesList.css";
import SingleSpaceArticle from "./SingleSpaceArticle";

interface Props {
  articles: SpaceArticle[] | null;
}

const shuffleArticles = (array: SpaceArticle[]) => {
  // Iterate through the array backwards
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Store the value at index i in a temporary variable
    let temp = array[i];
    // Swap the value at index i with the value at the random index
    array[i] = array[randomIndex];
    // Set the value at the random index to the temporary variable
    array[randomIndex] = temp;
  }
};

const ArticlesList = ({ articles }: Props) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [shuffledArticles, setShuffledArticles] = useState<SpaceArticle[]>([]);

  useEffect(() => {
    if (articles) {
      const shuffled = [...articles];
      shuffleArticles(shuffled);
      setShuffledArticles(shuffled);
    }
  }, [articles]);

  const loadMoreImages = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (!articles || shuffledArticles.slice(0, visibleCount).length <= 0) {
    return <p>No articles available.</p>;
  }

  return (
    <ul className="ArticlesList">
      {shuffledArticles
        .slice(0, visibleCount)
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
        .map((article) => (
          <SingleSpaceArticle key={article.id} spaceArticle={article} />
        ))}
      <div className="flex-btns">
        {visibleCount < articles.length && (
          <button onClick={loadMoreImages}>Load More</button>
        )}
        {visibleCount > 4 && (
          <button onClick={() => setVisibleCount(1)}>Collapse</button>
        )}
      </div>
    </ul>
  );
};

export default ArticlesList;
