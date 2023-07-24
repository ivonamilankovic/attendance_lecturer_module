import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { KEY_USER_TOKEN, ROLES } from "../constants";
import useApi from "../hooks/useApi";
import { useUser } from "../hooks/useUser";
import Header from "./Header";
import Loading from "./Loading";
import Select from "react-select";

function FormCourse() {
  const [name, setName] = useState("");
  const [lecturesNumForProfessor, setLecturesNumForProfessor] = useState(0);
  const [lecturesNumForAssistant, setLecturesNumForAssistant] = useState(0);
  const [professorId, setProfessorId] = useState(0);
  const [assistantId, setAssistantId] = useState(0);
  const [courseLanguages, setCourseLanguages] = useState([]);
  const [courseStudyProfiles, setCourseStudyProfiles] = useState([]);
  const contentCreate = {
    name: name,
    lecturesNumForProfessor: lecturesNumForProfessor,
    lecturesNumForAssistant: lecturesNumForAssistant,
    professorId: professorId,
    assistantId: assistantId.value ? assistantId.value : 0,
    courseLanguages: filterList(courseLanguages),
    courseStudyProfiles: filterList(courseStudyProfiles),
  };

  const { currentUser, load, success } = useUser(
    localStorage.getItem(KEY_USER_TOKEN)
  );
  const { data: assistants, load: load3 } = useApi("GET", "User");
  const [roleError, setRoleError] = useState(false);
  const { data: languages, load: load1 } = useApi("GET", "StudyLanguage");
  const { data: profiles, load: load2 } = useApi("GET", "StudyProfile");

  const location = useLocation();
  const locState = location.state;
  const courseData = locState?.course;
  const [totalTakenLectures, setTotal] = useState(0);
  const [existingAssist, setExAssist] = useState("");
  const [existingLang, setExLang] = useState([]);
  const [existingProf, setExProf] = useState([]);
  const [langOptions, setLangOpt] = useState([]);
  const [profOptions, setProfOpt] = useState([]);
  const [assistOptions, setAssistOpt] = useState([]);
  const contentEdit = {
    name: name,
    lecturesNumForProfessor: lecturesNumForProfessor,
    lecturesNumForAssistent: lecturesNumForAssistant,
    totalTakenLectures: totalTakenLectures,
    professorId: professorId,
    assistantId: assistantId.value ? assistantId.value : 0,
    courseLanguages: filterList(courseLanguages),
    courseStudyProfiles: filterList(courseStudyProfiles),
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role.name !== ROLES.ROLE_PROFESSOR) {
        setRoleError(true);
      } else {
        setProfessorId(currentUser.id);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (courseData) {
      setName(courseData.name);
      setLecturesNumForProfessor(courseData.lecturesNumForProfessor);
      setLecturesNumForAssistant(courseData.lecturesNumForAssistent);
      setTotal(courseData.totalTakenLectures);
      setExAssist(courseData.assistant.email);
      setExLang(courseData.languages);
      setExProf(courseData.studyProfiles);
    }
  }, []);

  useEffect(() => {
    let langOptions = [];
    let langSelected = [];
    let profOptions = [];
    let profSelected = [];
    let assistOptions = [];
    if (languages) {
      languages.forEach((l) => {
        langOptions.push({ value: l.id, label: l.name });
        existingLang.forEach((e) => {
          if (l.name === e.language) {
            langSelected.push({ value: l.id, label: l.name });
          }
        });
      });
      setLangOpt(langOptions);
      setCourseLanguages(langSelected);
    }
    if (profiles) {
      profiles.forEach((l) => {
        profOptions.push({ value: l.id, label: l.name });
        existingProf.forEach((e) => {
          if (l.name === e.profileName) {
            profSelected.push({ value: l.id, label: l.name });
          }
        });
      });
      setProfOpt(profOptions);
      setCourseStudyProfiles(profSelected);
    }
    if (assistants) {
      assistOptions.push({ value: 0, label: "none" });
      assistants.forEach((a) => {
        if (a.role.roleName === ROLES.ROLE_ASSISTANT) {
          assistOptions.push({
            value: a.id,
            label: a.firstName + " " + a.lastName,
          });
          if (a.email === existingAssist) {
            setAssistantId({
              value: a.id,
              label: a.firstName + " " + a.lastName,
            });
          }
        }
      });
      setAssistOpt(assistOptions);
    }
  }, [languages, assistants, profiles]);

  function filterList(array) {
    let newArray = [];
    array.forEach((el) => {
      newArray.push(el.value);
    });
    return newArray;
  }

  if (success === false) {
    return <Navigate to="/logout" />;
  }
  if (load || load1 || load2 || load3) {
    return <Loading />;
  }
  if (roleError) {
    return <Navigate to="/dashboard" />;
  }

  if (assistants && languages && profiles) {
    return (
      <>
        <Header />
        <div>
          <h1 className="title">{locState.action} course</h1>
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
            <Select
              value={assistantId}
              onChange={setAssistantId}
              options={assistOptions}
              placeholder={"Choose assistant..."}
            />
            <br />
            <label className="text">Study languages:</label>
            <br />
            <Select
              isMulti={true}
              value={courseLanguages}
              onChange={setCourseLanguages}
              options={langOptions}
              placeholder={"Choose languages..."}
            />
            <br />
            <label className="text">Study Profiles:</label>
            <br />
            <Select
              isMulti={true}
              value={courseStudyProfiles}
              onChange={setCourseStudyProfiles}
              options={profOptions}
              placeholder={"Choose profiles..."}
            />
            <br />
            <Link
              className="btn-link"
              to={
                locState.action === "edit"
                  ? "/course/" + locState.action + "/" + courseData.id
                  : "/course/" + locState.action
              }
              state={locState.action === "edit" ? contentEdit : contentCreate}
            >
              <button className="btn"> Save </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default FormCourse;
