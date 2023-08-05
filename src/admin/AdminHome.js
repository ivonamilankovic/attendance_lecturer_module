import { Admin, Resource, fetchUtils, combineDataProviders } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { Card, CardContent, CardHeader } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Navigate } from "react-router-dom";
import { KEY_USER_TOKEN } from "../constants";
import useUser from "../hooks/useUser";
import Loading from "../components/Loading";
import { UserList, UserEdit, UserCreate } from "./User";
import { RoleCreate, RoleList } from "./Role";
import { StudentList, StudentCreate, StudentEdit } from "./Student";
import { ProfileList, ProfileCreate, ProfileEdit } from "./StudyProfile";
import { LangList, LangCreate, LangEdit } from "./StudyLanguage";
import { CourseCreate, CourseEdit, CourseList } from "./Course";
import { LectureCreate, LectureList } from "./Lecture";
import { AttendanceList } from "./Attendance";

const apiUrl = "https://localhost:7206/api";
const token = localStorage.getItem(KEY_USER_TOKEN);
let options = {};
options.headers = new Headers({ Accept: "application/json" });
options.headers = new Headers({ Authorization: `Bearer ${token}` });

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.headers = new Headers({ Authorization: `Bearer ${token}` });
  return fetchUtils.fetchJson(url, options);
};

const studnetDataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

    return httpClient(url, options).then(({ headers, json }) => ({
      data: json.map((resource) => ({ ...resource, id: resource.index })),
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }));
  },
  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, options).then(
      ({ json }) => ({
        data: { ...json, id: json.index },
      })
    ),
  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    }).then(({ json }) => ({
      data: { ...json, id: json._id },
    })),
  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    }).then(({ json }) => ({
      data: { ...params.data, id: json._id },
    })),
  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(({ json }) => ({
      data: { ...json, id: json._id },
    })),
};

const dataProviders = combineDataProviders((resource) => {
  switch (resource) {
    case "Student":
      return studnetDataProvider;
    default:
      return simpleRestProvider(apiUrl, httpClient);
  }
});

export default function AdminHome() {
  return (
    <Admin
      title="Admin"
      basename="/admin"
      dashboard={DashboardAdmin}
      dataProvider={dataProviders}
    >
      <Resource
        name="User"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={PersonIcon}
      />
      <Resource
        name="Role"
        list={RoleList}
        create={RoleCreate}
        icon={EngineeringIcon}
      />
      <Resource
        name="Student"
        list={StudentList}
        edit={StudentEdit}
        create={StudentCreate}
        icon={SchoolIcon}
      />
      <Resource
        name="StudyProfile"
        list={ProfileList}
        edit={ProfileEdit}
        create={ProfileCreate}
        icon={BusinessCenterIcon}
        options={{ label: "Study Profiles" }}
      />
      <Resource
        name="StudyLanguage"
        list={LangList}
        edit={LangEdit}
        create={LangCreate}
        icon={LanguageIcon}
        options={{ label: "Languages" }}
      />
      <Resource
        name="Course"
        list={CourseList}
        edit={CourseEdit}
        create={CourseCreate}
        icon={LibraryBooksIcon}
      />
      <Resource
        name="Lecture"
        list={LectureList}
        create={LectureCreate}
        icon={MenuBookIcon}
      />
      <Resource
        name="StudentAttendance"
        list={AttendanceList}
        icon={RecentActorsIcon}
        options={{ label: "Attendances" }}
      />
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
      <CardContent>
        This is the administration panel.
        <br />
        Here you can have a look at list of all the users, courses, lectures and
        attendances to lectures.
      </CardContent>
    </Card>
  );
}
