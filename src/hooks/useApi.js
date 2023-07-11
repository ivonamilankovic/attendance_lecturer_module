import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL, KEY_USER_TOKEN } from "../constants";

export const useApi = (method, apiSection, urlParam = "", body = {}) => {
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);

  const getData = useCallback(() => {
    const token =
      localStorage.getItem(KEY_USER_TOKEN) !== ""
        ? localStorage.getItem(KEY_USER_TOKEN)
        : null;

    let fetchParams = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    if (method !== "GET") {
      fetchParams[body] = body;
    }

    fetch(BACKEND_URL + apiSection + urlParam, fetchParams)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoad(false);
      })
      .catch((e) => console.log(e));
  }, [method, apiSection, urlParam, body]);

  useEffect(() => {
    getData();
  }, [method, apiSection, urlParam, body, getData]);

  return { data, load };
};

export default useApi;