import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  TextInput,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from "react-admin";

export function UserList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="email" />
        <TextField source="role.roleName" label="role" />
        <EditButton basePath="/User" />
        <DeleteButton basePath="/User" />
      </Datagrid>
    </List>
  );
}

export function UserEdit(props) {
  return (
    <Edit title="Edit user data" {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="email" />
      </SimpleForm>
    </Edit>
  );
}

export function UserCreate(props) {
  return (
    <Create title="Create new user" {...props}>
      <SimpleForm>
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <TextInput source="email" />
        <TextInput source="password" />
        <ReferenceInput label="role" source="roleId" reference="Role">
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
