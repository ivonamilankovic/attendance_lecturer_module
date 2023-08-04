import { Admin, Resource, fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Navigate } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useUser from "../hooks/useUser";
import Loading from "../components/Loading";
import { UserList, UserEdit, UserCreate } from "./User";
import { RoleCreate, RoleList } from "./Role";
import { StudentList } from "./Student";
import { ProfileList, ProfileCreate, ProfileEdit } from "./StudyProfile";
import { LangEdit, LangList, LangCreate } from "./StudyLanguage";
import { CourseCreate, CourseList } from "./Course";
import { LectureCreate, LectureList } from "./Lecture";
import { AttendanceList } from "./Attendance";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem(KEY_USER_TOKEN);
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

export default function AdminHome() {
  return (
    <Admin
      title="Admin"
      basename="/admin"
      dashboard={DashboardAdmin}
      dataProvider={simpleRestProvider(
        "https://localhost:7206/api",
        httpClient
      )}
    >
      <Resource
        name="User"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
      />
      <Resource name="Role" list={RoleList} create={RoleCreate} />
      <Resource name="Student" list={StudentList} /> {/* TODO fix id<-index */}
      <Resource
        name="StudyProfile"
        list={ProfileList}
        edit={ProfileEdit}
        create={ProfileCreate}
      />
      <Resource
        name="StudyLanguage"
        list={LangList}
        edit={LangEdit}
        create={LangCreate}
      />
      <Resource name="Course" list={CourseList} create={CourseCreate} />
      <Resource name="Lecture" list={LectureList} create={LectureCreate} />
      <Resource name="StudentAttendance" list={AttendanceList} />
    </Admin>
  );
}

export function DashboardAdmin() {
  const token = localStorage.getItem(KEY_USER_TOKEN);
  const { currentUser, load } = useUser(token);
  if (load) {
    return <Loading />;
  }
  if (!token || !currentUser) {
    return <Navigate to="/logout" />;
  }
  return (
    <Card style={{ marginTop: 50 }}>
      <CardHeader title="Welcome to administration!" />
      <CardContent>Lorem ipsum sic dolor amet...</CardContent>
    </Card>
  );
}
