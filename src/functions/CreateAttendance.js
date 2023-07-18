import { useParams, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useApi from "../hooks/useApi";

function CreateAttendance() {
  const params = useParams();
  const body = {
    lectureId: params.lid,
    index: params.index,
  };
  const { data, load } = useApi("POST", "StudentAttendance", "", body);
  if (load) {
    return <Loading />;
  }
  if (data) {
    return <Navigate to={"/lecture/" + params.lid + "/attendances"} />;
  }
}

export default CreateAttendance;
