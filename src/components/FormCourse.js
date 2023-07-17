import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { KEY_USER_TOKEN, ROLES } from "../constants";
import useApi from "../hooks/useApi";
import { useUser } from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";
import Select from "./Select";

function FormCourse() {
  const [name, setName] = useState("");
  const [lecturesNumForProfessor, setLecturesNumForProfessor] = useState(0);
  const [lecturesNumForAssistant, setLecturesNumForAssistant] = useState(0);
  const [professorId, setProfessorId] = useState(0);
  const [assistantId, setAssistantId] = useState(0);
  const [courseLanguages, setCourseLanguages] = useState([]);
  const [courseStudyProfiles, setCourseStudyProfiles] = useState([]);
  const { currentUser, load, success } = useUser(
    localStorage.getItem(KEY_USER_TOKEN)
  );
  const { data: assistants, load: load3 } = useApi("GET", "User");
  const content = {
    name: name,
    lecturesNumForProfessor: lecturesNumForProfessor,
    lecturesNumForAssistant: lecturesNumForAssistant,
    professorId: professorId,
    assistantId: assistantId,
    courseLanguages: courseLanguages,
    courseStudyProfiles: courseStudyProfiles,
  };

  function handleChange(e, type) {
    //TODO fix this
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    if (type === "L") {
      if (courseLanguages.includes(parseInt(value))) {
        let index = courseLanguages.indexOf(parseInt(value));
        setCourseLanguages((courseLanguages) =>
          courseLanguages.splice(index, 1)
        );
      } else {
        setCourseLanguages((courseLanguages) => [
          ...courseLanguages,
          parseInt(value),
        ]);
      }
    }
    if (type === "S") {
      if (courseStudyProfiles.includes(parseInt(value))) {
        let index = courseStudyProfiles.indexOf(parseInt(value));
        setCourseStudyProfiles((courseStudyProfiles) =>
          courseStudyProfiles.splice(index, 1)
        );
      } else {
        setCourseStudyProfiles((courseStudyProfiles) => [
          ...courseStudyProfiles,
          parseInt(value),
        ]);
      }
    }
  }

  useEffect(() => {
    if (currentUser) {
      setProfessorId(currentUser.id);
    }
  }, [currentUser]);

  if (success === false) {
    return <Navigate to="/logout" />;
  }
  if (load || load3) {
    return <Loading />;
  }

  if (assistants) {
    return (
      <>
        <Header />
        <div>
          <h1 className="title">Create new course</h1>
          <div className="form">
            <label htmlFor="name" className="text">
              Name of new course:
            </label>
            <br />
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="lecturesProfessor" className="text">
              Number of lectures for professor:
            </label>
            <br />
            <input
              id="lecturesProfessor"
              name="lecturesNumForProfessor"
              type="number"
              value={lecturesNumForProfessor}
              onChange={(e) => setLecturesNumForProfessor(e.target.value)}
            />
            <br />
            <label htmlFor="lecturesAssistant" className="text">
              Number of lectures for assistant:
            </label>
            <br />
            <input
              id="lecturesAssistant"
              name="lecturesNumForAssistant"
              type="number"
              value={lecturesNumForAssistant}
              onChange={(e) => setLecturesNumForAssistant(e.target.value)}
            />
            <br />
            <label htmlFor="assistant" className="text">
              Assistant:
            </label>
            <br />
            <select
              id="assistant"
              name="assistantId"
              value={assistantId}
              onChange={(e) => setAssistantId(e.target.value)}
            >
              <option key={0} value={0}>
                none
              </option>
              {assistants.map((a) => {
                const { id, firstName, lastName, role } = a;
                if (role.roleName === ROLES.ROLE_ASSISTANT) {
                  return (
                    <option key={id} value={id}>
                      {firstName} {lastName}
                    </option>
                  );
                }
                return <></>;
              })}
            </select>
            <br />
            <Select
              nameOfFetchData={"StudyLanguage"}
              name={"Languages"}
              multiple={true}
              handleChange={handleChange}
              withLabel={true}
              withBreaks={true}
              optionValueIsName={false}
            />
            <br />
            <Select
              nameOfFetchData={"StudyProfile"}
              name={"Study profiles"}
              multiple={true}
              handleChange={handleChange}
              withLabel={true}
              withBreaks={true}
              optionValueIsName={false}
            />
            <br />
            <Link className="btn-link" to="/course/create" state={content}>
              <button className="btn"> Create </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default FormCourse;
