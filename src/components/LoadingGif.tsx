import "./LoadingGif.css";
import loadingGif from "../assets/gifs/loading-rocket.gif";

const LoadingGif = () => {
  return (
    <div className="LoadingGif">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default LoadingGif;
