import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "./Header";
import Loading from "./Loading";
import Select from "./Select";
import useApi from "../hooks/useApi";
import { ROLES } from "../constants";
import pen from "../images/pen.png";

function CoursesList({ currentUser }) {
  const [courses, setCourses] = useState([]);
  const [filterLang, setFilterLang] = useState("");
  const [filterProfile, setFilterProfile] = useState("");
  let urlParam = "?" + getParams();
  const { data, load } = useApi("GET", "Course", urlParam);
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

  function handleChange(e, type) {
    if (type === "L") {
      setFilterLang(e.target.value);
    }
    if (type === "P") {
      setFilterProfile(e.target.value);
    }
  }

  function inArray(array, name, value) {
    let flag = false;
    for (var i = 0; i < array.length; i++) {
      if (array[i][name] === value) {
        flag = true;
      }
    }
    return flag;
  }

  if (load) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Navigate to="/logout" />;
  }
  if (courses) {
    const content = { course: null, action: "create" };
    return (
      <>
        <Header />
        <div className="logged-person">
          logged as: {currentUser.firstName} {currentUser.lastName}
        </div>
        <Link to="/course/form" className="btn-link" state={content}>
          <button className="btn"> Add new course</button>
        </Link>
        <div className="filters">
          <div>
            <span>Filter by:</span>
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
        {courses.length > 0 ? (
          <div>
            <div className="course-list">
              {courses.map((course) => {
                const {
                  id,
                  name,
                  assistant,
                  lecturesNumForProfessor,
                  lecturesNumForAssistent,
                  totalTakenLectures,
                  languages,
                  studyProfiles,
                } = course;

                let matchFilterLang = false;
                let matchFilterProfile = false;
                if (filterLang) {
                  matchFilterLang = inArray(languages, "language", filterLang);
                } else {
                  matchFilterLang = true;
                }
                if (filterProfile) {
                  matchFilterProfile = inArray(
                    studyProfiles,
                    "profileName",
                    filterProfile
                  );
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
                const c = { course: course, action: "edit" };
                return (
                  <div key={id} className="course-card">
                    <h3 className="course-title">
                      {name}
                      <Link to="/course/form" className="btn-link" state={c}>
                        <button className="btn btn-edit btn-header">
                          <img src={pen} alt="edit" width={15} />
                        </button>
                      </Link>
                    </h3>
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
                          ? parseInt(lecturesNumForAssistent) +
                            parseInt(course.lecturesNumForProfessor)
                          : 0 + parseInt(lecturesNumForProfessor)}
                      </p>
                    </div>
                    <Link
                      className="btn-link"
                      to={"/course/" + id + "/lectures"}
                    >
                      <button className="btn card-btn">See more...</button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="no-data">No courses yet.</div>
        )}
      </>
    );
  }
}

export default CoursesList;
