"use client";

import useMyCalendar from "@/src/hook/useMyCalendar";
import CalendarDetail from "./CalendarDetail";

export default function MyCalendarDetail({ id }: { id: string }) {
  const { myCalendar, updateMyCalendar } = useMyCalendar(id);
  return myCalendar ? (
    <CalendarDetail calendar={myCalendar} updateCalendar={updateMyCalendar} />
  ) : null;
}
