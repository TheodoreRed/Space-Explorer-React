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
import RelatedArticlesAndImages from "./RelatedArticlesAndImages";

interface Props {
  isPast?: boolean;
}

const SpaceEventDetails = ({ isPast }: Props) => {
  const { account, user, setAccount } = useContext(AuthContext);
  const [spaceEvent, setSpaceEvent] = useState<SpaceEvent | null>(null);

  const id: string | undefined = useParams().id;

  useEffect(() => {
    if (id) {
      getSpaceEventById(id).then((res) => {
        if (res) {
          setSpaceEvent(res);
        }
      });
    }
  }, [id]);

  const eventIsSaved = () => {
    return account?.savedEvents.some((item) => item === spaceEvent?._id);
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

  return (
    <>
      {spaceEvent ? (
        <div className="SpaceEventDetails">
          <nav>
            {!isPast ? (
              <div>
                Events/
                <Link to="/upcoming" style={{ color: "blue" }}>
                  Upcoming
                </Link>
                /<strong>{spaceEvent.name}</strong>
              </div>
            ) : (
              <div>
                Events/
                <Link to="/past" style={{ color: "blue" }}>
                  Past
                </Link>
                /<strong>{spaceEvent.name}</strong>
              </div>
            )}
          </nav>
          <h2>{spaceEvent.name}</h2>
          <p>{spaceEvent.description}</p>
          <p>Event: {spaceEvent.type.name}</p>
          <p>Date: {spaceEvent.date.slice(0, 10)}</p>
          <p>Interested: {spaceEvent.interested ?? 0}</p>
          {spaceEvent.news_url && (
            <a
              href={spaceEvent.news_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              News URL: {spaceEvent.news_url}
            </a>
          )}
          {isPast && account && user ? (
            <button className="event-btn" id="passed-btn" onClick={saveHandler}>
              {eventIsSaved() ? "Saved" : "Save Past Event"}
            </button>
          ) : account && user ? (
            <button className="event-btn" onClick={saveHandler}>
              {eventIsSaved() ? "Event Saved" : "Save"}
            </button>
          ) : (
            <button
              style={{ backgroundColor: "purple" }}
              className="event-btn"
              onClick={signInWithGoogle}
            >
              Login To Save
            </button>
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

          <RelatedArticlesAndImages keywords={spaceEvent.keyWords} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SpaceEventDetails;
