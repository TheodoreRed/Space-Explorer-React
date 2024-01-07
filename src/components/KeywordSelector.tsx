import { useEffect, useState } from "react";
import "./KeywordSelector.css";

interface Props {
  keywords: string[];
  onKeywordSelect: (keyword: string) => void;
}

const shuffleKeywords = (array: string[]) => {
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

const KeywordSelector = ({ keywords, onKeywordSelect }: Props) => {
  const [shuffledKeywords, setShuffledKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (keywords) {
      const shuffled = [...keywords];
      shuffleKeywords(shuffled);
      setShuffledKeywords(shuffled);
    }
  }, [keywords]);

  return (
    <div className="KeywordSelector">
      {shuffledKeywords.map((keyword, index) => (
        <button key={index} onClick={() => onKeywordSelect(keyword)}>
          {keyword}
        </button>
      ))}
    </div>
  );
};

export default KeywordSelector;
