import { useParams, useLocation, Navigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loading from "./Loading";

function CreateLecture() {
  const params = useParams();
  const location = useLocation();
  const propsData = location.state;
  propsData.lecturerId = params.userid;
  propsData.courseId = params.id;

  const { data, load } = useApi("POST", "Lecture", "", propsData);

  if (load) {
    return <Loading />;
  }
  if (data) {
    return <Navigate to={"/course/" + params.id + "/lectures"} />;
  }
}

export default CreateLecture;
