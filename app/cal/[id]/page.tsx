import CalendarFormButton from "@/src/component/CalendarFormButton";
import { getCalendar } from "@/src/data/api";
import { formatDateKorean, formatNumberComma } from "@/src/util/format";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const resp = await getCalendar(params.id);
  const calendar = resp.calendar;

  return (
    <>
      <h1 className="flex flex-row items-center">
        <Link href="/cal">
          <svg
            className="w-10 h-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
          </svg>
        </Link>
        {calendar.name}
      </h1>

      <div className="flex flex-row justify-between items-center">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">나이</div>
            <div className="stat-value">{calendar.age}살</div>
            <div className="stat-desc">
              {formatDateKorean(calendar.birthday)}생
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">내가 지나온 삶</div>
            <div className="stat-value">{calendar.total_percentage}%</div>
            <div className="stat-desc">
              <progress
                className="progress progress-primary w-56"
                value={calendar.total_percentage.toString()}
                max="100"
              ></progress>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">나에게 남은 주</div>
            <div className="stat-value">
              {formatNumberComma(calendar.future_week_count)}주
            </div>
            <div className="stat-desc">
              지나온 주 {formatNumberComma(calendar.past_week_count)}주
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">올해(2023년) 진행률</div>
            <div className="stat-value">82%</div>
            <div className="stat-desc">12주 남았어요!</div>
          </div>
        </div>

        <CalendarFormButton
          isCreate={false}
          id={calendar.id}
          name={calendar.name}
          birthday={calendar.birthday}
          lifespan={calendar.lifespan}
        />
      </div>

      <div className="pt-10">
        <CalendarMatrix years={resp.calendar.years} />
      </div>
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
        return "bg-neutral";
      case "now":
        return "bg-primary";
      case "future":
        return "bg-base-100 border border-neutral";
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
