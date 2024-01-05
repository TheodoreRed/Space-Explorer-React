import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import { getSpaceEventById } from "../services/theSpaceDevsApi";
import SpaceEvent from "../models/SpaceEvent";
import SingleSpaceEvent from "./SingleSpaceEvent";
import SingleSpaceArticle from "./SingleSpaceArticle";
import SpaceImage from "./SpaceImage";

const Profile = () => {
  const { account, user } = useContext(AuthContext);
  const [visibleCommentCount, setVisibleCommentCount] = useState(4);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownChoice, setDropDownChoice] = useState("Saved Events");
  const [savedEventsDetails, setSavedEventsDetails] = useState<SpaceEvent[]>(
    []
  );

  useEffect(() => {
    if (account) {
      const fetchSavedEvents = async () => {
        const events = await Promise.all(
          account.savedEvents.map((eventId) => getSpaceEventById(eventId))
        );
        setSavedEventsDetails(events);
      };

      fetchSavedEvents();
    }
  }, [account?.savedEvents]);

  if (!account) {
    return (
      <button onClick={() => signInWithGoogle()}>
        Sign In To Make Profile
      </button>
    );
  }

  const loadMoreComments = () => {
    setVisibleCommentCount((prevCount) => prevCount + 10); // Load 10 more astronauts
  };

  const blankLinesCount = Math.max(4 - account.comments.length, 0);
  const blankLines = Array(blankLinesCount).fill(null);

  return (
    <div className="Profile">
      <h2>{account?.displayName}</h2>
      <div className="account-info">
        <div className="left">
          <p
            className="reg-text"
            style={{
              textAlign: "center",
              textDecoration: "1px underline",
              fontSize: "1.25rem",
            }}
          >
            Display Name
          </p>
          <p className="name">
            {account?.uniqueName === "" ? "TedRed906" : account?.uniqueName}
          </p>
          <div className="info-item">
            <span className="info-label">Saved Events:</span>
            <span className="info-value">{account.savedEvents.length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Saved Articles:</span>
            <span className="info-value">{account.savedArticles.length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Saved Images:</span>
            <span className="info-value">{account.savedImages.length}</span>
          </div>
        </div>
        <div className="right">
          <img
            src={`https://robohash.org/${user?.displayName}?set=set1`}
            alt="robohash.org photo"
          />
        </div>
      </div>
      <div className="comments">
        <h3>Comments</h3>
        <ul className="comment-ul">
          {account.comments.slice(0, visibleCommentCount).map((comment) => (
            <li className="comment-li" key={comment.uuid}>
              {comment.content.length > 30
                ? `${comment.content.slice(0, 30)}...`
                : comment.content}
            </li>
          ))}
          {blankLines.map((_, index) => (
            <li className="comment-li" key={`blank-${index}`}>
              &nbsp;
            </li> // Blank line
          ))}
          {account.comments.length > visibleCommentCount && (
            <button
              className="load-more-comments-btn"
              onClick={loadMoreComments}
            >
              More Comments
            </button>
          )}
        </ul>
      </div>
      <h3 className="saved-items-h3">
        <span
          onClick={() => {
            setShowDropDown((prev) => !prev);
          }}
        >
          {dropDownChoice}
          <span className={showDropDown ? "flipUpsideDown" : ""}>▼</span>
        </span>
        {showDropDown && (
          <ul className="dropdown">
            <li
              className="dropdown-li"
              onClick={() => {
                setDropDownChoice("Saved Events");
                setShowDropDown(false);
              }}
            >
              Events
            </li>
            <li
              className="dropdown-li"
              onClick={() => {
                setDropDownChoice("Saved Articles");
                setShowDropDown(false);
              }}
            >
              Articles
            </li>
            <li
              className="dropdown-li"
              onClick={() => {
                setDropDownChoice("Saved Images");
                setShowDropDown(false);
              }}
            >
              Images
            </li>
          </ul>
        )}
      </h3>
      {dropDownChoice === "Saved Events" && (
        <ul>
          {savedEventsDetails.map((e) => (
            <SingleSpaceEvent key={e._id} oneEvent={e} />
          ))}
        </ul>
      )}
      {dropDownChoice === "Saved Articles" && (
        <ul>
          {account.savedArticles.map((art) => (
            <SingleSpaceArticle spaceArticle={art} />
          ))}
        </ul>
      )}
      {dropDownChoice === "Saved Images" && (
        <ul>
          {account.savedImages.map((i) => (
            <SpaceImage image={i} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
