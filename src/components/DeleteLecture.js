import {useParams, Navigate} from "react-router-dom";
import useApi from "../hooks/useApi";
import Loading from "./Loading";

function DeleteLecture() {
    const params = useParams();
  
    const { data, load } = useApi("DELETE", "Lecture", "/"+params.lid);
  
    if (load) {
      return <Loading />;
    }
    if (data) {
      return <Navigate to={"/course/" + params.id + "/lectures"} />;
    }
  }
  
  export default DeleteLecture;