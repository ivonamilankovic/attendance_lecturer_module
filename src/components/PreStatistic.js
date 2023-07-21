import { Navigate } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useUser from "../hooks/useUser";
import Loading from "./Loading";
import Statistics from "./Statistics";

function PreStatistic() {
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
  return <Statistics currentUser={currentUser} />;
}

export default PreStatistic;
