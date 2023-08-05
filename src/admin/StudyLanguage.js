import {
    List,
    Create,
    Datagrid,
    SimpleForm,
    TextField,
    TextInput,
    DeleteButton,
  } from "react-admin";
  
  export function LangList(props) {
    return (
      <List {...props}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
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
  