import { useParams, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useApi from "../hooks/useApi";

function EditPresence() {
  const params = useParams();
  const {load } = useApi(
    "PUT",
    "StudentAttendance",
    "/" + params.aid + "/Presence/" + params.index
  );

  if (load) {
    return <Loading />;
  }else {
    return <Navigate to={"/lecture/" + params.lid + "/attendances"} />;
  }
}
export default EditPresence;
