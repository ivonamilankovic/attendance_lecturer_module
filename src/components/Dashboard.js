import { Navigate } from "react-router-dom";
import { KEY_USER_TOKEN, ROLES } from "../constants";
import Loading from "./Loading";
import { useUser } from "../hooks/useUser";
import CoursesList from "./CoursesList";

function Dashboard() {
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { currentUser, load, success } = useUser(token);
  let urlParam;

  if (currentUser && success) {
    urlParam = "?" + getParams();
  }

  function getParams() {
    if (currentUser?.role.name === ROLES.ROLE_PROFESSOR) {
      return "professorId=" + currentUser?.id;
    } else if (currentUser?.role.name === ROLES.ROLE_ASSISTANT) {
      return "assistantId=" + currentUser?.id;
    }
  }

  if (load) {
    return <Loading />;
  }
  if (!token) {
    return <Navigate to="/logout" />;
  }
  return <CoursesList urlParam={urlParam} />;
}

export default Dashboard;
