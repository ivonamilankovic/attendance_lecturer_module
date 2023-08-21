import { useMemo, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { KEY_USER_TOKEN, BACKEND_URL, ROLES } from "../constants";
import useApi from "../hooks/useApi";
import useUser from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";
import pen from "../images/pen.png";
import trash from "../images/trash-can.png";
import refresh from "../images/refresh.png";
import qr from "../images/qr.png";

function CourseLecturesList() {
  const [lectures, setLectures] = useState([]);
  const [course, setCourse] = useState();
  const params = useParams();
  const urlParam = "?courseId=" + params.id;
  const { data: c, load: load2 } = useApi("GET", "Course", "/" + params.id);
  const { data: l, load: load1 } = useApi("GET", "Lecture", urlParam);
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { currentUser, load, success } = useUser(token);
  let i = 0;
  let action = "create";
  const createContent = { action: action };
  useMemo(() => {
    if (c) {
      setCourse(c);
    }
  }, [c]);
  useMemo(() => {
    if (l) {
      setLectures(l);
    }
  }, [l]);

  async function openPicture(id) {
    fetch(BACKEND_URL + "Lecture/QrCode/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        document.getElementById("modal").style.display = "block";
        document.getElementById("modal-img").src = url;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (success === false) {
    return <Navigate to="/logout" />;
  }
  if (!token) {
    return <Navigate to="/logout" />;
  }
  if (load || load1 || load2) {
    return <Loading />;
  }
  if (lectures && course) {
    return (
      <>
        <Header />
        <div className="logged-person">
          logged as: {currentUser.firstName} {currentUser.lastName}
        </div>
        <div className="info">
          <div className="course-info">
            <h3>Course info:</h3>
            <p className="text">Name: {course.name}</p>
            {currentUser.role.name === ROLES.ROLE_PROFESSOR &&
              course.assistant && (
                <p className="text">
                  Assistant: {course.assistant.firstName}{" "}
                  {course.assistant.lastName} / number of lectures:
                  {course.lecturesNumForAssistent}
                </p>
              )}
            {currentUser.role.name === ROLES.ROLE_ASSISTANT ? (
              <p className="text">
                Professor: {course.professor.firstName}{" "}
                {course.professor.lastName}
              </p>
            ) : (
              ""
            )}
            <p className="text">
              Lectures taken: {course.totalTakenLectures} /
              {course.lecturesNumForAssistent
                ? parseInt(course.lecturesNumForAssistent) +
                  parseInt(course.lecturesNumForProfessor)
                : 0 + parseInt(course.lecturesNumForProfessor)}
            </p>
          </div>
          <Link
            className="btn-link"
            state={createContent}
            to={"/course/" + params.id + "/lecture/0/form"}
          >
            {" "}
            <button className="btn">Add new lecture</button>
          </Link>
        </div>
        <div id="modal" style={{ display: "none" }}>
          <div id="modal-content">
            <span
              id="close"
              onClick={() =>
                (document.getElementById("modal").style.display = "none")
              }
            >
              X
            </span>
            <p className="title">Scan qr code to register your attendance.</p>
            <img id="modal-img" src="/" alt="qr code" />
          </div>
        </div>
        {lectures.length > 0 ? (
          <>
            <table className="lectures-list-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Lecturer</th>
                  <th>Date</th>
                  <th>Qr code</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {lectures.map((lecture) => {
                  const { id, name, description, lecturer, date } = lecture;
                  action = "edit";
                  const d = new Date(date);
                  const content = {
                    action: action,
                    name: name,
                    description: description,
                  };

                  i++;
                  return (
                    <tr key={id}>
                      <td>{i}</td>
                      <td>
                        <Link
                          className="table-link"
                          to={"/lecture/" + id + "/attendances"}
                        >
                          {name}
                        </Link>
                      </td>
                      <td>
                        {description.length > 20
                          ? description.substring(0, 20) + "..."
                          : description}
                      </td>
                      <td>
                        {lecturer.firstName} {lecturer.lastName}
                      </td>
                      <td>
                        {d.getDate()}.{d.getMonth() + 1}.{d.getFullYear()}.{" "}
                        {d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}:
                        {d.getMinutes() < 10
                          ? "0" + d.getMinutes()
                          : d.getMinutes()}
                      </td>
                      <td>
                        <button
                          className="btn btn-showqr"
                          onClick={() => openPicture(id)}
                        >
                          show QR
                        </button>
                      </td>
                      <td className="options-btns">
                        <Link
                          className="btn-link"
                          to={
                            "/course/" +
                            params.id +
                            "/lecture/" +
                            id +
                            "/new_qr"
                          }
                        >
                          <button className="btn btn-edit">
                            <img src={refresh} alt="regenerate" width={18} />{" "}
                            {"  "}
                            <img src={qr} alt="qr" width={18} />
                          </button>
                        </Link>
                        <Link
                          className="btn-link"
                          to={
                            "/course/" + params.id + "/lecture/" + id + "/form"
                          }
                          state={content}
                        >
                          <button className="btn btn-edit">
                            <img src={pen} alt="edit" width={18} />
                          </button>
                        </Link>
                        <Link
                          className="btn-link"
                          to={
                            "/course/" + params.id + "/lecture/" + id + "/del"
                          }
                        >
                          <button className="btn btn-del">
                            <img src={trash} alt="delete" width={18} />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <div className="no-data">No lectures yet.</div>
        )}
      </>
    );
  }
}

export default CourseLecturesList;
