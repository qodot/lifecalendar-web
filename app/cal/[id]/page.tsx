import CalendarFormButton from "@/src/component/CalendarFormButton";
import { getCalendar } from "@/src/data/api";

export default async function Page({ params }: { params: { id: string } }) {
  const resp = await getCalendar(params.id);
  const calendar = resp.calendar;

  return (
    <>
      <h1>캘린더 상세</h1>

      <div className="flex justify-end">
        <CalendarFormButton
          isCreate={false}
          id={calendar.id}
          name={calendar.name}
          birthday={calendar.birthday}
          lifespan={calendar.lifespan}
        />
      </div>

      <div>
        <ul>
          <li>달력 이름: {resp.calendar.name}</li>
          <li>생일: {resp.calendar.birthday}</li>
          <li>예상 수명: {resp.calendar.lifespan}</li>
        </ul>
      </div>

      <CalendarMatrix years={resp.calendar.years} />
    </>
  );
}

function CalendarMatrix({ years }: { years: Year[] }) {
  return (
    <div className="flex flex-col items-center">
      <WeekNumberRow />
      <Years years={years} />
    </div>
  );
}

function WeekNumberRow() {
  return (
    <Row>
      <RowFirst num={0} />
      {[...Array(52)].map((_, i) => (
        <div
          key={i + 1}
          className="w-5 h-5 flex justify-center items-center text-xs"
        >
          {i + 1}
        </div>
      ))}
    </Row>
  );
}

function Years({ years }: { years: Year[] }) {
  return (
    <div className="flex flex-col gap-0.5">
      {years.map((year) => (
        <YearRow year={year} key={year.yearnum} />
      ))}
    </div>
  );
}

function YearRow({ year }: { year: Year }) {
  return (
    <Row>
      <RowFirst num={year.yearnum} />
      {year.weeks.map((week) => (
        <Week week={week} key={week.weeknum} />
      ))}
    </Row>
  );
}

function Week({ week }: { week: Week }) {
  function getColor(timeType: TimeType): string {
    switch (timeType) {
      case "past":
        return "bg-gray-600";
      case "now":
        return "bg-blue-600";
      case "future":
        return "bg-gray-100";
      default:
        return "";
    }
  }

  return <div className={`w-5 h-5 rounded-sm ${getColor(week.time_type)}`} />;
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-row gap-0.5">{children}</div>;
}

function RowFirst({ num }: { num: number }) {
  return (
    <div className="w-8 h-5 flex justify-center items-center text-xs">
      {num === 0 ? "" : num}
    </div>
  );
}
