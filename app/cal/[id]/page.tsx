type Calendar = {
  id: string;
  name: string;
  birthday: string;
  lifespan: number;

  years: Year[];
};

type Year = {
  yearnum: number;
  weeks: Week[];
};

type Week = {
  yearnum: number;
  weeknum: number;
  time_type: TimeType
};

type TimeType = "before_born" | "past" | "now" | "future" | "after_death";

type GetCalendarResp = {
  calendar: Calendar;
};

async function getCalendar(id: string): Promise<GetCalendarResp> {
  const host = 'http://localhost:8000';
  const url = `${host}/api/v1/calendar/${id}`
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return await resp.json()
}


export default async function Page({ params }: { params: { id: string } }) {
  const resp = await getCalendar(params.id);

  return (<div>
    <h1>route: /cal/{params.id}</h1>
    <div>{resp.calendar.id}</div>
  </div>);
}