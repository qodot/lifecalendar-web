export default function CalendarMatrix({ calendar }: { calendar: Calendar }) {
  return (
    <div className="flex flex-col items-center">
      <WeekNumberRow />
      <Years years={calendar.years} />
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

  return <div className={`w-5 h-5 rounded-sm ${getColor(week.timeType)}`} />;
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
