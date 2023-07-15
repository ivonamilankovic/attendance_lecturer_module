import { Navigate, useParams, useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loading from "./Loading";

function EditLecture() {
  const params = useParams();
  const location = useLocation();
  const propsData = location.state;

  const { data, load } = useApi("PUT", "Lecture", "/" + params.lid, propsData);

  if (load) {
    return <Loading />;
  }
  if (data) {
    return <Navigate to={"/course/" + params.id + "/lectures"} />;
  }

}
export default EditLecture;
