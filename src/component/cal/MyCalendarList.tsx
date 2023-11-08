"use client";

import useMyCalendars from "@/src/hook/useMyCalendars";
import CalendarList from "./CalendarList";

export default function MyCalendarList() {
  const { myCalendars } = useMyCalendars();

  return <CalendarList calendars={myCalendars} />;
}
