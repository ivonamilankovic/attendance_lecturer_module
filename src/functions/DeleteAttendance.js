import { useParams, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useApi from "../hooks/useApi";

function DeleteAttendance() {
  const params = useParams();
  const { load } = useApi(
    "DELETE",
    "StudentAttendance",
    "/" + params.aid
  );

  if (load) {
    return <Loading />;
  }else {
    return <Navigate to={"/lecture/" + params.lid + "/attendances"} />;
  }
}

export default DeleteAttendance;
