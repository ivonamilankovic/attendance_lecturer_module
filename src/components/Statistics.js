import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { ROLES } from "../constants";
import useApi from "../hooks/useApi";
import CourseStatisticCard from "./CourseStatisticCard";
import Header from "./Header";
import Loading from "./Loading";

function Statistics({ currentUser }) {
  const [courses, setCourses] = useState([]);

  let urlParam = "?" + getParams();
  const { data, load: loadData } = useApi("GET", "Course", urlParam);
  useMemo(() => {
    if (data) {
      setCourses(data);
    }
  }, [data]);

  function getParams() {
    if (currentUser?.role.name === ROLES.ROLE_PROFESSOR) {
      return "professorId=" + currentUser?.id;
    } else if (currentUser?.role.name === ROLES.ROLE_ASSISTANT) {
      return "assistantId=" + currentUser?.id;
    }
  }

  if (loadData) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Navigate to="/logout" />;
  }

  return (
    <>
      <Header />
      <div className="logged-person">
        logged as: {currentUser.firstName} {currentUser.lastName}
      </div>
      <h2 className="title-smaller">Attendance Statistics</h2>
      {courses.length > 0 ? (
        <div className="statistic">
          <div className="course-list">
            {courses.map((course) => {
              return <CourseStatisticCard key={course.id} course={course} />;
            })}
          </div>
        </div>
      ) : (
        <div className="no-data">
          No courses available for attendance statistics.
        </div>
      )}
    </>
  );
}

export default Statistics;
