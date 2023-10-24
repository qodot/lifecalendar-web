import CreateCalendarButton from "@/src/component/CreateCalendarButton";
import { getCalendarList } from "@/src/data/api";

export default async function Page() {
  const resp = await getCalendarList();

  return (
    <main className="flex flex-col py-10 px-32">
      <h1>캘린더 목록</h1>

      <div className="flex justify-end">
        <CreateCalendarButton />
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
    </main>
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
        <button className="btn btn-sm">상세 보기</button>
      </th>
    </tr>
  ));
}
