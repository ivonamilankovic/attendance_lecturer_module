import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useUser from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";

function MyProfile() {
  const queryParameters = new URLSearchParams(window.location.search)
  const s = queryParameters.get("s");

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [dataError, setDataError] = useState(false);
  const profileData = {
    firstName: fname,
    lastName: lname,
    roleId: roleId,
  };

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [passError, setPassError] = useState(false);

  const token = localStorage.getItem(KEY_USER_TOKEN);
  const { currentUser, load, success } = useUser(token);

  useEffect(() => {
    if (currentUser) {
      setFName(currentUser.firstName);
      setLName(currentUser.lastName);
      setRoleId(currentUser.role.id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (pass1 && pass1.length < 6) {
      setPassError(true);
    }
    if (pass2 && pass2.length < 6) {
      setPassError(true);
    }
    if (pass1 !== pass2) {
      setPassError(true);
    } else {
      setPassError(false);
    }
  }, [pass1, pass2]);

  useEffect(() => {
    if (!fname || !lname) {
      setDataError(true);
    } else {
      setDataError(false);
    }
  }, [fname, lname]);

  if (load) {
    return <Loading />;
  }
  if (!token || !success) {
    return <Navigate to="/logout" />;
  }
  if (currentUser) {
    return (
      <>
        <Header />
        <div className="role-info">Role: {currentUser.role.name}</div>
        <div className="role-info">Email: {currentUser.email}</div>
        <div
          className="success-msg"
          style={{ display: s ? "block" : "none" }}
        >
          {s ? "Your data has been saved successfully." : ""}
        </div>
        <div className="form profile-form">
          <div>
            <h3 className="title profile-title">My profile data</h3>
            <div
              className="error-msg"
              style={{ display: dataError ? "block" : "none" }}
            >
              {dataError ? "Fields can not be empty." : ""}
            </div>
            <label htmlFor="fname" className="text">
              First name:
            </label>
            <br />
            <input
              id="fname"
              name="fname"
              type="text"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
              className={!fname ? "bad-input" : ""}
            />
            <br />
            <label htmlFor="lname" className="text">
              Last name:
            </label>
            <br />
            <input
              id="lname"
              name="lname"
              type="text"
              value={lname}
              onChange={(e) => setFName(e.target.value)}
              className={!lname ? "bad-input" : ""}
            />
            <Link
              className="btn-link"
              to={"/profile/" + currentUser.id + "/save-data"}
              state={profileData}
            >
              <button className="btn">Save</button>
            </Link>
          </div>
          <div>
            <h3 className="title profile-title">Change password</h3>
            <div
              className="error-msg"
              style={{ display: passError ? "block" : "none" }}
            >
              {passError
                ? "Passwords do not match and must have at least 6 characters."
                : ""}
            </div>
            <label htmlFor="pass1" className="text">
              Password:
            </label>
            <br />
            <input
              id="pass1"
              name="pass1"
              type="password"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              className={passError ? "bad-input" : ""}
            />
            <label htmlFor="pass2" className="text">
              Repeat password:
            </label>
            <br />
            <input
              id="pass2"
              name="pass2"
              type="password"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              className={passError ? "bad-input" : ""}
            />
            <Link
              className="btn-link"
              to={"/profile/" + currentUser.id + "/change-pass"}
              state={pass1}
            >
              <button className="btn">Change</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default MyProfile;
