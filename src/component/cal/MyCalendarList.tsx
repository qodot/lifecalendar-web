"use client";

import useMyCalendars from "@/src/hook/useMyCalendars";
import CalendarList from "./CalendarList";
import CalendarFormButton from "../CalendarFormButton";

export default function MyCalendarList() {
  const { myCalendars, createMyCalendar } = useMyCalendars();

  return (
    <>
      <h1>캘린더 목록</h1>
      <div className="flex flex-row justify-between items-center">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">
              올해({new Date().getFullYear()}년) 진행률
            </div>
            {/* <div className="stat-value">{calendar.this_year_percentage}%</div>
            <div className="stat-desc">
              {calendar.this_year_future_week_count}주 남았어요!
            </div> */}
          </div>
        </div>

        <CalendarFormButton isCreate createCalendar={createMyCalendar} />
      </div>

      <CalendarList calendars={myCalendars} />
    </>
  );
}
