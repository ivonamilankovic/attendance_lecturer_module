import {
  List,
  Edit,
  Create,
  Datagrid,
  SimpleForm,
  TextField,
  FunctionField,
  ArrayField,
  SingleFieldList,
  ChipField,
  TextInput,
  NumberInput,
  SelectInput,
  ReferenceInput,
  ReferenceArrayInput,
  CheckboxGroupInput,
  EditButton,
  DeleteButton,
} from "react-admin";
import { ROLES } from "../constants";

export function CourseList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="lecturesNumForProfessor" />
        <FunctionField
          render={(record) =>
            record.lecturesNumForAssistent ? record.lecturesNumForAssistent : 0
          }
          label="lecturesNumForAssistent"
        />
        <TextField source="totalTakenLectures" />
        <FunctionField
          render={(record) =>
            `${record.professor.firstName} ${record.professor.lastName}`
          }
          label="professor"
        />
        <FunctionField
          render={(record) =>
            record.assistant
              ? `${record.assistant.firstName} ${record.assistant.lastName}`
              : "-"
          }
          label="assistant"
        />
        <ArrayField source="languages">
          <SingleFieldList>
            <ChipField source="language" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="studyProfiles">
          <SingleFieldList>
            <ChipField source="profileName" size="small" />
          </SingleFieldList>
        </ArrayField>
        <DeleteButton basePath="/Course" />
      </Datagrid>
    </List>
  );
}

export function CourseCreate(props) {
  return (
    <Create title="Create new Course" {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <NumberInput source="lecturesNumForProfessor" />
        <NumberInput source="lecturesNumForAssistent" defaultValue={0} />
        <NumberInput disabled source="totalTakenLectures" defaultValue={0} />
        <ReferenceInput
          label="professor"
          source="professorId"
          reference="User"
          filter={{ role: { roleName: ROLES.ROLE_PROFESSOR } }}
        >
          <SelectInput
            optionText={(choice) => `${choice.firstName} ${choice.lastName}`}
          />
        </ReferenceInput>
        <ReferenceInput
          label="assistant"
          source="assistantId"
          reference="User"
          filter={{ role: { roleName: ROLES.ROLE_ASSISTANT } }}
        >
          <SelectInput
            optionText={(choice) => `${choice.firstName} ${choice.lastName}`}
            defaultValue={0}
          />
        </ReferenceInput>
        <ReferenceArrayInput source="courseLanguages" reference="StudyLanguage">
          <CheckboxGroupInput
            optionValue="id"
            optionText="name"
            labelPlacement="bottom"
          />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          source="courseStudyProfiles"
          reference="StudyProfile"
        >
          <CheckboxGroupInput
            optionValue="id"
            optionText="name"
            labelPlacement="bottom"
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
}

