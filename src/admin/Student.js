import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  TextInput,
  EditButton,
  DeleteButton,
} from "react-admin";

export function StudentList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="index" />
        <TextField source="user.firstName" label="first name" />
        <TextField source="user.lastName" label="last name" />
        <TextField source="user.email" label="email" />
        <TextField source="studyProfile.profileName" label="study profile" />
        <TextField source="studyLanguage.languageName" label="study language" />
        <EditButton basePath="/Student" />
        <DeleteButton basePath="/Student" />
      </Datagrid>
    </List>
  );
}
