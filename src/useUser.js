import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";

export const useUser = (token) => {
  const [user, setUser] = useState();
  const [load, setLoad] = useState(true);

  const getUser = useCallback( () => {
    fetch(BACKEND_URL + "Login/Validate?token=" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((u) => {
        setUser(u);
        setLoad(false);
      })
      .catch((e) => console.log(e));
  },[token]);

  useEffect(()=>{
    getUser();
  },[token, getUser]);

  return {user, load};
};
