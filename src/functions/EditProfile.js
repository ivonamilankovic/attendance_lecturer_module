import { useParams, useLocation, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useApi from "../hooks/useApi";

function EditProfile() {
  const params = useParams();
  const location = useLocation();
  const propsData = location.state;

  const { data, load } = useApi("PUT", "User", "/" + params.id, propsData);
  
  if (load) {
    return <Loading />;
  }
  if (data) {
    return <Navigate to="/profile?s=true" />;
  }
}

export default EditProfile;
