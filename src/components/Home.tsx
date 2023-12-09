import { useEffect, useState } from "react";
import AstronomyPictureOfTheDay from "../models/AstronomyPictureOfTheDay";
import "./Home.css";
import { getAstronomyPictureOfTheDay } from "../services/nasaApi";

const Home = () => {
  const [apod, setApod] = useState<AstronomyPictureOfTheDay | null>(null);

  useEffect(() => {
    getAstronomyPictureOfTheDay().then((res) => setApod(res));
  }, []);

  const hardCodedApod: AstronomyPictureOfTheDay = {
    copyright: "Jean-Francois Graffand",
    date: "2023-12-09",
    explanation:
      "Near dawn on November 19 the Pleiades stood in still dark skies over the French Pyrenees. But just before sunrise a serendipitous moment was captured in this single 3 second exposure; a bright meteor streak appeared to pierce the heart of the galactic star cluster. From the camera's perspective, star cluster and meteor were poised directly above the mountain top observatory on the Pic du Midi de Bigorre. And though astronomers might consider the Pleiades to be relatively close by, the grain of dust vaporizing as it plowed through planet Earth's upper atmosphere actually missed the cluster's tight grouping of young stars by about 400 light-years. While recording a night sky timelapse series, the camera and telephoto lens were fixed to a tripod on the Tour-de-France-cycled slopes of the Col du Tourmalet about 5 kilometers from the Pic du Midi.",
    hdurl: "https://apod.nasa.gov/apod/image/2312/_MG_4553_rawfile.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Pic du Pleiades",
    url: "https://apod.nasa.gov/apod/image/2312/_MG_4553_rawfile1024.jpg",
  };

  return (
    <div className="Home">
      {apod && apod.media_type === "image" ? (
        <>
          <h2>{apod.title}</h2>
          <p>{apod.explanation}</p>
          {apod.url && (
            <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
              <img className="apodImage" src={apod.url} alt={apod.title} />
            </a>
          )}
        </>
      ) : (
        <>
          <h2>{hardCodedApod.title}</h2>
          <p>{hardCodedApod.explanation}</p>
          {hardCodedApod.url && (
            <a
              href={hardCodedApod.hdurl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={hardCodedApod.url} alt={hardCodedApod.title} />
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
