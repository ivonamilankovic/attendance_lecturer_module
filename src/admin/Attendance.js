import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  FunctionField,
  DateField,
  DeleteButton,
} from "react-admin";

export function AttendanceList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="student.index" label="Student" />
        <DateField source="date" />
        <TextField source="lecture.name" label="Lecture name" />
        <FunctionField
          render={(record) =>
            `${record.lecture.lecturer.firstName} ${record.lecture.lecturer.lastName}`
          }
          label="Lecturer"
        />
        <BooleanField source="present" />
        <FunctionField
          render={(record) => (record.notes ? record.notes : "-")}
          label="Notes"
        />
        <DeleteButton basepath="/StudentAttendance" />
      </Datagrid>
    </List>
  );
}
