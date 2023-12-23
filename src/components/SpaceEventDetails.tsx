import { useContext, useEffect, useState } from "react";
import "./SpaceEventDetails.css";
import SpaceEvent from "../models/SpaceEvent";
import { Link, useParams } from "react-router-dom";
import {
  getSpaceEventById,
  toggleSpaceEventInterest,
} from "../services/theSpaceDevsApi";
import AuthContext from "../context/AuthContext";
import ProgramDetails from "./ProgramDetails";
import LaunchDetails from "./LaunchDetails";
import { signInWithGoogle } from "../firebaseConfig";
import { getAccountById } from "../services/accountApi";
import NASAImage from "../models/NASAImage";
import { getNASAImagesBySearch } from "../services/nasaApi";

interface Props {
  isPast?: boolean;
}

const SpaceEventDetails = ({ isPast }: Props) => {
  const { account, user, setAccount } = useContext(AuthContext);
  const [spaceEvent, setSpaceEvent] = useState<SpaceEvent | null>(null);
  const [currentKeyWord, setCurrentKeyWord] = useState("");
  const [NASAImages, setNASAImages] = useState<NASAImage[] | null>(null);
  const [displayKeyWords, setDisplayKeyWords] = useState(false);
  const id: string | undefined = useParams().id;

  useEffect(() => {
    if (id) {
      getSpaceEventById(id).then((res) => {
        if (res) {
          setSpaceEvent(res);
          setCurrentKeyWord(res.keyWords[0]); // Set the first keyword by default
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (currentKeyWord) {
      getNASAImagesBySearch(currentKeyWord).then(setNASAImages);
    }
  }, [currentKeyWord]);

  const eventIsSaved = () => {
    return account?.savedEvents.some((item) => item._id === spaceEvent?._id);
  };

  const saveHandler = async () => {
    if (account && account._id && spaceEvent) {
      try {
        await toggleSpaceEventInterest(spaceEvent._id, account._id);
        const updatedAccount = await getAccountById(account.uid);
        const updatedSpaceEvent = await getSpaceEventById(spaceEvent._id);
        if (updatedAccount) setAccount(updatedAccount);
        if (updatedSpaceEvent) setSpaceEvent(updatedSpaceEvent);
      } catch (error) {
        console.error("Error updating space event interest:", error);
      }
    } else {
      console.log("No account or event found.");
    }
  };

  const switchKeyword = (keyword: string) => {
    setCurrentKeyWord(keyword);
  };

  return (
    <>
      {spaceEvent ? (
        <div className="SpaceEventDetails">
          <nav>
            {!isPast ? (
              <div>
                Events/<Link to="/upcoming">Upcoming</Link>/
                <strong>{spaceEvent.name}</strong>
              </div>
            ) : (
              <div>
                Events/<Link to="/past">Past</Link>/
                <strong>{spaceEvent.name}</strong>
              </div>
            )}
          </nav>
          <h2>{spaceEvent.name}</h2>
          <p>{spaceEvent.description}</p>
          <p>Event: {spaceEvent.type.name}</p>
          <p>Date: {spaceEvent.date.slice(0, 10)}</p>
          {!isPast && <p>Interested: {spaceEvent.interested ?? 0}</p>}
          {spaceEvent.news_url && (
            <a
              href={spaceEvent.news_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              News URL: {spaceEvent.news_url}
            </a>
          )}
          {isPast ? (
            <button className="event-btn" id="passed-btn">
              Event Passed
            </button>
          ) : account && user ? (
            <button className="event-btn" onClick={saveHandler}>
              {eventIsSaved() ? "Event Saved" : "Save"}
            </button>
          ) : (
            <button onClick={signInWithGoogle}>Login To Save</button>
          )}

          {spaceEvent.feature_image && (
            <img src={spaceEvent.feature_image} alt={spaceEvent.name} />
          )}
          <h3>Event Details</h3>
          <section className="detailedInfoContainer">
            <p>{spaceEvent.detailedInfo}</p>
          </section>
          {spaceEvent.launches.map((launch) => (
            <LaunchDetails key={launch.id} launch={launch} />
          ))}
          <p>Programs Involved</p>
          {spaceEvent.program.map((program) => (
            <ProgramDetails key={program.id} program={program} />
          ))}

          {NASAImages && NASAImages.length > 0 && (
            <>
              <h3>
                Showing image results for:{" "}
                <span
                  className="keyword-span"
                  onClick={() => setDisplayKeyWords((prev) => !prev)}
                >
                  {currentKeyWord}
                  {displayKeyWords && (
                    <div id="keyword-selector">
                      {spaceEvent.keyWords.map((keyword, index) => (
                        <button
                          key={index}
                          onClick={() => switchKeyword(keyword)}
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  )}
                </span>
              </h3>
              <ul>
                {NASAImages.slice(0, 10).map((nasaImage, index) => {
                  const hasValidLink =
                    nasaImage.links && nasaImage.links.length > 0;
                  const hasImageData =
                    nasaImage.data &&
                    nasaImage.data.some((d) => d.media_type === "image");
                  const imageTitle = hasImageData
                    ? nasaImage.data[0].title
                    : "";

                  return hasValidLink && hasImageData ? (
                    <li key={index}>
                      <img src={nasaImage.links[0].href} alt={imageTitle} />
                    </li>
                  ) : null;
                })}
              </ul>
            </>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SpaceEventDetails;
