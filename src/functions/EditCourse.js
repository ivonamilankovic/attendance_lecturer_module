import { Navigate, useParams, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useApi from "../hooks/useApi";

function EditCourse() {
  const params = useParams();
  const location = useLocation();
  const propsData = location.state;

  const { data, load } = useApi("PUT", "Course", "/" + params.id, propsData);

  if (load) {
    return <Loading />;
  }
  if (data) {
    return <Navigate to={"/dash"} />;
  }
}

export default EditCourse;
