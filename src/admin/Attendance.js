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
        <TextField source="student.index" label="student" />
        <DateField source="date" />
        <TextField source="lecture.name" label="lecture name" />
        <FunctionField
          render={(record) =>
            `${record.lecture.lecturer.firstName} ${record.lecture.lecturer.lastName}`
          }
          label="lecturer"
        />
        <BooleanField source="present" />
        <FunctionField
          render={(record) => (record.notes ? record.notes : "-")}
          label="notes"
        />
        <DeleteButton basePath="/StudentAttendance" />
      </Datagrid>
    </List>
  );
}
