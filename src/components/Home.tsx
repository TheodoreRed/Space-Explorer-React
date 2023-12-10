import { useEffect, useState } from "react";
import AstronomyPictureOfTheDay from "../models/AstronomyPictureOfTheDay";
import "./Home.css";
import { getAstronomyPictureOfTheDay } from "../services/nasaApi";

const Home = () => {
  const [apod, setApod] = useState<AstronomyPictureOfTheDay | null>(null);

  useEffect(() => {
    getAstronomyPictureOfTheDay().then((res) => setApod(res));
  }, []);

  const hardCodedApodOne: AstronomyPictureOfTheDay = {
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

  const hardCodedApodTwo: AstronomyPictureOfTheDay = {
    copyright: "\nSteve Cullen\n",
    date: "2023-12-10",
    explanation:
      "When did you first learn to identify this group of stars? Although they are familiar to many people around the world, different cultures have associated this asterism with different icons and folklore. Known in the USA as the Big Dipper, the stars are part of a constellation designated by the International Astronomical Union in 1922 as the Great Bear (Ursa Major).  The recognized star names of these stars are (left to right) Alkaid, Mizar/Alcor, Alioth, Megrez, Phecda, Merak, and Dubhe.  Of course, stars in any given constellation are unlikely to be physically related. But surprisingly, most of the Big Dipper stars do seem to be headed in the same direction as they plough through space, a property they share with other stars spread out over an even larger area across the sky.  Their measured common motion suggests that they all belong to a loose, nearby star cluster, thought to be on average only about 75 light-years away and up to 30 light-years across. The cluster is more properly known as the Ursa Major Moving Group. The featured image captured the iconic stars recently above Pyramid Mountain in Alberta, Canada.   Night Sky Network webinar: APOD editor to review coolest space images of 2023",
    hdurl: "https://apod.nasa.gov/apod/image/2312/BigDipperMt2_Cullen_1365.jpg",
    media_type: "image",
    service_version: "v1",
    title: "Big Dipper over Pyramid Mountain",
    url: "https://apod.nasa.gov/apod/image/2312/BigDipperMt2_Cullen_960.jpg",
  };

  const hardCodedApod = Math.floor(Math.random() * 2)
    ? hardCodedApodOne
    : hardCodedApodTwo;

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
