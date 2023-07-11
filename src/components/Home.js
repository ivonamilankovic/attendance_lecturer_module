import { Navigate } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";

function Home() {
  if (localStorage.getItem(KEY_USER_TOKEN) !== "") {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default Home;
