import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import { BACKEND_URL, KEY_USER_TOKEN, XLSX_FILE_NAME } from "../constants";

function DownloadAttendanceExcel() {
  const [load, setLoad] = useState(true);
  const [url, setUrl] = useState("");
  const params = useParams();
  const token = localStorage.getItem(KEY_USER_TOKEN);

  fetch(BACKEND_URL + "StudentAttendance/excel?lectureId=" + params.lid, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.blob())
    .then((blob) => {
      setUrl(window.URL.createObjectURL(new Blob([blob])));
      setLoad(false);
    })
    .catch((e) => {
      console.log(e);
      setLoad(false);
    });
  if (load) {
    return <Loading />;
  } 
  if(url) {
    const link = document.createElement("a");
      link.href = url;
      link.download = XLSX_FILE_NAME;
      link.click();
    return <Navigate to={"/lecture/" + params.lid + "/attendances"} />;
  }
}
export default DownloadAttendanceExcel;
