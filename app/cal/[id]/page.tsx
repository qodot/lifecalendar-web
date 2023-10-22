type GetCalendarResp = {
  calendar: Calendar;
};

async function getCalendar(id: string): Promise<GetCalendarResp> {
  const url = `${process.env.API_HOST}/api/v1/calendar/${id}`
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error('Failed to fetch data')
  }

  return await resp.json()
}


export default async function Page({ params }: { params: { id: string } }) {
  const resp = await getCalendar(params.id);

  return <div className="bg-white text-black">
    <div>
      <ul>
        <li>달력 이름: {resp.calendar.name}</li>
        <li>생일: {resp.calendar.birthday}</li>
        <li>예상 수명: {resp.calendar.lifespan}</li>
      </ul>
    </div>

    <div className="mt-10 flex justify-center items-center">
      <table>
        <thead>
          <tr>
            <th />
            {[...Array(52)].map((_, i) => <th className="text-xs" key={i + 1}>{i + 1}</th>)}
          </tr>
        </thead>
        <tbody>
          {resp.calendar.years.map(year => (
            <Year year={year} key={year.yearnum} />
          ))}
        </tbody>
      </table>
    </div>
  </div>;
}

function Year({ year }: { year: Year }) {
  return <tr>
    <td className="text-xs">{year.yearnum}</td>
    {year.weeks.map(week => <Week week={week} key={week.weeknum} />)}
  </tr>
}

function Week({ week }: { week: Week }) {
  function getColor(timeType: TimeType): string {
    switch (timeType) {
      case "past": return "bg-gray-600";
      case "now": return "bg-blue-600";
      case "future": return "bg-gray-100";
      default: return "";
    }
  }

  return <td>
    <div className={`w-5 h-5 rounded-sm ${getColor(week.time_type)}`} />
  </td>
}