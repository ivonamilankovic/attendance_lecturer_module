import {
  List,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  DeleteButton,
  NumberInput,
  ReferenceInput,
  SelectInput,
  FunctionField,
} from "react-admin";

export function StudentList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="index" />
        <FunctionField
          render={(record) =>
            `${record.user.firstName} ${record.user.lastName}`
          }
          label="User"
        />
        <TextField source="user.email" label="Email" />
        <TextField source="studyProfile.name" label="Study profile" />
        <TextField source="studyLanguage.name" label="Study language" />
        <DeleteButton basepath="/Student" />
      </Datagrid>
    </List>
  );
}


export function StudentCreate(props) {
  return (
    <Create title="Create new student" {...props}>
      <SimpleForm>
        <NumberInput source="index" />
        <ReferenceInput label="User" source="userId" reference="User">
          <SelectInput optionText="lastName" />
        </ReferenceInput>
        <ReferenceInput
          label="Profile"
          source="studyProfileId"
          reference="StudyProfile"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput
          label="Language"
          source="studyLanguageId"
          reference="StudyLanguage"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
