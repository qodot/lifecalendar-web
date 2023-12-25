"use client";

import { useEffect, useState } from "react";
import { CreateCalendarReq, getCalendar, updateCalendar } from "@/src/data/api";
import useAuth from "./useAuth";

type MyCalendarResp = {
  calendar: Calendar | null;
  updateMyCalendar: (req: CreateCalendarReq) => Promise<void>;
};

export default function useMyCalendar(id: string): MyCalendarResp {
  const { accessToken } = useAuth();
  const [calendar, setCalendar] = useState<Calendar | null>(null);

  useEffect(() => {
    if (accessToken === null) {
      setCalendar(null);
      return;
    }

    getCalendar(id, accessToken).then((resp) => {
      setCalendar(resp.calendar);
    });
  }, [accessToken]);

  async function updateMyCalendar(req: CreateCalendarReq) {
    if (accessToken === null) throw new Error("access token is null");
    await updateCalendar(id, req, accessToken);
  }

  return {
    calendar,
    updateMyCalendar,
  };
}
