import { Navigate, useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loading from "../components/Loading";

function CreateCourse() {
  const location = useLocation();
  const propsData = location.state;
    console.log(propsData)
  const { data, load } = useApi("POST", "Course", "", propsData);
  if (load) {
    return <Loading />;
  }
  if (data) {
    console.log(data)
    return <Navigate to="/dash" />;
  }
}

export default CreateCourse;
