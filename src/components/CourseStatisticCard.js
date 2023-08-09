import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../hooks/useApi";

function CourseStatisticCard({ course }) {
  const { id, name, assistant } = course;
  const [statistic, setStatistic] = useState([]);
  const { data } = useApi("GET", "StudentAttendance", "/Presence/" + id);
  useMemo(() => {
    if (data) {
      setStatistic(data);
    }
  }, [data]);

  if (statistic.totalTakenLectures) {
    return (
      <div key={id} className="course-card statistic-card">
        <h3 className="course-title">{name}</h3>
        <hr />
        <div className="statistic-card-body">
          {assistant && (
            <p className="text">
              <b>Assistant:</b> {assistant.firstName} {assistant.lastName}
            </p>
          )}
          <p className="text">
            <b>Lectures:</b> {statistic.totalTakenLectures} /{" "}
            {statistic.totalNeededLectures}
          </p>
          <p className="text">
            <b>Number of students:</b> {statistic.totalPresentStudentsForCourse}{" "}
            / {statistic.totalStudentsForCourse} *
          </p>
          <p className="text">
            <b>Percentage of attended lectures:</b>{" "}
            {!isNaN(statistic.percentageOfStudents)
              ? statistic.percentageOfStudents
              : 0}
            % *
          </p>
          <small>
            <i>*students who come to more than 30% of lectures</i>
          </small>
        </div>
        <Link className="btn-link" to={"/statistic/" + id} state={course}>
          <button className="btn card-btn statistic-card-btn">
            See statistic by each student
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="no-data">
        No attendance statistics available for course '{name}'.
      </div>
    );
  }
}

export default CourseStatisticCard;
