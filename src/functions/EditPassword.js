import { useParams, useLocation, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useApi from "../hooks/useApi";

function EditPassword() {
  const params = useParams();
  const location = useLocation();
  const propsData = location.state;

  const { load } = useApi("PUT", "User", "/ChangePassword/" + params.id, {
    password: propsData,
  });

  if (load) {
    return <Loading />;
  }else {
    return <Navigate to="/profile?s=true" />;
  }
}
export default EditPassword;
