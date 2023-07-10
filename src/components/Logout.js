import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";

function Logout() {
  const [logingOut, setLogingOut] = useState(true);

  useEffect(() => {
    localStorage.setItem(KEY_USER_TOKEN, "");
    setLogingOut(false);
  }, []);

  if (logingOut) {
    return <h1>Loging out...</h1>;
  } else {
    return <Navigate to="/" />;
  }
}

export default Logout;
