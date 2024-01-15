import { useEffect, useState } from "react";
import NASAImage from "../models/NASAImage";
import "./NASAGallery.css";
import SpaceImage from "./SpaceImage";

interface Props {
  images: NASAImage[] | null;
}

const shuffleImages = (array: NASAImage[]) => {
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

const NASAGallery = ({ images }: Props) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [shuffledImages, setShuffledImages] = useState<NASAImage[]>([]);

  useEffect(() => {
    if (images) {
      const shuffled = [...images];
      shuffleImages(shuffled);
      setShuffledImages(shuffled);
    }
  }, [images]); // Dependency array includes 'images' to ensure shuffle happens when 'images' is updated

  const loadMoreImages = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (!images || shuffledImages.slice(0, visibleCount).length <= 0) {
    return <p>No images available.</p>;
  }

  return (
    <>
      <ul className="NASAGallery">
        {shuffledImages.slice(0, visibleCount).map((nasaImage) => {
          const hasValidLink = nasaImage.links && nasaImage.links.length > 0;
          const hasImageData =
            nasaImage.data &&
            nasaImage.data.some((d) => d.media_type === "image");

          return hasValidLink && hasImageData ? (
            <SpaceImage key={nasaImage.data[0].nasa_id} image={nasaImage} />
          ) : null;
        })}
      </ul>
      <div className="flex-btns">
        {visibleCount < images.length && (
          <button onClick={loadMoreImages}>Load More</button>
        )}
        {visibleCount > 5 && (
          <button onClick={() => setVisibleCount(1)}>Collapse</button>
        )}
      </div>
    </>
  );
};

export default NASAGallery;
