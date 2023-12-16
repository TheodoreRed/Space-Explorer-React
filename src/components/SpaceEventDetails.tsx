import { useContext, useEffect, useState } from "react";
import "./SpaceEventDetails.css";
import SpaceEvent from "../models/SpaceEvent";
import { Link, useParams } from "react-router-dom";
import { getSpaceEventById } from "../services/theSpaceDevsApi";
import AuthContext from "../context/AuthContext";
import ProgramDetails from "./ProgramDetails";
import LaunchDetails from "./LaunchDetails";
import { signInWithGoogle } from "../firebaseConfig";
import { updateAccountById } from "../services/accountApi";
import Account from "../models/Account";
import { generateTextWithOpenAI } from "../services/openAiApi";

const SpaceEventDetails = () => {
  const { account, user, setAccount } = useContext(AuthContext);
  const [spaceEvent, setSpaceEvent] = useState<SpaceEvent | null>(null);
  const [detailedInfo, setDetailedInfo] = useState("");
  const id: string | undefined = useParams().id;

  const gptClickHandler = async () => {
    if (spaceEvent) {
      const prompt = `Expand greatly on this space event: ${spaceEvent.name} Date:${spaceEvent.date} Short Description: ${spaceEvent.description}.`;
      const response = await generateTextWithOpenAI(prompt);

      if (response) {
        setDetailedInfo(response);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getSpaceEventById(id).then((res) => {
        if (res) {
          setSpaceEvent(res);
        }
      });
      setSpaceEvent(spaceEvent);
    }
  }, [id]);

  const eventIsSaved = () => {
    return account?.savedEvents.some((item) => {
      return item._id === spaceEvent?._id;
    });
  };

  const saveHandler = async () => {
    if (account && spaceEvent) {
      let updatedAccount: Account;

      if (eventIsSaved()) {
        // If event is already saved, remove it from the savedEvents
        updatedAccount = {
          ...account,
          savedEvents: account.savedEvents.filter(
            (event) => event._id !== spaceEvent._id
          ),
        };
        console.log("Event removed from saved events.");
      } else {
        // If event is not saved, add it to the savedEvents
        updatedAccount = {
          ...account,
          savedEvents: [...account.savedEvents, spaceEvent],
        };
        console.log("Event added to saved events.");
      }

      try {
        if (account._id) {
          const response = await updateAccountById(account._id, updatedAccount);
          if (response) {
            setAccount(response);
          }
        }
      } catch (error) {
        console.error("Error updating account:", error);
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
            <div>
              Events/<Link to="/upcoming">Upcoming</Link>/
              <strong>{`${spaceEvent.name}`}</strong>
            </div>
          </nav>
          <h2>{spaceEvent.name}</h2>
          <p>{spaceEvent.description}</p>
          <p>Event: {spaceEvent.type.name}</p>
          <p>Date: {spaceEvent.date.slice(0, 10)}</p>
          <p>Interested: {spaceEvent?.interested ?? 0}</p>
          {spaceEvent.news_url && (
            <a
              href={spaceEvent.news_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>News URL: {spaceEvent.news_url}</p>
            </a>
          )}
          {account && user ? (
            <button onClick={() => saveHandler()}>
              {eventIsSaved() ? "Event Saved" : "Save"}
            </button>
          ) : (
            <button onClick={signInWithGoogle}>Login To Save</button>
          )}

          <section className="chatGPT">
            <button
              className="detailedInfoBtn"
              onClick={() => gptClickHandler()}
            >
              Generate Detailed Info
            </button>
            <div className="deatiledInfoContainer">
              <p>{detailedInfo ? detailedInfo : ""}</p>
            </div>
          </section>
          {spaceEvent.feature_image && (
            <img src={spaceEvent.feature_image} alt="" />
          )}
          <h3>Event Details</h3>
          {spaceEvent.launches[0] &&
            spaceEvent.launches.map((launch) => (
              <LaunchDetails key={launch.id} launch={launch} />
            ))}
          <p>Programs Involved</p>
          {spaceEvent.program[0] &&
            spaceEvent.program.map((program) => (
              <ProgramDetails key={program.id} program={program} />
            ))}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default SpaceEventDetails;
