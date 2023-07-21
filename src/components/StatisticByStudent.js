import { useMemo, useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useApi from "../hooks/useApi";
import useUser from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";
import StudentStatisticCard from "./StudentStatisticCard";

function StatisticByStudent() {
  const params = useParams();
  const location = useLocation();
  const course = location.state;
  let i = 0;
  const [students, setStudents] = useState([]);
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { currentUser, load, success } = useUser(token);

  const { data, load: loadData } = useApi(
    "GET",
    "StudentAttendance",
    "?courseId=" + params.cid
  );
  useMemo(() => {
    if (data) {
      const uniqueStudents = [
        ...new Map(
          data.map((s) => [s["student"]["index"], s["student"]])
        ).values(),
      ];
      setStudents(uniqueStudents);
    }
  }, [data]);

  if (load || loadData) {
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
      <div className="logged-person">
        logged as: {currentUser.firstName} {currentUser.lastName}
      </div>
      <h2 className="title-smaller">Student Attendance Statistics</h2>
      <div className="info">
        <div className="course-info">
          <h3>Course info:</h3>
          <p className="text">Name: {course.name}</p>
          <p className="text">
            Lectures taken: {course.totalTakenLectures} /
            {course.lecturesNumForAssistent
              ? parseInt(course.lecturesNumForAssistent) +
                parseInt(course.lecturesNumForProfessor)
              : 0 + parseInt(course.lecturesNumForProfessor)}
          </p>
        </div>
      </div>
      {students.length > 0 ? (
        <table className="lectures-list-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Index</th>
              <th>Student name</th>
              <th>Number of present lectures</th>
              <th>Attendance percentage</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              i++;
              return (
                <StudentStatisticCard
                  cid={params.cid}
                  no={i}
                  student={student}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="no-data">
          No student attendance statistics available.
        </div>
      )}
    </>
  );
}

export default StatisticByStudent;
