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
          <EditButton basePath="/StudyLanguage" />
          <DeleteButton basePath="/StudyLanguage" />
        </Datagrid>
      </List>
    );
  }
  
  export function LangCreate(props) {
    return (
      <Create title="Create new study language" {...props}>
        <SimpleForm>
          <TextInput source="languageName" />
        </SimpleForm>
      </Create>
    );
  }
  
  export function LangEdit(props) {
    return (
      <Edit title="Edit study language" {...props}>
        <SimpleForm>
          <TextInput source="languageName" />
        </SimpleForm>
      </Edit>
    );
  }
  