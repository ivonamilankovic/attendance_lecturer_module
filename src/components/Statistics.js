import { useMemo, useState } from "react";
import { KEY_USER_TOKEN, ROLES } from "../constants";
import useApi from "../hooks/useApi";
import useUser from "../hooks/useUser";
import CourseStatisticCard from "./CourseStatisticCard";
import Header from "./Header";
import Loading from "./Loading";

function Statistics() {
  const [courses, setCourses] = useState([]);
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { currentUser, load } = useUser(token);

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

  if (load || loadData) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="logged-person">
        logged as: {currentUser.firstName} {currentUser.lastName}
      </div>
      <h2 className="title-smaller">Attendance Statistics</h2>
      {courses.length > 0 ? (
        <div>
          <div className="course-list">
            {courses.map((course) => {
              return <CourseStatisticCard key={course.id} course={course} />;
            })}
          </div>
        </div>
      ) : (
        <div className="no-data">
          No course attendance statistics available.
        </div>
      )}
    </>
  );
}

export default Statistics;
