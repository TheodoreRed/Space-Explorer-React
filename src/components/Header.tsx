import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import MainDropdown from "./MainDropdown";

const Header = () => {
  const { user, account } = useContext(AuthContext);

  const [showProfileNav, setShowProfileNav] = useState(false);
  const [showMainNav, setShowMainNav] = useState(false);
  const [showLearnTab, setShowLearnTab] = useState(false);
  const [showEventsTab, setShowEventsTab] = useState(false);

  return (
    <header className="Header">
      <h1
        onClick={() => {
          if (window.innerWidth < 768) {
            setShowProfileNav(false);
            setShowMainNav((prev) => !prev);
          } else {
            setShowMainNav(false);
          }
        }}
      >
        <span className={`h1Content ${showMainNav ? "h1Active" : ""}`}>
          Space Explorer
          <span
            className={`is-big-screen-carrot ${
              showMainNav ? "flipUpsideDown" : ""
            }`}
          >
            ▼
          </span>
        </span>
        <div>{showMainNav && <MainDropdown />}</div>
      </h1>

      <div className="tab-buttons">
        <button
          onClick={() => {
            setShowProfileNav(false);
            setShowLearnTab(!showLearnTab);
            setShowEventsTab(false);
          }}
        >
          Learn
          {showLearnTab && (
            <div className="learn-options">
              <Link to="/spacecrafts">Spacecrafts</Link>
              <Link to="/astronauts">Astronauts</Link>
              <Link to="/planets">Planets</Link>
              <Link id="fancy-search" to="/search">
                Search🔎
              </Link>
            </div>
          )}
        </button>
        <button
          onClick={() => {
            setShowEventsTab(!showEventsTab);
            setShowLearnTab(false);
          }}
        >
          Events
          {showEventsTab && (
            <div className="events-options">
              <Link to="/upcoming">Upcoming</Link>
              <Link to="/past">Past</Link>
            </div>
          )}
        </button>
      </div>

      {user ? (
        <>
          <FontAwesomeIcon
            onClick={() => {
              setShowMainNav(false);
              setShowProfileNav((prev) => !prev);
            }}
            icon={faGoogle}
            className={`googleIcon ${showProfileNav ? "iconActive" : ""}`}
          />
          {account ? (
            <p
              className="big-screen-sign-in-btn"
              onClick={() => {
                setShowLearnTab(false);
                setShowEventsTab(false);
                setShowMainNav(false);
                setShowProfileNav((prev) => !prev);
              }}
            >
              Welcome, {account.uniqueName}
            </p>
          ) : (
            <button className="big-screen-sign-in-btn">
              Sign In With Google
            </button>
          )}
          <div
            className={`profileNavigationContainer ${
              showProfileNav && "navActive"
            }`}
            onClick={() => setShowProfileNav(false)}
          >
            {user && <Link to="/me">Profile</Link>}
            <Link to="/">Home</Link>

            <button className="signOutBtn" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <button className="signInBtn" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      )}
    </header>
  );
};

export default Header;
