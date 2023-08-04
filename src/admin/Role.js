import {
  List,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export function RoleList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
      </Datagrid>
    </List>
  );
}

export function RoleCreate(props) {
  return (
    <Create title="Create new role" {...props}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
}
