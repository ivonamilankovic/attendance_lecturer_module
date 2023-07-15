import { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useApi from "../hooks/useApi";
import useUser from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";

function FormLecture() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  let lectureData = { name: name, description: desc };
  const params = useParams();
  const location = useLocation();
  const action = location.state;
  const { data, load } = useApi("GET", "Lecture", params.lid > 0 ? "/" + params.lid : "");
  const token =
  localStorage.getItem(KEY_USER_TOKEN) !== ""
    ? localStorage.getItem(KEY_USER_TOKEN)
    : null;
const { currentUser, load : userload } = useUser(token);

  if (load || userload) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div>
        <h1 className="title">{action} lecture</h1>
        <div className="form">
          <label htmlFor="name" className="text">
            Name of lecture:
          </label>
          <br />
          <input
            id="name"
            name="name"
            type="text"
            value={name ? name : data.name ? data.name : ""}
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
            value={desc ? desc : data.description ? data.description : ""}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <br />
          <button className="btn">
            <Link
            className="btn-link"
              to={action === "edit" ?"/course/" + params.id + "/lecture/" + params.lid + "/" + action
            : "/course/" + params.id + "/lecture/" + action + "/" + currentUser.id}
              state={lectureData}
            >
              Save
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default FormLecture;