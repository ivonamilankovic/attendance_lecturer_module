import { Navigate } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import Loading from "./Loading";
import { useUser } from "../hooks/useUser";
import CoursesList from "./CoursesList";

function Dashboard() {
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { currentUser, load, success } = useUser(token);

  if (success === false) {
    return <Navigate to="/logout" />;
  }
  if (!token) {
    return <Navigate to="/logout" />;
  }
  if (load) {
    return <Loading />;
  }
  return <CoursesList currentUser={currentUser} />;
}

export default Dashboard;
