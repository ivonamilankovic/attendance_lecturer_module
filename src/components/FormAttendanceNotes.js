import { useEffect, useState } from "react";
import { useParams, useLocation, Navigate, Link } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useUser from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";

function FormAttendanceNotes() {
  const [note, setNote] = useState("");
  const params = useParams();
  const location = useLocation();
  const propsData = location.state;

  useEffect(() => {
    if (propsData.notes) {
      setNote(propsData.notes);
    }
  }, []);

  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { load, success } = useUser(token);

  if (load) {
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
        <h1 className="title">
          add notes for student {propsData.student.user.firstName}{" "}
          {propsData.student.user.lastName}
        </h1>
        <div className="form">
          <label htmlFor="note" className="text">
            Notes:
          </label>
          <br />
          <textarea
            id="note"
            name="note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <br />
          <Link
            className="btn-link"
            to={
              "/lecture/" +
              params.lid +
              "/attendance/" +
              params.aid +
              "/notes/" +
              propsData.student.index
            }
            state={note}
          >
            <button className="btn">Save</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default FormAttendanceNotes;
