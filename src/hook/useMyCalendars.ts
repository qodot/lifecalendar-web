"use client";

import { useEffect, useState } from "react";
import { getCalendarList } from "@/src/data/api";
import useAuth from "./useAuth";

type MyCalendarsResp = {
  myCalendars: Calendar[];
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

  return {
    myCalendars: calendars,
  };
}
