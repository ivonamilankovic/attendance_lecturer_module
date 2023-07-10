import { useState } from "react";
import { Navigate } from "react-router-dom";
import { BACKEND_URL, KEY_USER_TOKEN, ROLES } from "../constants";
import Loading from "./Loading";
import Header from "./Header";
import { useUser } from "../useUser";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { user, load } = useUser(token);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (load) {
    return <Loading />;
  } else {
    fetchCourses();
  }

  async function fetchCourses() {
    let urlParam = "";
    if (user.role.name === ROLES.ROLE_PROFESSOR) {
      urlParam = "professorId=" + user.id;
    } else if (user.role.name === ROLES.ROLE_ASSISTANT) {
      urlParam = "assistantId=" + user.id;
    }
    //TODO: add options to filter by lang & profile
    try {
      fetch(BACKEND_URL + "Course?" + urlParam, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((c) => {
          setCourses(c);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Header />
        <div>
          <h1 className="title">My courses</h1>
          <div className="course-list">
            {courses.map((course) => {
              const {
                id,
                name,
                professor,
                assistant,
                lecturesNumForProfessor,
                lecturesNumForAssistent,
                totalTakenLectures,
              } = course;
              return (
                <div key={id} className="course-card">
                  <h3 className="course-title">{name}</h3>
                  <hr />
                  <div className="course-body">
                    {assistant && (
                      <p className="text">
                        Assistant: {assistant.firstName} {assistant.lastName}
                      </p>
                    )}
                    <p className="text">
                      Lectures taken: {totalTakenLectures} /
                      {lecturesNumForAssistent
                        ? parseInt(lecturesNumForAssistent)
                        : 0 + parseInt(lecturesNumForProfessor)}
                    </p>
                  </div>
                  <button className="btn card-btn">See more...</button>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;
