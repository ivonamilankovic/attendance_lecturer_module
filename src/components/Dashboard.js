import { Navigate } from "react-router-dom";
import { KEY_USER_TOKEN, ROLES } from "../constants";
import Loading from "./Loading";
import { useUser } from "../hooks/useUser";
import CoursesList from "./CoursesList";
import { useEffect, useState } from "react";
import AdminHome from "../admin/AdminHome";

function Dashboard() {
  const token =
    localStorage.getItem(KEY_USER_TOKEN) !== ""
      ? localStorage.getItem(KEY_USER_TOKEN)
      : null;
  const { currentUser, load, success } = useUser(token);
  const [roleError, setRoleError] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const role = currentUser.role.name;
      if (
        role === ROLES.ROLE_PROFESSOR ||
        role === ROLES.ROLE_ASSISTANT ||
        role === ROLES.ROLE_ADMIN
      ) {
        setRoleError(false);
      } else {
        setRoleError(true);
      }
    }
  }, [currentUser]);

  if (roleError) {
    return <Navigate to="/logout" />;
  }
  if (success === false) {
    return <Navigate to="/logout" />;
  }
  if (!token) {
    return <Navigate to="/logout" />;
  }
  if (load) {
    return <Loading />;
  }
  if (currentUser.role.name === ROLES.ROLE_ADMIN) {
    return <Navigate to="/admin" />;
  }
  return <CoursesList currentUser={currentUser} />;
}

export default Dashboard;
