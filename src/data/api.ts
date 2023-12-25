import { convertKeysSnakeToCamel } from "@/src/util/object";
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
  const resp = await POST({
    url,
    params: {
      email: req.email,
      password: req.password,
      password_confirm: req.passwordConfirm,
    },
  });
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

export async function signOut(accessToken: string) {
  const url = `/api/v1/auth/sign-out`;
  const resp = await POST({ url, accessToken });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }
}

// calendar API

type GetCalendarListResp = {
  calendars: Calendar[];
};

export async function getCalendarList(
  accessToken: string
): Promise<GetCalendarListResp> {
  const url = `/api/v1/calendar`;
  const resp = await GET({ url, headers: { cache: "no-cache" }, accessToken });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }

  const calendars: Calendar[] = (await resp.json()).calendars.map(
    (calendar: any) => convertKeysSnakeToCamel(calendar)
  );
  return { calendars };
}

export type CreateCalendarReq = {
  name: string;
  birthday: string;
  lifespan: number;
};

export async function createCalendar(
  req: CreateCalendarReq,
  accessToken: string
) {
  const url = `/api/v1/calendar/create`;
  const resp = await POST({ url, params: req, accessToken });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }
}

type GetCalendarResp = {
  calendar: Calendar;
};

export async function getCalendar(
  id: string,
  accessToken: string
): Promise<GetCalendarResp> {
  const url = `/api/v1/calendar/${id}`;
  const resp = await GET({ url, headers: { cache: "no-cache" }, accessToken });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }

  const calendar: Calendar = convertKeysSnakeToCamel(
    (await resp.json()).calendar
  );
  return { calendar };
}

export async function updateCalendar(
  id: string,
  req: CreateCalendarReq,
  accessToken: string
) {
  const url = `/api/v1/calendar/${id}/update`;
  const resp = await POST({ url, params: req, accessToken });
  if (!resp.ok) {
    throw new Error(`fail to call api ${url}`);
  }
}
