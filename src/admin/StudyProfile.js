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

export function ProfileList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EditButton basepath="/StudyProfile" />
        <DeleteButton basepath="/StudyProfile" />
      </Datagrid>
    </List>
  );
}

export function ProfileCreate(props) {
  return (
    <Create title="Create new study profile" {...props}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
}

export function ProfileEdit(props){
  return (
    <Edit title="Edit study profile" {...props}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  );
}