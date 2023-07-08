import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants";
import Dashboard from "./Dashboard";
import Loading from "./Loading";

function Home({ token }) {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      fetch(BACKEND_URL + "Login/Validate?token=" + token, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((u) => setUser(u));
    } catch (e) {
      console.log(e);
    }
  }, [token]);
  if (!user) {
    return <Loading />;
  } else {
    return <Dashboard user={user} token={token} />;
  }
}
export default Home;
