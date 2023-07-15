import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import FormCourse from "./components/FormCourse";
import CreateCourse from "./components/CreateCourse";
import CourseLecturesList from "./components/CourseLecturesList";
import CreateNewQr from "./components/CreateNewQr";
import EditLecture from "./components/EditLecture";
import FormLecture from "./components/FormLecture";
import CreateLecture from "./components/CreateLecture";
import DeleteLecture from "./components/DeleteLecture";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course/form" element={<FormCourse />} />
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/course/:id/lectures" element={<CourseLecturesList />} />
        <Route
          path="/course/:id/lecture/:lid/new_qr"
          element={<CreateNewQr />}
        />
        <Route path="/course/:id/lecture/:lid/form" element={<FormLecture />} />
        <Route path="/course/:id/lecture/:lid/edit" element={<EditLecture />} />
        <Route path="/course/:id/lecture/:lid/del" element={<DeleteLecture />} />
        <Route
          path="/course/:id/lecture/create/:userid"
          element={<CreateLecture />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
