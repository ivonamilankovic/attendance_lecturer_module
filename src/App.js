import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import FormCourse from "./components/FormCourse";
import CreateCourse from "./functions/CreateCourse";
import CourseLecturesList from "./components/CourseLecturesList";
import CreateNewQr from "./functions/CreateNewQr";
import EditLecture from "./functions/EditLecture";
import FormLecture from "./components/FormLecture";
import CreateLecture from "./functions/CreateLecture";
import DeleteLecture from "./functions/DeleteLecture";
import LectureAttendancesList from "./components/LectureAttendancesList";
import FormAttendanceNotes from "./components/FormAttendanceNotes";
import CreateNotes from "./functions/CreateNotes";
import EditPresence from "./functions/EditPresence";
import DeleteAttendance from "./functions/DeleteAttendance";
import FormAttendance from "./components/FormAttendance";
import CreateAttendance from "./functions/CreateAttendance";
import DownloadAttendanceExcel from "./functions/DownloadAttendanceExcel";
import Statistics from "./components/Statistics";
import StatisticByStudent from "./components/StatisticByStudent";

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
        <Route
          path="/course/:id/lecture/:lid/del"
          element={<DeleteLecture />}
        />
        <Route
          path="/course/:id/lecture/create/:userid"
          element={<CreateLecture />}
        />
        <Route
          path="/lecture/:lid/attendances"
          element={<LectureAttendancesList />}
        />
        <Route
          path="/lecture/:lid/attendance/form"
          element={<FormAttendance />}
        />
        <Route
          path="/lecture/:lid/attendance/excel"
          element={<DownloadAttendanceExcel />}
        />
        <Route
          path="/lecture/:lid/attendance/create/:index"
          element={<CreateAttendance />}
        />
        <Route
          path="/lecture/:lid/attendance/:aid/form/notes"
          element={<FormAttendanceNotes />}
        />
        <Route
          path="/lecture/:lid/attendance/:aid/notes/:index"
          element={<CreateNotes />}
        />
        <Route
          path="/lecture/:lid/attendance/:aid/presence/:index"
          element={<EditPresence />}
        />
        <Route
          path="/lecture/:lid/attendance/:aid/del"
          element={<DeleteAttendance />}
        />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/statistic/:cid" element={<StatisticByStudent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
