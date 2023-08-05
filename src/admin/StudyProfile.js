import {
  List,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  TextInput,
  DeleteButton,
} from "react-admin";

export function ProfileList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
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
