import { GET, POST } from "./http";

// auth API

type SignUpReq = {
  email: string;
  password: string;
  passwordConfirm: string;
};

type SignUpResp = {
  access_token: string;
};

export async function signUp(req: SignUpReq): Promise<SignUpResp> {
  const url = `/api/v1/auth/sign-up`;
  const resp = await POST({ url, params: req });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }

  return await resp.json();
}

type SignWithPasswordReq = {
  email: string;
  password: string;
};

type SignWithPasswordResp = {
  access_token: string;
};

export async function signInPassword(
  req: SignWithPasswordReq
): Promise<SignWithPasswordResp> {
  const url = `/api/v1/auth/sign-in-password`;
  const resp = await POST({ url, params: req });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }

  return await resp.json();
}

export async function signOut(token: string) {
  const url = `/api/v1/auth/sign-out`;
  const resp = await POST({ url, token });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }
}

// calendar API

type GetCalendarListResp = {
  calendars: Calendar[];
};

export async function getCalendarList(
  token: string
): Promise<GetCalendarListResp> {
  const url = `/api/v1/calendar`;
  const resp = await GET({ url, headers: { cache: "no-cache" }, token });
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
  const url = `/api/v1/calendar/create`;
  const resp = await POST({ url, params: req });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }
}

type GetCalendarResp = {
  calendar: Calendar;
};

export async function getCalendar(id: string): Promise<GetCalendarResp> {
  const url = `/api/v1/calendar/${id}`;
  const resp = await GET({ url, headers: { cache: "no-cache" } });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }

  return await resp.json();
}

export async function updateCalendar(id: string, req: CreateCalendarReq) {
  const url = `/api/v1/calendar/${id}/update`;
  const resp = await POST({ url, params: req });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }
}
