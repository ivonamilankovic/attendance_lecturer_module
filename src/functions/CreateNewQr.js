import { useParams, Navigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loading from "../components/Loading";

function CreateNewQr() {
  const params = useParams();
  const { data, load } = useApi("PUT", "Lecture/QrCode", "/" + params.lid);
  if (load) {
    return <Loading />;
  }
  if (data) {
    return <Navigate to={"/course/" + params.id + "/lectures"} />;
  }
}

export default CreateNewQr;
