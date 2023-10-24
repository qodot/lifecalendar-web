import CalendarFormButton from "@/src/component/CalendarFormButton";
import { getCalendarList } from "@/src/data/api";
import Link from "next/link";

export default async function Page() {
  const resp = await getCalendarList();

  return (
    <>
      <h1>캘린더 목록</h1>

      <div className="flex justify-end">
        <CalendarFormButton isCreate />
      </div>

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
            <th></th>
          </tr>
        </thead>

        <tbody>
          <Rows calendars={resp.calendars} />
        </tbody>
      </table>
    </>
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
      <td>{calendar.lifespan}</td>
      <th>
        <Link href={`/cal/${calendar.id}`}>
          <button className="btn btn-sm">상세 보기</button>
        </Link>
      </th>
    </tr>
  ));
}
