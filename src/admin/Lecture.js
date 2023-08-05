import {
  List,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  FunctionField,
  DateField,
  TextInput,
  ReferenceInput,
  SelectInput,
  DeleteButton,
} from "react-admin";
import { ROLES } from "../constants";

export function LectureList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <DateField source="date" showTime={true} />
        <TextField source="course.name" label="Course" />
        <FunctionField
          render={(record) =>
            `${record.lecturer.firstName} ${record.lecturer.lastName}`
          }
          label="Lecturer"
        />
        <DeleteButton basepath="/Lecture" />
      </Datagrid>
    </List>
  );
}

export function LectureCreate(props) {
  return (
    <Create title="Create new lecture" {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" multiline />
        <ReferenceInput
          label="Lecturer"
          source="lecturerId"
          reference="User"
          filter={{
            role: { roleName: ROLES.ROLE_PROFESSOR || ROLES.ROLE_ASSISTANT },
          }}
        >
          <SelectInput
            optionText={(choice) => `${choice.firstName} ${choice.lastName}`}
          />
        </ReferenceInput>
        <ReferenceInput label="Course" source="courseId" reference="Course">
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}
