import { useParams, useLocation, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useApi from "../hooks/useApi";

function CreateNotes() {
  const params = useParams();
  const location = useLocation();
  const notes = location.state;

  const { load } = useApi(
    "PUT",
    "StudentAttendance",
    "/" + params.aid + "/Notes/" + params.index,
    { notes: notes }
  );

  if (load) {
    return <Loading />;
  }else {
    return <Navigate to={"/lecture/" + params.lid + "/attendances"} />;
  }
}
export default CreateNotes;
