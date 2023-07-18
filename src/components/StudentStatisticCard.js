import { useMemo, useState } from "react";
import useApi from "../hooks/useApi";

function StudentStatisticCard({ cid, no, student }) {
  const [statistic, setStatistic] = useState([]);
  const { data } = useApi(
    "GET",
    "StudentAttendance",
    "/Presence/" + cid + "/" + student.index
  );
  useMemo(() => {
    if (data) {
      setStatistic(data);
    }
  }, [data]);

  if (statistic.totalTakenLectures) {
    return (
      <tr key={student.index}>
        <td>{no}</td>
        <td>{student.index}</td>
        <td>
          {student.user.firstName} {student.user.lastName}
        </td>
        <td>{statistic.totalPresentLectures}</td>
        <td>{statistic.attendancePercentage}%</td>
      </tr>
    );
  }
}

export default StudentStatisticCard;
