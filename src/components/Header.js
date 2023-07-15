import { Link } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import icon from "../images/title-icon.png";

function Header() {
  const loggedIn = localStorage.getItem(KEY_USER_TOKEN) !== "" ? true : false;
  //TODO fix routes
  return (
    <header>
      <div className="header-left">
        <span>
          <img src={icon} alt="icon" width="25px" />
          <span className="page-name">Attendance Lecturer Module</span>
        </span>
        {loggedIn && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/">Statistics</Link>
          </>
        )}
      </div>
      <div className="header-right">
        {loggedIn ? (
          <>
            <Link to="/">My profile</Link>
            <Link to="/logout">Log out</Link>
          </>
        ) : (
          <Link to="/">Log in</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
