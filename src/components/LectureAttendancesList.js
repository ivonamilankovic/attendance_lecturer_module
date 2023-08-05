import { useMemo, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useApi from "../hooks/useApi";
import useUser from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";
import trash from "../images/trash-can.png";
import note from "../images/notes.png";
import absence from "../images/false.png";
import presence from "../images/checked.png";
import excel from "../images/excel.png";
import Select from "./Select";

function LectureAttendancesList() {
  const [lecture, setLecture] = useState();
  const [attendances, setAttendances] = useState([]);
  const [filterLang, setFilterLang] = useState("");
  const [filterProfile, setFilterProfile] = useState("");
  const params = useParams();
  const urlParam = "?lectureId=" + params.lid;
  const { data: lec, load: load2 } = useApi("GET", "Lecture", "/" + params.lid);
  const { data: att, load: load1 } = useApi(
    "GET",
    "StudentAttendance",
    urlParam
  );
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { currentUser, load, success } = useUser(token);
  let i = 0;

  useMemo(() => {
    if (lec) {
      setLecture(lec);
    } else {
      setLecture();
    }
  }, [lec]);
  useMemo(() => {
    if (att) {
      setAttendances(att);
    } else {
      setAttendances([]);
    }
  }, [att]);

  function handleChange(e, type) {
    if (type === "L") {
      setFilterLang(e.target.value);
    }
    if (type === "P") {
      setFilterProfile(e.target.value);
    }
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
  if (lecture && attendances) {
    const d = new Date(lecture.date);
    return (
      <>
        <Header />
        <div className="logged-person">
          logged as: {currentUser.firstName} {currentUser.lastName}
        </div>
        <div className="info">
          <div className="course-info">
            <h3>Lecture info:</h3>
            <p className="text">Name: {lecture.name}</p>
            <p className="text">
              Lecturer: {lecture.lecturer.firstName} {lecture.lecturer.lastName}
            </p>
            <p className="text">
              Date: {d.getDate()}.{d.getMonth() + 1}.{d.getFullYear()}.{" "}
              {d.getHours()}:{d.getMinutes()}
            </p>
          </div>
          <Link
            className="btn-link"
            to={"/lecture/" + params.lid + "/attendance/form"}
          >
            <button className="btn">Add new attendance</button>
          </Link>
        </div>
        <div>
          <Link
            className="btn-link"
            to={"/lecture/" + params.lid + "/attendance/excel"}
          >
            <button className="btn btn-download">
              <span>Download list as</span>{" "}
              <img src={excel} alt="excel" width={24} />{" "}
            </button>
          </Link>
        </div>
        <div className="filters">
          <div>
            <span>Filter students by:</span>
            <Select
              nameOfFetchData={"StudyLanguage"}
              name={"Languages"}
              multiple={false}
              handleChange={handleChange}
              withLabel={false}
              withBreaks={false}
              optionValueIsName={true}
            />
            <Select
              nameOfFetchData={"StudyProfile"}
              name={"Profiles"}
              multiple={false}
              handleChange={handleChange}
              withLabel={false}
              withBreaks={false}
              optionValueIsName={true}
            />
          </div>
        </div>
        {attendances.length > 0 ? (
          <>
            <table className="lectures-list-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Index</th>
                  <th>Student name</th>
                  <th>Date</th>
                  <th>Present</th>
                  <th>Notes</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((a) => {
                  i++;
                  const { id, date, present, notes, student } = a;
                  const d2 = new Date(date);
                  const obj = {
                    student: student,
                    notes: notes,
                  };
                  let matchFilterLang = false;
                  let matchFilterProfile = false;
                  if (filterLang) {
                    matchFilterLang = student.studyLanguage.name === filterLang;
                  } else {
                    matchFilterLang = true;
                  }
                  if (filterProfile) {
                    matchFilterProfile =
                      student.studyProfile.name === filterProfile;
                  } else {
                    matchFilterProfile = true;
                  }
                  if (
                    filterLang &&
                    filterProfile &&
                    !matchFilterLang &&
                    !matchFilterProfile
                  ) {
                    return <></>;
                  }
                  if (filterLang && !matchFilterLang) {
                    return <></>;
                  }
                  if (filterProfile && !matchFilterProfile) {
                    return <></>;
                  }
                  return (
                    <tr key={id}>
                      <td>{i}</td>
                      <td>{student.index}</td>
                      <td>
                        {student.user.firstName} {student.user.lastName}
                      </td>
                      <td>
                        {d2.getDate()}.{d2.getMonth() + 1}.{d2.getFullYear()}.{" "}
                        {d2.getHours() < 10
                          ? "0" + d2.getHours()
                          : d2.getHours()}
                        :
                        {d2.getMinutes() < 10
                          ? "0" + d2.getMinutes()
                          : d2.getMinutes()}
                      </td>
                      <td>{present ? "yes" : "no"}</td>
                      <td>
                        {notes ? <div className="notes"> {notes} </div> : "-"}
                      </td>
                      <td className="options-btns">
                        <Link
                          className="btn-link"
                          state={obj}
                          to={
                            "/lecture/" +
                            params.lid +
                            "/attendance/" +
                            a.id +
                            "/form/notes"
                          }
                        >
                          <button className="btn btn-edit btn-note">
                            <img src={note} alt="edit" width={18} />
                          </button>
                        </Link>
                        <Link
                          className="btn-link"
                          to={
                            "/lecture/" +
                            params.lid +
                            "/attendance/" +
                            a.id +
                            "/presence/" +
                            a.student.index
                          }
                        >
                          <button className="btn btn-edit">
                            <img
                              src={present ? absence : presence}
                              alt="edit"
                              width={18}
                            />
                          </button>
                        </Link>
                        <Link
                          className="btn-link"
                          to={
                            "/lecture/" +
                            params.lid +
                            "/attendance/" +
                            a.id +
                            "/del"
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
          <div className="no-data">No attendances yet.</div>
        )}
      </>
    );
  }
}

export default LectureAttendancesList;
