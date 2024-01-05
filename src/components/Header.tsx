import { Link } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import MainDropdown from "./MainDropdown";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [showProfileNav, setShowProfileNav] = useState(false);
  const [showMainNav, setShowMainNav] = useState(false);

  return (
    <header className="Header">
      <h1
        onClick={() => {
          setShowProfileNav(false);
          setShowMainNav((prev) => !prev);
        }}
      >
        <span className={`h1Content ${showMainNav ? "h1Active" : ""}`}>
          Space Explorer
          <span className={showMainNav ? "flipUpsideDown" : ""}>▼</span>
        </span>
        <div>{showMainNav && <MainDropdown />}</div>
      </h1>

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
