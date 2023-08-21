import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useApi from "../hooks/useApi";
import useUser from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";

function FormAttendance() {
  const [studentIndex, setStudentIndex] = useState();
  const params = useParams();
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { load, success } = useUser(token);
  const { data, load: studLoad } = useApi("GET", "Student");

  if (load || studLoad) {
    return <Loading />;
  }
  if (success === false) {
    return <Navigate to="/logout" />;
  }
  if (!token) {
    return <Navigate to="/logout" />;
  }
  if (data) {
    return (
      <>
        <Header />
        <h1 className="title">add attendance</h1>
        <div className="form">
          <label htmlFor="stud" className="text">
            Student:
          </label>
          <select
            name="stud"
            id="stud"
            value={studentIndex}
            onChange={(e) => setStudentIndex(e.target.value)}
          >
            <option value={0} key={0}>
              choose
            </option>
            {data.map((student) => {
              const { user, index } = student;
              return (
                <option key={index} value={index}>
                  ({index})  {user.firstName} {user.lastName}
                </option>
              );
            })}
          </select>
          <Link
            className="btn-link"
            to={"/lecture/" + params.lid + "/attendance/create/" + studentIndex}
          >
            <button className="btn">Save</button>
          </Link>
        </div>
      </>
    );
  }
}

export default FormAttendance;
