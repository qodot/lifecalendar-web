const API_HOST = process.env.API_HOST || process.env.NEXT_PUBLIC_API_HOST;

async function POST(url: string, params: any) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
}

type GetCalendarListResp = {
  calendars: Calendar[];
};

export async function getCalendarList(): Promise<GetCalendarListResp> {
  const url = `${API_HOST}/api/v1/calendar`;
  const resp = await fetch(url, { cache: "no-cache" });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }

  return await resp.json();
}

type CreateCalendarReq = {
  name: string;
  birthday: string;
  lifespan: number;
};

export async function createCalendar(req: CreateCalendarReq) {
  const url = `${API_HOST}/api/v1/calendar/create`;
  const resp = await POST(url, req);
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }
}

type GetCalendarResp = {
  calendar: Calendar;
};

export async function getCalendar(id: string): Promise<GetCalendarResp> {
  const url = `${API_HOST}/api/v1/calendar/${id}`;
  const resp = await fetch(url, { cache: "no-cache" });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }

  return await resp.json();
}

export async function updateCalendar(id: string, req: CreateCalendarReq) {
  const url = `${API_HOST}/api/v1/calendar/${id}/update`;
  const resp = await POST(url, req);
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }
}
