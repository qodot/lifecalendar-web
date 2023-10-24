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
  const resp = await fetch(url);
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
