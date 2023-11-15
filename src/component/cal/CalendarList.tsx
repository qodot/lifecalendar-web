import Link from "next/link";
import { formatNumberComma } from "@/src/util/format";

export default function CalendarList({ calendars }: { calendars: Calendar[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th>캘린더 이름</th>
          <th>생일</th>
          <th>예상 수명</th>
          <th>지나온 삶</th>
          <th>남은 주</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <Rows calendars={calendars} />
      </tbody>
    </table>
  );
}

function Rows({ calendars }: { calendars: Calendar[] }) {
  return calendars.map((calendar) => (
    <tr key={calendar.id} className="hover">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{calendar.name}</td>
      <td>{calendar.birthday}</td>
      <td>{calendar.lifespan}세</td>
      <td>
        <div className="flex flex-row items-center w-full">
          {calendar.totalPercentage}%
          <progress
            className="ml-3 progress progress-primary w-44"
            value={calendar.totalPercentage.toString()}
            max="100"
          ></progress>
        </div>
      </td>
      <td>{formatNumberComma(calendar.futureWeekCount)}주</td>
      <th>
        <Link href={`/cal/${calendar.id}`}>
          <button className="btn btn-sm">상세 보기</button>
        </Link>
      </th>
    </tr>
  ));
}
