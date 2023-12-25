"use client";

import useMyCalendar from "@/src/hook/useMyCalendar";
import CalendarDetail from "./CalendarDetail";

export default function MyCalendarDetail({ id }: { id: string }) {
  const { calendar, updateMyCalendar } = useMyCalendar(id);
  return calendar ? (
    <CalendarDetail calendar={calendar} updateCalendar={updateMyCalendar} />
  ) : null;
}
