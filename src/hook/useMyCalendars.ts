"use client";

import { useEffect, useState } from "react";
import {
  CreateCalendarReq,
  createCalendar,
  getCalendarList,
} from "@/src/data/api";
import useAuth from "./useAuth";

type MyCalendarsResp = {
  myCalendars: Calendar[];
  createMyCalendar: (req: CreateCalendarReq) => Promise<void>;
};

export default function useMyCalendars(): MyCalendarsResp {
  const { accessToken } = useAuth();
  const [calendars, setCalendars] = useState<Calendar[]>([]);

  useEffect(() => {
    if (accessToken === null) return;
    getCalendarList(accessToken).then((resp) => {
      setCalendars(resp.calendars);
    });
  }, [accessToken]);

  async function createMyCalendar(req: CreateCalendarReq) {
    if (accessToken === null) throw new Error("access token is null");
    await createCalendar(req, accessToken);
  }

  return {
    myCalendars: calendars,
    createMyCalendar,
  };
}
