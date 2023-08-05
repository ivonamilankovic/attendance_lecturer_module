import {
  List,
  Create,
  Edit,
  Datagrid,
  SimpleForm,
  TextField,
  FunctionField,
  NumberInput,
  TextInput,
  ReferenceInput,
  SelectInput,
  EditButton,
  DeleteButton,
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
        <EditButton basepath="/Student" />
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
          <SelectInput
            optionText={(choice) => `${choice.firstName} ${choice.lastName}`}
          />
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

export function StudentEdit(props) {
  return (
    <Edit title="Edit student" {...props}>
      <SimpleForm>
        <TextInput disabled source="index" />
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
    </Edit>
  );
}
