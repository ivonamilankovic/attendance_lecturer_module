import { useEffect, useState } from "react";
import { useParams, useLocation, Link, Navigate } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useUser from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";

function FormLecture() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  let lectureData = { name: name, description: desc };
  const params = useParams();
  const location = useLocation();
  const content = location.state;
  useEffect(() => {
    if (content.name) {
      setName(content.name);
    }
    if (content.description) {
      setDesc(content.description);
    }
  }, []);
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { currentUser, load: userload, success } = useUser(token);

  if (userload) {
    return <Loading />;
  }

  if (success === false) {
    return <Navigate to="/logout" />;
  }
  if (!token) {
    return <Navigate to="/logout" />;
  }
  return (
    <>
      <Header />
      <div>
        <h1 className="title">{content.action} lecture</h1>
        <div className="form">
          <label htmlFor="name" className="text">
            Name of lecture:
          </label>
          <br />
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="desc" className="text">
            Description of lecture:
          </label>
          <br />
          <textarea
            id="desc"
            name="desc"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <br />
          <Link
            className="btn-link"
            to={
              content.action === "edit"
                ? "/course/" +
                  params.id +
                  "/lecture/" +
                  params.lid +
                  "/" +
                  content.action
                : "/course/" +
                  params.id +
                  "/lecture/" +
                  content.action +
                  "/" +
                  currentUser.id
            }
            state={lectureData}
          >
            <button className="btn">Save</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default FormLecture;
