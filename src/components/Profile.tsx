import { FormEvent, useContext, useEffect, useState } from "react";
import "./Profile.css";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import { getSpaceEventById } from "../services/theSpaceDevsApi";
import SpaceEvent from "../models/SpaceEvent";
import SingleSpaceEvent from "./SingleSpaceEvent";
import SingleSpaceArticle from "./SingleSpaceArticle";
import SpaceImage from "./SpaceImage";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faSquareCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { updateAccountById } from "../services/accountApi";

const Profile = () => {
  const { account, user, setAccount } = useContext(AuthContext);
  const [visibleCommentCount, setVisibleCommentCount] = useState(4);
  const [showComments, setShowComments] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownChoice, setDropDownChoice] = useState("Saved Events");
  const [savedEventsDetails, setSavedEventsDetails] = useState<SpaceEvent[]>(
    []
  );
  const [newName, setNewName] = useState(account?.uniqueName ?? "");
  const [showNewNameForm, setShowNewNameForm] = useState(false);

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

  if (!account || !user) {
    return (
      <button onClick={() => signInWithGoogle()}>Sign In To See Profile</button>
    );
  }

  const loadMoreComments = () => {
    setVisibleCommentCount((prevCount) => prevCount + 5); // Load 5 more comments
  };

  const isSpaceEventUpcoming = (theDate: string) => {
    if (new Date(theDate).getTime() > new Date().getTime()) {
      return true;
    } else return false;
  };

  const handleUpdateName = (e: FormEvent) => {
    e.preventDefault();
    console.log(newName);
    const updatedAccount = { ...account };
    updatedAccount.uniqueName = newName;
    if (account && account._id) {
      updateAccountById(account._id, updatedAccount).then((res) => {
        if (res) {
          setAccount(res);
        }
      });
    }
    account._id;

    setShowNewNameForm(false);
  };

  const checkSavedItemExists = () => {
    if (dropDownChoice === "Saved Events") {
      return account.savedEvents[0];
    }
    if (dropDownChoice === "Saved Articles") {
      return account.savedArticles[0];
    }
    if (dropDownChoice === "Saved Images") {
      return account.savedImages[0];
    }
  };

  const blankLinesCount = Math.max(4 - account.comments.length, 0);
  const blankLines = Array(blankLinesCount).fill(null);

  return (
    <div className="Profile">
      <h2>{account?.displayName}</h2>
      <div className="info-comment-container">
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

            <div className="name">
              {!showNewNameForm ? (
                <>
                  {account?.uniqueName === ""
                    ? account.displayName.split(" ")[0] + "123"
                    : account?.uniqueName}
                  <FontAwesomeIcon
                    icon={faPencil}
                    style={{
                      fontSize: "1rem",
                      position: "relative",
                      bottom: "10px",
                      left: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setNewName(account.uniqueName ?? "");
                      setShowNewNameForm(true);
                    }}
                  />
                </>
              ) : (
                <>
                  <form className="new-name-form" onSubmit={handleUpdateName}>
                    {account.uniqueName !== newName && newName.length <= 11 && (
                      <button type="submit" className="submit-button">
                        <FontAwesomeIcon
                          icon={faSquareCheck}
                          style={{
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            color: "green",
                          }}
                        />
                      </button>
                    )}
                    <label htmlFor="new-name"></label>
                    <input
                      type="text"
                      id="new-name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon={faX}
                      style={{
                        fontSize: "1rem",
                        position: "relative",
                        bottom: "0px",
                        left: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowNewNameForm(false)}
                    />
                  </form>
                </>
              )}
            </div>
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
              src={`https://robohash.org/${account.uniqueName}?set=set1`}
              alt="robohash.org photo"
            />
          </div>
        </div>
        <div className="comments">
          <h3 onClick={() => setShowComments((prev) => !prev)}>Comments</h3>
          {showComments && (
            <ul className="comment-ul">
              {account.comments.slice(0, visibleCommentCount).map((comment) => (
                <li className="comment-li" key={comment.uuid}>
                  {isSpaceEventUpcoming(comment.eventDate) ? (
                    <Link
                      to={`/upcoming/${encodeURIComponent(comment.eventId)}`}
                    >
                      {comment.content.length > 30
                        ? `${comment.content.slice(0, 30)}...`
                        : comment.content}
                    </Link>
                  ) : (
                    <Link to={`/past/${encodeURIComponent(comment.eventId)}`}>
                      {comment.content.length > 30
                        ? `${comment.content.slice(0, 30)}...`
                        : comment.content}
                    </Link>
                  )}
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
          )}
        </div>
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
          <div className="dropdown-container">
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
          </div>
        )}
      </h3>
      {dropDownChoice === "Saved Events" && (
        <ul className="saved-item-ul">
          {savedEventsDetails.map((e) => (
            <SingleSpaceEvent key={e._id} oneEvent={e} />
          ))}
        </ul>
      )}

      {dropDownChoice === "Saved Articles" && (
        <ul className="saved-item-ul">
          {account.savedArticles.map((art) => (
            <SingleSpaceArticle key={art.id} spaceArticle={art} />
          ))}
        </ul>
      )}
      {dropDownChoice === "Saved Images" && (
        <ul className="saved-item-ul">
          {account.savedImages.map((i) => (
            <SpaceImage key={i.data[0].nasa_id} image={i} />
          ))}
        </ul>
      )}
      {!checkSavedItemExists() && (
        <p style={{ textAlign: "center" }}>No {dropDownChoice}</p>
      )}
    </div>
  );
};

export default Profile;
