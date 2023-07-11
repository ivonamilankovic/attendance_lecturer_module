import { useEffect, useState } from "react";
import Header from "./Header";
import Loading from "./Loading";
import useApi from "../hooks/useApi";

function CoursesList({ urlParam }) {
  const [courses, setCourses] = useState([]);
  const { data, load } = useApi("GET", "Course", urlParam);

  useEffect(() => {
    if (data) {
      setCourses(data);
    }
  }, [data]);

  //TODO: add options to filter by lang & profile

  if (load) {
    return <Loading />;
  }
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

export default CoursesList;
