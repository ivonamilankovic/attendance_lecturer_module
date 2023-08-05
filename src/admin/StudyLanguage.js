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

export function LangList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EditButton basepath="/StudyLanguage"/>
        <DeleteButton basepath="/StudyLanguage" />
      </Datagrid>
    </List>
  );
}

export function LangCreate(props) {
  return (
    <Create title="Create new study language" {...props}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
}

export function LangEdit(props) {
  return (
    <Edit title="Edit study language" {...props}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  );
}
