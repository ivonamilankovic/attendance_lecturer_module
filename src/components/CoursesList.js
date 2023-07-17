import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Loading from "./Loading";
import Select from "./Select";
import useApi from "../hooks/useApi";
import { ROLES } from "../constants";

function CoursesList({ currentUser }) {
  const [courses, setCourses] = useState([]);
  //const [filterLang, setFilterLang] = useState(""); //TODO filter?
  //const [filterProfile, setFilterProfile] = useState("");
  let urlParam = "?" + getParams();
  const { data, load } = useApi("GET", "Course", urlParam);
  useMemo(() => {
    if (data) {
      setCourses(data);
    } else {
      setCourses([]);
    }
  }, [data]);

  function getParams() {
    if (currentUser?.role.name === ROLES.ROLE_PROFESSOR) {
      return "professorId=" + currentUser?.id;
    } else if (currentUser?.role.name === ROLES.ROLE_ASSISTANT) {
      return "assistantId=" + currentUser?.id;
    }
  }

  /*function handleChange(e, type) {
    if (type === "L") {
      setFilterLang(e.target.value);
    }
    if (type === "P") {
      setFilterProfile(e.target.value);
    }
  }*/

  if (load) {
    return <Loading />;
  }
  if (courses) {
    return (
      <>
        <Header />
        <div className="logged-person">
          logged as: {currentUser.firstName} {currentUser.lastName}
        </div>
        <Link to="/course/form" className="btn-link">
          <button className="btn"> Add new course</button>
        </Link>
        {/* <div className="filters"> 
          //btn here
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
        </div>*/}
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
                {
                  /*let matchFilterLang = false;
              let matchFilterProfile = false;
              if (filterLang) {
                matchFilterLang = Object.values(languages).includes(filterLang);
              }
              if (filterProfile) {
                matchFilterProfile =
                  Object.values(studyProfiles).includes(filterProfile);
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
              }*/
                }
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
