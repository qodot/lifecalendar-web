"use client";

import { useEffect, useState } from "react";
import { getCalendar } from "@/src/data/api";
import useAuth from "./useAuth";

type MyCalendarResp = {
  myCalendar: Calendar | null;
};

export default function useMyCalendar(id: string): MyCalendarResp {
  const { accessToken } = useAuth();
  const [calendar, setCalendar] = useState<Calendar | null>(null);

  useEffect(() => {
    if (accessToken === null) return;
    getCalendar(id, accessToken).then((resp) => {
      setCalendar(resp.calendar);
    });
  }, [accessToken]);

  return {
    myCalendar: calendar,
  };
}
