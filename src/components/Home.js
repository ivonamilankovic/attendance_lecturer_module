import { useState, useEffect } from "react";
import { KEY_USER_TOKEN } from "../constants";
import { Navigate } from "react-router-dom";
import Login from "./Login";

function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem(KEY_USER_TOKEN) !== "") {
      setToken(localStorage.getItem(KEY_USER_TOKEN));
    }
  }, []);

  if (token) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Login setToken={setToken} />;
  }
}

export default Home;
