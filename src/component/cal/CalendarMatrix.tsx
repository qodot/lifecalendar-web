import useCreatePeriod from "@/src/hook/useCreatePeriod";

export default function CalendarMatrix({ calendar }: { calendar: Calendar }) {
  const { selectWeek } = useCreatePeriod(calendar.id);

  function handleClickWeek(week: Week) {
    selectWeek(week.yearnum, week.weeknum);
  }

  return (
    <div className="flex flex-col items-center">
      <WeekNumberRow />

      <div className="flex flex-col gap-0.5">
        {calendar.years.map((year) => (
          <Row>
            <RowFirst num={year.yearnum} />
            {year.weeks.map((week) => (
              <Week key={week.weeknum} week={week} onClick={handleClickWeek} />
            ))}
          </Row>
        ))}
      </div>
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

function Week({
  week,
  onClick,
}: {
  week: Week;
  onClick: (week: Week) => void;
}) {
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

  return (
    <div
      className={`w-5 h-5 rounded-sm ${getColor(week.timeType)}`}
      onClick={() => onClick(week)}
    />
  );
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
